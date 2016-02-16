var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    RatingCl = require('../collections/ratingCl'),
    baseVw = require('./baseVw'),
    ReviewView = require('./reviewVw');

module.exports = baseVw.extend({

  className: "flexCol-12 flex-border js-tabTarg js-reviews hide",

  events: {
  },

  VIEWS_PER_BATCH: 25,
  VIEWS_PER_BATCH: 5,

  MAX_MAX_MAX: 1500,

  initialize: function(options) {
    var self = this;

    this.options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    this.$obContainer = $('#obContainer');
    this.throttledScroll = __.throttle(this.onScroll, 100).bind(this);
    this.$obContainer.on('scroll', this.throttledScroll);
  },

  onScroll: function() {
    if (this.paginatedCollection &&
        this.paginatedCollection.length < this.collection.length &&
        this.$el.is(':visible') &&
        // if we're within 200 pixels of the bottom of the scroll container
        (this.$obContainer[0].scrollTop >= (this.$obContainer[0].scrollHeight - this.$obContainer[0].offsetHeight) - 200)) {
      this.paginatedCollection.add(
        this.collection.models.slice(this.paginatedCollection.length, this.paginatedCollection.length + this.VIEWS_PER_BATCH)
      );
    }
  },

  createReviewViews: function(reviewModels) {
    var $container = $('<div/>');

    reviewModels.forEach((reviewMd) => {
      var reviewView;

      reviewView = new ReviewView({ model: reviewMd }).render();
      this.reviewViews.push(reviewView);
      $container.append(reviewView.el);
      this.reviewViews.push(reviewView);
      this.registerChild(reviewView);      
    });

    return $container;
  },

  render: function(){
    if (this.reviewViews) {
      this.reviewViews.forEach(function(view) {
        view.remove();
      });
    }

    this.reviewViews = [];

    for (var i=0;i<100;i++) {
      if (!this.collection.length) break;

      var mooModel = this.collection.at(0),
          pooModel;
      
      pooModel = mooModel.clone();
      pooModel.set('review', i + ' ' + pooModel.get('review'));
      this.collection.add(pooModel);
    }

    this.paginatedCollection = new RatingCl(this.collection.slice(0, this.VIEWS_PER_BATCH));
    this.listenTo(this.paginatedCollection, 'update', function(cl, options) {
      if (options.add) {
        this.$el.append(
          this.createReviewViews(
            this.collection.slice(
              this.paginatedCollection.length - this.VIEWS_PER_BATCH,
              this.paginatedCollection.length
            )
          )
        );
      }
    });    

    if (this.paginatedCollection.length) {
      this.$el.html(
        this.createReviewViews(this.paginatedCollection.models)
      );
    }

    return this;
  },

  remove: function() {
    this.$obContainer.off('scroll', this.throttledScroll);

    baseVw.prototype.remove.apply(this, arguments);
  }
});