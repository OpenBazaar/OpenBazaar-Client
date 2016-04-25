var __ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../App').getApp();

module.exports = window.Backbone.Model.extend({
  defaults: {
    status: 0,
    contract_type: "",
    vendor: "",
    description: "",
    title: "",
    order_id: "",
    timestamp: 0,
    btc_total: 0,
    thumbnail_hash: "",
    btAve: "", //set by view
    cCode: "" //set by view
  },

  parse: function(response){
    "use strict";
    if(response.cCode != 'BTC'){
      response.displayPrice = new Intl.NumberFormat(window.lang, {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: response.cCode
      }).format(response.btc_total*response.btAve);
    }
    return response;
  }
});