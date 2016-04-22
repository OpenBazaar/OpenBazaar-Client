var ipcRenderer = require('ipc-renderer'),
    Socket = require('./utils/Socket'),
    $ = require('jquery'),
    // ServerConfigMd = require('./models/serverConfigMd'),
    // ServerConnection = require('./ServerConnection'),
    ServerConfigsCl = require('../collections/serverConfigsCl'),
    ServerConnectModal = require('./views/ServerConnectModal'),
    _app;

function App() {
  var activeServerConfig;

  // ensure we're a singleton
  if (_app) return _app;

  _app = this;
  this._awayCounts = null;
  this._notifUnread = 0;
  this._chatMessagesUnread = 0;

  // TODO: what is wrong with the localStorage adapter??? shouldn't need
  // to manually provide the data to the model. All that should be needed
  // is an ID and then a subsequent fetch, but that doesn't return the data.
  // Investigate!
  // this.serverConfig = new ServerConfigMd( JSON.parse(localStorage['_serverConfig-1'] || '{}') );

  // serverConfigMd.fetch();
  // if (!localStorage['_serverConfig-1']) {
  //   this.serverConfig.save();
  // }  

  // this.connectHeartbeatSocket();

  // this.server = new Server();
  // this.serverConnectModal = new ServerConnectModal({ server: this.server });

  // if (this.server.getConfig()) {
  //   this.server.connect(this.server.getConfig());
  // } else {
  //   if (remote.getGlobal('installerLaunched')) {
  //     this.server.connect(
  //       this.serverConfigs.create()
  //     );
  //   } else {

  //   }
  // }
  this._heartbeatSocket = new Socket();

  this.serverConfigs = new ServerConfigsCl();
  this.serverConfigs.fetch();
}

App.prototype.getServerConfig = function() {
  var config = this.serverConfigs.get(localStorage.activeServer);

  if ((!localStorage.activeServer !! !config) && this.serverConfigs.length) {
    localStorage.activeServer = this.serverConfigs.at(this.serverConfigs.length - 1).id;
  }

  return config;  
};

App.prototype.setServerConfig = function(id) {
  if (!this.serverConfigs.get(id)) {
    throw new Error(`Unable to set the server config. It must be an id of one of the available
        server configs stored via the ServerConfigs collection.`)
  }

  localStorage.activeServer = id;
};

App.prototype.connectHeartbeatSocket = function() {
  var config;

  if (!(config = this.getServerConfig())) {
    throw new Error(`No server config is set. Please set one via setServerConfig().`);
  }

  this._heartbeatSocket.connect(config.getHeartbeatSocketUrl());
};

App.prototype.getHeartbeatSocket = function() {
  return this._heartbeatSocket;
};

App.prototype.connect: function() {
  var self = this,
      deferred = $.Deferred(),
      promise = deferred.promise(),
      loginRequest,
      login,
      onClose;

  login = function() {
    // check authentication
    loginRequest = this.login().done(function(data) {
      if (data.success) {
        deferred.resolve();
        // self.trigger('connected', true);
      } else {
        if (data.reason === 'too many attempts') {
          deferred.reject('failed-auth-too-many');  
        } else {
          deferred.reject('failed-auth');  
        }

        // self.trigger('connected', false);
      }
    }).fail(function(jqxhr) {
      if (jqxhr.statusText === 'abort') return;
      
      // assuming rest server is down or
      // wrong port set
      deferred.reject();
    });
  };

  app.connectHeartbeatSocket();

  promise.cleanup = function() {
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
    deferred.reject();
  }));    

  return promise;
};

App.prototype.loginOLD = function() {
  return $.ajax({
    url: this.serverConfig.getServerBaseUrl() + '/login',
    method: 'POST',
    data: {
      username: this.serverConfig.get('username'),
      password: this.serverConfig.get('password')
    },
    timeout: 3000
  });  
};

App.prototype.login = function(url) {
  var config;

  if (!(config = this.getServerConfig())) {
    throw new Error(`No server config is set. Please set one via setServerConfig().`);
  }

  // todo ensure url
  return $.ajax({
    url: config.getServerBaseUrl() + '/login',
    method: 'POST',
    data: {
      username: this.serverConfig.get('username'),
      password: this.serverConfig.get('password')
    },
    timeout: 3000
  });  
};

App.prototype.getGuid = function(handle, resolver) {
  var url = resolver || 'https://resolver.onename.com/v2/users/',
      deferred = $.Deferred();

  if (!handle) {
    throw new Error('Please provide a handle.');
  }

  url = url.charAt(url.length - 1) !== '/' ? url + '/' : url;
  url += handle;

  $.get(url).done(function(data){
    if (data && data[handle] && data[handle].profile && data[handle].profile.account){
      var account = data[handle].profile.account.filter(function (accountObject) {
        return accountObject.service == 'openbazaar';
      });

      deferred.resolve(account[0].identifier);
    } else {
      deferred.reject();
    }
  }).fail(function(jqXHR, status, errorThrown){
    deferred.reject();
  });

  return deferred.promise();
};

App.prototype.playNotificationSound = function() {
  if (!this._notificationSound) {
    this._notificationSound = document.createElement('audio');
    this._notificationSound.setAttribute('src', './audio/notification.mp3');
  }

  this._notificationSound.play();
};

App.prototype.showOverlay = function() {
  this._$overlay = this._$overlay || $('#overlay');
  this._$overlay.removeClass('hide');
};

App.prototype.hideOverlay = function() {
  this._$overlay = this._$overlay || $('#overlay');
  this._$overlay.addClass('hide');
};

App.prototype.setUnreadCounts = function(notif, chat) {
  this._notifUnread = typeof notif === 'number' ? notif : this._notifUnread;
  this._chatMessagesUnread = typeof chat === 'number' ? chat : this._chatMessagesUnread;

  this._awayCounts = this._notifUnread + this._chatMessagesUnread;
  ipcRenderer.send('set-badge', this._awayCounts || '');
};

App.prototype.setUnreadNotifCount = function(count) {
  if (typeof count !== 'undefined' && count !== null) {
    this.setUnreadCounts(parseInt(count));
  }
};

App.prototype.setUnreadChatMessageCount = function(count) {
  if (typeof count !== 'undefined' && count !== null) {
    this.setUnreadCounts(null, parseInt(count));
  }
};

App.getApp = function() {
  if (!_app) {
    throw new Error('The app instance was never instantiated and is therefore not available.');
  }

  return _app;
};

module.exports = App;