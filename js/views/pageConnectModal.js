'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),        
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'page-connect-modal',

  events: {
    'click .js-back': 'onBackClick',
    'click .js-cancel': 'onCancelClick',
    'click .js-retry': 'onRetryClick'
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
    var modes = ['connecting', 'failed-connect'],
        newState;

    if (!state) return;

    newState = __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }
  },

  onBackClick: function(e) {
    $(e.target).addClass('disabled');
    this.trigger('back');
  },

  onRetryClick: function() {
    this.trigger('retry');
  },

  onCancelClick: function(e) {
    $(e.target).addClass('disabled');
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
