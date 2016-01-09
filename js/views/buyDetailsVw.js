var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    numberSpinners = require('../utils/numberSpinners'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'change .js-buyWizardQuantity': 'changeQuantity'
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
        moderatorPercentage = this.model.get('selectedModerator') ? (this.model.get('selectedModerator').fee).replace("%", "") : 0,
        moderatorPrice = moderatorPercentage ? totalItemPrice / moderatorPercentage : 0,
        moderatorTotal = moderatorPrice * quantity,
        totalPrice = totalItemPrice + totalShipping,
        newDisplayPrice = (userCurrency == "BTC") ? totalItemPrice.toFixed(6) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalItemPrice),
        newDisplayShippingPrice = (userCurrency == "BTC") ? totalShipping.toFixed(6) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalShipping),
        newDisplayModeratorPrice = (userCurrency == "BTC") ? moderatorTotal.toFixed(6) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(moderatorTotal),
        totalBTCDisplayPrice = (this.model.get('vendorBTCPrice') + this.model.get('currentShippingBTCPrice')) * quantity,
        moderatorPriceBTC = moderatorPercentage ? totalBTCDisplayPrice / moderatorPercentage : 0;

    this.$el.find('.js-buyWizardPrice').html(newDisplayPrice);
    this.$el.find('.js-buyWizardShippingPrice').html(newDisplayShippingPrice);
    this.$el.find('.js-buyWizardModeratorPrice').html(newDisplayModeratorPrice);
    this.$el.find('.js-buyWizardModeratorBTCPrice').html(moderatorPriceBTC.toFixed(4));
    newAttributes.quantity = quantity;
    newAttributes.totalPrice = totalPrice;
    newAttributes.totalBTCDisplayPrice = totalBTCDisplayPrice;
    this.model.set(newAttributes);
  },

  lockForm: function(){
    "use strict";
    this.$el.find('.js-buyWizardQuantity').prop('disabled', true);
    this.$el.find('#buyWizardQuantity .numberSpinnerUp, #buyWizardQuantity .numberSpinnerDown').addClass('hide');
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }

});