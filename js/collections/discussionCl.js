var Backbone = require('backbone'),
    chatMessage = require('../models/chatMd');


module.exports = Backbone.Collection.extend({

  model: chatMessage,

  initialize: function(options) {
  }

});