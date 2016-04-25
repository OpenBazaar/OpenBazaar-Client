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

  initialize: function(options) {
    this.options = options || {};

    this.headerVw = new ServerConnectHeaderVw({
      initialState: {
        msg: polyglot.t('serverConnectModal.serverConfigsHeaderMsg'),
        title: polyglot.t('serverConnectModal.serverConfigsTitle'),
        showNew: true
      }
    });

    this.serverConfigs = app.serverConfigs;
    this.serverConfigsVw = new ServerConfigsVw({
      collection: this.serverConfigs
    });

    this.listenTo(this.serverConfigsVw, 'edit-config', this.onEditConfig);
    this.listenTo(this.serverConfigsVw, 'connect', this.onConnectClick);
    this.listenTo(this.serverConfigsVw, 'cancel', this.onCancelClick);

    // In case connection drops outside of this modal's connect() flow.
    app.getHeartbeatSocket().on('close', (e) => {
      if (!this.connectAttempt) {
        console.log('west end feel good');
        this.failConnectionAttempt(null, app.getServerConfig().id);

        !this.isOpen && this.open();
      }
    });
  },

  remove: function() {
    BaseModal.prototype.remove.apply(this, arguments);
  },

  hideMessageBar: function() {
    this.$jsMsgBar.addClass('slide-out');
  },

  showMessageBar: function(msg) {
    this.$jsMsgBar
      .find('.js-message-bar-content')
      .html(msg)
      .end()
      .removeClass('slide-out');
  },  

  closeConfigForm: function() {
    this.$jsConfigFormWrap.addClass('slide-out');
    this.headerVw.setState({
      msg: polyglot.t('serverConnectModal.serverConfigsHeaderMsg'),
      title: polyglot.t('serverConnectModal.serverConfigsTitle'),
      showNew: true
    });
  },  

  showConfigForm: function(configMd) {
    var model = configMd || new ServerConfigMd();

    this.headerVw.setState({
      title: model.get('name') || polyglot.t('serverConnectModal.newConfigTitle'),
      msg:  configMd ?
        polyglot.t('serverConnectModal.editConfigHeaderMsg') :
        polyglot.t('serverConnectModal.newConfigHeaderMsg'),
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

  onCancelClick: function(e) {
    this.connectAttempt && this.connectAttempt.cancel();
  },  

  onConnectClick: function(e) {
    this.connect(e.model);
  },

  failConnectionAttempt: function(reason, configMd) {
    var msg;

    this.serverConfigsVw.setConnectionState({
      id: configMd.id,
      status: reason === 'canceled' ? 'not-connected' : 'failed'
    });

    msg = polyglot.t('serverConnectModal.connectionFailed', {
      serverName: configMd.get('name')
    });

    if (reason === 'failed-auth-too-many') {
      msg += `&mdash; ${polyglot.t('serverConnectModal.authFailedTooManyAttempts')}`;
    } else if (reason === 'failed-auth') {
      msg += `&mdash; ${polyglot.t('serverConnectModal.authFailed')}`;
    }

    reason !== 'canceled' && this.showMessageBar(msg);
  },

  connect: function(configMd) {
    var connect,
        connectAttempt;

    this.connectAttempt && this.connectAttempt.cancel();
    app.setServerConfig(configMd.id);
    this.hideMessageBar();

    this.serverConfigsVw.setConnectionState({
      id: configMd.id,
      status: 'connecting'
    });

    connectAttempt = this.connectAttempt = this.attemptConnection().done(() => {
      this.serverConfigsVw.setConnectionState({
        id: configMd.id,
        status: 'connected'
      });
    }).fail((reason) => {
      this.failConnectionAttempt(reason, configMd)
    }).always(() => {
      this.connectAttempt = null;
    });

    return connectAttempt;    
  },

  attemptConnection: function() {
    var self = this,
        deferred = $.Deferred(),
        promise = deferred.promise(),
        loginRequest,
        timesup,
        rejectLater,
        rejectLogin,
        rejectLoginLater,
        login,
        onClose;

    rejectLogin = function(reason) {
      rejectLoginLater = setTimeout(function() {
        deferred.reject(reason);
      }, 500);
    };

    login = function() {
      // check authentication
      loginRequest = app.login().done(function(data) {
        if (data.success) {
          deferred.resolve(data);
          // self.trigger('connected', true);
        } else {
          if (data.reason === 'too many attempts') {
            rejectLogin('failed-auth-too-many');  
          } else {
            rejectLogin('failed-auth');  
          }

          // self.trigger('connected', false);
        }
      }).fail(function(jqxhr) {
        if (jqxhr.statusText === 'abort') return;
        
        // assuming rest server is down or
        // wrong port set
        rejectLogin();
      });
    };

    app.connectHeartbeatSocket();

    promise.cleanup = function() {
      clearTimeout(timesup);
      clearTimeout(rejectLater);
      clearTimeout(rejectLoginLater);
      loginRequest && loginRequest.abort();
      app.getHeartbeatSocket().off(null, login);
      app.getHeartbeatSocket().off(null, onClose);
    };

    promise.cancel = function() {
      deferred.reject('canceled');
    };

    promise.always(function() {
      promise.cleanup();
    });

    app.getHeartbeatSocket().on('open', login);

    app.getHeartbeatSocket().on('close', (onClose = function() {
      // On local servers the close event on a down server is
      // almost instantaneous and the UI can't even show the
      // user we're attempting to connect. So we'll put up a bit
      // of a facade.
      rejectLater = setTimeout(function() {
        deferred.reject();
      }, 1000);
    }));    

    timesup = setTimeout(function() {
      // not time-ing our connections for now, due to
      // server issue where valid connections may take
      // 1 min. +
      // deferred.reject('timedout');
    }, 10000);

    return promise;
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