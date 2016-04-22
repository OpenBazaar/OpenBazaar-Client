var ServerConfigsCl = require('../collections/serverConfigsCl');

function Server() {
  // ensure we're a singleton
  // if (__server) return __server;

  // __server = this;

  this.serverConfigs = new ServerConfigsCl();
  this.serverConfigs.fetch();
}

Server.prototype.getConfig = function() {
  if (!localStorage.activeServer && this.serverConfigs.length) {
    localStorage.activeServer = this.serverConfigs.at(this.serverConfigs.length - 1).id;
  }

  return this.serverConfigs.get(localStorage.activeServer);
}

// Server.getServer = function() {
//   if (!__serverConnection) {
//     throw new Error('The ServerConnection instance was never instantiated and is therefore not available.');
//   }

//   return __server;
// };

module.exports = Server;