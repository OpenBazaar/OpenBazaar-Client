'use strict';

var ipcRenderer = require('electron').ipcRenderer,
    $ = require('jquery'),
    Socket = require('./utils/Socket'),
    btcConvert = require('bitcoin-convert'),
    _app;


function App() {
  var self = this;

  // ensure we're a singleton
  if (_app) return _app;

  _app = self;
  this._awayCounts = null;
  this._notifUnread = 0;
  this._chatMessagesUnread = 0;

  // TODO: rather than attach the serverConfigs CL
  // in main.js, pass in the instance here so the
  // dependency is more explicit.
}

App.prototype.connectHeartbeatSocket = function() {
  var activeServer = this.serverConfigs.getActive();

  if (!activeServer) {
    throw new Error(`No active server set. Please set via the Server Configs collection.`);
  }

  if (this._heartbeatSocket) {
    this._heartbeatSocket.connect(activeServer.getHeartbeatSocketUrl());
  } else {
    this._heartbeatSocket = new Socket(activeServer.getHeartbeatSocketUrl());
  }
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
  }).fail(function(){
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

App.prototype.intlNumFormat = function(numberToFormat, maxDigits = 8) {
  return new Intl.NumberFormat(window.lang, {maximumFractionDigits: maxDigits}).format(numberToFormat);
};

App.prototype.getBitcoinUnit = function() {
  if (!this._bitcoinUnit) {
    this._bitcoinUnit = localStorage.getItem('BitcoinUnit') || 'BTC';
  }
  return this._bitcoinUnit;
};

App.prototype.setBitcoinUnit = function(unit) {
  this._bitcoinUnit = unit;
  localStorage.setItem('BitcoinUnit', unit);
};

/**
 * Format a bitcoin amount in the user's locale.
 *
 * @param {Number} amount - Bitcoin (BTC) amount.
 * @param {Number} [maxDigits=8] - Maximum number of fraction digits to display.
 * @returns {String} localised amount ending with ' BTC' or the default bitcoin unit.
 *
 * @see intlNumFormat
 */
App.prototype.formatBitcoin = function(amount, maxDigits) {
  let unit = this.getBitcoinUnit();
  if (unit === 'mBTC') {
    maxDigits = 2;
  } else if (unit !== 'BTC') {
    maxDigits = 0;
  }
  amount = btcConvert(amount, 'BTC', unit);
  return this.intlNumFormat(amount, maxDigits)
    + ' ' + unit;
};

App.getApp = function() {
  if (!_app) {
    throw new Error('The app instance was never instantiated and is therefore not available.');
  }

  return _app;
};

module.exports = App;
