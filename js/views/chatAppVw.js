var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    chatCollection = require('../collections/chatCl'),
    chatView = require('./chatVw'),
    chat = require('../models/chatMd'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  el: '#sideBar',

  events: {
    'click .js-newChat': 'newChat',
    'click .js-closeChat': 'closeChat',
    'click .js-closeConversation': 'closeConversation',
    'click .js-chatSearch': 'chatSearch',
    'keyup .js-chatMessage': 'sendChat'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.socketView = options.socketView;

    // Render chat list items
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow"></div>');
    this.chats = new chatCollection();
    this.chats.url = options.model.get('serverUrl') + "get_chat_messages?guid=" + options.model.get('guid');
    this.chats.fetch({
      success: function(chats, response) {
        if(chats.models.length < 1) {
          self.renderNoneFound();
        } else {
          __.each(chats.models, function (chat) {
            "use strict";
            chat.set('avatarURL', self.options.serverUrl + "get_image?hash=" + chat.get('image_hash') + "&guid=" + chat.get('guid'));
            self.renderChat(chat);
          });
          self.parentEl.html(self.listWrapper);
        }
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.listenTo(window.obEventBus, "openChat", function(guid, key) {
      this.openChat(guid, key);
    });

    this.subViews = [];

    this.render();

  },

  render: function(){
    "use strict";
    var self = this;
    //make sure container is cleared
    console.log(this.$el);

    loadTemplate('./js/templates/chatApp.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
    });

    return this;
  },

  renderChat: function(model){
    var chat = new chatView({
      model: model
    });
    this.subViews.push(chat);
    this.listWrapper.prepend(chat.el);
  },

  renderNoneFound: function(){
    // Decide what to do here
  },

  openChat: function(guid, key) {
    this.newChat();
    $('#inputConversationRecipient').val(guid);
    $('#inputConversationKey').val(key);
    $('#inputConversationMessage').focus();
  },

  newChat: function() {
    this.slideChatOut();
    $('.chatConversationTo').removeClass('hide');
    this.openConversation();
  },

  sendChat: function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
      var targetForm = this.$el.find('#chatConversation');

      // Chat details
      var chat_guid = targetForm.find('#inputConversationRecipient')[0].value;
      //var chat_handle = targetForm.find('#inputConversationHandle').value;
      var chat_body = targetForm.find('#inputConversationMessage')[0].value;
      var chat_subject = "";
      var chat_msgtype = "chat";
      var chat_key = targetForm.find('#inputConversationKey')[0].value;

      var socketMessageId = Math.random().toString(36).slice(2);

      var chatMessage = {"request": {
          "api" : "v1",
          "id": socketMessageId,
          "command" : "send_message",
          "guid" : chat_guid,
          "handle" : "",
          "message" : chat_body,
          "subject" : chat_subject,
          "message_type" : chat_msgtype,
          "recipient_key" : chat_key
      }};

      this.socketView.sendMessage(JSON.stringify(chatMessage));

      targetForm.find('#inputConversationMessage')[0].value = "";

    }
  },

  openConversation: function() {
    $(this.$el).find('.chatConversation').removeClass('chatConversationHidden');
  },

  closeConversation: function() {
    $(this.$el).find('.chatConversation').addClass('chatConversationHidden');
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

    var chatButton = $(this.$el).find('.btn-newChat');
    chatButton.addClass('btn-newChatOut', 500);
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
    var chatButton = $(this.$el).find('.btn-newChat');
    chatButton.removeClass('btn-newChatOut', 500);
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