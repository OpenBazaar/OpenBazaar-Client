var Backbone = require('backbone'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "NewItem",
    contract_hash: "Error, Item ID Not Found",
    thumbnail_hash: "",
    category: "",
    price: 0,
    displayPrice: 0, //set locally, not by server
    venderBTCPrice: 0, //set locally, not by server
    userCurrencyCode: "", //set locally, not by server
    currency_code: "",
    nsfw: false,
    origin: "",
    ships_to: "",
    GUID: "",
    handle: 0,
    avatar_hash: ""
  },

  initialize: function(){
    this.updateAttributes();
    this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    var self = this;
    if(this.get("userCurrencyCode")) {
      var vendorCCode = (this.get('currency_code')).toUpperCase();
      var vendorBitCoinRatio = 0;
      var vendorBitCoinPrice = 0;
      if (vendorCCode !== "BTC") {
        getBTPrice(vendorCCode, function(btAve){
          vendorBitCoinRatio = btAve;
          vendorBitCoinPrice = Number((self.get("price") / btAve).toFixed(4));
          var vendToUserBTCRatio = window.currentBitcoin/vendorBitCoinRatio;
          var newAttributes = {};
          newAttributes.venderBTCPrice = vendorBitCoinPrice;
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {style: 'currency', currency: self.get("userCurrencyCode")}).format(self.get("price") * vendToUserBTCRatio);
          self.set(newAttributes);
        });
      }else{
        vendorBitCoinRatio = 1;
        vendorBitCoinPrice = Number((self.get("price")));
      }
    }else{
      this.set({displayPrice: "Price Unavailable"});
    }
  }
});
