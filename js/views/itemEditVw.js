var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    getBTPrice = require('../utils/getBitcoinPrice');


module.exports = Backbone.View.extend({

  events: {
    'click .js-priceBtn-local': 'priceToLocal',
    'click .js-priceBtn-btc': 'priceToBTC'
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
    });
    return this;
  },

  priceToLocal: function(){
    //getBTPrice(vendorCCode, function(btAve){});
    this.$el.find('.js-priceLocal').removeClass('hide');
    this.$el.find('.js-priceBtc').addClass('hide');
    this.$el.find('.js-priceBtn-local').removeClass('btn-med, btn-darkBorder').addClass('btn-dark');
    this.$el.find('.js-priceBtn-btc').addClass('btn-med, btn-darkBorder').removeClass('btn-dark');
    this.updatePrice('local');
  },

  priceToBTC: function(){
    this.$el.find('.js-priceLocal').addClass('hide');
    this.$el.find('.js-priceBtc').removeClass('hide');
    this.$el.find('.js-priceBtn-local').addClass('btn-med, btn-darkBorder').removeClass('btn-dark');
    this.$el.find('.js-priceBtn-btc').removeClass('btn-med, btn-darkBorder').addClass('btn-dark');
    this.updatePrice('btc');
  },

  updatePrice: function(priceType){
    if(priceType === "local"){
      this.$el.find('.js-priceLocal').val(this.$el.find('.js-priceBtc').val() * window.currentBitcoin);
    }else{
      this.$el.find('.js-priceBtc').val(this.$el.find('.js-priceLocal').val() / window.currentBitcoin);
    }
  }
});