'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    isLocalServerRunning = require('../utils/isLocalServerRunning'),    
    isRemoteServerRunning = require('../utils/isRemoteServerRunning'),        
    serverConfigMd = require('../models/serverConfigMd'),
    baseModal = require('./baseModal'),
    messageModal = require('../utils/messageModal.js');

module.exports = baseModal.extend({
  className: 'server-connect-modal',

  events: {
    'click .js-save': 'saveForm',
    'click .js-restoreDefaults': 'restoreDefaults',
    'keyup input': 'inputKeydown',
    'click .js-retry': 'retry'
  },

  initialize: function(options) {
    if (!(options.model && options.model instanceof serverConfigMd)) {
      throw new Error('Please provide a ServerConfigMd instance.');
    }

    this.listenTo(this.model, 'invalid sync', function() {
      this.render();
    });

    this._state = this.getInitialState();
  },

  getInitialState: function() {
    var state = {};

    state['attempt'] = 1;
    state['status'] = this.model.isLocalServer() ?
      'trying' : 'failed';
    state['isLocal'] = this.model.isLocalServer();

    return state;
  },

  inputKeydown: function(e) {
    this.model.set(e.target.name, e.target.value);
  },

  saveForm: function() {
    this.model.save();
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
    var newState;
    
    if (typeof state['attempt'] !== 'undefined') {
      this.$attempt.text(state['attempt']);
    }

    newState =  __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;

      if (!(typeof state['attempt'] !== 'undefined' && Object.keys(state).length === 1)) {
        // if the only new state is the attemp counter, no need to
        // re-render since we manually updated that above.
        this.render();
      }
    }
  },

  retry: function() {
    this.start();
  },

  start: function() {
    var self = this;

    // if (this._started) return this;
    this.serverRunning && this.serverRunning.cancel;
    this.setState(
      __.extend(this.getInitialState(), { status: 'trying' })
    );

    if (this.model.isLocalServer()) {
      this.serverRunning = isLocalServerRunning(
        this.model.getServerBaseUrl() + '/profile',
        this.model.getGuidCheckUrl(),
        {
          interval: 250,
          // todo todo todo - make 24!!!!!
          maxAttempts: 24, // for 6 seconds    
          onAttempt: __.bind(this.onConnectAttempt, this)
        }
      ).done(function() {
        self.setState({ status: 'connected'});
        self.trigger('connect');
      }).fail(function(status) {
        if (status && status === 'canceled') return;
        self.setState({ status: 'failed'});
      });
    } else {
      this.serverRunning = isRemoteServerRunning(this.model.getServerBaseUrl() + '/profile')
        .done(function() {
          self.setState({ status: 'connected'});
          self.trigger('connect');
        }).fail(function(status) {
          if (status && status === 'canceled') return;
          self.setState({ status: 'failed'});
        });
    }

    return this;
  },

  remove: function() {
    this.serverRunning && this.serverRunning.cancel();

    // TODO: don't let us leave this modal with the model in an error state.

    baseModal.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    var self = this,
        scrollPos,
        $scrollContainer;

    $scrollContainer = this.$('.flexContainer.scrollOverflowYHideX');
    $scrollContainer.length && (scrollPos = $scrollContainer[0].scrollTop);

    loadTemplate('./js/templates/serverConnectModal.html', function(t) {
      self.$el.html(
        t( __.extend({}, self.model.toJSON(), { errors: self.model.validationError || {} }, self._state) )
      );

      baseModal.prototype.render.apply(self, arguments);
      self.$('.flexContainer.scrollOverflowYHideX')[0].scrollTop = scrollPos;
      self.$attempt = self.$('.attempt').text(self._state.attempt);
    });

    return this;
  }
});
