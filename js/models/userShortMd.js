'use strict';

var __ = require('underscore'),
    Backbone = require('backbone');

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
    response.short_description = __.unescape(response.short_description);
    return response;
  }
});
