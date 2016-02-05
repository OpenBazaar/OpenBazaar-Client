var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    baseVw = require('./baseVw'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = baseVw.extend({

  tagName: "li",

  className: "flexRow custCol-border",

  events: {
    'click .js-orderShort': 'openOrderModal',
    'click .js-orderShortConfirm': 'orderConfirm',
    'click .js-orderShortComplete': 'orderComplete'
  },

  initialize: function(){
    "use strict";
    var timestamp = this.model.get('timestamp');
    this.model.set('order_date', moment(new Date(timestamp*1000)).format('MMM D, h:mm A'));
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/orderShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  openOrderModal: function(e){
    "use strict";
    e.stopPropagation();
    window.obEventBus.trigger("openOrderModal", {
      'orderID': this.model.get('order_id'),
      'status': this.model.get('status'),
      'transactionType': this.model.get('transactionType')
    });
  },

  orderConfirm: function(e){
    "use strict";
    e.stopPropagation();
    window.obEventBus.trigger("openOrderModal", {
      'orderID': this.model.get('order_id'),
      'status': this.model.get('status'),
      'transactionType': this.model.get('transactionType'),
      'tabState': "confirm"
    });
  },

  orderComplete: function(e){
    "use strict";
    e.stopPropagation();
    window.obEventBus.trigger("openOrderModal", {
      'orderID': this.model.get('order_id'),
      'status': this.model.get('status'),
      'transactionType': this.model.get('transactionType'),
      'tabState': "complete"
    });
  }

});