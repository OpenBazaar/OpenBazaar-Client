var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');


module.exports = Backbone.View.extend({

  classname: "alertView",

  initialize: function(options){
    //expects options.message to be passed
    this.model = {title: options.title, message: options.message};
    this.render();
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/simpleMessage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model));
    });
    return this;
  }
});