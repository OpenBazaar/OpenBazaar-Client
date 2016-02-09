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
    if (!options.model) {
      throw new Error('Please provide a Server Config model.');
    }
  },

  okClick: function() {
    this.close();
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/changeServerWarningModal.html', function(t) {
      self.$el.html(t( self.model.toJSON() ));

      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
