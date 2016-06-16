'use strict';

var __ = require('underscore'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    app = require('../App').getApp(),
    countriesMd = require('./countriesMd'),
    autolinker = require( '../utils/customLinker');

module.exports = window.Backbone.Model.extend({
  defaults: {
    price: 0, //set below
    displayPrice: 0, //set below
    vendorBTCPrice: 0, //set below
    domesticShipping: 0, //set below
    displayDomesticShipping: 0, //set below
    domesticShippingBTC: 0, //set below
    internationalShipping: 0, //set below
    displayInternationalShipping: 0, //set below
    internationalShippingBTC: 0, //set below
    quantity: 1, //set in order process
    totalPrice: 0, //set in order process
    userCurrencyCode: "", //set by userPage View. This is for editing the product
    userCountry: "", //set by userPage View. This is a country code. This is used for editing.
    ownPage: false, //set by userPage View
    itemHash: "", //set by userPage View
    combinedImagesArray: [], //tracks uploaded and old images
    imageHashesToUpload: [],
    priceSet: 0, //set in Update Attribute below, so view can listen for it

    //the object below is just a reference for a typical response from the server.
    //Backbone will only set vendor_offer {} with no contents, because it doesn't recognize
    //nested values as being new data.
    "vendor_offer": {
      "signature": "",
      "listing": {
        "shipping": {
          "shipping_regions": [],
          "est_delivery": {
            "international": "",
            "domestic": ""
          },
          "shipping_origin": "",
          "flat_fee": {
            "fiat": {
              "price": {
                "international": 0,
                "domestic": 0
              }
            }
          },
          "free": false
        },
        "item": {
          "category": "",
          "sku": "",
          "description": "",
          "price_per_unit": {
            "fiat": {
              "price": 0,
              "currency_code": ""
            }
          },
          "title": "",
          "process_time": "",
          "image_hashes": [],
          "nsfw": false,
          "keywords": [],
          "condition": ""
        },
        "moderators": [
          {
            "fee": 0,
            "name": "",
            "avatar": "",
            "short_description": "",
            "pubkeys": {
              "guid": "",
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
          "terms_conditions": "",
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

  parse: function(response) {
    //when vendor currency code is in bitcoins, the json returned is different. Put the value in the expected place so the templates don't break.
    //check to make sure a blank result wasn't returned from the server
    if (response.vendor_offer){
      if (response.vendor_offer.listing.item.price_per_unit.bitcoin){
        response.vendor_offer.listing.item.price_per_unit.fiat = {
          "price": response.vendor_offer.listing.item.price_per_unit.bitcoin,
          "currency_code": "BTC"
        };
      }
      //if the shipping section is not returned it breaks the edit template. Restore it here
      if (!response.vendor_offer.listing.shipping){
        response.vendor_offer.listing.shipping = {
          "shipping_regions": [],
          "est_delivery": {
            "international": "",
            "domestic": ""
          },
          "shipping_origin": "",
          "flat_fee": {
            "fiat": {
              "price": {
                "international": "",
                "domestic": ""
              }
            }
          },
          "free": true
        };
      }
      //if the shipping flat_fee  section is not returned it breaks the edit template. Restore it here
      if (!response.vendor_offer.listing.shipping.flat_fee){
        response.vendor_offer.listing.shipping.flat_fee = {
          "fiat": {
            "price": {
              "international": "",
              "domestic": ""
            }
          }
        };
      }
      if (!response.vendor_offer.listing.shipping.free == true && response.vendor_offer.listing.shipping.flat_fee){
        if (response.vendor_offer.listing.shipping.flat_fee.bitcoin){
          response.vendor_offer.listing.shipping.flat_fee.fiat = {
            price: {
              "international": response.vendor_offer.listing.shipping.flat_fee.bitcoin.international,
              "domestic": response.vendor_offer.listing.shipping.flat_fee.bitcoin.domestic
            },
            "currency_code": "BTC"
          };
        }
      }
      //make sure policy exists
      if (!response.vendor_offer.listing.policy){
        response.vendor_offer.listing.policy = {
          "terms_conditions": "",
          "returns": ""
        };
      }
      //make sure image hashes are valid
      response.vendor_offer.listing.item.image_hashes = response.vendor_offer.listing.item.image_hashes.filter(function(hash){
        return hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && hash.length === 40;
      });

      //unescape any html
      response.vendor_offer.listing.item.description = __.unescape(response.vendor_offer.listing.item.description);

      //change any plain text urls in the description into links
      response.vendor_offer.listing.item.displayDescription = autolinker(response.vendor_offer.listing.item.description);

    }

    return response;
  },

  initialize: function(){
    //listen for fetched. This is set by the view after fetch is successful, to prevent multiple fires of changed.
    this.on('change:fetched', this.updateAttributes, this);
    this.countries = new countriesMd();
    this.countryArray = this.countries.get('countries');
  },

  updateAttributes: function(callback){
    var self = this,
        userCCode = this.get("userCurrencyCode"),
        vendorCCode = this.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
        vendorPrice = this.get('vendor_offer').listing.item.price_per_unit.fiat.price,
        vendorDomesticShipping = 0,
        vendorInternationalShipping = 0,
        vendorCurrencyInBitcoin = 0,
        vendorPriceInBitCoin = 0,
        vendorDomesticShippingInBitCoin = 0,
        vendorInternationalShippingInBitCoin = 0,
        vendToUserBTCRatio = 0,
        newAttributes = {};

    if (this.get('vendor_offer').listing.shipping) {
      vendorDomesticShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.domestic;
      vendorInternationalShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.international;
    }

    if (userCCode) {
      getBTPrice(vendorCCode, function(btAve){
        vendorCurrencyInBitcoin = btAve;
        vendorPriceInBitCoin = Number(vendorPrice / btAve);
        vendorDomesticShippingInBitCoin = Number(vendorDomesticShipping / btAve);
        vendorInternationalShippingInBitCoin = Number(vendorInternationalShipping / btAve);
        //if vendor and user currency codes are the same, multiply by one to avoid rounding errors
        vendToUserBTCRatio = userCCode == vendorCCode ? 1 : window.currentBitcoin/vendorCurrencyInBitcoin;
        newAttributes.vendorBTCPrice = vendorPriceInBitCoin;
        newAttributes.domesticShippingBTC = vendorDomesticShippingInBitCoin;
        newAttributes.internationalShippingBTC = vendorInternationalShippingInBitCoin;

        if (userCCode != 'BTC'){
          newAttributes.price = vendorPrice*vendToUserBTCRatio;
          newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: userCCode
          }).format(newAttributes.price);
          newAttributes.domesticShipping = vendorDomesticShipping*vendToUserBTCRatio;
          newAttributes.displayDomesticShipping = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: userCCode
          }).format(newAttributes.domesticShipping);
          newAttributes.internationalShipping = vendorInternationalShipping*vendToUserBTCRatio;
          newAttributes.displayInternationalShipping = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: userCCode
          }).format(newAttributes.internationalShipping);
        } else {
          newAttributes.price = vendorPriceInBitCoin;
          newAttributes.displayPrice = app.intlNumFormat(vendorPriceInBitCoin, 4) + " BTC";
          newAttributes.domesticShipping = vendorDomesticShippingInBitCoin;
          newAttributes.displayDomesticShipping = app.intlNumFormat(vendorDomesticShippingInBitCoin, 4) + " BTC";
          newAttributes.internationalShipping = vendorInternationalShippingInBitCoin;
          newAttributes.displayInternationalShipping = app.intlNumFormat(vendorInternationalShippingInBitCoin, 4) + " BTC";
        }
        //set to random so a change event is always fired
        newAttributes.priceSet = Math.random();
        self.set(newAttributes);
        typeof callback == 'function' && callback();
      });
    } else {
      this.set({displayPrice: "Price Unavailable"});
    }
  }
});