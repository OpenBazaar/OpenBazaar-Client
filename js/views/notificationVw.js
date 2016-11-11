'use strict';
var Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'notification',

  events: {
    'click .js-notification': 'notificationClick'
  },

  initialize: function(options) {
    if (!options.model) {
      throw new Error('Please provide a model of the logged-in user.');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  notificationClick: function() {
    switch (this.model.get('type').toLowerCase()) {
      case "follow":
        Backbone.history.navigate('#userPage/'+ this.model.get('guid') + '/store', {trigger: true});
        break;
      case "new order":
        Backbone.history.navigate('#transactions/sales/' + this.model.get('order_id'), {trigger: true});
        break;
      case "dispute_open":
        Backbone.history.navigate('#transactions/purchases/' + this.model.get('order_id'), {trigger: true});
        break;
      case "dispute_close":
        Backbone.history.navigate('#transactions/purchases/' + this.model.get('order_id'), {trigger: true});
        break;
      case "refund":
        Backbone.history.navigate('#transactions/purchases/' + this.model.get('order_id'), {trigger: true});
        break;
      case "payment received":
        Backbone.history.navigate('#transactions/purchases/' + this.model.get('order_id'), {trigger: true});
        break;
      case "order confirmation":
        Backbone.history.navigate('#transactions/purchases/' + this.model.get('order_id'), {trigger: true});
        break;
      case "rating received":
        Backbone.history.navigate('#transactions/sales/' + this.model.get('order_id'), {trigger: true});
        break;
      case "order":
        Backbone.history.navigate('#transactions/sales/' + this.model.get('subject') +'/discussion', {trigger: true});
        break;
    }

    this.trigger('notification-click', { view: this });
  },

  render: function() {
    loadTemplate('./js/templates/notification.html', (tmpl) => {
      this.$el.html(
        tmpl(this.model.toJSON())
      );
    });

    return this;
  }
});
