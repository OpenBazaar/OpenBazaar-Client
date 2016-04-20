'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'accordion-window',

  events: {
    'click .js-save': 'saveForm',
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

    console.log('hooba');
    window.hooba = this.model;
  },

  inputEntered: function(e) {
    this.model.set(e.target.name, e.target.value);
  },  

  saveForm: function() {
    console.log('just savin away');
    this.model.save();
  },

  sslOn: function(){
    this.model.set('SSL', false);
  },

  sslOff: function(){
    this.model.set('SSL', true);
  },  

  remove: function() {
    BaseVw.prototype.remove.apply(this, arguments);
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
