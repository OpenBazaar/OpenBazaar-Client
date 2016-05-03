'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  className: 'flexContainer',

  events: {
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a ServerConfigs collection.');
    }

    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    loadTemplate('./js/templates/pageNavServersMenu.html', (t) => {
      this.$el.html(t({
        connectedServer: this.collection.at(0).id,
        servers: this.collection.toJSON()
      }));
    });

    return this;
  }
});
