var Backbone = require('backbone'),
    currentBitcoinModel = require('./currentBitcoinMd');

module.exports = Backbone.Model.extend({
  defaults: {
    displayPrice: 0, //set locally, not by server
    venderBTCPrice: 0, //set locally, not by server
    userCurrencyCode: "", //set locally, not by server
    "vendor_offer": {
      "signature": "",
          "listing": {
        "shipping": {
          "shipping_regions": [
            "UNITED_STATES"
          ],
              "est_delivery": {
            "international": "N/A",
                "domestic": "3-5 Business Days"
          },
          "shipping_origin": "UNITED_STATES",
              "free": true
        },
        "item": {
          "category": "",
              "sku": "",
              "description": "",
              "price_per_unit": {
            "fiat": {
              "price": 0,
              "currency_code": "usd"
            }
          },
          "title": "",
              "process_time": "",
              "image_hashes": [],
              "nsfw": false,
              "keywords": [],
              "condition": "New"
        },
        "moderators": [
          {
            "pubkeys": {
              "encryption": {
                "key": "",
                "signature": ""
              },
              "signing": {
                "key": "",
                "signature": ""
              },
              "bitcoin": {
                "key": "",
                "signature": ""
              }
            },
            "guid": "",
            "blockchain_id": ""
          }
        ],
            "policy": {
          "terms_conditions": "None",
              "returns": ""
        },
        "id": {
          "pubkeys": {
            "guid": "",
                "bitcoin": ""
          },
          "guid": "",
              "blockchain_id": ""
        },
        "metadata": {
          "category": "",
              "version": "",
              "category_sub": "",
              "expiry": ""
        }
      }
    }
  },

  initialize: function(){
    this.updateAttributes();
    this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    var self = this;
    if(this.get("vendor_offer.listing.item.price_per_unit.fiat.price") && this.get("userCurrencyCode"))
    {
      var vendorCCode = this.get('vendor_offer.listing.item.price_per_unit.fiat.currency_code');
      var currentVendorBitcoin = new currentBitcoinModel();
      currentVendorBitcoin.url = "https://api.bitcoinaverage.com/ticker/global/"+vendorCCode;
      currentVendorBitcoin.fetch({
        success: function(){
          var vendBTC = currentVendorBitcoin.get('24h_avg');
          var vendToUserBTCRatio = vendBTC/window.currentBitcoin;
          var newAttributes = {};
          newAttributes.venderBTCPrice = (this.get("price") * vendBTC).toFixed(4);
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {style: 'currency', currency: this.get("userCurrencyCode")}).format(venderBTCPrice * vendToUserBTCRatio);
          this.set(newAttributes);
        },
        error: function(){
          console.log("itemMd call to bitcoinaverage failed");
          alert("Error: Bitcoin Prices are Not Currently Available")
        }
      });
    }else{
      alert("Error: Currency Not Available");
    }
  }
});