'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    remote = require('electron').remote,        
    BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  titlePrefix: 'OpenBazaar',

  events: {
    'click .js-navClose': 'navCloseClick',
    'click .js-navMin': 'navMinClick',
    'click .js-navMax': 'navMaxClick'    
  },

  initialize: function(options) {
    this.options = options || {};
    this.currentWindow = remote.getCurrentWindow();
    this.title = this.titlePrefix;
  },

  navCloseClick: function() {
    if (remote.process.platform !== 'darwin') {
      this.currentWindow.close();
    } else {
      this.currentWindow.hide();
    }
  },

  navMinClick: function() {
    this.currentWindow.minimize();
  },

  navMaxClick: function() {
    if(this.currentWindow.isMaximized()) {
      this.currentWindow.unmaximize();
      this.$('.js-navMax').attr('data-tooltip', window.polyglot.t('Maximize'));
    } else {
      this.currentWindow.maximize();
      this.$('.js-navMax').attr('data-tooltip', window.polyglot.t('Restore'));
    }
  },

  setTitle: function(text) {
    var curTitle = this.title;

    if (!text) {
      this.title = this.titlePrefix;
    }

    this.title = text ?
      `${this.titlePrefix} &mdash; ${text}` :
      this.titlePrefix;

    if (curTitle !== this.title) {
      this.render();
    }
  },

  render: function() {
    loadTemplate('./js/templates/appBar.html', (t) => {
      this.$el.html(t({
        platform: remote.process.platform,
        title: this.title
      }));
    });

    return this;
  }
});