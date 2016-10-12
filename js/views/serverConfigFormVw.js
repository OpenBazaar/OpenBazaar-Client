'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'accordion-window',

  events: {
    'click .js-save': 'saveForm',
    'keyup': 'processKey',
    'input input': 'inputEntered',
    'click .js-sslOn': 'sslOn',
    'click .js-sslOff': 'sslOff'
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.model) {
      throw new Error('Please provide a ServerConfig model.');
    }

    this.listenTo(this.model, 'invalid sync', function() {
      this.render();
    });

    this.listenTo(this.model, 'change:SSL', function() {
      this.render();
    });
  },

  processKey: function(e) {
    if(e.which === 13) this.saveForm();
  },

  inputEntered: function(e) {
    var val = e.target.value;

    if ([
      'rest_api_port',
      'heartbeat_socket_port',
      'api_socket_port'
    ].indexOf(e.target.name) !== -1) {
      if (String(parseInt(val)) === val) val = parseInt(val);
    }

    this.model.set(e.target.name, val);
  },

  saveForm: function() {
    this.model.save();
  },

  sslOn: function(){
    this.model.set('SSL', false);
  },

  sslOff: function(){
    this.model.set('SSL', true);
  },

  render: function() {
    loadTemplate('./js/templates/serverConfigForm.html', (t) => {
      this.$el.html(
        t(__.extend(this.model.toJSON(), { errors: this.model.validationError || {} }))
      );
    });

    return this;
  }
});
