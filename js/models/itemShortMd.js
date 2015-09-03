var Backbone = require('backbone'),
    currentBitcoinModel = require('./currentBitcoinMd');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "NewItem",
    contract_hash: "Error, Item ID Not Found",
    thumbnail_hash: "",
    category: "",
    price: 0,
    displayPrice: 0, //set locally, not by server
    btcPrice: 0, //set locally, not by server
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
    var vendorCCode = this.get('currency_code');
    var currentVendorBitcoin = new currentBitcoinModel();
    currentVendorBitcoin.url = "https://api.bitcoinaverage.com/ticker/global/"+vendorCCode;
    currentVendorBitcoin.fetch({
      success: function(){
        var vendBTC = currentVendorBitcoin.get('24h_avg');
        var newAttributes = {};
        newAttributes.btcPrice = (this.get("price") / vendBTC).toFixed(4);
        newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {style: 'currency', currency: this.get("userCurrencyCode")}).format(this.get("price"));
        this.set(newAttributes);
      },
      error: function(){
        console.log("itemShortMd call to bitcoinaverage failed");
        alert("Error: Bitcoin Prices are Not Currently Available")
      }
    });
  }
});