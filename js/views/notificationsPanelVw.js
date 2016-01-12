var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    notificationsCollection = require('../collections/notificationsCl'),
    notificationView = require('./notificationVw'),
    notifications = require('../models/notificationsMd');

module.exports = Backbone.View.extend({

  el: '#notificationsPanel',

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow marginLeft1"></div>');

    this.notificationLimit = 30;
    this.notifications = new notificationsCollection();
    this.notifications.url = options.serverUrl + "get_notifications";
    this.notifications.fetch({
      success: function(notifications, response) {
        var unread_count = 0;
        if(notifications.models.length < 1) {
          self.renderNoneFound();
        } else {
          __.each(notifications.models, function (notification) {
            "use strict";
            if (notification.get('read') != true) {
              unread_count = parseInt(unread_count) + 1;
            }
            notification.set('avatarURL', self.options.serverUrl + "get_image?hash=" + notification.get('image_hash') + "&guid=" + notification.get('guid'));
            self.renderNotification(notification);
          });
          self.parentEl.html(self.listWrapper);
          if (unread_count > 0) {  // Don't show badge if less than 1 notification
            self.trigger('notificationsCounted', unread_count);
          }
        }
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.notifcationSound = document.createElement('audio');
    this.notifcationSound.setAttribute('src', './audio/notification.mp3');

    this.subViews = [];

  },

  renderNotification: function(model){
    var notification = new notificationView({
      model: model
    });
    this.subViews.push(notification);
    this.listWrapper.prepend(notification.el);
    var serverUrl = this.options.serverUrl;

    if (model.get('read') != true) {
      $.post(serverUrl + "mark_notification_as_read", {
        "id": model.get('id')
      });
    }
  },

  renderNoneFound: function(){
    $('#noNotifications').removeClass('hide');
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.hasOwnProperty('notification')) {
      var n = data.notification;
      var username = n.handle ? n.handle : n.guid;
      var avatar = n.image_hash ? this.options.serverUrl + 'get_image?hash=' + n.image_hash + '&guid=' + n.guid : 'imgs/defaultUser.png';
      switch(n.type) {
        case "follow":
          new Notification(username + " " + window.polyglot.t('NotificationFollow'), {
            icon: avatar
          });
          break;
      }

      var new_notification = new Backbone.Model(n);
      new_notification.set('avatarURL', avatar);
      this.renderNotification(new_notification);
      var unread_count = $('.js-navNotifications .badge').attr('data-count');
      if(unread_count) {
        unread_count = parseInt(unread_count) + 1;
      } else {
        unread_count = 1;
      }
      this.trigger('notificationsCounted', unread_count);

      // play notification sound
      this.notifcationSound.play();
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
