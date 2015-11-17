var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
    handle: "",
    encryption_key: "",
    message: "",
    timestamp: "",
    avatar_hash: "",
    guid: "",
    outgoing: "",
    read: ""
  }
});