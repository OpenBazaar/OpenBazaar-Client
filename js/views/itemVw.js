var __ = require('underscore'),
  Backbone = require('backbone'),
  $ = require('jquery'),
  colorbox = require('jquery-colorbox'),
  loadTemplate = require('../utils/loadTemplate'),
  localize = require('../utils/localize'),
  sanitizeHTML = require('sanitize-html'),
  RatingCl = require('../collections/ratingCl'),
  CountriesMd = require('../models/countriesMd'),
  baseVw = require('./baseVw'),
  buyWizardVw = require('./buyWizardVw'),
  ReviewsVw = require('./reviewsVw');

module.exports = baseVw.extend({

  events: {
    'click .js-descriptionTab': 'descriptionClick',
    'click .js-reviewsTab': 'reviewsClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-buyButton': 'buyClick',
    'click .js-photoGallery': 'photoGalleryClick',
    'click .js-itemRating': 'clickItemRating'
  },

  initialize: function(options){
    var self = this;

    this.options = options || {};
    /* expected options are:
    userModel: this is set by main.js, then by a call to the settings API.
     */
    //don't render immediately, wait for the model to update itself with converted prices
    this.userModel = options.userModel;
    this.listenTo(this.model, 'change:priceSet', this.onPriceSet);
    this.activeTab = 'description';
    this.ratingCl = new RatingCl();

    this.listenTo(this.ratingCl, 'reset', function() {
      this.fetchingRatings = false;
      this.render();
      this.reviewsVw && this.reviewsVw.render();
    });

    this.listenTo(this.ratingCl, 'request', function() {
      this.fetchingRatings = true;
    });
  },

  onPriceSet: function() {
    var itemOwnerGuid = this.model.get('page').profile.guid,
        loggedInUserGuid = this.model.get('user'). guid,
        data = {
          contract_id: this.model.id
        };

    if (itemOwnerGuid !== loggedInUserGuid) {
      data['guid'] = itemOwnerGuid;
    }

    this.ratingCl.fetch({
      data: data,
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
    var self = this;
    __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(imageHash, i){
      "use strict";
      var imageExtension = self.model.get('imageExtension') || "";
    });
    
    //el must be passed in from the parent view
    loadTemplate('./js/templates/item.html', function(loadedTemplate) {
      loadTemplate('./js/templates/ratingStars.html', function(starsTemplate) {
        var shippingRegions = self.model.get('vendor_offer').listing.shipping.shipping_regions,
            shippingOrigin = self.model.get('vendor_offer').listing.shipping.shipping_origin;

        self.$el.html(
          loadedTemplate(
            __.extend({}, self.model.toJSON(), {
              totalReviews: self.ratingCl.length,
              avgRating: self.getAverageRating(),
              starsTemplate: starsTemplate,
              activeTab: self.activeTab,
              fetchingRatings: self.fetchingRatings,
              userCountry: polyglot.t(`countries.${self.userModel.get('country')}.name`),
              shippingRegionsDisplay: localize.localizeShippingRegions(shippingRegions),
              worldwide: shippingRegions.length === 1 && shippingRegions[0] === 'ALL',
              displayShippingOrigin: shippingOrigin && polyglot.t(`countries.${shippingOrigin}.name`),
              shippingOrigin: polyglot.t(`countries.${shippingOrigin}.name`)
            })
          )
        );

        if (!self.reviewsVw) {
          self.reviewsVw = new ReviewsVw({ collection: self.ratingCl });
          self.registerChild(self.reviewsVw);
          self.$('.js-reviewsContainer ').html(self.reviewsVw.render().el);
        } else {
          self.$('.js-reviewsContainer ').html(self.reviewsVw.el);
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
    this.setTab('description');
  },

  reviewsClick: function(e){
    this.setTab('reviews');
  },

  shippingClick: function(e){
    this.setTab('shipping');
  },

  setTab: function(activeTab) {
    if (activeTab) {
      this.$('.js-tab').removeClass('active');
      this.$(`.js-${activeTab}Tab`).addClass('active');
      this.$('.js-tabTarg').addClass('hide');
      this.$(`.js-${activeTab}`).removeClass('hide');
      this.activeTab = activeTab;
    }
  },

  buyClick: function(){
    "use strict";
    var self = this;
    this.buyWizardView && this.buyWizardView.remove();
    this.buyWizardView = new buyWizardVw({model:this.model, userModel: this.options.userModel});
    this.registerChild(this.buyWizardView);
    $('#modalHolder').html(this.buyWizardView.el).fadeIn(300); //add to DOM first, or accordion will have zero width when initialized
    this.buyWizardView.render();
    $('#obContainer').addClass('blur');
  },

  clickItemRating: function(e) {
    this.setTab('reviews');
    $('#obContainer').animate({
      scrollTop: this.$('.js-reviewsContainer').offset().top
    }, 200);
  },

  remove: function() {
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');

    baseVw.prototype.remove.apply(this, arguments);
  }
});