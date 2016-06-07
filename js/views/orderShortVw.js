"use strict";

var moment = require('moment'),
    baseVw = require('./baseVw'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = baseVw.extend({

  tagName: "li",

  className: "flexRow custCol-border js-orderShort",

  events: {
    'click .js-orderShort': 'orderSummary',
    'click .js-orderShortConfirm': 'orderConfirm',
    'click .js-orderShortComplete': 'orderComplete',
    'click .js-orderShortDiscusson': 'orderDiscussion'
  },

  initialize: function(){
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

  openOrderModal: function(tabState){
    window.obEventBus.trigger("openOrderModal", {
      'orderID': this.model.get('order_id'),
      'status': this.model.get('status'),
      'transactionType': this.model.get('transactionType'),
      'unread': this.model.get('unread'),
      'tabState': tabState
    });
    this.$('.js-unreadBadge').addClass('hide');
  },

  orderSummary: function(e){
    e.stopPropagation();
    this.openOrderModal("summary");
  },

  orderConfirm: function(e){
    e.stopPropagation();
    this.openOrderModal("summary");
  },

  orderComplete: function(e){
    e.stopPropagation();
    this.openOrderModal("summary");
  },

  orderDiscussion: function(e){
    e.stopPropagation();
    this.openOrderModal("discussion");
  },

  updateUnread: function(changeBy){
    this.model.set('unread', this.model.get('unread') + parseInt(changeBy, 10));
  }

});