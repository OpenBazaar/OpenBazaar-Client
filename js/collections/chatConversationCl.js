var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    ChatConversationMd = require('../models/chatConversationMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_chat_conversations';
  },

  model: ChatConversationMd,

  initialize: function(options) {
  }
});