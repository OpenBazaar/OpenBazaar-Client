var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
    outgoing: "",
    avatar_hash: "",
    guid: "",
    handle: "",
    read: false,
    timestamp: "",
    message: "",
    public_key: ""
  }
});