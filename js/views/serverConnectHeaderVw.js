'use strict';

var __ = require('underscore'),
    BaseVw = require('./baseVw'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = BaseVw.extend({
  className: '',

  initialize: function(options) {
    this.options = options || {};
    this._state = this.options.initialState || {};
  },

  setState: function(state) {
    var newState;
    
    newState = __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }
  },

  render: function() {
    loadTemplate('./js/templates/serverConnectHeader.html', (t) => {
      this.$el.html(
        t(this._state)
      );
    });

    return this;
  }
});
