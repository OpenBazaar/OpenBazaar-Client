var ipcRenderer = require('ipc-renderer'),
    Socket = require('./utils/Socket'),
    $ = require('jquery'),
    // ServerConfigMd = require('./models/serverConfigMd'),
    ServerConnection = require('./ServerConnection'),
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

  this.server = new Server();
  this.serverConnectModal = new ServerConnectModal({ server: this.server });

  if (this.server.getConfig()) {
    this.server.connect(this.server.getConfig());
  } else {
    if (remote.getGlobal('installerLaunched')) {
      this.server.connect(
        this.serverConfigs.create()
      );
    } else {

    }
  }
}

App.prototype.connectHeartbeatSocket = function() {
  var self = this;

  clearTimeout(this.heartbeatSocketTimesup);

  if (this._heartbeatSocket) {
    this._heartbeatSocket.connect(this.serverConfig.getHeartbeatSocketUrl());
  } else {
    this._heartbeatSocket = new Socket(this.serverConfig.getHeartbeatSocketUrl());

    this._heartbeatSocket.on('close', function() {
      clearTimeout(self._heartbeatSocketTimesup);
    });
  }

  // give up if it takes to long
  this._heartbeatSocketTimesup = setTimeout(function() {
    if (self._heartbeatSocket.getReadyState() !== 1) {
      //self._heartbeatSocket._socket.close(); //turn off for now, until server issues are fixed
      alert(polyglot.t('errorMessages.serverTimeout'));
    }
  }, 30000); //wait for 30 seconds, sometimes the server stalls
};

App.prototype.getHeartbeatSocket = function() {
  return this._heartbeatSocket;
};

App.prototype.login = function() {
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