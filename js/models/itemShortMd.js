var Backbone = require('backbone'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "New Item",
    contract_hash: "Error, Item ID Not Found",
    thumbnail_hash: "",
    category: "",
    price: 0,
    displayPrice: 0, //set locally, not by server
    vendorBTCPrice: 0, //set locally, not by server
    userCurrencyCode: "", //set locally, not by server
    currency_code: "",
    nsfw: false,
    origin: "",
    ships_to: "",
    GUID: "",
    handle: 0,
    avatar_hash: "",
    priceSet: 0, //set in Update Attribute below, so view can listen for it
  },

  initialize: function(){
    this.updateAttributes();
    //this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    var self = this,
        userCCode = this.get("userCurrencyCode"),
        vendorCCode = (this.get('currency_code')).toUpperCase(),
        vendorPrice = self.get("price"),
        vendorCurrencyInBitcoin = 0,
        vendorBitCoinPrice = 0,
        vendToUserBTCRatio = 0,
        newAttributes = {};

    if(userCCode) {
      getBTPrice(vendorCCode, function(btAve){
        vendorCurrencyInBitcoin = btAve;
        vendorBitCoinPrice = Number((vendorPrice / btAve).toFixed(4));
        vendToUserBTCRatio = window.currentBitcoin/vendorCurrencyInBitcoin;
        newAttributes.vendorBTCPrice = vendorBitCoinPrice;

        if(userCCode != 'BTC'){
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: userCCode
          }).format(vendorPrice*vendToUserBTCRatio);
        } else {
          newAttributes.displayPrice = vendorBitCoinPrice + "btc";
        }
        //set to random so a change event is always fired
        newAttributes.priceSet = Math.random();
        self.set(newAttributes);
      });
    }else{
      this.set({displayPrice: "Price Unavailable"});
    }
  }
});
