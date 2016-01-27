'use strict';

var Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'server-connect-modal',

  events: {
    'click button': 'buttonClick'
  },

  initialize: function(options) {

  },

  buttonClick: function() {
    alert('how dare you click me?');
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/serverConnectModal.html', function(t) {
      self.$el.html(t());
      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
