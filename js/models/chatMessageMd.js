'use strict';

var autolinker = require( '../utils/customLinker');

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
  },

  parse: function(response){
    //change any plain text urls in the about field into links
    response.message = autolinker(response.message);

    return response;
  }
});