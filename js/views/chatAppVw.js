var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    chatCollection = require('../collections/chatCl'),
    chatView = require('./chatVw'),
    chat = require('../models/chatMd'),
    chatMessageCollection = require('../collections/chatMessageCl'),
    chatMessageView = require('./chatMessageVw'),
    chatMessage = require('../models/chatMessageMd'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  el: '#sideBar',

  events: {
    'click .js-chatOpen': 'slideChatOut',
    'click .js-closeChat': 'closeChat',
    'click .js-closeConversation': 'closeConversation',
    'click .js-chatSearch': 'chatSearch',
    'keydown .js-chatMessage': 'checkShift',
    'keyup .js-chatMessage': 'sendChat',
    'click .js-username': 'usernameClick'
  },

  initialize: function(options){
    __.bindAll(this, 'beforeRender', 'render', 'afterRender');
    var _this = this;
    this.render = __.wrap(this.render, function(render) {
        _this.beforeRender();
        render();
        _this.afterRender();
        return _this;
    });

    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.socketView = options.socketView;

    this.shiftDown = false; // Detect shift key down

    // Render chat list items
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow"></div>');
    this.chats = new chatCollection();

    this.subViews = [];
    this.subViewsChat = [];
    this.render();

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.listenTo(window.obEventBus, "openChat", function(guid, key) {
      this.openChat(guid, key);
    });

  },

  render: function(){
    "use strict";
    var self = this;

    loadTemplate('./js/templates/chatApp.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
    });

    return this;
  },

  beforeRender: function() {
    // NOOP
  },

  afterRender: function() {
    var model = this.options.model;
    var self = this;
    this.chats.url = model.get('serverUrl') + "get_chat_conversations";
    this.chats.fetch({
      success: function(chats, response) {
        if(chats.models.length < 1) {
          self.renderNoneFound();
        } else {
          __.each(chats.models, function (chat) {
            "use strict";
            if(chat.image_hash === undefined) {
              var hash = window.localStorage.getItem("avatar_" + chat.get('guid'));
              if(hash !== "") {
                chat.set('image_hash', hash);
              }
            }
            chat.set('avatarURL', model.get('serverUrl') + "get_image?hash=" + chat.get('image_hash') + "&guid=" + chat.get('guid'));
            self.renderChat(chat);
          });
          $('#chatHeads').html(self.listWrapper);
        }
      }
    });
  },

  renderChat: function(model){
    var chat = new chatView({
      model: model
    });
    this.subViews.push(chat);
    this.listWrapper.prepend(chat.el);
  },

  renderChatMessage: function(model){
    var chatMessage = new chatMessageView({
      model: model
    });
    this.subViewsChat.push(chatMessage);
    this.listWrapperChat.prepend(chatMessage.el);
  },

  renderNoneFound: function(){
    // Decide what to do here
  },

  refreshConversations: function() {

  },

  openChat: function(guid, key) {
    var self = this;
    this.openConversation();
    $('#inputConversationRecipient').val(guid);
    $('.chatConversationLabel').html(guid);
    $('#inputConversationKey').val(key);
    $('#inputConversationMessage').focus();

    // Load conversation from DB
    this.chatMessages = new chatMessageCollection();
    this.chatMessages.url = this.options.model.get('serverUrl') + "get_chat_messages?guid=" + guid;
    var model = this.options.model;

    this.listWrapperChat = $('<div class="border0 custCol-border-secondary flexRow"></div>');

    this.chatMessages.fetch({
      success: function(chatMessages, response) {
        if(chatMessages.models.length < 1) {
          console.log('none found');
        } else {
          __.each(chatMessages.models, function (chatMessage) {
            "use strict";
            if(chatMessage.image_hash === undefined) {
              var hash = window.localStorage.getItem("avatar_" + chatMessage.get('guid'));
              if(hash !== "") {
                chatMessage.set('image_hash', hash);
              }
            }
            if(chatMessage.get('outgoing')) {
              chatMessage.set('avatarURL', model.get('serverUrl') + "get_image?hash=" + model.get('avatar_hash'));
            } else {
              chatMessage.set('avatarURL', model.get('serverUrl') + "get_image?hash=" + chatMessage.get('image_hash') + "&guid=" + chatMessage.get('guid'));
            }
            self.renderChatMessage(chatMessage);
          });

          $('#chatConversation .chatConversationContent').html(self.listWrapperChat).animate({ scrollTop: $('#chatConversation .chatConversationContent').prop("scrollHeight")}, 100);
        }
      }
    });

  },

  usernameClick: function(){
    var targ = $('.js-navNotificationsMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
    console.log(this);
    Backbone.history.navigate('#userPage/'+$('#inputConversationRecipient').val()+'/store', {trigger: true});
  },

  checkShift: function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 16) {
      this.shiftDown = true;
    }
  },

  sendChat: function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);

    if(!this.shiftDown) {

      if(code == 13) {
        var targetForm = this.$el.find('#chatConversation');
        var chat_body = targetForm.find('#inputConversationMessage')[0].value;

        if (chat_body != "" && chat_body != '\n') {

          // Chat details
          var chat_guid = targetForm.find('#inputConversationRecipient')[0].value;
          //var chat_handle = targetForm.find('#inputConversationHandle').value;
          var chat_subject = "";
          var chat_msgtype = "chat";
          var chat_key = targetForm.find('#inputConversationKey')[0].value;

          var socketMessageId = Math.random().toString(36).slice(2);

          var chatMessage = {
            "request": {
              "api": "v1",
              "id": socketMessageId,
              "command": "send_message",
              "guid": chat_guid,
              "handle": "",
              "message": chat_body,
              "subject": chat_subject,
              "message_type": chat_msgtype,
              "recipient_key": chat_key
            }
          };

          this.socketView.sendMessage(JSON.stringify(chatMessage));
        }

        targetForm.find('#inputConversationMessage')[0].value = "";

      }
    } else {
      if(code == 16) {
        this.shiftDown = false;
      }
    }
  },

  openConversation: function() {
    this.slideChatOut();
    $(this.$el).find('.chatConversation').removeClass('chatConversationHidden');
    $(this.$el).find('.chatConversationHeads').addClass('chatConversationHeadsCompressed');
  },

  closeConversation: function() {
    $(this.$el).find('.chatConversation').addClass('chatConversationHidden');
    $(this.$el).find('.chatConversationHeads').removeClass('chatConversationHeadsCompressed');
  },

  chatSearch: function() {
    this.slideChatOut();
    $('#chatSearchField').focus();
  },

  slideChatOut: function() {
    // Slide app out
    $(this.$el).addClass('sideBarSlid', 500);

    $('.container').addClass('compressed');

    // Adjust elements
    $(this.$el).find('.chatSearch').addClass('chatSearchOut');

    var chatButton = $(this.$el).find('.btn-chatOpen');
    chatButton.addClass('hide');
    $('.chatMessagesLabel').removeClass('hide');
    chatButton.find('span').removeClass('hide');
  },

  slideChatIn: function() {
    $(this.$el).removeClass('sideBarSlid', 500);

    $('.container').removeClass('compressed');

    // Adjust elements
    $(this.$el).find('.chatSearch').removeClass('chatSearchOut');
  },

  closeChat: function(){
    this.slideChatIn();
    var chatButton = $(this.$el).find('.btn-chatOpen');
    chatButton.removeClass('hide');
    chatButton.find('span').addClass('hide');
    this.closeConversation();
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.hasOwnProperty('chat')) {
      console.log('Got Chat Message from Websocket:', data.chat);
      var chat_message = data.chat;
      var username = chat_message.handle ? chat_message.handle : chat_message.guid;
      var avatar = chat_message.image_hash ? this.options.serverUrl + 'get_image?hash=' + chat_message.image_hash + '&guid=' + chat_message.guid : 'imgs/defaultUser.png';
      new Notification(username + " " + window.polyglot.t('NotificationFollow'), {
        icon: avatar
      });

      var new_chat_message = new Backbone.Model(chat_message);
      this.renderChat(new_chat_message);

      // Figure out how many unread messages
      //this.trigger('notificationsCounted', unread_count);
    }
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }
});