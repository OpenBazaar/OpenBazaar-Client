'use strict';

var Backbone = require('backbone'),
    $ = require('jquery'),
    numberSpinners = require('../utils/numberSpinners'),
    app = require('../App').getApp(),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'change .js-buyWizardQuantity': 'changeQuantity',
    'click .js-goToPurchases': 'goToPurchases'
  },

  initialize: function() {
    var recipient = this.model.get('page').profile.handle || this.model.get('page').profile.guid;

    this.model.set('recipient', recipient);

    this.listenTo(this.model, 'change:selectedModerator change:selectedAddress', this.render);
    this.render();
  },

  render: function(){
    var self = this,
        currentShippingPrice = 0,
        currentShippingBTCPrice = 0;

    //set prices before each render
    if (this.model.get('vendor_offer').listing.shipping.free !== true && this.model.get('selectedAddress')) {
      if (this.model.get('selectedAddress').country != this.model.get('vendor_offer').listing.shipping.shipping_origin) {
        currentShippingPrice = this.model.get('internationalShipping');
        currentShippingBTCPrice = this.model.get('internationalShippingBTC');
        this.model.set('shippingType', 'international');
      } else {
        currentShippingPrice = this.model.get('domesticShipping');
        currentShippingBTCPrice = this.model.get('domesticShippingBTC');
        this.model.set('shippingType', 'domestic');
      }
    }

    this.model.set('currentShippingPrice', currentShippingPrice);
    this.model.set('currentShippingBTCPrice', currentShippingBTCPrice);

    this.model.set('currentShippingDisplayPrice', new Intl.NumberFormat(window.lang, {
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: this.model.get('userCurrencyCode')
    }).format(currentShippingPrice));

    loadTemplate('./js/templates/buyDetails.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //this does not add it to the DOM, that is done by the parent view
      self.setQuantity(1);
      numberSpinners(self.$el);
    });
    return this;
  },

  changeQuantity: function(e) {
    this.setQuantity($(e.target).val());
  },

  setQuantity: function(quantity){
    var newAttributes = {},
        userCurrency = this.model.get('userCurrencyCode'),
        totalItemPrice = this.model.get('price') * quantity,
        totalShipping = this.model.get('currentShippingPrice') * quantity,
        moderatorPercentage = this.model.get('selectedModerator') ? this.model.get('selectedModerator').fee.replace("%", "") * 0.01 : 0,
        moderatorPrice = moderatorPercentage ? totalItemPrice * moderatorPercentage : 0,
        moderatorTotal = moderatorPrice * quantity,
        totalPrice = totalItemPrice + totalShipping,
        newBTCDisplayPrice = app.intlNumFormat(this.model.get('vendorBTCPrice') * quantity, 8),
        newBTCShippingDisplayPrice = app.intlNumFormat(this.model.get('currentShippingBTCPrice') * quantity, 8),
        newDisplayPrice = userCurrency == "BTC" ? app.formatBitcoin(totalItemPrice) : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalItemPrice),
        newDisplayShippingPrice = userCurrency == "BTC" ? app.formatBitcoin(totalShipping) : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalShipping),
        newDisplayModeratorPrice = userCurrency == "BTC" ? app.formatBitcoin(moderatorTotal) : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(moderatorTotal),
        totalBTCDisplayPrice = (this.model.get('vendorBTCPrice') + this.model.get('currentShippingBTCPrice')) * quantity,
        moderatorPriceBTC = moderatorPercentage ? totalBTCDisplayPrice * moderatorPercentage : 0,
        moderatorPriceString = this.model.get('userCurrencyCode') == 'BTC' ?
        app.formatBitcoin(moderatorPriceBTC)  : app.formatBitcoin(moderatorPriceBTC) + " (" + newDisplayModeratorPrice + ")";

    this.$('.js-buyWizardBTCPrice').html(newBTCDisplayPrice+"BTC");
    this.$('.js-buyWizardBTCShippingPrice').html(newBTCShippingDisplayPrice+"BTC");

    if (userCurrency != 'BTC'){
      this.$('.js-buyWizardPrice').html("("+newDisplayPrice+")");
      this.$('.js-buyWizardShippingPrice').html("("+newDisplayShippingPrice+")");
    }
    this.$('.js-buyWizardModeratorPrice').attr('data-tooltip', moderatorPriceString);
    newAttributes.quantity = quantity;
    newAttributes.totalPrice = totalPrice;
    newAttributes.totalBTCDisplayPrice = totalBTCDisplayPrice;
    this.model.set(newAttributes);
  },

  lockForm: function(){
    this.$('.js-buyWizardQuantity').prop('disabled', true);
    this.$('#buyWizardQuantity').find('.numberSpinnerUp,.numberSpinnerDown').addClass('hide');
  },

  goToPurchases: function(){
    window.obEventBus.trigger('closeBuyWizard');
    Backbone.history.navigate('#transactions/purchases', {trigger: true});
  }

});
