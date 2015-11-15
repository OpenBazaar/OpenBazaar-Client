var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'change .js-buyWizardQuantity': 'changeQuantity'
  },

  initialize: function() {
    "use strict";
    var currentShippingPrice = 0;
    if(this.model.get('userCountry') != this.model.get('vendor_offer').listing.shipping.shipping_origin &&
       this.model.get('vendor_offer').listing.shipping.free !== true) {
      currentShippingPrice = this.model.get('internationalShipping');
    } else if(this.model.get('vendor_offer').listing.shipping.free !== true) {
      currentShippingPrice = this.model.get('domesticShipping');
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
    });
    return this;
  },

  changeQuantity: function(e){
    "use strict";
    var self = this,
        userCurrency = this.model.get('userCurrencyCode'),
        quantity = $(e.target).val(),
        newDisplayPrice = new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(this.model.get('price') * quantity),
        newDisplayShippingPrice = new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(this.model.get('currentShippingPrice') * quantity);

    this.$el.find('.js-buyWizardPrice').html(newDisplayPrice);
    this.$el.find('.js-buyWizardShippingPrice').html(newDisplayShippingPrice);
    this.model.set('quantity', quantity);
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