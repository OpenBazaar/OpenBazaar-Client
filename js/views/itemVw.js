'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    localize = require('../utils/localize'),
    colorbox = require('jquery-colorbox'), // eslint-disable-line
    RatingCl = require('../collections/ratingCl'),
    baseVw = require('./baseVw'),
    buyWizardVw = require('./buyWizardVw'),
    ReviewsVw = require('./reviewsVw');

module.exports = baseVw.extend({

  events: {
    'click .js-descriptionTab': 'descriptionClick',
    'click .js-itemReviewsTab': 'reviewsClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-buyButton': 'buyClick',
    'click .js-photoGallery': 'photoGalleryClick',
    'click .js-itemRating': 'clickItemRating'
  },

  initialize: function(options){
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

    this.shippingRegions = this.model.get('vendor_offer').listing.shipping.shipping_regions;
    this.shippingOrigin = this.model.get('vendor_offer').listing.shipping.shipping_origin;
    this.shipsLocal = this.shippingRegions.indexOf(this.shippingOrigin) > -1;
    this.nonLocalRegions = __.without(this.shippingRegions, this.shippingOrigin);
    this.worldwide = this.shippingRegions.length === 1 && this.shippingRegions[0] === 'ALL';

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
    /*
    __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(){
      var imageExtension = self.model.get('imageExtension') || "";
    });
    */

    //el must be passed in from the parent view
    loadTemplate('./js/templates/item.html', function(loadedTemplate) {
      loadTemplate('./js/templates/ratingStars.html', function(starsTemplate) {

        self.$el.html(
          loadedTemplate(
            __.extend({}, self.model.toJSON(), {
              totalReviews: self.ratingCl.length,
              avgRating: self.getAverageRating(),
              starsTemplate: starsTemplate,
              activeTab: self.activeTab,
              fetchingRatings: self.fetchingRatings,
              userCountry: window.polyglot.t(`countries.${self.userModel.get('country')}`),
              shippingRegionsDisplay: localize.localizeShippingRegions(self.shippingRegions),
              worldwide: self.worldwide,
              shipsLocal: self.shipsLocal,
              nonLocalRegions: self.nonLocalRegions,
              displayShippingOrigin: self.shippingOrigin && window.polyglot.t(`countries.${self.shippingOrigin}`)
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

  photoGalleryClick: function(){
    $('.js-photoGallery').colorbox({
      'transition': 'fade',
      'rel': 'js-photoGallery',
      'photo': true,
      'fadeOut': 0,
      'previous': '<span class="arrowIcon ion-ios-arrow-back"></span>',
      'next': '<span class="arrowIcon ion-ios-arrow-forward"></span>',
      'current':  window.polyglot.t('pageXofY', {currentPage: '{current}', totalPages: '{total}'}),
      'close': window.polyglot.t('Close'),
      'maxHeight': '620px',
      'opacity': '.95',
      'speed': 50,
      onOpen: function(){
        // we need to append colorbox to obContainer to prevent it from covering the header
        $("#colorbox").appendTo("#obContainer");
        $("#cboxOverlay").appendTo("#obContainer");
        $('#obContainer').addClass('modalOpen').scrollTop(0);
      },
      onClosed: function(){
        $('#obContainer').removeClass('modalOpen');
      }
    });
  },

  descriptionClick: function(){
    this.setTab('description');
  },

  reviewsClick: function(){
    this.setTab('itemReviews');
  },

  shippingClick: function(){
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
    this.buyWizardView && this.buyWizardView.remove();
    this.buyWizardView = new buyWizardVw({model: this.model, userModel: this.options.userModel, worldwide: this.worldwide, shippingRegions: this.shippingRegions});
    this.registerChild(this.buyWizardView);
    this.buyWizardView.on('close', () => this.buyWizardView.remove())
      .render()
      .open();
  },

  clickItemRating: function() {
    this.setTab('itemReviews');
    $('#obContainer').animate({
      scrollTop: this.$('.js-reviewsContainer').offset().top
    }, 200);
  },

  remove: function() {
    $('#obContainer').removeClass('modalOpen');

    baseVw.prototype.remove.apply(this, arguments);
  }
});
