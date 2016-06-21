"use strict";
/* eslint no-unused-vars: "off" */

// Check that the deps in node_modules match what's in package.json.
var safestart = require('safestart');
safestart(__dirname);

var fs = require('fs'),
    path = require('path'),
    argv = require('yargs').argv,
    app = require('app'),
    electron = require('electron'),
    browserWindow = require('browser-window'),
    request = require('request'),
    os = require('os'),
    autoUpdater = require('auto-updater'),
    menu = require('menu'),
    tray = require('tray'),
    ini = require('ini'),
    dialog = require('dialog'),
    ipcMain = require('ipc-main'),
    open = require('open');

var launched_from_installer = false;
var platform = os.platform();
switch (platform) {
  case "darwin":
    platform = "mac";
}
var version = app.getVersion();
var trayMenu = null;
var subpy = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

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
  }

  function install(cb) {
    var target = path.basename(process.execPath);
    exeSquirrelCommand(["--createShortcut", target], cb);
  }

  function uninstall(cb) {
    var target = path.basename(process.execPath);
    exeSquirrelCommand(["--removeShortcut", target], cb);
  }

  switch (squirrelCommand) {
  case '--squirrel-install':
    install(app.quit);
    break;

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
if (platform == "mac" || platform == "linux") {
  daemon = "openbazaard";
}

var serverPath = __dirname + path.sep + '..' + path.sep + 'OpenBazaar-Server' + path.sep,
    serverOut = '',
    serverRunning = false,
    pendingKill,
    startAfterClose;

var kill_local_server = function() {
  if (subpy) {
    if (pendingKill) {
      startAfterClose && pendingKill.removeListener('close', startAfterClose);
      return;
    } else if (!serverRunning) {
      return;
    }
    pendingKill = subpy;
    pendingKill.once('close', () => {
      pendingKill = null;
    });

    console.log('Shutting down server daemon');

    if (platform == "mac" || platform == "linux") {
      subpy.kill('SIGINT');
    } else {
      require('child_process').spawn("taskkill", ["/pid", subpy.pid, '/f', '/t']);
    }
  }
};

var start_local_server = function() {
  if(fs.existsSync(serverPath)) {
    if (pendingKill) {
      pendingKill.once('close', startAfterClose = () => {
        start_local_server();
      });

      return;
    }

    if (serverRunning) return;

    console.log('Starting OpenBazaar Server');

    var random_port = Math.floor((Math.random() * 10000) + 30000);

    subpy = require('child_process').spawn(serverPath + daemon, ['start', '--loglevel', 'debug', '-p', random_port], {
      detach: false,
      cwd: __dirname + path.sep + '..' + path.sep + 'OpenBazaar-Server'
    });

    serverRunning = true;

    var stdout = '';
    var stderr = '';

    subpy.stdout.on('data', function (buf) {
      console.log('[STR] stdout "%s"', String(buf));
      stdout += buf;
      serverOut += buf;
    });
    subpy.stderr.on('data', function (buf) {
      console.log('[STR] stderr "%s"', String(buf));
      fs.appendFile(__dirname + path.sep + "python_error.log", String(buf), function(err) {
          if(err) {
              return console.log(err);
          }
      });
      stderr += buf;
    });
    subpy.on('error', function (err) {
      console.log('Python error %s', String(err));
      fs.appendFile(__dirname + path.sep + "python_error.log", String(err), function(error) {
          if(error) {
              return console.log(error);
          }
      });
    });
    subpy.on('close', function (code) {
      console.log('exited with ' + code);
      console.log('[END] stdout "%s"', stdout);
      console.log('[END] stderr "%s"', stderr);
      serverRunning = false;
    });
    subpy.unref();
  } else {
    mainWindow && mainWindow.webContents.executeJavaScript("console.log('Unable to find OpenBazaar-Server at: '" + serverPath + "')");
  }
  if (fs.existsSync(__dirname + path.sep + '..' + path.sep + 'gpg')) {
       process.env.PATH = __dirname + path.sep + '..' + path.sep + 'gpg' + path.sep + 'pub' + path.sep + ';' + process.env.PATH;
   }
};

// Check if we need to kick off the python server-daemon (Desktop app)
if(fs.existsSync(__dirname + path.sep + ".." + path.sep + "OpenBazaar-Server" + path.sep + daemon)) {
  global.launched_from_installer = launched_from_installer = true;
}

ipcMain.on('activeServerChange', function(event, server) {
  if (launched_from_installer) {
    if (server.default) {
      start_local_server();
    } else {
      kill_local_server();
    }
  }
});

// Report crashes to our server.
//require('crash-reporter').start();

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
    });

    setProtocol();

    function setProtocol (err) {
      if (err) console.log.error(err.message);
      console.log(protocolKey);
      protocolKey.set('', Registry.REG_SZ, name, setURLProtocol);
    }

    function setURLProtocol (err) {
      if (err) console.log.error(err.message);
      console.log(protocolKey);
      protocolKey.set('URL Protocol', Registry.REG_SZ, '', setIcon);
    }

    function setIcon (err) {
      if (err) console.log.error(err.message);

      var iconKey = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Classes\\' + protocol + '\\DefaultIcon'
      });
      iconKey.set('', Registry.REG_SZ, icon, setCommand);
    }

    function setCommand (err) {
      if (err) console.log.error(err.message);

      var commandKey = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Classes\\' + protocol + '\\shell\\open\\command'
      });
      commandKey.set('', Registry.REG_SZ, '"' + command + '" "%1"', done);
    }

    function done (err) {
      if (err) console.log.error(err.message);
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

if (iShouldQuit) app.quit();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (platform != 'mac') {
    app.quit();
  }
});

// You can use 'before-quit' instead of (or with) the close event
app.on('before-quit', function () {
    // Handle menu-item or keyboard shortcut quit here
    console.log('Closing Application');
    if (launched_from_installer) {
      kill_local_server();
    }
});

app.commandLine.appendSwitch('ignore-certificate-errors', true);

var rightClickMenu = menu.buildFromTemplate([
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        role: 'undo'
      }, {
        label: 'Redo',
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        role: 'cut'
      }, {
        label: 'Copy',
        role: 'copy'
      }, {
        label: 'Paste',
        role: 'paste'
      }, {
        label: 'Paste and Match Style',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.pasteAndMatchStyle();
          }
        }
      },
      {
        label: 'Select All',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      },
      {
        label: 'Toggle Full Screen',
        click: function(item, focusedWindow) {
          var fullScreen;

          if (focusedWindow) {
            fullScreen = !focusedWindow.isFullScreen();
            focusedWindow.setFullScreen(fullScreen);

            if (fullScreen) {
              focusedWindow.webContents.send('fullscreen-enter');
            } else {
              focusedWindow.webContents.send('fullscreen-exit');
            }
          }
        }
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Maximize',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.maximize();
          }
        }
      },
      {
        label: 'Unmaximize',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.unmaximize();
          }
        }
      },
      {
        label: 'Minimize',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.minimize();
          }
        }
      }
    ]
  }
]);

ipcMain.on('contextmenu-click', function() {
  rightClickMenu.popup();
});

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
            }
            return 'Ctrl+Shift+I';
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
            }
            return 'F11';
          })(),
          click: function() {
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
        }    
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
  var template = [
    {
      label: 'Start Local Server', type: 'normal', click: function () {
      start_local_server();
    }
    },
    {
      label: 'Shutdown Local Server', type: 'normal', click: function () {
        request('http://localhost:18469/api/v1/shutdown', function (error, response) {
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
      var debugPath = serverPath + 'debug.txt';

      fs.writeFile(debugPath, serverOut, (err) => {
        if (err) {
          dialog.showErrorBox('Unable To Open Debug Log',
            'There was an error and we are unable to open the server debug log at this time.\n\n' + err);
        }

        open(debugPath);
      });
    }},
    {label: 'Send Debug Package', type: 'normal', click: function() {
      var body = 'OpenBazaar Debug Report\n\n';
      body += 'OS: ' + os.platform() + ' ' + os.release() + '\n';
      body += 'Architecture: ' + os.arch() + '\n';
      body += 'CPUs: ' + JSON.stringify(os.cpus(), null, 2) + '\n';
      body += 'Free Memory: ' + os.freemem() + '\n';
      body += 'Total Memory: ' + os.totalmem() + '\n\n';
      body += 'Debug Log:\n';
      body += serverOut;

      open('mailto:project@openbazaar.org?subject=OpenBazaar Debug Report&body=' + body);

    }}
  ];

  if(launched_from_installer) {
    template.push({label: 'View Python Error Log', type: 'normal', click: function() {
      var logPath = __dirname + path.sep + 'python_error.log';
      open(logPath);
    }});
  }

  template.push(
    {
      type: 'separator'
    },
    {
      label: 'Quit', type: 'normal', accelerator: 'Command+Q', click: function () {
        app.quit();
      }
    }
  );

  var contextMenu = menu.buildFromTemplate(template);

  trayMenu.setContextMenu(contextMenu);

  // Create the browser window.
  mainWindow = new browserWindow({
    "width": 1200,
    "height": 760,
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

    if (launched_from_installer) kill_local_server();
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

  ipcMain.on('installUpdate', function() {
    console.log('Installing Update');
    autoUpdater.quitAndInstall();
  });

  var feedURL = 'https://updates.openbazaar.org:5001/update/' + platform + '/' + version;
  autoUpdater.setFeedURL(feedURL)
  mainWindow.webContents.executeJavaScript("console.log('Checking for new versions at " + feedURL + " ...')");

  // Check for updates every hour
  autoUpdater.checkForUpdates();
  setInterval(function () {
      autoUpdater.checkForUpdates();
  }, 3600000);

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

// some cleanup when our app is exiting
process.on('exit', () => {
  kill_local_server();
});
