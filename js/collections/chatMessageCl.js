var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    chatConversationMd = require('../models/chatConversationMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_chat_conversations';
  },

  model: chatConversationMd,

  initialize: function(options) {
  }
});