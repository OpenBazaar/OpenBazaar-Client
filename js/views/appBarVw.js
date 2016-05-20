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
    var style = localStorage.appBarStyle;

    this.options = options || {};
    this.currentWindow = remote.getCurrentWindow();
    this.title = this.titlePrefix;
    
    if (!style || ['mac', 'win'].indexOf(style) === -1) {
      style = remote.process.platform === 'win32' ? 'win' : 'mac';
    }

    this.setStyle(style);    
  },

  setStyle: function(style) {
    if (!style || ['mac', 'win'].indexOf(style) === -1) {
      throw new Error(`Please provide a style ('mac' or 'win')`);      
    }

    this.$el.removeClass('style-mac style-win');
    this.$el.addClass(`style-${style}`);
    localStorage.appBarStyle = style;
    this.render();
  },

  getStyle: function() {
    return localStorage.appBarStyle;
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
    } else {}

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
        style: this.getStyle(),
        title: this.title
      }));
    });

    return this;
  }
});