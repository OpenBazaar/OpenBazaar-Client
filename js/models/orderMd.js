var __ = require('underscore'),
    Backbone = require('backbone'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    countriesMd = require('./countriesMd');

module.exports = window.Backbone.Model.extend({
    defaults: {
        buyer_order: {
            order: {
                id: {
                    blockchain_id: "",
                    guid: "",
                    pubkeys: {
                        bitcoin: "",
                        encryption: "",
                        guid: ""
                    }
                }
            },
            payment: {
                address: "",
                amount: 0,
                chaincode: ""
            },
            quantity: 0,
            ref_hash: "",
            refund_address: "",
            signatures: {
                bitcoin: "",
                guid: ""
            }
        },
        displayCountry: "", // set by parse
        displayModerator: "", //set by parse
        displayUnitPrice: "", //set by parse
        displayTotalPrice: "", //set by parse
        displayShippingPrice: "", //set by parse
        serverUrl: "", //set by view
        vendor_offer: {
            listing: {
                id: {
                    blockchain_id: "",
                    guid: "",
                    pubkeys: {
                        bitcoin: "",
                        encryption: "",
                        guid: ""
                    }
                },
                item: {
                    description: "",
                    image_hashes: [],
                    keywords: [],
                    nsfw: false,
                    price_per_unit: {
                        fiat: {
                             price: 0,
                             currency_code: "usd" //country code here
                         }
                    },
                    process_time: "",
                    title: ""
                },
                metadata: {
                    category: "",
                    category_sub: "",
                    expiry: "",
                    version: "0.1"
                },
                moderators: [],
                signatures: {
                    bitcoin: "",
                    guid: ""
                }
            }
        }
    },

    parse: function(response) {
        "use strict";
        var self = this;
        //when vendor currency code is in bitcoins, the json returned is different. Put the value in the expected place so the templates don't break.
        //check to make sure a blank result wasn't returned from the server
        if(response.vendor_offer) {
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
            //add pretty country names to shipping regions
            response.vendor_offer.listing.shipping.shipping_regionsDisplay = [];
            __.each(response.vendor_offer.listing.shipping.shipping_regions, function (region, i) {
                var matchedCountry = self.countryArray.filter(function (value) {
                    return value.dataName == region;
                });
                response.vendor_offer.listing.shipping.shipping_regionsDisplay.push(matchedCountry[0].name);

            });

            //add pretty country name for the country being shipped to
            if (response.buyer_order.order.shipping) {
                response.displayCountry = self.countryArray(function (value) {
                    return value.dataName == response.buyer_order.order.shipping.country;
                });
            } else {
                response.displayCountry = "";
            }

            //add moderator
            if(response.buyer_order.order.moderator){
                response.displayModerator = response.vendor_offer.listing.moderators.filter(function(moderator) {
                    return moderator.guid == response.buyer_order.order.moderator;
                });
            } else {
                response.displayModerator = "";
            }

            response.serverUrl = this.serverUrl;
        }

        return response;
    },

    initialize: function(options){
        console.log(options);
        this.userCurrencyCode = options.cCode;
        this.userBTCAve = options.btAve;
        this.serverUrl = options.serverUrl;
        //this.on('change', this.updateAttributes, this);
        this.countries = new countriesMd();
        this.countryArray = this.countries.get('countries');
    },

    updateAttributes: function(){
        var self = this,
            userCCode = this.userCurrencyCode,
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

        if(this.get('vendor_offer').listing.shipping) {
            vendorDomesticShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.domestic;
            vendorInternationalShipping = this.get('vendor_offer').listing.shipping.flat_fee.fiat.price.international;
        }

        if(userCCode) {
            getBTPrice(vendorCCode, function(btAve){
                vendorCurrencyInBitcoin = btAve;
                vendorPriceInBitCoin = Number(vendorPrice / btAve);
                vendorDomesticShippingInBitCoin = Number(vendorDomesticShipping / btAve);
                vendorInternationalShippingInBitCoin = Number(vendorInternationalShipping / btAve);
                //if vendor and user currency codes are the same, multiply by one to avoid rounding errors
                vendToUserBTCRatio = (userCCode == vendorCCode) ? 1 : window.currentBitcoin/vendorCurrencyInBitcoin;
                newAttributes.vendorBTCPrice = vendorPriceInBitCoin;
                newAttributes.domesticShippingBTC = vendorDomesticShippingInBitCoin;
                newAttributes.internationalShippingBTC = vendorInternationalShippingInBitCoin;

                if(userCCode != 'BTC'){
                    newAttributes.price = (vendorPrice*vendToUserBTCRatio).toFixed(2);
                    newAttributes.displayPrice = new Intl.NumberFormat(window.lang, {
                        style: 'currency',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        currency: userCCode
                    }).format(newAttributes.price);
                    newAttributes.domesticShipping = (vendorDomesticShipping*vendToUserBTCRatio).toFixed(2);
                    newAttributes.displayDomesticShipping = new Intl.NumberFormat(window.lang, {
                        style: 'currency',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        currency: userCCode
                    }).format(newAttributes.domesticShipping);
                    newAttributes.internationalShipping = (vendorInternationalShipping*vendToUserBTCRatio).toFixed(2);
                    newAttributes.displayInternationalShipping = new Intl.NumberFormat(window.lang, {
                        style: 'currency',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        currency: userCCode
                    }).format(newAttributes.internationalShipping);
                } else {
                    newAttributes.price = vendorPriceInBitCoin;
                    newAttributes.displayPrice = vendorPriceInBitCoin.toFixed(4) + " BTC";
                    newAttributes.domesticShipping = vendorDomesticShippingInBitCoin;
                    newAttributes.displayDomesticShipping = vendorDomesticShippingInBitCoin.toFixed(4) + " BTC";
                    newAttributes.internationalShipping = vendorInternationalShippingInBitCoin;
                    newAttributes.displayInternationalShipping = vendorInternationalShippingInBitCoin.toFixed(4) + " BTC";
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