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
    var currentShippingPrice = 0;
    if(this.model.get('vendor_offer').listing.shipping.free !== true) {
      if(this.model.get('userCountry') != this.model.get('vendor_offer').listing.shipping.shipping_origin) {
        currentShippingPrice = this.model.get('internationalShipping');
        this.model.set('shippingType', 'international');
      } else {
        currentShippingPrice = this.model.get('domesticShipping');
        this.model.set('shippingType', 'domestic');
      }
    }

    this.model.set('currentShippingPrice', currentShippingPrice);

    this.model.set('currentShippingDisplayPrice', new Intl.NumberFormat(window.lang, {
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: this.model.get('userCurrencyCode')
    }).format(currentShippingPrice));

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
        userCurrency = this.model.get('userCurrencyCode'),
        totalItemPrice = this.model.get('price') * quantity,
        totalShipping = this.model.get('currentShippingPrice') * quantity,
        totalPrice = totalItemPrice + totalShipping,
        moderatorPercentage = this.model.get('selectedModerator') ? (this.model.get('selectedModerator').fee).replace("%", "") : 0,
        moderatorPrice = moderatorPercentage ? totalItemPrice / moderatorPercentage : 0,
        moderatorTotal = moderatorPrice * quantity,
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
        }).format(moderatorTotal);

    this.$el.find('.js-buyWizardPrice').html(newDisplayPrice);
    this.$el.find('.js-buyWizardShippingPrice').html(newDisplayShippingPrice);
    this.$el.find('.js-buyWizardModeratorPrice').html(newDisplayModeratorPrice);
    this.$el.find('.js-buyWizardQuantityDisplay').text(quantity);
    this.model.set('quantity', quantity);
    this.model.set('totalPrice', totalPrice);
  },

  lockForm: function(){
    "use strict";
    this.$el.find('.js-buyWizardQuantity').addClass('hide');
    this.$el.find('.js-buyWizardQuantityDisplay').removeClass('hide');
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