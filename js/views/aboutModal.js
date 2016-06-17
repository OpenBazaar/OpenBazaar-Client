'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'modal-about insideApp',

  events: {
    'click .js-tab': 'onTabClick'
  },

  initialize: function(options) {
    this.options = __.extend({
      initialTab: 'about'
    }, options || {});

    if (!this.options.version) {
      throw new Error('Please provide a version.');
    }

    this._tab = this.options.initialTab;
  },

  onTabClick: function(e) {
    var $tab = $(e.target).hasClass('js-tab') ?
      $(e.target) : $(e.target).parents('.js-tab');

    this.setTab($tab.data('tab'));
  },

  setTab: function(tab) {
    if (!tab) {
      throw new Error('Please provide a tab.');
    }

    if (tab !== this._tab) {
      this._tab = tab;
      this.render();
    }

    return this;
  },

  render: function() {
    loadTemplate('./js/templates/aboutModal.html', (t) => {
      this.$el.html(t({
        version: this.options.version,
        tab: this._tab
      }));

      baseModal.prototype.render.apply(this, arguments);
    });

    return this;
  }
});
