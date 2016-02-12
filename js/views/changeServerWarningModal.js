'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'change-server-warning-modal',

  events: {
    'click button': 'okClick'
  },

  initialize: function(options) {
    this.options = options || {};
    
    if (!options.settings) {
      throw new Error('Please provide an object with the server settings.');
    }
  },

  okClick: function() {
    this.close();
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/changeServerWarningModal.html', function(t) {
      self.$el.html(t( self.options.settings ));

      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
