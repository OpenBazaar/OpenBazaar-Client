var __ = require('underscore'),
    Backbone = require('backbone'),
    Polyglot = require('node-polyglot'),
    languagesModel = require('../models/languagesMd'),
    countriesMd = require('./countriesMd'),
    saveToAPI = require('../utils/saveToAPI');

module.exports = Backbone.Model.extend({

  initialize: function(){
    this.countries = new countriesMd();
    this.countryArray = this.countries.get('countries');
    this.languages = new languagesModel();
  },

  defaults: {
    guid: "", //set by app.js
    //name: "Your Name",
    //handle: "Blockchain ID",
    //currency: "US Dollar", //set by user action, not by server

    refund_address: "", //buyer’s refund address (string)
    currency_code: "BTC", //may either be “btc” or a currency from this list. (formatted string)
    country: "UNITED_STATES", //the location of the user. must be a formatted string from this list. (formatted string)

    language: "en-US", //user�s prefered language (string)
    time_zone: "", //the user�s time zone (string)
    notifications: true, //display notifications (�True� or �False�)
    shipping_addresses: [], //array of addresses
    blocked: [], //a list of guids to block (LIST of 40 character hex strings)
    blocked_guids: [], // the same as blocked. The API returns blocked_guids, but expects blocked.
    libbitcoin_server: "", //the server address (url string)
    ssl: true, //use ssl on the openbazaar server (�True� or �False�)
    serverUrl: "http://localhost:18469/api/v1/", //set from localStorage

    //value below for testing. Real value should be dynamically set
    //serverUrl: "http://seed.openbazaar.org:18469/api/v1/",
    terms_conditions: "No terms or conditions", //default terms/conditions (string)
    refund_policy: "No refund policy", //default refund policy (string)

    //bitcoinValidationRegex: "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$"
    //remove this when in production, this is for testNet addresses
    bitcoinValidationRegex: "^[2mn][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    moderators: [],
    moderator_guids: [] //list of moderator guids, created in the parse function
  },

  parse: function(response) {
    "use strict";

    //make sure currency code is in all caps
    response.currency_code = response.currency_code ? response.currency_code.toUpperCase() : "BTC";

    //find the human readable name for the country
    var matchedCountry = this.countryArray.filter(function(value){
      return value.dataName == response.country;
    });
    response.displayCountry = matchedCountry[0] ? matchedCountry[0].name : "";

    //addresses come from the server as a string. Parse the string
    if(response.shipping_addresses && response.shipping_addresses.constructor === Array && response.shipping_addresses.length > 0){
      try{
        var tempAddresses = [];
        __.each(response.shipping_addresses, function (address) {
          if (address){
            address = JSON.parse(address);
            if (address.name && address.street && address.city && address.state && address.postal_code && address.country && address.displayCountry){
              tempAddresses.push(address);
            }
          }
        });
        response.shipping_addresses = tempAddresses;
      } catch(e) {
        //server may set a malformed shipping_address value
        console.log("Error in shipping_addresses:");
        console.log(e);
        response.shipping_addresses = [];
      }

    } else {
      response.shipping_addresses = [];
    }

    //set the client language to match the language in the response
    response.language = response.language || "en-US";

    response.moderators = response.moderators || [];

    response.moderator_guids = response.moderators.map(function(moderatorObject){
      var modGuid = moderatorObject.guid;
      return modGuid;
    });

    response.blocked_guids = response.blocked_guids || [];

    // If blocked_guids has no legitmate guids, it returns an array with an empty string.
    // Let's remedy that.
    if (response.blocked_guids.length && response.blocked_guids[0] === "") {
      response.blocked_guids = [];
    }

    return response;
  },

  toJSON: function() {
    var attributes = __.clone(this.attributes);

    attributes.blocked = attributes.blocked_guids || [];

    return attributes;
  },

  _blockUnblockUser: function(block, guid) {
    var self = this,
        blockedGuids,
        index,
        request;

    blockedGuids = this.get('blocked_guids').slice(0) || [];
    index = blockedGuids.indexOf(guid);


    //take no action if this is user's own guid
    if(guid == this.get('guid')){
      return;
    }

    if (block && index === -1) {
      blockedGuids.push(guid);
    } else if (index !== -1) {
      blockedGuids.splice(index, 1);
    }

    this.set('blocked_guids', blockedGuids);

    request = saveToAPI(null, this.toJSON(), this.get('serverUrl') + 'settings', null, '', { blocked: blockedGuids })
        .done(function(data) {
          var blocked,
              i;

          if (data.success) {
            window.obEventBus.trigger(block ? 'blockedUser' : 'unblockedUser', { 'guid': guid });
          } else {
            // on fail, let's revert the optomistic model updates
            blocked = self.get('blocked_guids') || [];
            i = blocked.indexOf(guid);

            if (block && blocked.length && i !== -1) {
              // a block attempt failed
              blocked.splice(index, 1);
            } else if (i === -1) {
              // an unblock attempt failed
              blocked.push(guid);
            }

            self.set('blocked_guids', blocked);
          }
        }).fail(function() {
          throw new Error('There was an error blocking user ' + guid);
        });

    window.obEventBus.trigger(block ? 'blockingUser' : 'unblockingUser', { guid: guid, request: request });

    return request;
  },

  blockUser: function(guid) {
    if (!guid) {
      throw new Error('Please provide a guid.');
    }

    return this._blockUnblockUser.call(this, true, guid);
  },

  unblockUser: function(guid) {
    if (!guid) {
      throw new Error('Please provide a guid.');
    }

    return this._blockUnblockUser.call(this, false, guid);
  },

  isBlocked: function(guid) {
    if (guid) {
      return this.get('blocked_guids').indexOf(guid) !== -1;
    }
  }
});
