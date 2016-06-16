var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  app = require('../App').getApp(),
  ChatConversationsCl = require('../collections/chatConversationsCl'),
  ChatMessagesCl = require('../collections/chatMessagesCl'),
  baseVw = require('./baseVw'),
  ChatHeadsVw = require('./chatHeadsVw'),
  autolinker = require( '../utils/customLinker'),
  ChatConversationVw = require('./chatConversationVw');

module.exports = baseVw.extend({

  class: 'chatView',

  events: {
    'click .js-chatOpen': 'slideOut',
    'click .js-chatSearch': 'onSearchClick',
    'click .js-closeChat': 'close',
    'keyup #chatSearchField': 'onKeyupSearch'
  },

  initialize: function(options) {
    var options = options || {};

    if (!options.model) {
      throw new Error('Please provide a model of the logged-in user.');
    }

    if (!options.socketView) {
      throw new Error('Please provide a socketView instance.');
    }    

    this.socketView = options.socketView;
    this.$html = $('html');

    // Here we will store the chat messages collections
    // of all the active conversations we've had. This way,
    // when we return to a previous conversation, we don't
    // need to re-fetch the messages.
    this.chatMessagesCache = {};

    this.chatConversationsCl = new ChatConversationsCl();
    this.chatConversationsCl.fetch({
      reset: true
    });

    this.listenTo(this.chatConversationsCl, 'reset', (cl) => {
      cl.forEach((md) => {
        this.listenTo(md, 'change', () => {
          var filteredMd;

          if (this.filteredChatConvos) {
            filteredMd = this.filteredChatConvos.findWhere({ guid: md.get('guid') });
            filteredMd && filteredMd.set(md.attributes);
          }
        });
      });

      if (!this.chatHeadsVw) {
        this.chatHeadsVw = new ChatHeadsVw({
          collection: this.filterChatHeads(false),
          parentEl: this.$chatHeadsContainer
        });

        this.$chatHeadsContainer.html(
          this.chatHeadsVw.render().el
        );

        this.listenTo(this.chatHeadsVw, 'chatHeadClick', this.onChatHeadClick);
        this.registerChild(this.chatHeadsVw);
      } else {
        this.filterChatHeads();
      }
    });

    this.listenTo(this.chatConversationsCl, 'add remove', (md) => {
      this.filterChatHeads();
    });

    this.listenTo(window.obEventBus, 'socketMessageReceived', (response) => {
      this.handleSocketMessage(response);
    });    

    this.listenTo(window.obEventBus, 'blockingUser', (e) => {
      this.filterChatHeads();

      if (this.chatConversationVw && this.chatConversationVw.model.get('guid') === e.guid) {
        this.closeConversation();
      }
    });    

    this.listenTo(window.obEventBus, 'unblockingUser', (e) => {
      this.filterChatHeads();
    });
  },

  filterChatHeads: function(render) {
    var searchText = this.$searchField.val(),
        guid;

    render = typeof render === 'undefined';

    this.filteredChatConvos = new ChatConversationsCl(
      this.chatConversationsCl.filter((md) => {
        guid = md.get('guid');
        
        if (searchText) {
          return !this.model.isBlocked(guid) && guid.startsWith(searchText);
        } else {
          return !this.model.isBlocked(guid);
        }
      })
    );

    if (render && this.chatHeadsVw) {
      this.chatHeadsVw.setCollection(
        this.filteredChatConvos
      );

      this.chatHeadsVw.render();
    }

    return this.filteredChatConvos;
  },

  onKeyupSearch: function() {
    this.filterChatHeads();
  },

  onChatHeadClick: function(vw) {
    this.openConversation(vw.model);
  },

  onSearchClick: function() {
    this.$searchField.focus();
    this.slideOut();
  },

  openConversation: function(model) {
    // Model is the model of the user you want to converse with.
    // When calling this function from inside our view, we are passing
    // in a chatConversation model, but passing in a profile model should probably
    // work as well (at least now it does). The latter could be useful when
    // calling this function from outside of this view.

    var msgCl,
        initialFetch,
        cachedMessagesObj,
        convoMd;

    this.$('.chatConversationHeads').addClass('chatConversationHeadsCompressed textOpacity50');
    this.$('.chatSearch').addClass('textOpacity50');
    this.slideOut();

    // mark as read
    $.post(app.serverConfig.getServerBaseUrl() + '/mark_chat_message_as_read', { guid: model.get('guid') });

    // mark as read on chat head
    if (convoMd = this.chatConversationsCl.findWhere({ guid: model.get('guid') })) {
      convoMd.set('unread', 0);
    }

    if (this.chatConversationVw) {
      // if we were already chatting with this person and that
      // conversation is just hidden, show it
      if (this.chatConversationVw.model.get('guid') === model.get('guid')) {
        this.$convoContainer.removeClass('chatConversationContainerHide');
        return;
      } else {
        // Before removing an existing convo, if they are not scrolled
        // at or near the bottom, we'll store the scroll position
        // so we can re-store if they return to the convo.
        if (
          this.chatConversationVw.getScrollContainer().scrollTop <=
          this.chatConversationVw.getScrollContainer().scrollHeight -
          this.chatConversationVw.getScrollContainer().clientHeight - 10
        ) {
          this.chatMessagesCache[this.chatConversationVw.model.get('guid')].scrollPos =
            this.chatConversationVw.getScrollContainer().scrollTop;
        }

        this.chatConversationVw.remove();
      }
    }    

    cachedMessagesObj = this.chatMessagesCache[model.get('guid')];
    msgCl = cachedMessagesObj && cachedMessagesObj.collection;

    if (!cachedMessagesObj) {
      msgCl = new ChatMessagesCl();
      initialFetch = msgCl.fetch({
        data: {
          guid: model.get('guid'),
          limit: 5
        },
        reset: true        
      });
      this.chatMessagesCache[model.get('guid')] = { collection: msgCl };
    }

    this.chatConversationVw = new ChatConversationVw({
      model: model,
      user: this.model,
      collection: msgCl,
      initialFetch: initialFetch,
      initialScroll: cachedMessagesObj && cachedMessagesObj.scrollPos
    });

    this.registerChild(this.chatConversationVw);

    this.listenTo(this.chatConversationVw, 'close-click', this.closeConversation);

    this.listenTo(this.chatConversationVw, 'enter-message', function(msg) {
      var convoMd = this.chatConversationVw.model,
          chatHeadMd;

      this.sendMessage(model.get('guid'), model.get('public_key'), msg);
      this.chatConversationVw.getMessageField().val('');
      this.chatConversationVw.getScrollContainer().scrollTop = 
        this.chatConversationVw.getScrollContainer().scrollHeight;

      // since messages sent by us won't come back via the socket,
      // to not have to call get_chat_messages to get the message
      // we just sent, we'll add it in manually
      this.chatConversationVw.collection.add({
        avatar_hash: this.model.avatar_hash,
        guid: this.model.guid,
        message: autolinker(msg),
        outgoing: true,
        read: true,
        timestamp: Date.now() / 1000
      });

      // update chat head
      if (chatHeadMd = this.chatConversationsCl.findWhere({ guid: convoMd.get('guid') })) {
        chatHeadMd.set({
          last_message: msg,
          unread: 0,
          timestamp: Date.now()
        });        
      } else {
        this.chatConversationsCl.add({
          avatar_hash: convoMd.get('avatar_hash'),
          guid: convoMd.get('guid'),
          last_message: msg,
          public_key: convoMd.get('public_key'),
          unread: 0,
          timestamp: Date.now() / 1000
        });
      }
    });

    this.listenTo(this.chatConversationVw, 'clear-conversation', () => {
      delete this.chatMessagesCache[model.get('guid')];
      this.chatConversationsCl.remove(model.get('guid'));
      this.chatConversationVw = null;
      this.closeConversation();
    });

    this.$('.chatConversationContainer').html(
      this.chatConversationVw.render().el
    ).removeClass('chatConversationContainerHide');   

    this.$('.js-chatMessage').focus();
  },

  sendMessage: function(recipient, key, msg) {
    var chatMessage = {
      request: {
        'api': 'v1',
        'id': Math.random().toString(36).slice(2),
        'command': 'send_message',
        'guid': recipient,
        'handle': '',
        'message': msg,
        'subject': '',
        'message_type': 'CHAT',
        'public_key': key
      }
    };

    this.socketView.sendMessage(JSON.stringify(chatMessage));
  },

  handleSocketMessage: function(response) {
    var msg = JSON.parse(response.data).message,
        openlyChatting = false,
        conversationMd;

    if (!msg) return;

    if (msg.message_type === 'CHAT') {
      if (this.chatConversationVw && msg.sender === this.chatConversationVw.model.get('guid')) {
        if (!this.isConvoOpen()) this.chatConversationVw.getScrollContainer().scrollTop = 999999;
        if (this.isConvoOpen()) openlyChatting = true;
      }

      // if we've already been chatting with this person, update the messages cache
      if (this.chatMessagesCache[msg.sender]) {
        // add in new message
        this.chatMessagesCache[msg.sender].collection.add({
          avatar_hash: msg.avatar_hash,
          guid: msg.sender,
          message: autolinker(msg.message),
          outgoing: false,
          read: true,
          timestamp: msg.timestamp
        });

        if (!openlyChatting) {
          // if we're not openly chatting with someone and a message from them
          // comes in, we'll reset the scroll position
          delete this.chatMessagesCache[msg.sender].scrollPos;
        }
      }

      // update chat head
      if (conversationMd = this.chatConversationsCl.findWhere({ guid: msg.sender })) {
        conversationMd.set({
          last_message: msg.message,
          unread: openlyChatting ? 0 : conversationMd.get('unread') + 1,
          timestamp: msg.timestamp,
          avatar_hash: msg.avatar_hash
        });

        if (openlyChatting) {
          $.post(app.serverConfig.getServerBaseUrl() + '/mark_chat_message_as_read', {guid: msg.sender});
        }
      } else {
        this.chatConversationsCl.add({
          avatar_hash: msg.avatar_hash,
          guid: msg.sender,
          last_message: msg.message,
          public_key: msg.public_key,
          unread: 1,
          timestamp: msg.timestamp
        });
      }

      if ((!window.focused || !openlyChatting) && !this.model.isBlocked(msg.sender))  {
        new Notification(msg.handle || msg.sender + ':', {
          body: msg.message,
          icon: avatar = msg.avatar_hash ? app.serverConfig.getServerBaseUrl() + '/get_image?hash=' + msg.avatar_hash +
            '&guid=' + msg.sender : '/imgs/defaultUser.png',
          silent: true
        });

        app.playNotificationSound();
      }
    } else if (msg.message_type === 'ORDER' || msg.message_type === 'DISPUTE_OPEN' || msg.message_type === 'DISPUTE_CLOSE') {
      new Notification(msg.handle || msg.sender + ':', {
        body: msg.message,
        icon: avatar = msg.avatar_hash ? app.serverConfig.getServerBaseUrl() + '/get_image?hash=' + msg.avatar_hash +
        '&guid=' + msg.sender : '/imgs/defaultUser.png',
        silent: true
      });

      app.playNotificationSound();
    }
  },

  isConvoOpen: function() {
    return !this.$convoContainer.hasClass('chatConversationContainerHide');
  },

  closeConversation: function() {
    this.$('.chatConversationHeads').removeClass('chatConversationHeadsCompressed textOpacity50');
    this.$('.chatSearch').removeClass('textOpacity50');
    this.$convoContainer.addClass('chatConversationContainerHide');
    if (this.chatConversationVw) {
      this.chatConversationVw.closeConvoSettings();
    }
    if(this.chatHeadsVw){
      this.chatHeadsVw.chatHeadsRemoveSelectStyle();
    }
  },

  slideOut: function() {
    this.$html.addClass('chatOpen');
    self.$('.chatSearch').addClass('chatSearchOut');
    self.$('.btn-chatOpen')
        .addClass('hide')
        .find('span')
        .removeClass('hide');
  },

  slideIn: function() {
    this.closeConversation();
    this.$html.removeClass('chatOpen');
    self.$('.chatSearch').removeClass('chatSearchOut');
  },

  close: function(){
    this.slideIn();
    this.$('.btn-chatOpen')
        .removeClass('hide')
        .find('span')
        .addClass('hide');

    //remove any existing selected state
    if(this.chatHeadsVw){
      this.chatHeadsVw.chatHeadsRemoveSelectStyle();
    }
  },      

  remove: function() {
    this.close();

    baseVw.prototype.remove.apply(this, arguments);
  },

  render: function() {
    loadTemplate('./js/templates/chat.html', (tmpl) => {
      this.$el.html(tmpl());

      this.$chatHeadsContainer = this.$('.chatConversationHeads');
      this.$convoContainer = this.$('.chatConversationContainer');
      this.$searchField = this.$('#chatSearchField');
    });

    return this;
  }
});