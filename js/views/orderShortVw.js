var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  tagName: "li",

  className: "flexRow custCol-border",

  events: {
    'click .js-orderShort': 'openOrderModal'
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
      'transactionType': this.model.get('transactionType'),
      //'modalTab': state
    });
  },

  close: function(){
    this.unbind();
    this.remove();
  }

});