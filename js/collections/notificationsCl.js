var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    NotificationMd = require('../models/notificationsMd');


module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_notifications';
  },
  
  model: NotificationMd,

  initialize: function(options) {
  }
});