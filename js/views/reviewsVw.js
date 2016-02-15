var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    baseVw = require('./baseVw'),
    ReviewView = require('./reviewVw');

module.exports = baseVw.extend({

  className: "flexCol-12 flex-border js-tabTarg js-reviews hide",

  events: {
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    console.log('moo: '+ this.collection.length);
    window.moo = this.collection;
    this.reviewViews = [];
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

      // review.set({
      //   delivery_time: Math.ceil(Math.random() * 5).toString(),
      //   feedback: Math.ceil(Math.random() * 5).toString(),
      //   quality: Math.ceil(Math.random() * 5).toString(),
      //   description: Math.ceil(Math.random() * 5).toString()
      // });

      reviewView = new ReviewView({ model: review }).render();
      $container.append(reviewView.el);
      self.reviewViews.push(reviewView);
      self.registerChild(reviewView);
    });

    this.$el.html($container);

    return this;
  }
});