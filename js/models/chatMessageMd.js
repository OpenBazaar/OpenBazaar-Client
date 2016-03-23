var __ = require('underscore'),
    Backbone = require('backbone'),
    autolinker = require( 'autolinker' );

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
    console.log(response)
    //change any plain text urls in the about field into links
    response.message = autolinker.link(response.message, {'twitter': false, 'hashtag': false});

    return response;
  }
});