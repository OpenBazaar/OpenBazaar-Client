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
  className: 'server-connect-modal top0',

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
    if (!this.$jsConfigFormWrap) return;
    
    this.$jsConfigFormWrap.addClass('slide-out');
    this.headerVw.setState({
      msg: polyglot.t('serverConnectModal.serverConfigsHeaderMsg'),
      title: polyglot.t('serverConnectModal.serverConfigsTitle'),
      showNew: true
    });
  },  

  showConfigForm: function(configMd) {
    var model = configMd;

    if (!model) {
      model = new ServerConfigMd();
      model.__collection = this.serverConfigs;
    }

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
      this.connect(md);
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

  succeedConnection: function(configMd) {
    // Sets the state of the modal to reflect a successful connection
    // for the given config.

    // todo: validate args

    if (this.connectAttempt && this.connectAttempt.state() === 'pending') return this;

    this.connectedServer = configMd;

    this.serverConfigsVw.setConnectionState({
      id: configMd.id,
      status: 'connected'
    });

    this.hideMessageBar();
    this.setModalOptions({ showCloseButton: true });

    return this;
  },

  failConnection: function(reason, configMd) {
    // Sets the state of the modal to reflect a failed connection
    // for the given config.

    // todo: validate args

    var msg;

    if (this.connectAttempt && this.connectAttempt.state() === 'pending') return this;
    if (this.connectedServer && this.connectedServer.id === configMd.id) this.connectedServer = null;

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

    return this;
  },

  connect: function(configMd) {
    configMd = configMd || this.serverConfigs.getActive();

    if (!configMd) {
      throw new Error(`Unable to connect because no config was created, nor is there a stored
        active configuration in the ServerConfigs collection.`);
    }

    this.connectAttempt && this.connectAttempt.cancel();
    this.hideMessageBar();

    if (this.connectedServer) {
      this.serverConfigsVw.setConnectionState({
        id: this.connectedServer.id,
        status: 'not-connected'
      });

      this.connectedServer = null;    
    }

    this.serverConfigsVw.setConnectionState({
      id: configMd.id,
      status: 'connecting'
    });

    this.setModalOptions({ showCloseButton: false });
    this.serverConfigs.setActive(configMd.id);

    this.connectAttempt = this.attemptConnection().done(() => {
      this.succeedConnection(configMd);
    }).fail((reason) => {
      this.failConnection(reason, configMd)
    }).always(() => {
      this.connectAttempt = null;
    });

    this.connectAttempt.serverId = configMd.id;

    return this;
  },

  attemptConnection: function() {
    var self = this,
        deferred = $.Deferred(),
        promise = deferred.promise(),
        startTime = Date.now(),
        minAttemptTime = 1000,
        loginRequest,
        timesup,
        conclude,
        login,
        onClose;

    conclude = function(reject) {
      // Sometimes the connection attempt concludes so fast that the UI doesn't
      // even have a chance to show that we've tried to connect. So, we'll do a
      // bit of slight of hand to ensure the attempt takes at least 'minAttemptTime'.
      var _conclude = () =>
            deferred[reject ? 'reject' : 'resolve'].apply(promise, Array.prototype.slice.call(arguments, 1));

      if (
        startTime + minAttemptTime < Date.now() ||
        reject && arguments[1] === 'canceled'
      ) {
        _conclude();
      } else {
        setTimeout(_conclude, startTime + minAttemptTime - Date.now());
      }
    }

    login = function() {
      // check authentication
      loginRequest = app.login().done(function(data) {
        if (data.success) {
          conclude(false, data);
          self.trigger('connected', true);
        } else {
          if (data.reason === 'too many attempts') {
            conclude(true, 'failed-auth-too-many');
          } else {
            conclude(true, 'failed-auth');
          }

          self.trigger('connected', false);
        }
      }).fail(function(jqxhr) {
        if (jqxhr.statusText === 'abort') return;
        
        // assuming rest server is down or
        // wrong port set
        conclude(true);
      });
    };

    app.connectHeartbeatSocket();

    promise.cleanup = function() {
      clearTimeout(timesup);
      clearTimeout(conclude);
      loginRequest && loginRequest.abort();
      app.getHeartbeatSocket().off(null, login);
      app.getHeartbeatSocket().off(null, onClose);
    };

    promise.cancel = function() {
      conclude(true, 'canceled');
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
      conclude(true);
    }));    

    timesup = setTimeout(function() {
      // not timeing out our connections for now, due to
      // server issue where valid connections may take
      // 1 min. +
      // conclude(true, 'timedout');
    }, 10000);

    return promise;
  },

  close: function() {
    this.closeConfigForm();
    BaseModal.prototype.close.apply(this, arguments);
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