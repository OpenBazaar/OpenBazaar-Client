var __ = require('underscore'),
    Backbone = require('backbone'),
    orderShortModel = require('../models/orderShortMd');


module.exports = Backbone.Collection.extend({

  model: orderShortModel,

  initialize: function(models, options) {
    "use strict";
    this.btAve = options.btAve;
    this.cCode = options.cCode;
  },

  parse: function(response){
    "use strict";
    var self = this;
    __.each(response, function(order, i){
      order.btAve = self.btAve;
      order.cCode = self.cCode;
      if(order.status == "open"){
        order.status = 4;
      }
    });

    return response;
  }

});