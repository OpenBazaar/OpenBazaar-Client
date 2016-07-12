'use strict';

var $ = require('jquery'),
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
      cl.forEach((md) => this.bindChatConvoMdChangeHandler(md));

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

      this.setAggregateUnreadCount();
    });
    
    this.listenTo(this.chatConversationsCl, 'sort', () => {
      if (this.chatHeadsVw) {
        this.chatHeadsVw.setCollection(
          this.chatConversationsCl
        );

        this.chatHeadsVw.render();
  
        this.$chatHeadsContainer.animate({
          scrollTop: 0
        });
      }
    });

    this.listenTo(this.chatConversationsCl, 'add remove', (md, cl, opts) => {
      if (opts.add) {
        this.bindChatConvoMdChangeHandler(md);
      }

      this.setAggregateUnreadCount();
      this.filterChatHeads();
    });

    this.listenTo(window.obEventBus, 'socketMessageReceived', (response) => {
      this.handleSocketMessage(response);
    });    

    this.listenTo(window.obEventBus, 'blockingUser', (e) => {
      this.setAggregateUnreadCount();
      this.filterChatHeads();

      if (this.chatConversationVw && this.chatConversationVw.model.get('guid') === e.guid) {
        this.closeConversation();
      }
    });    

    this.listenTo(window.obEventBus, 'unblockingUser', () => {
      this.setAggregateUnreadCount();
      this.filterChatHeads();
    });

    $(window).focus(() => {
      this.chatConversationVw && this.isConvoOpen() &&
        this.markConvoAsRead(this.chatConversationVw.model.get('guid'));
    });

    //when language is changed, re-render
    this.listenTo(options.model, 'change:language', function(){
      this.render(true);
    });    
  },

  bindChatConvoMdChangeHandler: function(md) {
    this.listenTo(md, 'change', () => {
      var filteredMd;

      if (this.filteredChatConvos) {
        filteredMd = this.filteredChatConvos.findWhere({ guid: md.get('guid') });
        filteredMd && filteredMd.set(md.attributes);
      }

      md.hasChanged('unread') && this.setAggregateUnreadCount();
    });
  },

  setAggregateUnreadCount: function() {
    var unread = 0;

    this.chatConversationsCl.forEach((md) => {
      if (!this.model.isBlocked(md.id)) {
        unread += md.get('unread');
      }
    });

    app.setUnreadChatMessageCount(unread);
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
        }
        return !this.model.isBlocked(guid);
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
    this.currentConversation = vw.model;
  },

  onSearchClick: function() {
    this.$searchField.focus();
    this.slideOut();
  },

  openConversation: function(model, refresh) {
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
    this.markConvoAsRead(model.get('guid'));

    // mark as read on chat head
    if (convoMd = this.chatConversationsCl.get(model.get('guid'))) { // eslint-disable-line no-cond-assign
      convoMd.set('unread', 0);
    }

    if (this.chatConversationVw) {
      // if we were already chatting with this person and that
      // conversation is just hidden, show it
      if (this.chatConversationVw.model.get('guid') === model.get('guid') && !refresh) {
        this.$convoContainer.removeClass('chatConversationContainerHide');
        return;
      }
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
      if (chatHeadMd = this.chatConversationsCl.findWhere({ guid: convoMd.get('guid') })) { // eslint-disable-line no-cond-assign
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

    if (!msg || this.model.isBlocked(msg.sender)){
      return;
    }

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
      if (conversationMd = this.chatConversationsCl.get(msg.sender)) { // eslint-disable-line no-cond-assign
        conversationMd.set({
          last_message: msg.message,
          unread: openlyChatting && document.hasFocus() ? 0 : conversationMd.get('unread') + 1,
          timestamp: msg.timestamp,
          avatar_hash: msg.avatar_hash
        });

        if (openlyChatting) {
          // $.post(app.serverConfigs.getActive().getServerBaseUrl() + '/mark_chat_message_as_read', {guid: msg.sender});
          this.markConvoAsRead(msg.sender);
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

      if ((!window.focused || !openlyChatting)) {
        new Notification(msg.handle || msg.sender + ':', {
          body: msg.message,
          icon: msg.avatar_hash ? app.serverConfigs.getActive().getServerBaseUrl() + '/get_image?hash=' + msg.avatar_hash +
            '&guid=' + msg.sender : '/imgs/defaultUser.png',
          silent: true
        });

        app.playNotificationSound();
      }
    } else if (msg.message_type === 'ORDER' || msg.message_type === 'DISPUTE_OPEN' || msg.message_type === 'DISPUTE_CLOSE') {
      new Notification(msg.handle || msg.sender + ':', {
        body: msg.message,
        icon: msg.avatar_hash ? app.serverConfigs.getActive().getServerBaseUrl() + '/get_image?hash=' + msg.avatar_hash +
        '&guid=' + msg.sender : '/imgs/defaultUser.png',
        silent: true
      });

      app.playNotificationSound();
    }
  },

  markConvoAsRead: function(guid) {
    var chatHead = this.chatConversationsCl.get(guid);

    if (!guid) return;

    if (document.hasFocus() && chatHead && chatHead.get('unread')) {
      $.post(app.serverConfigs.getActive().getServerBaseUrl() + '/mark_chat_message_as_read', {guid: guid});
      chatHead.set('unread', 0);
      this.setAggregateUnreadCount();
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
    if (this.chatHeadsVw){
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
    if (this.chatHeadsVw){
      this.chatHeadsVw.chatHeadsRemoveSelectStyle();
    }
  },      

  remove: function() {
    this.close();

    baseVw.prototype.remove.apply(this, arguments);
  },

  render: function(refreshConversations) {
    loadTemplate('./js/templates/chat.html', (tmpl) => {
      this.$el.html(tmpl());

      this.$chatHeadsContainer = this.$('.chatConversationHeads');
      this.$convoContainer = this.$('.chatConversationContainer');
      this.$searchField = this.$('#chatSearchField');
      
      if (refreshConversations){
        //re-render the conversations
        this.$chatHeadsContainer.html(
            this.chatHeadsVw.render().el
        );
        //re-open the current conversation if one exists
        this.currentConversation && this.openConversation(this.currentConversation, true);
      }
    });

    return this;
  }
});