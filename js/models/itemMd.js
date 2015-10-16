var Backbone = require('backbone'),
   // backboneLinear = require('backbone.linear'),
    getBTPrice = require('../utils/getBitcoinPrice');

//note: Backbone.Linear looks for Backbone in the window. It's placed there by index.html
module.exports = window.Backbone.Model.extend({
  defaults: {
    displayPrice: 0, //set by userPage View
    vendorBTCPrice: 0, //set by userPage View
    userCurrencyCode: "", //set by userPage View. This is for editing the product
    userCountry: "", //set by userPage View. This is a country code. This is used for editing.
    ownPage: false, //set by userPage View
    itemHash: "", //set by userPage View
    combinedImagesArray: [], //tracks uploaded and old images
    imageHashesToUpload: [],
    priceSet: 0, //set in Update Attribute below, so view can listen for it

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
          "category": "None",
          "sku": "0",
          "description": "None",
          "price_per_unit": {
            "fiat": {
              "price": 0,
              "currency_code": "usd"
            }
          },
          "title": "New Item",
          "process_time": "0",
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
          "returns": "None"
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
          "category": "None",
          "version": "",
          "category_sub": "",
          "expiry": ""
        }
      }
    }
  },

  parse: function(response) {
    "use strict";
    //when vendor currency code is in bitcoins, the json returned is different. Put the value in the expected place so the templates don't break.
    if(response.vendor_offer.listing.item.price_per_unit.bitcoin){
      response.vendor_offer.listing.item.price_per_unit.fiat = {
        "price": response.vendor_offer.listing.item.price_per_unit.bitcoin,
        "currency_code": "BTC"
      };
      response.vendor_offer.listing.shipping.flat_fee.fiat = {
        price: {
          "international": response.vendor_offer.listing.shipping.flat_fee.bitcoin.international,
          "domestic": response.vendor_offer.listing.shipping.flat_fee.bitcoin.domestic
        },
        "currency_code": "BTC"
      };

    }
    return response;
  },

  initialize: function(){
    //listen for fetched. This is set by the view after fetch is successful, to prevent multiple fires of changed.
    this.on('change:fetched', this.updateAttributes, this);
  },

  updateAttributes: function(){
    var self = this,
        userCCode = this.get("userCurrencyCode"),
        vendorCCode = this.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
        vendorPrice = this.get('vendor_offer').listing.item.price_per_unit.fiat.price,
        vendorCurrencyInBitcoin = 0,
        vendorBitCoinPrice = 0,
        vendToUserBTCRatio = 0,
        newAttributes = {};

    if(userCCode) {
      getBTPrice(vendorCCode, function(btAve){
        vendorBitCoinRatio = btAve;
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