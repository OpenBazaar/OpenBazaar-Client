var Backbone = require('backbone'),
    orderShortModel = require('../models/orderShortMd');


module.exports = Backbone.Collection.extend({

  model: orderShortModel,

  initialize: function(options) {
  }

});