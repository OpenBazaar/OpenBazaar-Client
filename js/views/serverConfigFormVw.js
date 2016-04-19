'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'accordion-window',

  events: {
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

  setModel: function(md) {
    this.model = md;
    this.render();
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
