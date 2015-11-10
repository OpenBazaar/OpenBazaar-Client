var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
    handle: "", 
    title: "", 
    orderID: "", 
    timestamp: "", 
    imageHash: "", 
    guid: "", 
    type: "", 
    id: ""
  },

  parse: function(response) {
    "use strict";
    //when vendor currency code is in bitcoins, the json returned is different. Put the value in the expected place so the templates don't break.
    //check to make sure a blank result wasn't returned from the server
    if(response.vendor_offer){
      if(response.vendor_offer.listing.item.price_per_unit.bitcoin){
        response.vendor_offer.listing.item.price_per_unit.fiat = {
          "price": response.vendor_offer.listing.item.price_per_unit.bitcoin,
          "currency_code": "BTC"
        };
      }
      //if the shipping section is not returned it breaks the edit template. Restore it here
      if(!response.vendor_offer.listing.shipping){
        response.vendor_offer.listing.shipping = {
          "shipping_regions": [
            "UNITED_STATES"
          ],
              "est_delivery": {
            "international": "",
                "domestic": ""
          },
          "shipping_origin": "UNITED_STATES",
            "flat_fee": {
              "fiat": {
                "price": {
                  "international": "",
                  "domestic": ""
                }
              }
            },
            "free": true
          }
        }
      //if the shipping flat_fee  section is not returned it breaks the edit template. Restore it here
      if(!response.vendor_offer.listing.shipping.flat_fee){
        response.vendor_offer.listing.shipping.flat_fee = {
          "fiat": {
            "price": {
              "international": "",
              "domestic": ""
            }
          }
        }
      }
      if(!response.vendor_offer.listing.shipping.free == true && response.vendor_offer.listing.shipping.flat_fee){
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
      if(!response.vendor_offer.listing.policy){
        response.vendor_offer.listing.policy = {
          "terms_conditions": "",
          "returns": ""
        };
      }
      //make sure image hashes are valid
      response.vendor_offer.listing.item.image_hashes = response.vendor_offer.listing.item.image_hashes.filter(function(hash){
        return hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && hash.length === 40;
      });
    }

    return response;
  },

  initialize: function(){
    //listen for fetched. This is set by the view after fetch is successful, to prevent multiple fires of changed.
    this.on('change:fetched', this.updateAttributes, this);
  },

  updateAttributes: function(){
    //console.log('updating attrs');
    //
    //var self = this,
    //    userCCode = this.get("userCurrencyCode"),
    //    vendorCCode = this.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
    //    vendorPrice = this.get('vendor_offer').listing.item.price_per_unit.fiat.price,
    //    vendorDomesticShipping = 0,
    //    vendorInternationalShipping = 0,
    //    vendorCurrencyToBitcoinRatio = 0,
    //    vendorPriceInBitCoin = 0,
    //    vendorDomesticShippingInBitCoin = 0,
    //    vendorInternationalShippingInBitCoin = 0,
    //    vendToUserBTCRatio = 0,
    //    newAttributes = {};
    //
    //if(this.get('vendor_offer').listing.shipping) {
    //  vendorDomesticShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.domestic;
    //  vendorInternationalShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.international;
    //}
    //
    //if(userCCode) {
    //  getBTPrice(vendorCCode, function(btAve){
    //    vendorCurrencyToBitcoinRatio = btAve;
    //    vendorPriceInBitCoin = Number((vendorPrice / btAve).toFixed(4));
    //    vendorDomesticShippingInBitCoin = Number((vendorDomesticShipping / btAve.toFixed(4)));
    //    vendorInternationalShippingInBitCoin = Number((vendorInternationalShipping / btAve.toFixed(4)));
    //    vendToUserBTCRatio = window.currentBitcoin/vendorCurrencyToBitcoinRatio;
    //    newAttributes.vendorBTCPrice = vendorPriceInBitCoin;
    //
    //    if(userCCode != 'BTC'){
    //      newAttributes.price = (vendorPrice*vendToUserBTCRatio).toFixed(2);
    //      newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
    //        style: 'currency',
    //        minimumFractionDigits: 2,
    //        maximumFractionDigits: 2,
    //        currency: userCCode
    //      }).format(newAttributes.price);
    //      newAttributes.domesticShipping = (vendorDomesticShipping*vendToUserBTCRatio).toFixed(2);
    //      newAttributes.displayDomesticShipping = new Intl.NumberFormat(window.lang, {
    //        style: 'currency',
    //        minimumFractionDigits: 2,
    //        maximumFractionDigits: 2,
    //        currency: userCCode
    //      }).format(newAttributes.domesticShipping);
    //      newAttributes.internationalShipping = (vendorInternationalShipping*vendToUserBTCRatio).toFixed(2);
    //      newAttributes.displayInternationalShipping = new Intl.NumberFormat(window.lang, {
    //        style: 'currency',
    //        minimumFractionDigits: 2,
    //        maximumFractionDigits: 2,
    //        currency: userCCode
    //      }).format(newAttributes.internationalShipping);
    //    } else {
    //      newAttributes.price = vendorPriceInBitCoin;
    //      newAttributes.displayPrice = vendorPriceInBitCoin + "btc";
    //      newAttributes.domesticShipping = vendorDomesticShippingInBitCoin;
    //      newAttributes.displayDomesticShipping = vendorDomesticShippingInBitCoin + "btc";
    //      newAttributes.internationalShipping = vendorInternationalShippingInBitCoin;
    //      newAttributes.displayInternationalShipping = vendorInternationalShippingInBitCoin + "btc";
    //    }
    //    //set to random so a change event is always fired
    //    newAttributes.priceSet = Math.random();
    //    self.set(newAttributes);
    //  });
    //}else{
    //  this.set({displayPrice: "Price Unavailable"});
    //}
  }
});