var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    NotificationMd = require('../models/notificationsMd');


module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_notifications';
  },
  
  model: NotificationMd,

  comparator: function(notif) {
    return -notif.get('timestamp');
  },

  initialize: function(options) {
  },

  getUnreadCount: function() {
    // var unreadNotifs = this.where({ read: false }).length;
    var unreadFromSocket = this.filter((notif) => {
      return notif.socketUnread;
    }).length;

    console.log('unreadFromSocket: ' + unreadFromSocket);

    // since we are adding in models based off of socket notifications,
    // the unread count returned from the fetch API may get stale,
    // so we need to also factor in the count of unread models create via
    // the socket.
    return (unreadFromSocket + this._unread) || 0;
  },

  parse: function(response) {
    this._unread = response.unread;

    return response.notifications;
  }
});