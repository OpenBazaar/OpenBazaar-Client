var __ = require('underscore'),
    Backbone = require('backbone'),
    countriesMd = require('./countriesMd');

module.exports = Backbone.Model.extend({

  initialize: function(){
    this.countries = new countriesMd();
    this.countryArray = this.countries.get('countries');
  },

  defaults: {
    beenSet: true, //set this back to false when done testing
    guid: "", //set by app.js
    //name: "Your Name",
    //handle: "Blockchain ID",
    //currency: "US Dollar", //set by user action, not by server

    refund_address: "", //buyer’s refund address (string)
    currency_code: "BTC", //may either be “btc” or a currency from this list. (formatted string)
    country: "UNITED_STATES", //the location of the user. must be a formatted string from this list. (formatted string)
    language: "en", //user’s prefered language (string)
    time_zone: "", //the user’s time zone (string)
    notifications: true, //display notifications (“True” or “False”)
    shipping_addresses: [], //array of addresses
    blocked: [], //a list of guids to block (LIST of 40 character hex strings)
    libbitcoin_server: "", //the server address (url string)
    ssl: true, //use ssl on the openbazaar server (“True” or “False”)
    serverUrl: "http://localhost:18469/api/v1/", //set from localStorage
    //value below for testing. Real value should be dynamically set
    //serverUrl: "http://seed.openbazaar.org:18469/api/v1/",
    terms_conditions: "No terms or conditions", //default terms/conditions (string)
    refund_policy: "No refund policy" //default refund policy (string)
  },

  parse: function(response) {
    "use strict";
    var tempShippingArray;
    //find the human readable name for the country
    var matchedCountry = this.countryArray.filter(function(value, i){
      return value.dataName == response.country;
    });
    response.displayCountry = matchedCountry[0].name;
    //addresses come from the server as a string. Parse the string, then parse each string inside it.
    response.shipping_addresses = JSON.parse(response.shipping_addresses[0]);
    __.each(response.shipping_addresses, function(address, i, list){
      list[i] = JSON.parse(address);
    });

    return response;
  }
});
