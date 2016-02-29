var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  app = require('../App.js').getApp(),
  ChatConversationsCl = require('../collections/chatConversationsCl'),
  ChatMessagesCl = require('../collections/chatMessagesCl'),
  baseVw = require('./baseVw'),
  ChatHeadsVw = require('./chatHeadsVw'),
  ChatConversationVw = require('./chatConversationVw');

module.exports = baseVw.extend({
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

    // cache some selectors which are outside of
    // our el's scope
    this.$sideBar = $('#sideBar');
    this.$container = $('.container');
    this.$obContainer = $('#obContainer');
    this.$loadingSpinner = $('.spinner-with-logo');

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
          collection: this.filterChatHeads(cl)
        });

        this.$chatHeadsContainer.html(
          this.chatHeadsVw.render().el
        );

        this.listenTo(this.chatHeadsVw, 'chatHeadClick', this.onChatHeadClick)
        this.registerChild(this.chatHeadsVw);
      } else {
        this.filterChatHeads();
      }
    });

    this.listenTo(this.chatConversationsCl, 'add', (md) => {
      if (this.filteredChatConvos) {
        this.filteredChatConvos.add(md);
      };
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

  filterChatHeads: function() {
    var searchText = this.$searchField.val(),
        guid;

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

    if (this.chatHeadsVw) {
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

    var msgCl = new ChatMessagesCl(),
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
        this.chatConversationVw.remove();
      }
    }    

    this.chatConversationVw = new ChatConversationVw({
      model: model,
      user: this.model,
      collection: msgCl
    });

    this.registerChild(this.chatConversationVw);

    this.listenTo(this.chatConversationVw, 'close-click', this.closeConversation);

    this.listenTo(this.chatConversationVw, 'enter-message', function(msg) {
      var convoMd = this.chatConversationVw.model,
          chatHeadMd;

      this.sendMessage(model.get('guid'), model.get('public_key'), msg);
      this.chatConversationVw.getMessageField().val('');

      // since messages sent by us won't come back via the socket,
      // to not have to call get_chat_messages to get the message
      // we just sent, we'll add it in manually
      this.chatConversationVw.collection.add({
        avatar_hash: this.model.avatar_hash,
        guid: this.model.guid,
        message: msg,
        outgoing: true,
        read: true,
        timestamp: Date.now()
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
          timestamp: Date.now()
        });
      }
    });

    this.$('.chatConversationContainer').html(
      this.chatConversationVw.render().el
    ).removeClass('chatConversationContainerHide');    
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
      // if we're actively chatting with the person who sent the message,
      // whether the view is hidden or not, update the conversation
      if (this.chatConversationVw && msg.sender === this.chatConversationVw.model.get('guid')) {
        if (this.isConvoOpen()) {
          openlyChatting = true;
        }

        // add in new message
        this.chatConversationVw.collection.add({
          avatar_hash: msg.avatar_hash,
          guid: msg.sender,
          message: msg.message,
          outgoing: false,
          read: true,
          timestamp: msg.timestamp
        });
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
            '&guid=' + msg.sender : '/imgs/defaultUser.png'
        });

        app.playNotificationSound();
      }
    }
  },

  isConvoOpen: function() {
    return !this.$convoContainer.hasClass('chatConversationContainerHide');
  },

  closeConversation: function() {
    this.$('.chatConversationHeads').removeClass('chatConversationHeadsCompressed textOpacity50');
    this.$('.chatSearch').removeClass('textOpacity50');
    this.$convoContainer.addClass('chatConversationContainerHide');
    this.chatConversationVw && this.chatConversationVw.closeConvoSettings();
  },

  slideOut: function() {
    this.$sideBar.addClass('sideBarSlid');
    this.$container.addClass('compressed');
    this.$loadingSpinner.addClass('modalCompressed');
    this.$obContainer.addClass('noScrollBar');
    $('#colorbox').addClass('marginLeftNeg115');
    self.$('.chatSearch').addClass('chatSearchOut');
    self.$('.btn-chatOpen')
        .addClass('hide')
        .find('span')
        .removeClass('hide');
  },

  slideIn: function() {
    this.closeConversation();
    this.$sideBar.removeClass('sideBarSlid');
    this.$container.removeClass('compressed');
    this.$loadingSpinner.removeClass('modalCompressed');
    this.$obContainer.removeClass('noScrollBar');
    $('#colorbox').removeClass('marginLeftNeg115');
    self.$('.chatSearch').removeClass('chatSearchOut');
  },

  close: function(){
    this.slideIn();
    this.$('.btn-chatOpen')
        .removeClass('hide')
        .find('span')
        .addClass('hide');
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