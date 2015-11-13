var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    chatCollection = require('../collections/chatCl'),
    chatView = require('./chatVw'),
    chat = require('../models/chatMd')
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  el: '#sidebar',

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow"></div>');

    this.chats = new chatCollection();
    this.chats.url = options.serverUrl + "get_chats";
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

    this.subViews = [];

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