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
      loadTemplate('./js/templates/ratingStars.html', function(starsTemplate) {
        self.$el.html(
          loadedTemplate(
            __.extend({}, self.model.toJSON(), { starsTmpl: starsTemplate })
            // self.model.toJSON()
          )
        );
      });
    });

    return this;
  }
});