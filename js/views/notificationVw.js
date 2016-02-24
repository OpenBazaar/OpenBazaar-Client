var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'notification flexRow',

  events: {
  },

  initialize: function(options) {
    if (!options.model) {
      throw new Error('Please provide a model of the logged-in user.');
    }
  },

  // remove: function() {
  //   this.close();

  //   baseVw.prototype.remove.apply(this, arguments);
  // },

  render: function() {
    loadTemplate('./js/templates/notification.html', (tmpl) => {
      this.$el.html(
        tmpl(this.model.toJSON())
      );
    });

    return this;
  }
});