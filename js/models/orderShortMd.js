var __ = require('underscore'),
    Backbone = require('backbone');

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
    thumbnail_hash: ""
  }
});