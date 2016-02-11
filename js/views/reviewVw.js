var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  className: "flexRow borderBottom",

  events: {
  },

  initialize: function(options){
    if (!options.model) {
      throw new Error('Please provide a model.');
    }
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/review.html', function(loadedTemplate) {
      self.$el.html(
        loadedTemplate(self.model.toJSON())
      );
    });

    return this;
  }
});