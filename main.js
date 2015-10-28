"use strict";

// Check that the deps in node_modules match what's in package.json.
var safestart = require('safestart');
safestart(__dirname);

var fs = require('fs');
var path = require('path');

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Check if we need to kick off the python server-daemon (Desktop app)
if(fs.existsSync(__dirname + path.sep + "OpenBazaar-Server")) {
  console.log('Starting OpenBazaar Server');
  var platform = process.platform;

  if(platform == "darwin" || platform == "linux") {
    var subpy = require('child_process').spawn('/usr/local/bin/python', [__dirname + '/OpenBazaar-Server/bootstrap.py', 'testnet'], {detach: true});
    var stdout = '';
    var stderr = '';

    subpy.stdout.on('data', function (buf) {
      console.log('[STR] stdout "%s"', String(buf));
      stdout += buf;
    });
    subpy.stderr.on('data', function (buf) {
      console.log('[STR] stderr "%s"', String(buf));
      stderr += buf;
    });
    subpy.on('close', function (code) {
      console.log('exited with ' + code);
      console.log('[END] stdout "%s"', stdout);
      console.log('[END] stderr "%s"', stderr);
    });
    subpy.unref();
  }
}

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    "width": 1200,
    "height": 720,
    "min-width": 1024,
    "min-height": 700,
    "center": true,
    "title": "OpenBazaar",
    "frame": false,
    "icon": "imgs/openbazaar-icon.png"
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;

    if(subpy) {
      subpy.kill('SIGHUP');
    }
  });

  app.on('activate-with-no-open-windows', function() {
    mainWindow.show();
  });

});
