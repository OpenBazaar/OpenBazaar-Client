'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),        
    BaseVw = require('./baseVw'),
    ServerConfigRowVw = require('./serverConfigRowVw');

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

    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'remove', this.onRemoveConfig);
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
    var scrollTop;

    this.rendered = true;
    this.configRowViews = [];
    scrollTop = this.$rowsWrap ? this.$rowsWrap[0].scrollTop : 0;

    loadTemplate('./js/templates/serverConfigs.html', (t) => {
      var $rows = $('<div />');

      this.$el.html(t());

      this.collection.forEach((md) => {
        var vw = new ServerConfigRowVw({ model: md });

        this.listenTo(vw, 'delete', (e) => {
          e.view.model.destroy();
        });

        this.listenTo(vw, 'edit', (e) => {
          this.trigger('edit-config', { model: e.view.model });
        });        

        $rows.append( vw.render().el );
        this.configRowViews.push(vw);
      });
      
      this.collection.length && this.$('.js-zero-configs').addClass('hide');
      this.$rowsWrap = this.$('.js-rows-wrap');
      this.$rowsWrap.append($rows);
      this.$rowsWrap[0].scrollTop = scrollTop;
    });

    return this;
  }
});
