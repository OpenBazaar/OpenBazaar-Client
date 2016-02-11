var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    baseVw = require('./baseVw'),
    ReviewView = require('./reviewVw');

module.exports = baseVw.extend({

  className: "flexCol-12 flex-border js-tabTarg js-blocked hide",

  events: {
  },

  initialize: function(options) {
    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    // this.reviewViews = [];
  },

  render: function(){
    var self = this,
        $container = $('<div/>');

    if (this.reviewViews) {
      this.reviewViews.forEach(function(view) {
        view.remove();
      });
    }

    this.reviewViews = [];

    this.collection.each(function(review) {
      var reviewView;

      reviewView = new ReviewView().render();
      $container.append(reviewView.el);
      self.reviewViews.push(reviewView);
      self.registerChild(reviewView);
    });

    this.$el.html($container);

    return this;
  }
});