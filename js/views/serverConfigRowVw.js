'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'flexRow borderBottom custCol-border server-config-row',

  events: {
    'click .js-delete-config': 'onClickDelete',
    'click .js-edit-config': 'onClickEdit',
    'click .js-connect': 'onClickConnect',
    'click .js-cancel': 'onClickCancel'
  },

  initialize: function(options) {
    this.options = options || {};
    this._state = options.initialState || {
      status: 'not-connected'
    };

    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  onClickCancel: function() {
    this.trigger('cancel', { view: this });
  },

  onClickConnect: function() {
    this.trigger('connect', { view: this });
  },

  onClickDelete: function() {
    this.trigger('delete', { view: this });
  },

  onClickEdit: function() {
    this.trigger('edit', { view: this });
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
    loadTemplate('./js/templates/serverConfigRow.html', (t) => {
      this.$el.html(t(
          __.extend(this.model.toJSON(), this._state)
      ));
    });

    return this;
  }
});
