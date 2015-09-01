var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');


module.exports = Backbone.View.extend({

  classname: "alertView",

  initialize: function(options){
    /*expected options:
      options.title: title for no users found
      options.message: message for no users found
    */
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