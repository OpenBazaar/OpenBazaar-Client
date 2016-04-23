"use strict";

// Check that the deps in node_modules match what's in package.json.
var safestart = require('safestart');
safestart(__dirname);

var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;

var app = require('app');  // Module to control application life.
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var request = require('request');
var os = require('os');
var autoUpdater = require('auto-updater');
var menu = require('menu');
var tray = require('tray');
var ipcMain = require('ipc-main');
var ini = require('ini');
var dialog = require('electron').dialog;
var ipcMain = require('electron').ipcMain;

var launched_from_installer = false;
var platform = os.platform();
switch(platform) {
  case "darwin":
    platform = "mac";
}
var version = app.getVersion();
var trayMenu = null;
var subpy = null;

var open_url = null; // This is for if someone opens a URL before the client is open

if (argv.userData) {
  try {
    app.setPath('userData', argv.userData);
  } catch (e) {
    throw new Error('The passed in userData directory does not appear to be valid: ' + e);
  }
}

var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  function exeSquirrelCommand(args, cb) {
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var child = require('child_process').spawn(updateDotExe, args, { detached: true });
    child.on('close', function() {
       cb();
    });
  };

  function install(cb) {
      var target = path.basename(process.execPath);
      exeSquirrelCommand(["--createShortcut", target], cb);
  };

  function uninstall(cb) {
      var target = path.basename(process.execPath);
      exeSquirrelCommand(["--removeShortcut", target], cb);
  };

  switch (squirrelCommand) {
    case '--squirrel-install':
          install(app.quit);

    case '--squirrel-updated':

      // Always quit when done
      app.quit();
      return true;

    case '--squirrel-uninstall':
      // Always quit when done
      uninstall(app.quit);

      return true;
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }
};

if (handleStartupEvent()) {
  console.log('Client started on Windows...');
}

// Set daemon binary name
var daemon = "openbazaard.exe";
if(platform == "mac" || platform == "linux") {
  daemon = "openbazaard";
}

var serverPath = __dirname + path.sep + '..' + path.sep + 'OpenBazaar-Server' + path.sep;
var serverOut = '';

var start_local_server = function() {
  if(fs.existsSync(serverPath)) {

    var random_port = Math.floor((Math.random() * 10000) + 30000);

    subpy = require('child_process').spawn(serverPath + daemon, ['start', '--loglevel', 'debug', '-p', random_port], {
      detach: false,
      cwd: __dirname + path.sep + '..' + path.sep + 'OpenBazaar-Server'
    });

    var stdout = '';
    var stderr = '';

    subpy.stdout.on('data', function (buf) {
      console.log('[STR] stdout "%s"', String(buf));
      stdout += buf;
      serverOut += buf;
    });
    subpy.stderr.on('data', function (buf) {
      console.log('[STR] stderr "%s"', String(buf));
      stderr += buf;
    });
    subpy.on('error', function (err) {
      console.log('Python error %s', String(err));
    });
    subpy.on('close', function (code) {
      console.log('exited with ' + code);
      console.log('[END] stdout "%s"', stdout);
      console.log('[END] stderr "%s"', stderr);
    });
    subpy.unref();
  }
  if (fs.existsSync(__dirname + path.sep + '..' + path.sep + 'gpg')) {
       process.env.PATH = __dirname + path.sep + '..' + path.sep + 'gpg' + path.sep + 'pub' + path.sep + ';' + process.env.PATH;
   }
};

// Check if we need to kick off the python server-daemon (Desktop app)
if(fs.existsSync(__dirname + path.sep + ".." + path.sep + "OpenBazaar-Server" + path.sep + daemon)) {
  launched_from_installer = true;
  console.log('Starting OpenBazaar Server');
  start_local_server();
}

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

if (process.platform === "win32") {
  initWin32();
}

function initWin32() {
  var Registry = require('winreg');

  var iconPath = path.join(process.env.LOCALAPPDATA, "app.ico");
  registerProtocolHandlerWin32('ob', 'URL:OpenBazaar URL', iconPath, process.execPath);

  /**
   * To add a protocol handler, the following keys must be added to the Windows registry:
   *
   * HKEY_CLASSES_ROOT
   *   $PROTOCOL
   *     (Default) = "$NAME"
   *     URL Protocol = ""
   *     DefaultIcon
   *       (Default) = "$ICON"
   *     shell
   *       open
   *         command
   *           (Default) = "$COMMAND" "%1"
   *
   * Source: https://msdn.microsoft.com/en-us/library/aa767914.aspx
   *
   * However, the "HKEY_CLASSES_ROOT" key can only be written by the Administrator user.
   * So, we instead write to "HKEY_CURRENT_USER\Software\Classes", which is inherited by
   * "HKEY_CLASSES_ROOT" anyway, and can be written by unprivileged users.
   */

  function registerProtocolHandlerWin32 (protocol, name, icon, command) {
    var protocolKey = new Registry({
      hive: Registry.HKCU, // HKEY_CURRENT_USER
      key: '\\Software\\Classes\\' + protocol
    })

    setProtocol()

    function setProtocol (err) {
      if (err) log.error(err.message)
      console.log(protocolKey);
      protocolKey.set('', Registry.REG_SZ, name, setURLProtocol)
    }

    function setURLProtocol (err) {
      if (err) log.error(err.message)
      console.log(protocolKey);
      protocolKey.set('URL Protocol', Registry.REG_SZ, '', setIcon)
    }

    function setIcon (err) {
      if (err) log.error(err.message)

      var iconKey = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Classes\\' + protocol + '\\DefaultIcon'
      })
      iconKey.set('', Registry.REG_SZ, icon, setCommand)
    }

    function setCommand (err) {
      if (err) log.error(err.message)

      var commandKey = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Classes\\' + protocol + '\\shell\\open\\command'
      })
      commandKey.set('', Registry.REG_SZ, '"' + command + '" "%1"', done)
    }

    function done (err) {
      if (err) log.error(err.message)
    }
  }
}

var iShouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  var uri = "";
  if (commandLine.length == 2) {
    uri = commandLine[1];
    openURL(uri);
  }

  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
  return true;
});
if(iShouldQuit){app.quit();return;}

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (platform != 'mac') {
    app.quit();
  }
});

// You can use 'before-quit' instead of (or with) the close event
app.on('before-quit', function (e) {
    // Handle menu-item or keyboard shortcut quit here
    console.log('Closing Application');
    if(launched_from_installer) {
      console.log('Shutting down server daemon');
      subpy.kill();
    }
});

app.commandLine.appendSwitch('ignore-certificate-errors', true);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

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
            if (platform == 'mac') {
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
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (platform == 'mac') {
              return 'Ctrl+Command+F';
            } else {
              return 'F11';
            }
          })(),
          click: function(item, focusedWindow) {
            var fullScreen;

            if (mainWindow) {
              fullScreen = !mainWindow.isFullScreen();
              mainWindow.setFullScreen(fullScreen);

              if (fullScreen) {
                mainWindow.webContents.send('fullscreen-enter');
              } else {
                mainWindow.webContents.send('fullscreen-exit');
              }
            }
          }
        },        
      ]
    },
    {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        selector: 'performMiniaturize:',
        accelerator: 'Command+M'
      }
    ]
  }
  ]);
  menu.setApplicationMenu(appMenu);

  // put logic here to set tray icon based on OS
  var osTrayIcon = 'openbazaar-mac-system-tray.png';

  trayMenu = new tray(__dirname + '/imgs/' + osTrayIcon);
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
    {label: 'View Debug Log', type: 'normal', click: function() {
      var debugPath = serverPath + path.sep + 'debug.txt';

      fs.writeFile(debugPath, serverOut, (err) => {
        if (err) {
          dialog.showErrorBox('Unable To Open Debug Log',
            'There was an error and we are unable to open the server debug log at this time.\n\n' + err);
        }
        
        require('open')(debugPath);
      });
    }},
    {type: 'separator'},
    {
      label: 'Quit', type: 'normal', accelerator: 'Command+Q', click: function () {
      app.quit();
    }
    }
  ]);

  trayMenu.setContextMenu(contextMenu);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    "width": 1200,
    "height": 720,
    "minWidth": 1024,
    "minHeight": 700,
    "center": true,
    "title": "OpenBazaar",
    "frame": false,
    "icon": "imgs/openbazaar-icon.png",
    "titleBarStyle": "hidden"
  });

  // and load the index.html of the app.
  if(open_url) {
    mainWindow.loadURL('file://' + __dirname + '/index.html' + open_url);
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  // Open the devtools.
  // Uncomment if you want tools to open on startup
  //mainWindow.openDevTools({detach: true});

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;

    if(subpy) {
      if(platform == "mac" || platform == "linux") {
        subpy.kill('SIGINT');
      } else {
        require('child_process').spawn("taskkill", ["/pid", subpy.pid, '/f', '/t']);
      }
    }

  });

  mainWindow.on('close', function() {
    app.quit();
  });

  app.on('activate', function() {
    mainWindow.show();
  });

  autoUpdater.on("error", function(err, msg) {
    console.log(msg); //print msg , you can find the cash reason.
  });

  autoUpdater.on("update-not-available", function(msg) {
    mainWindow.webContents.executeJavaScript("console.log('Update not available! Your software is up to date.')");
  });

  autoUpdater.on("update-available", function() {
    mainWindow.webContents.executeJavaScript("console.log('Update available! Downloading now...')");
  });

  autoUpdater.on("update-downloaded", function(e, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    mainWindow.webContents.executeJavaScript("console.log('Update downloaded." + updateUrl + "')");
    mainWindow.webContents.executeJavaScript('$(".js-softwareUpdate").removeClass("softwareUpdateHidden");');
  });

  ipcMain.on('installUpdate', function(event) {
    console.log('Installing Update');
    autoUpdater.quitAndInstall();
  });

  var feedURL = 'http://updates.openbazaar.org:5000/update/' + platform + '/' + version;
  autoUpdater.setFeedURL(feedURL);
  mainWindow.webContents.executeJavaScript("console.log('Checking for new versions at " + feedURL + " ...')");
  autoUpdater.checkForUpdates();

});

ipcMain.on('set-badge', function(event, text) {
  typeof text !== 'undefined' && process.platform === 'darwin' &&
    app.dock.setBadge(String(text));
});

function openURL(uri) {
  var split_uri = uri.split('://');
  uri = split_uri[1];

  global.externalRoute = uri;

  if (mainWindow) {
    // if our app router is fully loaded it will process the event sent below, otherwise
    // the global.externalRoute will be used
    mainWindow.webContents.send('external-route', uri);
  }  

}

app.on('open-url', function(event, uri) {
  openURL(uri);
  event.preventDefault();
});
