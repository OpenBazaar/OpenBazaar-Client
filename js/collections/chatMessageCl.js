var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    ChatMessageMd = require('../models/chatMessageMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_chat_messages';
  },

  model: ChatMessageMd,

  initialize: function(options) {
  }
});