var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  idAttribute: 'public_key',

  defaults: {
    unread: 0,
    avatar_hash: "",
    guid: ""
  }
});