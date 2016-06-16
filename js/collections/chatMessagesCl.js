'use strict';

var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    ChatMessageMd = require('../models/chatMessageMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfigs.getActive().getServerBaseUrl() + '/get_chat_messages';
  },

  model: ChatMessageMd,

  comparator: function(msg) {
    return msg.get('timestamp');
  }
});