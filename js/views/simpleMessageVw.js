var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');


module.exports = baseVw.extend({

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
    loadTemplate('./js/templates/simpleMessage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model));
    });
    return this;
  }
});