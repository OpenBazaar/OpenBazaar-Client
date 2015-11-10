var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    notificationsCollection = require('../collections/notificationsCl'),
    notificationView = require('./notificationVw');

module.exports = Backbone.View.extend({

  el: '#notificationsPanel',

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.listWrapper = $('<div class="border0 custCol-border-secondary flexRow"></div>');
    this.notifications = new notificationsCollection();
    this.notifications.url = options.server_url + "get_notifications";
    this.notifications.fetch({
      success: function(notifications, response) {
        __.each(notifications.models, function(notification){
          "use strict";
          notification.avatarURL = self.options.server_url +"get_image?hash="+notification.image_hash+"&guid="+notification.guid;
          self.renderNotification(notification);
        });
        self.parentEl.html(self.listWrapper);
        self.trigger('notificationsCounted', notifications.length);
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.subViews = [];

  },

  renderNotification: function(model){
    var notification = new notificationView({
      model: model
    });
    this.subViews.push(notification);
    this.listWrapper.append(notification.el);
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

