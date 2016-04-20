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
    'click .js-new': 'newConfigForm'
  },

  // todo: poly-gluttonize!
  headerMessages: {
    serverConfigsTitle: { msg: 'Your Server Configurations'},
    newConfigTitle: { msg: 'Enter Server Details' },
    editConfigTitle: { msg: 'Configuration Settings' },
    connecting: { msg: 'Connecting to ${name}' },
    failed: {
      msg: 'Connection Failed',
      msgClass: 'connect-error',
      showRetry: true,
    },
    failedAuth: {
      msg: 'Authentication Failed',
      msgClass: 'connect-error',
      showRetry: true,
    },
    failedTooManyAttempts: {
      msg: 'Too many failed login attemps.',
      msgClass: 'connect-error',
      showRetry: true,
    }
  },

  initialize: function(options) {
    this.options = options || {};

    this.headerVw = new ServerConnectHeaderVw({
      initialState: {
        title: 'Server Configuration',
        showNew: true
      }
    });

    this.serverConfigs = new ServerConfigsCl();
    this.serverConfigs.fetch();

    console.log('sugar');
    window.sugar = this.serverConfigs;

    this.serverConfigsVw = new ServerConfigsVw({
      collection: this.serverConfigs
    });
  },

  remove: function() {
    BaseModal.prototype.remove.apply(this, arguments);
  },

  closeConfigForm: function() {
    this.$jsConfigFormWrap.addClass('slide-out');
    this.headerVw.setState({
      title: 'Server Configuration',
      showNew: true
    });
  },  

  newConfigForm: function() {
    var configMd = new ServerConfigMd();

    this.headerVw.setState({
      title: 'New Configuration',
      showNew: false
    });

    this.renderServerConfigForm(configMd);

    configMd.on('sync', (md) => {
      this.serverConfigs.add(md);
      this.headerVw.setState({
        title: md.get('name')
      });      
    });
    
    this.$jsConfigFormWrap.removeClass('slide-out');    
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

      if (!this.moo) {
        this.moo = true;
        setTimeout(() => {
          var msgKeys = Object.keys(this.headerMessages),
            randomMsgIdx = Math.floor(Math.random() * ((msgKeys.length - 1) - 0 + 1)) + 0,
            m,
            i = 0,
            self = this;

          for (var key in this.headerMessages) {
            if (i === randomMsgIdx) m = self.headerMessages[key];
            i++;
          }

          this.headerVw.setState(m);
        }, 1000);
      }

      this.$('.js-config-list-wrap').html(
        this.serverConfigsVw.render().el
      );
    });

    return this;
  }
});
