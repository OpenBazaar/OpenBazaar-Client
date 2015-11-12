var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    notificationsCollection = require('../collections/notificationsCl'),
    notificationView = require('./notificationVw'),
    notification = require('../models/notificationMd');

module.exports = Backbone.View.extend({

  el: '#notificationsPanel',

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow"></div>');
    this.notifications = new notificationsCollection();
    this.notifications.url = options.serverUrl + "get_notifications";
    this.notifications.fetch({
      success: function(notifications, response) {
        var unread_count = 0;
        __.each(notifications.models, function(notification){
          "use strict";
          if(notification.get('read') != true) {
            unread_count += 1;
          }
          notification.set('avatarURL', self.options.serverUrl +"get_image?hash="+notification.get('image_hash')+"&guid="+notification.get('guid'));
          self.renderNotification(notification);
        });
        self.parentEl.html(self.listWrapper);
        if(unread_count > 0) {  // Don't show badge if less than 1 notification
          self.trigger('notificationsCounted', unread_count);
        }
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.subViews = [];

  },

  renderNotification: function(model){
    console.log('model', model);
    var notification = new notificationView({
      model: model
    });
    this.subViews.push(notification);
    this.listWrapper.prepend(notification.el);
    var serverUrl = this.options.serverUrl;

    $.post(serverUrl + "mark_notification_as_read", {
      "id": model.get('id')
    });
  },

  renderNoneFound: function(){
    console.log('none found');
    //var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    //this.subViews.push(simpleMessage);
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.hasOwnProperty('notification')) {
      console.log('Got Notification from Websocket:', data.notification);
      this.renderNotification(data.notification);
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

