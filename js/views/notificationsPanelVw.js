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
    this.socketView = options.socketView;
    this.listWrapper = $('<div class="border0 custCol-border-secondary"></div>');
    this.notifications = new notificationsCollection();
    this.notifications.url = options.url;
    this.notifications.fetch({
      success: function(notifications, response) {
        notifications.each(function(model) {
          console.log('Async Item:', model.toJSON());
          self.renderNotification(model);
        });
        self.parentEl.html(this.listWrapper);
        //self.render();
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketNotificationsID = Math.random().toString(36).slice(2);
    this.socketView.getNotifications(this.socketNotificationsID);

    this.subViews = [];

  },

  renderNotification: function(notification){
    var notification = new notificationView({
      model: notification
    });
    this.subViews.push(notification);
    //$el must be passed in by the constructor
    //appending to the DOM one by one is too slow, and the last 1/3 of the items won't be added. Add to a holder element instead.
    console.log('In renderNotification');
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
    }
    //if(data.id == this.socketItemID){
    //  this.renderItem(data);
    //} else if(data.id == this.socketVendorID) {
    //  this.renderUser(data.vendor);
    //}
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

