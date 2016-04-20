'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'flexRow borderBottom custCol-border',

  events: {
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  remove: function() {
    BaseVw.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    loadTemplate('./js/templates/serverConfigRow.html', (t) => {
      this.$el.html(
        t(this.model.toJSON())
      );
    });

    return this;
  }
});
