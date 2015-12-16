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
    'click .js-username': 'usernameClick',
    'keyup .js-chatSearchText': 'chatSearchText'
  },

  initialize: function(options){
    __.bindAll(this, 'beforeRender', 'render', 'afterRender');

    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.socketView = options.socketView;
    this.serverUrl = this.options.model.get('serverUrl');
    this.currentChatId = ""; //keep track of the currently active chat guid

    this.shiftDown = false; // Detect shift key down
    this.chats = new chatCollection();
    this.chats.url = this.serverUrl + "get_chat_conversations";
    this.chats.comparator = function(model) {
      return model.get('timestamp');
    };
    this.listenTo(this.chats, 'update', function(){
      this.renderChats();
    });



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
      self.afterRender();
    });

    return this;
  },

  beforeRender: function() {
    // NOOP
  },

  afterRender: function() {
    this.chats.fetch();
  },

  renderChats: function() {
    var self = this;
    var model = this.options.model;

    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow marginLeft1 marginTop1"></div>');

    if(this.chats.models.length < 1) {
      self.renderNoneFound();
    } else {
      __.each(this.chats.models, function (chat) {
        "use strict";
        if(!chat.get('avatar_hash')) {
          var hash = window.localStorage.getItem("avatar_" + chat.get('guid'));
          if(hash !== "") {
            chat.set('image_hash', hash);
            chat.set('avatarURL', self.serverUrl + "get_image?hash=" + hash + "&guid=" + chat.get('guid'));
          }
        } else {
          chat.set('avatarURL', self.serverUrl + "get_image?hash=" + chat.get('avatar_hash') + "&guid=" + chat.get('guid'));
        }
        self.renderChat(chat);

      });
      $('#chatHeads').html(self.listWrapper);
    }
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

  chatSearchText: function(e) {
    var search = e.currentTarget.value;
    if(search !== "") {
      var t = this.chats.where({"guid": search});
      this.chats = new chatCollection(t);
    } else {
      this.afterRender();
    }
    this.renderChats();
  },

  openChat: function(guid, key) {
    var self = this,
        model = this.options.model,
        avatarURL = "",
        avatarHash = window.localStorage.getItem("avatar_" + guid);

    if(avatarHash !== "") {
      avatarURL = model.get('serverUrl') + "get_image?hash=" + avatarHash + "&guid=" + guid;
    }

    this.currentChatId = guid;

    this.openConversation();
    $('#inputConversationRecipient').val(guid);
    $('.chatConversationAvatar').css('background-image', 'url(' + avatarURL + '), url(imgs/defaultUser.png)');
    $('.chatConversationLabel').html(guid);
    $('#inputConversationKey').val(key);
    $('#inputConversationMessage').focus();

    this.updateChat(guid);

    $('.chatHead').removeClass('chatHeadSelected');
    $('#chatHead_' + guid).parent().addClass('chatHeadSelected');

    // Mark as read
    $.post(self.serverUrl + "mark_chat_message_as_read", {guid: guid});
    $('#chatHead_' + guid).attr('data-count', 0);
    $('#chatHead_' + guid).removeClass('badge');
    $('#chatHead_' + guid).addClass('chatRead');

  },

  updateChat: function(guid) {
    var model = this.options.model;
    var self = this;

    this.subViewsChat = [];

    // Load conversation from DB
    this.chatMessages = new chatMessageCollection();
    this.chatMessages.url = this.serverUrl + "get_chat_messages?guid=" + guid;

    this.listWrapperChat = $('<div class="border0 custCol-border-secondary flexRow marginLeft1 marginTop1"></div>');

    this.chatMessages.fetch({
      success: function(chatMessages, response) {
        if(chatMessages.models.length < 1) {
          $('#chatConversation .chatConversationContent').html(self.listWrapperChat);
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
              chatMessage.set('avatarURL', self.serverUrl + "get_image?hash=" + model.get('avatar_hash'));
            } else if(chatMessage.get('image_hash')) {
              chatMessage.set('avatarURL', self.serverUrl  + "get_image?hash=" + chatMessage.get('image_hash') + "&guid=" + chatMessage.get('guid'));
            } else {
              chatMessage.set('avatarURL', "imgs/defaultItem.png");
            }
            self.renderChatMessage(chatMessage);
          });

          $('#chatConversation .chatConversationContent').html(self.listWrapperChat).promise().done(function() {
            "use strict";
            $(this).animate({ scrollTop: 99999999999}, 100); // Arbitrary long value
          });
        }
      }
    });
  },

  usernameClick: function(){
    var targ = $('.js-navNotificationsMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
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
    var targetForm = this.$el.find('#chatConversation');
    var chat_body = targetForm.find('#inputConversationMessage')[0].value;

    if(!this.shiftDown) {

      if(code == 13 && chat_body.trim() != "") {

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

        this.updateChat(chat_guid);
        this.afterRender();
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
    $(this.$el).find('.chatConversationHeads').addClass('chatConversationHeadsCompressed').addClass('textOpacity50');
    $(this.$el).find('.chatSearch').addClass('textOpacity50');
  },

  closeConversation: function() {
    $(this.$el).find('.chatConversation').addClass('chatConversationHidden');
    $(this.$el).find('.chatConversationHeads').removeClass('chatConversationHeadsCompressed').removeClass('textOpacity50');
    $(this.$el).find('.chatHead').removeClass('chatHeadSelected');
    $(this.$el).find('.chatSearch').removeClass('textOpacity50');


    // let's clear the form on close
    $('#chatConversation').trigger('reset');
    $('#inputConversationKey').val('');
    $('#inputConversationRecipient').val('');
  },

  chatSearch: function() {
    this.slideChatOut();
    $('#chatSearchField').focus();
  },

  slideChatOut: function() {
    // Slide app out
    $(this.$el).addClass('sideBarSlid', 500);

    $('.container').addClass('compressed');
    $('.modal-child').addClass('modalCompressed');
    $('.spinner-with-logo').addClass('modalCompressed');
    $('#obContainer').addClass('noScrollBar');
    $('#colorbox').addClass('marginLeftNeg115');

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
    $('.modal-child').removeClass('modalCompressed');
    $('.spinner-with-logo').removeClass('modalCompressed');
    $('#obContainer').removeClass('noScrollBar');
    $('#colorbox').removeClass('marginLeftNeg115');

    // Adjust elements
    $(this.$el).find('.chatSearch').removeClass('chatSearchOut');
  },

  closeChat: function(){
    this.slideChatIn();
    $('.chatHeadSelected').removeClass('chatHeadSelected');
    var chatButton = $(this.$el).find('.btn-chatOpen');
    chatButton.removeClass('hide');
    chatButton.find('span').addClass('hide');
    this.closeConversation();
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.hasOwnProperty('message')) {
      var chat_message = data.message;
      this.afterRender();
      if(chat_message.sender == this.currentChatId){
        this.updateChat(chat_message.sender);
      }
      var username = chat_message.handle ? chat_message.handle : chat_message.guid;
      var avatar = chat_message.image_hash ? this.options.serverUrl + 'get_image?hash=' + chat_message.image_hash + '&guid=' + chat_message.guid : 'imgs/defaultUser.png';

      // lets not bother them with a notification if they're already actively talking to this person
      // however, let's bother them if the window isn't active
      if (!window.focused || $('#inputConversationRecipient').val() != chat_message.sender){
        // send notification to recipient
        new Notification(username + ":", { 
          body: data.message.message, 
          icon: avatar 
        }); 
      }  

      // play notification sound
      var notifcationSound = document.createElement('audio');
      notifcationSound.setAttribute('src', './audio/notification.mp3');
      notifcationSound.play();
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
