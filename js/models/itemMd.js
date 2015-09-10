var Backbone = require('backbone'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = Backbone.Model.extend({
  defaults: {
    displayPrice: 0, //set locally, not by server
    venderBTCPrice: 0, //set locally, not by server
    userCurrencyCode: "", //set locally, not by server
    itemBuyable: true, //set locally, not by server
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
    var vendorPrice = Number(this.get("vendor_offer").listing.item.price_per_unit.fiat.price);
    if(vendorPrice && this.get("userCurrencyCode")) {
      var vendorCCode = (this.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code).toUpperCase();
      var vendorBitCoinRatio = 0;
      var vendorBitCoinPrice = 0;
      if (vendorCCode !== "BTC") {
        getBTPrice(vendorCCode, function(btAve){
          vendorBitCoinRatio = btAve;
          vendorBitCoinPrice = Number((vendorPrice / btAve).toFixed(4));
          var vendToUserBTCRatio = window.currentBitcoin/vendorBitCoinRatio;
          var newAttributes = {};
          newAttributes.venderBTCPrice = vendorBitCoinPrice;
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {style: 'currency', minimumFractionDigits: 2, maximumFractionDigits: 2, currency: self.get("userCurrencyCode")}).format(vendorPrice * vendToUserBTCRatio);
          newAttributes.itemBuyable = true;
          self.set(newAttributes);
        });
      }else{
        vendorBitCoinRatio = 1;
        vendorBitCoinPrice = vendorPrice;
      }



    }else{
      this.set({displayPrice: "Price Unavailable", itemBuyable: false});
    }
  }
});