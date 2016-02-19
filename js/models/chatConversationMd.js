var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  idAttribute: 'guid',

  defaults: {
    unread: 0,
    avatar_hash: "",
    guid: "",
    isBlocked: false
  }
});