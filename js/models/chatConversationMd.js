var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
    unread: 0,
    avatar_hash: "",
    guid: ""
  },

  idAttribute: 'guid'
});