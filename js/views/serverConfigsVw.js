'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw'),
    ServerConfigRowVw = ('./serverConfigRowVw');

module.exports = BaseVw.extend({
  className: 'accordion-window',

  events: {
  },

  initialize: function(options) {
    this.options = options || {};
    this.configRowViews = [];

    if (!options.collection) {
      throw new Error('Please provide a ServerConfigs collection.');
    }

    this.listenTo(this.collection, 'update', this.onUpdateConfigs);
    this.listenTo(this.collection, 'remove', this.onRemoveConfig);
  },

  onUpdateConfigs: function(cl, opts) {
    if (!this.rendered) return;

    cl.length ?
      this.$('.js-zero-configs').addClass('hide') :
      this.$('.js-zero-configs').removeClass('hide');
  },

  onRemoveConfig: function(md, cl, opts) {
    var index = -1;

    __.every(this.configRowViews, (vw) => {
      index++;
      if (vw.model === md) return false;

      return true;
    });

    if (index > -1) this.configRowViews.splice(index, 1);
  },

  remove: function() {
    BaseVw.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    this.rendered = true;
    this.configRowViews = [];

    loadTemplate('./js/templates/serverConfigs.html', (t) => {
      var $rows = $('<div />');

      this.$el.html(t());

      this.collection.forEach((md) => {
        var vw = new ServerConfigRowVw({ model: md });


        $rows.append( vw.render().el );
        this.configRowViews.push(vw);
      });

      this.collection.length && this.$('.js-zero-configs').addClass('hide');
    });

    return this;
  }
});
