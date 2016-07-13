'use strict';

var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    NotificationMd = require('../models/notificationMd');


module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfigs.getActive().getServerBaseUrl() + '/get_notifications';
  },
  
  model: NotificationMd,

  comparator: function(notif) {
    return -notif.get('timestamp');
  },

  getUnreadCount: function() {
    return this._unread || 0;
  },

  parse: function(response) {
    this._unread = response.unread;

    return response.notifications;
  }
});