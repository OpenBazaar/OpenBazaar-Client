var ipcRenderer = require('ipc-renderer'),
    Polyglot = require('node-polyglot'),
    __ = require('underscore'),
    $ = require('jquery'),
    Socket = require('./utils/Socket'),
    _app;

function App() {
  var self = this;

  // ensure we're a singleton
  if (_app) return _app;

  _app = this;
  this._awayCounts = null;
  this._notifUnread = 0;
  this._chatMessagesUnread = 0;

  // TODO: rather than attach the serverConfigs CL
  // in main.js, pass in the instance here so the
  // dependency is more explicit.
};

App.prototype.connectHeartbeatSocket = function() {
  var activeServer = this.serverConfigs.getActive();

  if (!activeServer) {
    throw new Error(`No active server set. Please set via the Server Configs collection.`);
  }

  clearTimeout(this.heartbeatSocketTimesup);

  if (this._heartbeatSocket) {
    this._heartbeatSocket.connect(activeServer.getHeartbeatSocketUrl());
  } else {
    this._heartbeatSocket = new Socket(activeServer.getHeartbeatSocketUrl());

    this._heartbeatSocket.on('close', () => {
      clearTimeout(this._heartbeatSocketTimesup);
    });    
  }

  // give up if it takes to long
  this._heartbeatSocketTimesup = setTimeout(() => {
    if (this._heartbeatSocket.getReadyState() !== 1) {
      this._heartbeatSocket._socket.close(); //turn off for now, until server issues are fixed
      // alert(polyglot.t('errorMessages.serverTimeout'));
    }
  }, 10000); //wait for 30 seconds, sometimes the server stalls  
};

App.prototype.getHeartbeatSocket = function() {
  return this._heartbeatSocket;
};

App.prototype.login = function() {
  var activeServer = this.serverConfigs.getActive();

  if (!activeServer) {
    throw new Error(`No active server set. Please set via the Server Configs collection.`);
  }

  return $.ajax({
    url: activeServer.getServerBaseUrl() + '/login',
    method: 'POST',
    data: {
      username: activeServer.get('username'),
      password: activeServer.get('password')
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