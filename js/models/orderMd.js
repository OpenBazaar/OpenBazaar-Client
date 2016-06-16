'use strict';

var convertToUserCurrency = require('../utils/convertToUserCurrency'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = window.Backbone.Model.extend({

  parse: function(response) {
    //when vendor currency code is in bitcoins, the json returned is different. Put the value in the expected place so the templates don't break.
    //check to make sure a blank result wasn't returned from the server
    if (response.vendor_offer &&
        response.vendor_offer.listing &&
        response.vendor_offer.listing.item &&
        response.vendor_offer.listing.item.price_per_unit) {

      if (response.vendor_offer.listing.item.price_per_unit.bitcoin) {
        response.vendor_offer.listing.item.price_per_unit.fiat = {
          "price": response.vendor_offer.listing.item.price_per_unit.bitcoin,
          "currency_code": "BTC"
        };
      }
      //if the shipping section is not returned it breaks the template. Restore it here
      if (!response.vendor_offer.listing.shipping) {
        response.vendor_offer.listing.shipping = {
          "shipping_regions": [
            ""
          ],
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
      //if the shipping flat_fee  section is not returned it breaks the template. Restore it here
      if (!response.vendor_offer.listing.shipping.flat_fee) {
        response.vendor_offer.listing.shipping.flat_fee = {
          "fiat": {
            "price": {
              "international": "",
              "domestic": ""
            }
          }
        };
      }
      if (!response.vendor_offer.listing.shipping.free == true && response.vendor_offer.listing.shipping.flat_fee) {
        if (response.vendor_offer.listing.shipping.flat_fee.bitcoin) {
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
      if (!response.vendor_offer.listing.policy) {
        response.vendor_offer.listing.policy = {
          "terms_conditions": "",
          "returns": ""
        };
      }
      //make sure image hashes are valid
      response.vendor_offer.listing.item.image_hashes = response.vendor_offer.listing.item.image_hashes.filter(function (hash) {
        return hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && hash.length === 40;
      });
    } else {
      response.invalidData = true;
    }

    if (response.buyer_order && response.buyer_order.order) {
      //add moderator
      if (response.buyer_order.order.moderator) {
        var matchedModerator = response.vendor_offer.listing.moderators.filter(function (moderator) {
          return moderator.guid == response.buyer_order.order.moderator;
        });
        response.displayModerator = matchedModerator[0];
        response.displayModerator.feeDecimal = response.displayModerator.fee.replace("%", "") * 0.01;
      } else {
        response.displayModerator = "";
      }
    } else {
      response.invalidData = true;
    }
    
    if (response.dispute_resolution && response.dispute_resolution.resolution){
      //if a resolution exists, make sure both payouts have values
      response.dispute_resolution.resolution.buyer_payout = response.dispute_resolution.resolution.buyer_payout || 0;
      response.dispute_resolution.resolution.vendor_payout = response.dispute_resolution.resolution.vendor_payout || 0;
    }

    response.vendorAvatarURL = localStorage.getItem('userAvatar-'+response.vendor_offer.listing.id.guid);
    response.buyerAvatarURL = localStorage.getItem('userAvatar-'+response.buyer_order.order.id.guid);

    return response;
  },

  updateAttributes: function(){
    //convert the currency
    var self = this;
    if (!self.get('vendor_offer').listing.item.price_per_unit || !self.get('vendor_offer').listing.item.price_per_unit.fiat || !self.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code){
      this.set('invalidData', true);
      this.set('priceSet', Math.random());
      return;
    }
    getBTPrice(self.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code, function(btAve) {
      var newAttributes = {};

      var convertTotal = function () {
        if (self.userCurrencyCode != "BTC") {
          newAttributes.displayTotalPrice = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: self.userCurrencyCode
          }).format(self.get('buyer_order').order.payment.amount * window.currentBitcoin);
        }
        //set to random so a change event is always fired
        newAttributes.priceSet = Math.random();
        self.set(newAttributes);
      };

      var convertShipping = function (btAve) {
        if (self.get('buyer_order').order.shipping.country == self.get('vendor_offer').listing.shipping.shipping_origin) {
          newAttributes.shippingType = window.polyglot.t('DomesticShippingPrice');
          if (self.get('vendor_offer').listing.shipping.flat_fee.fiat.price.domestic) {
            convertToUserCurrency(self.get('vendor_offer').listing.shipping.flat_fee.fiat.price.domestic,
                btAve,
                self.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
                self.userCurrencyCode,
                function (price, priceBTC, invalid, error) {
                  newAttributes.displayShippingPrice = price;
                  newAttributes.displayShippingPriceBTC = priceBTC;
                  newAttributes.invalidData = invalid;
                  newAttributes.error = error;
                  convertTotal();
                });
          } else {
            convertTotal();
          }
        } else {
          newAttributes.shippingType = window.polyglot.t('InternationalShippingPrice');
          if (self.get('vendor_offer').listing.shipping.flat_fee.fiat.price.international) {
            convertToUserCurrency(self.get('vendor_offer').listing.shipping.flat_fee.fiat.price.international,
                btAve,
                self.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
                self.userCurrencyCode,
                function (price, priceBTC, invalid, error) {
                  newAttributes.displayShippingPrice = price;
                  newAttributes.displayShippingPriceBTC = priceBTC;
                  newAttributes.invalidData = invalid;
                  newAttributes.error = error;
                  convertTotal();
                });
          } else {
            convertTotal();
          }
        }
      };

      var convertUnit = function (btAve) {
        convertToUserCurrency(self.get('vendor_offer').listing.item.price_per_unit.fiat.price,
            btAve,
            self.get('vendor_offer').listing.item.price_per_unit.fiat.currency_code,
            self.userCurrencyCode,
            function (price, priceBTC, invalid, error) {
              newAttributes.displayUnitPrice = price;
              newAttributes.displayUnitPriceBTC = priceBTC;
              newAttributes.invalidData = invalid;
              newAttributes.error = error;
              if (self.get('buyer_order').order.shipping) {
                convertShipping(btAve);
              } else {
                convertTotal(btAve);
              }
            });
      };

      convertUnit(btAve);
    });
  },

  initialize: function(options){
    this.userCurrencyCode = options.cCode;
    this.userBTCAve = options.btAve;
  }

});