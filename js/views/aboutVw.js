var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    aboutModel = require('../models/aboutMd'), 
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "aboutView",

  initialize: function(){
    this.model = new aboutModel();
    this.render();
    console.log("About view created.");
  },

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/about.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  close: function(){
    this.remove();
  }

});