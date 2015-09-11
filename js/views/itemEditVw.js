var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    getBTPrice = require('../utils/getBitcoinPrice');


module.exports = Backbone.View.extend({

  events: {
    'click .js-priceBtn-local': 'priceToLocal',
    'click .js-priceBtn-btc': 'priceToBTC',
    'click #shippingFreeTrue': 'disableShipping',
    'click #shippingFreeFalse': 'enableShipping'
  },

  initialize: function(){
    this.render();
    this.listenTo('this.model:displayPrice', 'change', this.updatePrice);
    this.listenTo('this.model:venderBTCPrice', 'change', this.updatePrice);
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setFormValues();
    });
    return this;
  },

  setFormValues: function(){
    this.$el.find('#selectCondition').val(this.model.get('vendor_offer').listing.item.condition);
    this.$el.find('#selectNSFW').val(String(this.model.get('vendor_offer').listing.item.nsfw));
  },

  priceToLocal: function(e){
    var parentRow = $(e.target).closest('.js-inputParent');
    parentRow.find('.js-priceLocal').removeClass('hide');
    parentRow.find('.js-priceBtc').addClass('hide');
    $(e.target).removeClass('inactive');
    parentRow.find('.js-priceBtn-btc').addClass('inactive');
    this.updatePrice('local', parentRow);
  },

  priceToBTC: function(e){
    var parentRow = $(e.target).closest('.js-inputParent');
    parentRow.find('.js-priceLocal').addClass('hide');
    parentRow.find('.js-priceBtc').removeClass('hide');
    parentRow.find('.js-priceBtn-local').addClass('inactive');
    $(e.target).removeClass('inactive');
    this.updatePrice('btc', parentRow);
  },

  updatePrice: function(priceType, inputParent){
    if(priceType === "local"){
      inputParent.find('.js-priceLocal').val(inputParent.find('.js-priceBtc').val() * window.currentBitcoin);
    }else{
      inputParent.find('.js-priceBtc').val(inputParent.find('.js-priceLocal').val() / window.currentBitcoin);
    }
  },

  disableShipping: function(){
    this.$el.find('.js-shippingPriceRow').addClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc').prop('disabled', true);
  },

  enableShipping: function(){
    this.$el.find('.js-shippingPriceRow').removeClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc').prop('disabled', false);
  }
});