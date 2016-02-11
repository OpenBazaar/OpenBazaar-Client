var __ = require('underscore'),
    Backbone = require('backbone');

function Socket(url) {
  if (!url) {
    throw new Error('Please provide an url.');
  }

  __.extend(this, Backbone.Events);
  
  this.url = url;
  this.connect();
}

Socket.prototype.connect = function(url) {
  var self = this;

  this.url = url || this.url;

  if (this._socket) {
    this._socket.close();
    this._socket.onopen = null;
    this._socket.onclose = null;
    this._socket.onerror = null;
    this._socket.onmessage = null;
  }

  this._socket = new WebSocket(this.url);
  this._proxyEvent('onopen');
  this._proxyEvent('onclose');
  this._proxyEvent('onerror');

  this._socket.onmessage = function() {
    var args = Array.apply(null, arguments);

    if (args[0] && args[0].data) {
      args[0].jsonData = JSON.parse(args[0].data);
    }

    self.trigger.apply(self, ['message'].concat(Array.apply(null, args)));
  }
};

Socket.prototype._proxyEvent = function(event) {
  var self = this;

  this._socket[event] = function(e) {
    self.trigger.apply(self, [event.slice(2)].concat(Array.apply(null, arguments)));
  };
};

Socket.prototype.close = function() {
  this._socket.close.apply(this._socket, arguments);
};

Socket.prototype.send = function() {
  this._socket.send.apply(this._socket, arguments);
};

Socket.prototype.getReadyState = function() {
  return this._socket.readyState;
};

module.exports = Socket;