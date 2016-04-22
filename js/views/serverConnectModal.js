'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),        
    ServerConfigMd = require('../models/serverConfigMd'),
    ServerConfigsCl = require('../collections/serverConfigsCl'),
    BaseModal = require('./baseModal'),
    ServerConnectHeaderVw = require('./serverConnectHeaderVw'),
    ServerConfigFormVw = require('./serverConfigFormVw'),
    ServerConfigsVw = require('./serverConfigsVw');

module.exports = BaseModal.extend({
  className: 'server-connect-modal',

  events: {
    'click .js-close': 'closeConfigForm',
    'click .js-new': 'newConfigForm',
    'click .js-msg-bar-close': 'hideMessageBar'
  },

  // todo: poly-gluttonize!
  headerMessages: {
    serverConfigsTitle: 'Your Server Configurations',
    newConfigTitle: 'Enter Server Details',
    editConfigTitle: 'Configuration Settings',
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.server) {
      throw new Error('Please provide a server option referencing a Server instance.');
    }

    this.headerVw = new ServerConnectHeaderVw({
      initialState: {
        msg: 'Your Server Configurations',
        title: 'Server Configurations',
        showNew: true
      }
    });

    this.serverConfigs = options.server.serverConfigs;
    this.serverConfigs.fetch();

    this.serverConfigsVw = new ServerConfigsVw({
      collection: this.serverConfigs
    });

    this.listenTo(this.serverConfigsVw, 'edit-config', this.onEditConfig);
  },

  remove: function() {
    BaseModal.prototype.remove.apply(this, arguments);
  },

  hideMessageBar: function() {
    this.$jsMsgBar.addClass('slide-out');
  },

  showMessageBar: function(msg) {
    this.$jsMsgBar.html(msg)
      .removeClass('slide-out');
  },  

  closeConfigForm: function() {
    this.$jsConfigFormWrap.addClass('slide-out');
    this.headerVw.setState({
      msg: 'Your Server Configurations',
      title: 'Server Configurations',
      showNew: true
    });
  },  

  showConfigForm: function(configMd) {
    var model = configMd || new ServerConfigMd();

    this.headerVw.setState({
      title: model.get('name') || 'New Configuration',
      msg:  configMd ? 'Configuration Settings' : 'Enter Server Details',
      showNew: false
    });

    this.renderServerConfigForm(model);

    this.listenTo(model, 'change:name', (md) => {
      this.headerVw.setState({
        title: md.get('name')
      });
    });

    this.listenTo(model, 'sync', (md) => {
      this.serverConfigs.add(md);
      this.closeConfigForm();
    });
    
    this.$jsConfigFormWrap.removeClass('slide-out');    
  },

  newConfigForm: function() {
    this.showConfigForm();
  },

  onEditConfig: function(e) {
    this.showConfigForm(e.model);
  },

  renderServerConfigForm: function(md) {
    this.serverConfigFormVw && this.serverConfigFormVw.remove();
    this.serverConfigFormVw = new ServerConfigFormVw({
      model: md
    });

    this.$jsConfigFormWrap = this.$jsConfigFormWrap || this.$('.js-config-form-wrap');
    this.$jsConfigFormWrap.html(this.serverConfigFormVw.render().el);
  },  

  render: function() {
    loadTemplate('./js/templates/serverConnectModal.html', (t) => {
      this.$el.html(t());
      BaseModal.prototype.render.apply(this, arguments);      

      this.$('.js-header-wrap').html(this.headerVw.render().el);

      this.$('.js-config-list-wrap').html(
        this.serverConfigsVw.render().el
      );

      this.$jsMsgBar = this.$jsMsgBar || this.$('.js-msg-bar');
    });

    return this;
  }
});
