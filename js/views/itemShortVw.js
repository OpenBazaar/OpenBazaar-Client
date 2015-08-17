/* shows a single item in a list */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  tagname: "div",

  className: "flexCol-4",

  events: {
    'click .btn': 'btnClick'
  },

  initialize: function(){
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  btnClick: function(e){
    console.log("nav button clicked");
  }

});