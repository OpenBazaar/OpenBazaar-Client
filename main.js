"use strict";

// Check that the deps in node_modules match what's in package.json.
var safestart = require('safestart');
safestart(__dirname);

var fs = require('fs');
var path = require('path');

var app = require('app');  // Module to control application life.
var BrowserWindow = require('electron').BrowserWindow;  // Module to create native browser window.
var request = require('request');
var os = require('os');
var autoUpdater = require('auto-updater');
var electron = require('electron');
var menu = require('menu');
var tray = require('tray');

var launched_from_installer = false;
var platform = os.platform() + '_' + os.arch();
switch(platform) {
  case "darwin_x64":
    platform = "mac";
}
var version = app.getVersion();
var trayMenu = null;
var subpy = null;

var start_local_server = function() {
  var platform = process.platform;

  if(platform == "darwin" || platform == "linux") {
    subpy = require('child_process').spawn('./openbazaard', ['start', '--testnet', '--loglevel', 'debug'], {
      detach: true,
      cwd: __dirname + '/OpenBazaar-Server'
    });
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
    subpy.on('error', function(err) {
      console.log('Python error %s', String(err));
    });
    subpy.on('close', function (code) {
      console.log('exited with ' + code);
      console.log('[END] stdout "%s"', stdout);
      console.log('[END] stderr "%s"', stderr);
    });
    subpy.unref();
  }
};

// Check if we need to kick off the python server-daemon (Desktop app)
if(fs.existsSync(__dirname + path.sep + "OpenBazaar-Server")) {
  launched_from_installer = true;

  console.log('Starting OpenBazaar Server');
  start_local_server();
}

// Report crashes to our server.
//require('crash-reporter').start();

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

// You can use 'before-quit' instead of (or with) the close event
app.on('before-quit', function (e) {
    // Handle menu-item or keyboard shortcut quit here
    console.log('Closing Application');
    if(launched_from_installer) {
      console.log('Shutting down server daemon');
      request('http://localhost:18469/api/v1/shutdown', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Shutting down server');
        } else {
          console.log('Server does not seem to be running.');
        }
      });
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  //var protocol = require('protocol');
  //protocol.registerProtocol('ob', function(request) {
  //  var url = request.url.substr(5);
  //  console.log(path.normalize(__dirname + '/' + url));
  //}, function (error) {
  //  if (error)
  //    console.error('Failed to register protocol')
  //});

  // Application Menu
  var appMenu = menu.buildFromTemplate([
    {
      label: 'OpenBazaar',
      submenu: [
        {
          label: 'Quit OpenBazaar',
          accelerator: 'CmdOrCtrl+Q',
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform == 'darwin') {
              return 'Alt+Command+I';
            } else {
              return 'Ctrl+Shift+I';
            }
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          }
        },
      ]
    }
  ]);
  menu.setApplicationMenu(appMenu);

  // Context Menu for OS X
  if (process.platform == 'darwin') {
    trayMenu = new tray(__dirname + '/imgs/menubar_icon.png');
    var contextMenu = menu.buildFromTemplate([
      {
        label: 'Start Local Server', type: 'normal', click: function () {
        start_local_server();
      }
      },
      {
        label: 'Shutdown Local Server', type: 'normal', click: function () {
        request('http://localhost:18469/api/v1/shutdown', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('Shutting down server');
          } else {
            console.log('Server does not seem to be running.');
          }
        });
      }
      },
      {type: 'separator'},
      {label: 'View Debug Log', type: 'normal'},
      {type: 'separator'},
      {
        label: 'Quit', type: 'normal', accelerator: 'Command+Q', click: function () {
        app.quit();
      }
      }
    ]);

    trayMenu.setContextMenu(contextMenu);
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    "width": 1200,
    "height": 720,
    "min-width": 1024,
    "min-height": 700,
    "center": true,
    "title": "OpenBazaar",
    "frame": false,
    "icon": "imgs/openbazaar-icon.png",
    "title-bar-style": "hidden"
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools({detach: true});

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

  app.on('activate', function() {
    mainWindow.show();
  });

  autoUpdater.on("error", function(err, msg) {
    console.log(msg); //print msg , you can find the cash reason.
  });

  autoUpdater.on("update-not-available", function(msg) {
    console.log(msg); //print msg , you can find the cash reason.
  });

  autoUpdater.on("update-available", function() {
    mainWindow.webContents.send('ping', 'Update available!');
  });

  autoUpdater.on("update-downloaded", function(e, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    mainWindow.webContents.send('ping', 'Update available!');
  });

  autoUpdater.setFeedUrl('http://updates.openbazaar.org:5000/update/' + platform + '/' + version);
  autoUpdater.checkForUpdates();

});
