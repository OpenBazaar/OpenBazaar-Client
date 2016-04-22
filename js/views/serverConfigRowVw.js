'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'flexRow borderBottom custCol-border',

  events: {
    'click .js-delete-config': 'onClickDelete',
    'click .js-edit-config': 'onClickEdit',
    'click .js-connect': 'onClickConnect',
    'click .js-cancel': 'onClickCancel'
  },

  initialize: function(options) {
    console.log('construct yourself');
    
    this.options = options || {};
    this._state = {
      status: 'not-connected'
    };

    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  onClickCancel: function(e) {
    this.trigger('cancel', { view: this });
  },

  onClickConnect: function(e) {
    this.trigger('connect', { view: this });
  },

  onClickDelete: function(e) {
    this.trigger('delete', { view: this });
  },

  onClickEdit: function(e) {
    this.trigger('edit', { view: this });
  },

  setState: function(state) {
    var newState;
    
    newState =  __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }
  },

  remove: function() {
    BaseVw.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    loadTemplate('./js/templates/serverConfigRow.html', (t) => {
      this.$el.html(t(
          __.extend(this.model.toJSON(), this._state)
      ));
    });

    return this;
  }
});
