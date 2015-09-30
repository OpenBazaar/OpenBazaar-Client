var Backbone = require('backbone'),
    backboneLinear = require('backbone.linear'),
    getBTPrice = require('../utils/getBitcoinPrice');

//note: Backbone.Linear looks for Backbone in the window. It's placed there by index.html
module.exports = window.Backbone.LinearModel.extend({
  flatOptions : {delimiter: "__"},
  defaults: {
    displayPrice: 0, //set by userPage View
    vendorBTCPrice: 0, //set by userPage View
    userCurrencyCode: "", //set by userPage View. This is for editing the product
    userCountry: "", //set by userPage View. This is a country code. This is used for editing.
    ownPage: false, //set by userPage View
    itemHash: "", //set by userPage View
    combinedImagesArray: [], //tracks uploaded and old images
    imageHashesToUpload: [],
    priceSet: false, //set in Update Attribute below, so view can listen for it

    vendor_offer__signature: "",
    vendor_offer__listing__shipping__shipping_regions: [],
    vendor_offer__listing__shipping__est_delivery__international: "",
    vendor_offer__listing__shipping__est_delivery__domestic: "",
    vendor_offer__listing__shipping__shipping_origin: "",
    vendor_offer__listing__shipping__free: true,
    vendor_offer__listing__item__category: "",
    vendor_offer__listing__item__sku: "",
    vendor_offer__listing__item__description: "",

    vendor_offer__listing__item__price_per_unit__fiat__price: 0,
    vendor_offer__listing__item__price_per_unit__fiat__currency_code: "",
    vendor_offer__listing__item__title: "New Item",
    vendor_offer__listing__item__process_time: "",
    vendor_offer__listing__item__image_hashes: [],
    vendor_offer__listing__item__nsfw: false,
    vendor_offer__listing__item__keywords: [],
    vendor_offer__listing__item__condition: "",
    vendor_offer__listing__moderators: [],
    vendor_offer__listing__policy__terms_conditions: "",
    vendor_offer__listing__policy__returns: "",
    vendor_offer__listing__metadata__category: "",
    vendor_offer__listing__metadata__version: "",
    vendor_offer__listing__metadata__category_sub: "",
    vendor_offer__listing__metadata__expiry: "",
  },

    /* //this is what the data looks like when it arrives from the API
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
  },*/
/*
  parse: function(response){
    response.vendor_offer = response.vendor_offer || {};
    response.vendor_offer.listing = response.vendor_offer.listing || {};
    //make sure item exists
    response.vendor_offer.listing.item = response.vendor_offer.listing.item || {
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
        };
    //make sure shipping exists
    response.vendor_offer.listing.shipping = response.vendor_offer.listing.shipping || {
          "flat_fee": {
            "fiat": {
              "price": {
                "international": "0",
                "domestic": "0"
              },
              "currency_code": "usd"
            }
          },
          "shipping_regions": [
            ""
          ],
          "est_delivery": {
            "international": "",
            "domestic": ""
          },
          "shipping_origin": "",
          "free": false
        };
    return response;
  },
*/
  initialize: function(){
    //this.updateAttributes();
    this.on('change:vendor_offer__listing__item__price_per_unit__fiat__price', this.updateAttributes, this);
  },

  updateAttributes: function(){
    var self = this;
    var vendorPrice = this.get("vendor_offer__listing__item__price_per_unit__fiat__price") ? Number(this.get("vendor_offer__listing__item__price_per_unit__fiat__price")) : 0;
    if(vendorPrice && this.get("userCurrencyCode")){
      var vendorCCode = (this.get('vendor_offer__listing__item__price_per_unit__fiat__currency_code')).toUpperCase();
      var vendorBitCoinRatio = 0;
      var vendorBitCoinPrice = 0;
      if (vendorCCode !== "BTC"){
        getBTPrice(vendorCCode, function (btAve) {
          vendorBitCoinRatio = btAve;
          vendorBitCoinPrice = Number((vendorPrice / btAve).toFixed(4));
          var vendToUserBTCRatio = window.currentBitcoin/vendorBitCoinRatio;
          var newAttributes = {};
          newAttributes.vendorBTCPrice = vendorBitCoinPrice;
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: self.get("userCurrencyCode")
          }).format(vendorPrice*vendToUserBTCRatio);
          newAttributes.priceSet = true;
          self.set(newAttributes);
        });
      }else{
        var newAttributes = {};
        newAttributes.vendorBTCPrice = vendorBitCoinPrice;
        newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: self.get("userCurrencyCode")
        }).format(vendorPrice*window.currentBitcoin);
        newAttributes.priceSet = true;
        self.set(newAttributes);
      }
    }else {
      var newAttributes = {};
      newAttributes.vendorBTCPrice = 0;
      newAttributes.displayPrice = 0;
      newAttributes.priceSet = true;
      self.set(newAttributes);
    }
  }
});