'use strict';

module.exports = window.Backbone.Model.extend({
  defaults: {
    unread: 0,
    avatar_hash: "",
    guid: ""
  },

  idAttribute: 'guid'
});