var Socket = require('./utils/Socket'),
    ServerConfigMd = require('./models/serverConfigMd'),
    _app;

function App() {
  var self = this;

  // ensure we're a singleton
  if (_app) return _app;

  _app = this;

  // TODO: what is wrong with the localStorage adapter??? shouldn't need
  // to manually provide the data to the model. All that should be needed
  // is an ID and then a subsequent fetch, but that doesn't return the data.
  // Investigate!
  this.serverConfig = new ServerConfigMd( JSON.parse(localStorage['_serverConfig-1'] || '{}') );
  // serverConfigMd.fetch();
  if (!localStorage['_serverConfig-1']) {
    this.serverConfig.save();
  }  

  this.connectHeartbeatSocket();
}

App.prototype.connectHeartbeatSocket = function() {
  var self = this;

  if (this._heartbeatSocket && this._heartbeatSocket.getReadyState() <= 1) {
    return;
  }

  clearTimeout(this.heartbeatSocketTimesup);

  if (this._heartbeatSocket) {
    this._heartbeatSocket.connect(this.serverConfig.getHeartbeatSocketUrl());
  } else {
    this._heartbeatSocket = new Socket(this.serverConfig.getHeartbeatSocketUrl());

    this._heartbeatSocket.on('close', function() {
      clearTimeout(self._heartbeatSocketTimesup);
    });

    // give up if it takes to long
    this._heartbeatSocketTimesup = setTimeout(function() {
      if (self._heartbeatSocket.getReadyState() !== 1) {
        self._heartbeatSocket._socket.close();
      }
    }, 3000);    
  }
};

App.prototype.getHeartbeatSocket = function() {
  return this._heartbeatSocket;
};

App.getApp = function() {
  if (!_app) {
    throw new Error('The app instance was never instantiated and is therefore not available.');
  }

  return _app;
};


module.exports = App;


