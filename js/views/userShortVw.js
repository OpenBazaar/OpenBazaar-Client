/* shows a single store in a list */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow",

  events: {
    'click .js-storeListFollow': 'followUser'
  },

  initialize: function(){
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/userShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  followUser: function(e){
    console.log("follow user button clicked");
  }

});