var Backbone = require('backbone'),
    chat = require('../models/chatMd');


module.exports = Backbone.Collection.extend({

  model: chat,

  initialize: function(options) {
  }

});