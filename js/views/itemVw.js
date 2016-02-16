var __ = require('underscore'),
  Backbone = require('backbone'),
  $ = require('jquery'),
  colorbox = require('jquery-colorbox'),
  loadTemplate = require('../utils/loadTemplate'),
  sanitizeHTML = require('sanitize-html'),
  RatingCl = require('../collections/ratingCl'),
  baseVw = require('./baseVw'),
  buyWizardVw = require('./buyWizardVw'),
  ReviewsVw = require('./reviewsVw');

module.exports = baseVw.extend({

  events: {
    'click .js-descriptionTab': 'descriptionClick',
    'click .js-reviewsTab': 'reviewsClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-buyButton': 'buyClick',
    'click .js-photoGallery': 'photoGalleryClick'
  },

  initialize: function(options){
    var self = this;

    this.options = options || {};
    /* expected options are:
    userModel: this is set by main.js, then by a call to the settings API.
     */
    //don't render immediately, wait for the model to update itself with converted prices
    this.listenTo(this.model, 'change:priceSet', this.onPriceSet);
    this.subViews = [];
    this.subModels = [];
    this.ratingCl = new RatingCl();

    this.listenTo(this.ratingCl, 'reset', function() {
      this.reviewsVw && this.reviewsVw.render();
      this.render();
    });
  },

  onPriceSet: function() {
    this.ratingCl.fetch({
      data: {
        contract_id: this.model.id
      },
      reset: true
    });

    this.render();
  },

  getAverageRating: function() {
    var ratingsSum = 0,
        avgRating;

    this.ratingCl.each(function(ratingMd) {
      ratingsSum += ratingMd.get('feedback');
    });

    avgRating = (ratingsSum / this.ratingCl.length).toFixed(2);
    avgRating = avgRating.endsWith('.00') ? avgRating.slice(0, avgRating.length - 3) : avgRating;
    // round to the nearest quarter
    avgRating = Math.round(avgRating * 4) / 4;

    return avgRating;
  },

  render: function(){
    console.log('im a rendering maniac');

    var self = this;
    __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(imageHash, i){
      "use strict";
      var imageExtension = self.model.get('imageExtension') || "";
    });
    //el must be passed in from the parent view
    loadTemplate('./js/templates/item.html', function(loadedTemplate) {
      loadTemplate('./js/templates/ratingStars.html', function(starsTemplate) {
        self.$el.html(
          loadedTemplate(
            __.extend({}, self.model.toJSON(), {
              totalReviews: self.ratingCl.length,
              avgRating: self.getAverageRating(),
              starsTemplate: starsTemplate
            })
          )
        );

        var description = sanitizeHTML(self.model.get('vendor_offer').listing.item.displayDescription, {
          allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u','ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote' ]
        });

        self.$('.js-listingDescription').html(description);

        if (!self.reviewsVw) {
          self.reviewsVw = new ReviewsVw({ collection: self.ratingCl });
          self.registerChild(self.reviewsVw);
          self.$('.js-reviews').html(self.reviewsVw.render().el);
        } else {
          self.$('.js-reviews').html(self.reviewsVw.el);
        }

        self.$itemRating = self.$('.js-itemRating');
      });
    });

    return this;
  },

  photoGalleryClick: function(e){
    $('.js-photoGallery').colorbox({
      'transition': 'fade',
      'rel': 'js-photoGallery', 
      'photo': true,
      'fadeOut': 0,
      'previous': '<span class="arrowIcon ion-ios-arrow-back"></span>',
      'next': '<span class="arrowIcon ion-ios-arrow-forward"></span>',
      'current': '{current} ' + window.polyglot.t('of') + ' {total}',
      'close': window.polyglot.t('Close'),
      'maxHeight': '620px',
      'opacity': '.95',
      'speed': 50,
      onOpen:function(){
        // we need to append colorbox to obContainer to prevent it from covering the header
        $("#colorbox").appendTo("#obContainer");
        $("#cboxOverlay").appendTo("#obContainer");
        $('#content').addClass('blur');
      },
      onClosed:function(){
        $('#content').removeClass('blur');
      }
    });
  },

  descriptionClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-description'));
  },

  reviewsClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-reviews'));
  },

  shippingClick: function(e){
    this.render();
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-shipping'));
    // this.onPriceSet();
  },

  tabClick: function(activeTab, showContent){
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  buyClick: function(){
    "use strict";
    var self = this,
        buyModel = new Backbone.Model();
    buyModel.set(this.model.attributes);
    this.buyWizardView = new buyWizardVw({model:buyModel, parentEl: '#modalHolder', userModel: this.options.userModel});
    this.subViews.push(this.buyWizardView);
    this.subModels.push(buyModel);
    $('#obContainer').addClass('overflowHidden').addClass('blur');  
  },

  remove: function() {
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');

    baseVw.prototype.remove.apply(this, arguments);
  }
});