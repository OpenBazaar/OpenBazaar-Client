'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    orderShortModel = require('../models/orderShortMd');


module.exports = Backbone.Collection.extend({

  model: orderShortModel,

  initialize: function(models, options) {
    this.btAve = options.btAve;
    this.cCode = options.cCode;
  },

  parse: function(response){
    var self = this;
    __.each(response, function(order){
      order.btAve = self.btAve;
      order.cCode = self.cCode;
      if (order.status == "open"){
        order.status = 4;
      } else if (order.status == "closed"){
        order.status = 5;
      }
    });

    return response;
  }

});