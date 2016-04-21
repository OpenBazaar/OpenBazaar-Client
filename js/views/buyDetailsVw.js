var __ = require('underscore'),
    Backbone = require('backbone'),
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
    "use strict";
    var currentShippingPrice = 0,
        currentShippingBTCPrice = 0,
        recipient = this.model.get('page').profile.handle || this.model.get('page').profile.guid;
    if(this.model.get('vendor_offer').listing.shipping.free !== true) {
      if(this.model.get('userCountry') != this.model.get('vendor_offer').listing.shipping.shipping_origin) {
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

    this.model.set('recipient', recipient);

    this.listenTo(this.model, 'change:selectedModerator change:selectedAddress', this.render);
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/buyDetails.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //this does not add it to the DOM, that is done by the parent view
      self.setQuantity(1);
      numberSpinners(self.$el);
    });
    return this;
  },

  changeQuantity: function(e) {
    "use strict";
    this.setQuantity($(e.target).val());
  },

  setQuantity: function(quantity){
    "use strict";
    var self = this,
        newAttributes = {},
        userCurrency = this.model.get('userCurrencyCode'),
        totalItemPrice = this.model.get('price') * quantity,
        totalShipping = this.model.get('currentShippingPrice') * quantity,
        moderatorPercentage = this.model.get('selectedModerator') ? (this.model.get('selectedModerator').fee).replace("%", "") * 0.01 : 0,
        moderatorPrice = moderatorPercentage ? totalItemPrice * moderatorPercentage : 0,
        moderatorTotal = moderatorPrice * quantity,
        totalPrice = totalItemPrice + totalShipping,
        newBTCDisplayPrice = app.intlNumFormat((this.model.get('vendorBTCPrice') * quantity), 8),
        newBTCShippingDisplayPrice = app.intlNumFormat((this.model.get('currentShippingBTCPrice') * quantity), 8),
        newDisplayPrice = (userCurrency == "BTC") ? app.intlNumFormat(totalItemPrice, 8) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalItemPrice),
        newDisplayShippingPrice = (userCurrency == "BTC") ? app.intlNumFormat(totalShipping, 8) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalShipping),
        newDisplayModeratorPrice = (userCurrency == "BTC") ? app.intlNumFormat(moderatorTotal, 8) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(moderatorTotal),
        totalBTCDisplayPrice = (this.model.get('vendorBTCPrice') + this.model.get('currentShippingBTCPrice')) * quantity,
        moderatorPriceBTC = moderatorPercentage ? totalBTCDisplayPrice * moderatorPercentage : 0,
        moderatorPriceString = this.model.get('userCurrencyCode') == 'BTC' ?
        app.intlNumFormat(moderatorPriceBTC, 8) + " BTC" : app.intlNumFormat(moderatorPriceBTC, 8) + " BTC (" + newDisplayModeratorPrice + ")";

    this.$('.js-buyWizardBTCPrice').html(newBTCDisplayPrice+"BTC");
    this.$('.js-buyWizardBTCShippingPrice').html(newBTCShippingDisplayPrice+"BTC");

    if(userCurrency != 'BTC'){
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
    "use strict";
    this.$('.js-buyWizardQuantity').prop('disabled', true);
    this.$('#buyWizardQuantity .numberSpinnerUp, #buyWizardQuantity .numberSpinnerDown').addClass('hide');
  },

  goToPurchases: function(){
    window.obEventBus.trigger('closeBuyWizard');
    Backbone.history.navigate('#transactions/purchases', {trigger:true});
  }

});