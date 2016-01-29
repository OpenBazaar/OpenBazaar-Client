'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    isServerRunning = require('../utils/isServerRunning'),    
    serverConfigMd = require('../models/serverConfigMd'),
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
    if (!(options.model && options.model instanceof serverConfigMd)) {
      throw new Error('Please provide a ServerConfigMd instance.');
    }

    this._state = {
      status: 'trying', // connected, failed
      attempt: 1
    };

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

  onConnectAttempt: function(attempt) {
    if (!this.isRemoved()) {
      this.setState({ attempt: Math.ceil(attempt / 8) });
    }
  },

  setState: function(state) {
    this._state = __.extend({}, this._state, state);
    this.render();
  },

  start: function() {
    var self = this;

    if (this._started) return this;

    this.started = true;
    isServerRunning(
      this.model.getServerBaseUrl() + '/profile',
      this.model.getGuidCheckUrl(),
      {
        timeout: 250,
        maxAttempts: 24, // for 6 seconds    
        onAttempt: __.bind(this.onConnectAttempt, this)
      }
    ).done(function() {
      self.setState({ status: 'connected'});
    }).fail(function() {
      self.setState({ status: 'failed'});
    });

    return this;
  },

  remove: function() {
    // TODO: don't let us leave this modal with the model in an error state.
  },  

  render: function() {
    var self = this;

    loadTemplate('./js/templates/serverConnectModal.html', function(t) {
      self.$el.html(
        t( __.extend({}, self.model.toJSON(), { errors: self.model.validationError || {} }, self._state) )
      );

      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
