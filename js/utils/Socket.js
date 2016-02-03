var __ = require('underscore'),
    Backbone = require('backbone');

function Socket(url) {
  var self = this;

  if (!url) {
    throw new Error('Please provide an url.');
  }

  __.extend(this, Backbone.Events);

  this.socket = new WebSocket(url);
  this._proxyEvent('onopen');
  this._proxyEvent('onclose');
  // this._proxyEvent('onmessage');
  this._proxyEvent('onerror');

  this.socket.onmessage = function() {
    var args = Array.apply(null, arguments);

    if (args[0] && args[0].data) {
      args[0].jsonData = JSON.parse(args[0].data);
    }

    self.trigger.apply(self, ['message'].concat(Array.apply(null, args)));
  }
}

Socket.prototype._proxyEvent = function(event) {
  var self = this;

  this.socket[event] = function() {
    self.trigger.apply(self, [ event.slice(2) ].concat(Array.apply(null, arguments)));
  };
}

module.exports = Socket;