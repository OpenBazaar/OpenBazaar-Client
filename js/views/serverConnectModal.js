'use strict';

var Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal'),
    messageModal = require('../utils/messageModal.js');

module.exports = baseModal.extend({
  className: 'server-connect-modal',

  events: {
    'click .js-save': 'saveForm',
    'click .js-restoreDefaults': 'restoreDefaults',
    'change input': 'inputChange'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'invalid sync', function() {
      this.render();
    });
  },

  inputChange: function(e) {
    this.model.set(e.target.name, e.target.value);
  },

  saveForm: function() {
    if (this.model.save()) {
      messageModal.show('The changes have been saved.')
    } else {
      messageModal.show('There are one or more errors. Please fix.')
    }
  },

  restoreDefaults: function() {
    this.model.clear()
      .set( __.result(this.model, 'defaults', {}) );
    this.model.validationError = {};
    this.render();
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/serverConnectModal.html', function(t) {
      self.$el.html(
        t( __.extend({}, self.model.toJSON(), { errors: self.model.validationError || {} }) )
      );

      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
