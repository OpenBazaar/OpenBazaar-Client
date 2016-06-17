'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'page-connect-modal',

  events: {
    'click .js-back': 'onBackClick',
    'click .js-cancel': 'onCancelClick',
    'click .js-retry': 'onRetryClick'
  },

  constructor: function(options) {
    options = __.extend({
      dismissOnOverlayClick: false,
      dismissOnEscPress: false,
      showCloseButton: false
    }, options || {});

    baseModal.prototype.constructor.apply(this, [options].concat(Array.prototype.slice.call(arguments, 1)));
  },  

  initialize: function(options) {
    var defaultState = {
      mode: 'connecting'
    };

    this.options = options || {};
    this._state = {};
    this.setState(__.extend({}, defaultState, this.options.initialState || {}));
  },

  setState: function(state) {
    var newState;

    if (!state) return;

    newState = __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }
  },

  onBackClick: function() {
    this.trigger('back');
  },

  onRetryClick: function() {
    this.trigger('retry');
  },

  onCancelClick: function() {
    this.trigger('cancel');
  },    

  remove: function() {
    baseModal.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    loadTemplate('./js/templates/pageConnectModal.html', (t) => {
      this.$el.html(t(this._state));

      baseModal.prototype.render.apply(this, arguments);

      this.$statusText = this.$('.statusText');
    });

    return this;
  }
});
