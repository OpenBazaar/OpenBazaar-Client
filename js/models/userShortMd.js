'use strict';

var Backbone = require('backbone'),
    sanitizeModel = require('../utils/sanitizeModel');

module.exports = Backbone.Model.extend({
  defaults: {
    name: "",
    guid: "",
    handle: 0,
    avatar_hash: "",
    nsfw: false,
    short_description: ""
  },

  parse: function(response){
    response.short_description = sanitizeModel(response.short_description);
    return response;
  }
});
