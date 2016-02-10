'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),        
    baseModal = require('./baseModal'),
    ChangeServerWarningModal = require('./changeServerWarningModal');

module.exports = baseModal.extend({
  className: 'server-connect-modal',

  events: {
    'click .js-save': 'saveForm',
    'click .js-restoreDefaults': 'restoreDefaults',
    'input input': 'inputEntered',
    'click .js-retry': 'retry'
  },

  initialize: function(options) {
    this.model = app.serverConfig;

    this.listenTo(this.model, 'invalid sync', function() {
      this.render();
    });

    this._lastSavedAttrs = $.extend(true, {}, this.model.attributes);
  },

  inputEntered: function(e) {
    this.model.set(e.target.name, e.target.value);
  },

  saveForm: function() {
    if (this.model.save()) {
      if (!this.changeServerWarningModal) {
        this.changeServerWarningModal = new ChangeServerWarningModal({
          innerWrapperClass: 'modal-child modal-childMain custCol-primary padding2010 heightAuto',
          includeCloseButton: true,
          settings: this._lastSavedAttrs
        }).render().open();
        
        this.listenTo(this.changeServerWarningModal, 'close', function() {
          this._lastSavedAttrs = $.extend(true, {}, this.model.attributes);
          this.start();
        });
      } else {
        this.changeServerWarningModal.open();
      }
    };
  },

  restoreDefaults: function() {
    this.model.clear()
      .set( __.result(this.model, 'defaults', {}) );
    this.model.validationError = {};
    this.render();
  },

  setState: function(state) {
    var newState;
    
    newState =  __.extend({}, this._state, state);

    if (!__.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }
  },

  retry: function() {
    this.start();
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
      // at this point, we've confirmed connection, so:
      self.trigger('connected');

      // check authentication
      loginRequest = app.login().done(function(data) {
        if (data.success) {
          deferred.resolve();
          self.trigger('authenticated');
        } else {
          if (data.reason === 'too many attempts') {
            rejectLogin('failed-auth-too-many');  
          } else {
            rejectLogin('failed-auth');  
          }          
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
    }

    promise.always(function() {
      promise.cleanup();
    });

    app.getHeartbeatSocket().on('open', login);

    app.getHeartbeatSocket().on('close', (onClose = function() {
      // On local servers the close event on a down server is
      // almost instantaneous and the UI can't even show the
      // user we're attempting to connect. So we'll put up a bit
      // of a charade.
      rejectLater = setTimeout(function() {
        deferred.reject();
      }, 1000);
    }));    

    timesup = setTimeout(function() {
      deferred.reject('timedout');
    }, 3000);

    return promise;
  },

  start: function() {
    var self = this,
        attempts = 1,
        connect;

    this.connectAttempt && this.connectAttempt.cancel();

    this.setState({ status: 'trying' });

    (connect = function() {
      self.connectAttempt = self.attemptConnection().done(function() {
        self.setState({ status: 'connected' });
      }).fail(function(reason) {
        if (reason == 'canceled') return;
        
        if (attempts >= 3 || reason === 'failed-auth' || reason === 'failed-auth-too-many') {
          self.setState({ status: reason || 'failed' });
        } else {
          attempts += 1;
          connect();
        }
      }).always(function() {
        self.connectAttempt = null;
      });
    })();
  },

  stop: function() {
    if (this.connectAttempt) {
      this.connectAttempt.cancel();
      this.connectAttempt = null;
      this.setState({ status: 'failed' });
    }
  },

  isStarted: function() {
    return !!this.connectAttempt;
  },

  close: function() {
    this.changeServerWarningModal && this.changeServerWarningModal.remove();
    baseModal.prototype.close.apply(this, arguments);
  },

  remove: function() {
    this.stop();
    this.changeServerWarningModal && this.changeServerWarningModal.remove();

    // TODO: don't let us leave this modal with the model in an error state.

    baseModal.prototype.remove.apply(this, arguments);
  },  

  render: function() {
    var self = this,
        scrollPos,
        $scrollContainer;

    // todo: also restore focused element and if possible cursor position
    $scrollContainer = this.$('.flexContainer.scrollOverflowYHideX');
    $scrollContainer.length && (scrollPos = $scrollContainer[0].scrollTop);

    loadTemplate('./js/templates/serverConnectModal.html', function(t) {
      self.$el.html(
        t( __.extend({}, self.model.toJSON(), { errors: self.model.validationError || {} }, self._state) )
      );

      baseModal.prototype.render.apply(self, arguments);
      self.$('.flexContainer.scrollOverflowYHideX')[0].scrollTop = scrollPos;
    });

    return this;
  }
});
