'use strict';
var electronModules = ['electron', 'app', 'browser-window', 'crash-reporter', 'remote', 'shell', 'clipboard', 'screen', 'tray', 'menu', 'auto-updater', 'ipc-renderer', 'ipc-main'];

module.exports = function redirect(request) {
  // Tell valiquire to ignore these modules
  if(~electronModules.indexOf(request)) return null;

  // all others we don't redirect
  return request;
};
