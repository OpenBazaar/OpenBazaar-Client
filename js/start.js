'use strict';

var App = require('./App'),
    app = new App();

var __ = window.__ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    Config = require('./config');
Backbone.$ = $;
//add to global scope for non-modular libraries
window.Backbone = Backbone;
window.$ = $;
window.jQuery = $;
window.Backbone.$ = $;
window.config = Config;
window.focused = true;

// we need to know this for notifications
window.onfocus = function() {
  window.focused = true;
};

window.onblur = function() {
  window.focused = false;
};

var Polyglot = require('node-polyglot'),
    ipcRenderer = require('ipc-renderer'),
    remote = require('electron').remote,
    getBTPrice = require('./utils/getBitcoinPrice'),
    router = require('./router'),
    userModel = require('./models/userMd'),
    userProfileModel = require('./models/userProfileMd'),
    languagesModel = require('./models/languagesMd'),
    mouseWheel = require('jquery-mousewheel'),
    mCustomScrollbar = require('./utils/jquery.mCustomScrollbar.js'),
    setTheme = require('./utils/setTheme.js'),
    pageNavView = require('./views/pageNavVw'),
    ChatVw = require('./views/chatVw'),
    StatusBarView = require('./views/statusBarVw'),
    AppBarVw = require('./views/appBarVw'),
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    cCode = "",
    $html = $('html'),
    LoadingModal = require('./views/loadingModal'),
    SimpleMessageModal = require('./views/simpleMessageModal'),
    ServerConfigsCl = require('./collections/serverConfigsCl'),
    ServerConnectModal = require('./views/serverConnectModal'),
    OnboardingModal = require('./views/onboardingModal'),
    PageConnectModal = require('./views/pageConnectModal'),
    Dialog = require('./views/dialog.js'),
    loadProfileNeeded = true,
    startUpConnectMaxRetries = 2,
    startUpConnectRetryDelay = 2 * 1000,
    startUpConnectMaxTime = 6 * 1000,
    startTime = Date.now(),
    startUpRetry,
    removeStartupRetry,
    onActiveServerSync,
    newPageNavView,
    newSocketView,
    startUpLoadingModal,
    onboardingModal,
    pageConnectModal,
    launchOnboarding,
    setServerUrl,
    guidCreating,
    platformClass,
    updatePolyglot,
    validateLanguage;

if (process.platform === 'darwin') {
  platformClass = 'platform-mac';
} else if (process.platform === 'win32') {
  platformClass = 'platform-win';
} else {
  // http://stackoverflow.com/a/8684009
  // could be linux, sunos or freebsd
  platformClass = `platform-${process.platform}`;
}

$html.addClass(platformClass);

validateLanguage = function(lang){
  //check to see if the language exists in the language model
  if (__.where(languages.get('languages'), {langCode: lang}).length) {
    return lang;
  }
  return "en-US"; //if language is not found, use English
};

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot();

(updatePolyglot = function(lang){
  lang = validateLanguage(lang);//make sure the language is valid
  window.lang = lang; //put language in the window so all templates and models can reach it. It's especially important in formatting currency.
  localStorage.setItem('lang', lang);
  window.polyglot.extend(require('./languages/' + lang + '.json'));
})(localStorage.getItem('lang'));

user.on('change:language', function(md, lang) {
  // Re-starting the app on lang change. For now leaving in the code in various global views
  // that deals with lang change.
  // TODO: Once it looks like the restart on lang change approach is fine, go into the different
  // views and cleanup any code dealing with lang change.

  updatePolyglot(lang);
});

//put the event bus into the window so it's available everywhere
window.obEventBus = __.extend({}, Backbone.Events);

startUpLoadingModal = new LoadingModal({
  showLoadIndexButton: false
});
startUpLoadingModal.render().open();

// add in our app bar
app.appBar = new AppBarVw({
  el: '#appBar'
}).render();

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  ipcRenderer.send('contextmenu-click', e);
}, false);

app.serverConfigs = new ServerConfigsCl();
app.serverConfigs.fetch().done(() => {
  var oldConfig,
      defaultConfig;

  if (!app.serverConfigs.getActive()) {
    defaultConfig = app.serverConfigs.create({
      name: window.polyglot.t('serverConnectModal.defaultServerName'),
      default: true
    });

    // migrate any existing connection from the
    // old single config set-up (_serverConfig-1)
    if (oldConfig = localStorage['_serverConfig-1']) { // eslint-disable-line no-cond-assign
      oldConfig = JSON.parse(oldConfig);

      // don't create a ported connection if it's the same as the default one
      if (
        oldConfig.server_ip +
        oldConfig.rest_api_port +
        oldConfig.api_socket_port +
        oldConfig.SSL !==
        defaultConfig.get('server_ip') +
        defaultConfig.get('rest_api_port') +
        defaultConfig.get('api_socket_port') +
        defaultConfig.get('SSL')
      ) {
        app.serverConfigs.setActive(
          app.serverConfigs.create(
            __.extend(
              {},
              __.omit(oldConfig, ['local_username', 'local_password', 'id']),
              { name: window.polyglot.t('serverConnectModal.portedConnectionName') }
            )
          ).id
        );
      }

      defaultConfig.save({
        username: oldConfig.username,
        password: oldConfig.password
      });

      localStorage.removeItem('_serverConfig-1');
    } else {
      app.serverConfigs.setActive(defaultConfig.id);
    }
  }
});

ipcRenderer.send('activeServerChange', app.serverConfigs.getActive().toJSON());

app.serverConfigs.on('activeServerChange', (server) => {
  ipcRenderer.send('activeServerChange', server.toJSON());
});

//keep user and profile urls synced with the active server configuration
(setServerUrl = function() {
  var baseServerUrl = app.serverConfigs.getActive().getServerBaseUrl();

  user.urlRoot = baseServerUrl + "/settings";
  user.set('serverUrl', baseServerUrl + '/');
  userProfile.urlRoot = baseServerUrl + "/profile";
})();

app.serverConfigs.getActive().on('sync', onActiveServerSync = function() {
  setServerUrl();
});

app.serverConfigs.on('activeServerChange', () => {
  setServerUrl();
  app.serverConfigs.getActive().off('sync', onActiveServerSync);
});

// fix zoom issue on Linux hiDPI
var platform = process.platform;

if (platform === "linux") {
  var scaleFactor = require('screen').getPrimaryDisplay().scaleFactor;
  if (scaleFactor === 0) {
    scaleFactor = 1;
  }
  $("body").css("zoom", 1 / scaleFactor);
}

//open external links in a browser, not the app
$('body').on('click', 'a', function(e){
  var targUrl = $(e.target).closest("a").attr("href") || $(e.target).text(),
      linkPattern = /[a-zA-Z]+:\/\//; //find any text:// in link. It may not start at the first character of href

  if (targUrl.startsWith('ob')){
    e.preventDefault();
    app.router.translateRoute(targUrl.replace('ob://', '')).done((route) => {
      Backbone.history.navigate(route, {trigger: true});
    });
  } else if (linkPattern.test(targUrl) || $(this).is('.js-externalLink, .js-externalLinks a, .js-listingDescription')){
    e.preventDefault();

    if (!/^https?:\/\//i.test(targUrl)) {
      targUrl = 'http://' + targUrl;
    }
    require("shell").openExternal(targUrl);
  } else if ($(e.target).closest("a").attr("href") && !targUrl.startsWith('#')){ //internal links should start with #
    e.preventDefault(); //just ignore any anchor with an href that is not a valid internal link
  }
});

$(document).on('mouseenter',
  `.js-userPageAboutSection a:not(.tooltip),
   .js-item .js-description a:not(.tooltip)`,
  function() {
    var thisHref = $(this).attr('href'),
        linkPattern = /^[a-zA-Z]+:\/\//;
    if (thisHref && linkPattern.test(thisHref)){
      $(this).attr({
        'data-tooltip': thisHref,
        'data-href-tooltip': true
      }).addClass('tooltip');
    }
  });

$(document).on('mouseleave', 'a[data-href-tooltip]', function() {
  $(this).removeAttr('data-tooltip')
    .removeAttr('data-href-tooltip')
    .removeClass('tooltip');
});

//record changes to the app state
$(window).bind('hashchange', function(){
   const host = encodeURIComponent(app.serverConfigs.getActive().getServerBaseUrl());
   const route =  Backbone.history.getFragment();
  localStorage.setItem(host, route);
});

//set minimized effects styles class
if (localStorage.getItem('minEffects') == "true"){
  $html.addClass('minEffects');
}

//prevent dragging a file to the window from loading that file
window.addEventListener("dragover", function(e){
  e = e || event;
  e.preventDefault();
}, false);
window.addEventListener("drop", function(e){
  e = e || event;
  e.preventDefault();
}, false);

//prevent enter from submitting forms
$('body').on('keypress', 'input', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

//keyboard shortucts
$(window).bind('keydown', function(e) {
  var char = String.fromCharCode(e.which).toLowerCase(),
      ctrl = (e.ctrlKey || e.metaKey) && !e.altKey, //test for alt key to prevent international keyboard issues
      route = null;

  if (e.keyCode == 116) { //on F5 press
    Backbone.history.loadUrl();
  }

  if (ctrl) {
    switch (char) {
    case window.config.keyShortcuts.undo:
      e.preventDefault();
        //run undo programmatically to avoid crash
      document.execCommand('undo');
      break;
    case window.config.keyShortcuts.discover:
      route = 'home';
      break;
    case window.config.keyShortcuts.myPage:
      route = 'userPage';
      break;
    case window.config.keyShortcuts.customizePage:
      route = 'userPage/' + user.get('guid') + '/customize';
      break;
    case window.config.keyShortcuts.create:
      route = 'userPage/' + user.get('guid') + '/listingNew';
      break;
    case window.config.keyShortcuts.purchases:
      route = 'transactions/purchases';
      break;
    case window.config.keyShortcuts.sales:
      route = 'transactions/sales';
      break;
    case window.config.keyShortcuts.cases:
      route = 'transactions/cases';
      break;
    case window.config.keyShortcuts.settings:
      route = 'settings';
      break;
    case window.config.keyShortcuts.addressBar:
        // Select all text in address bar
      $('.js-navAddressBar').select();
      break;
    case window.config.keyShortcuts.save:
      window.obEventBus.trigger('saveCurrentForm');
      break;
    case window.config.keyShortcuts.refresh:
      e.preventDefault();
      app.router.refresh();
      break;
    case window.config.keyShortcuts.restart:
      location.reload();
      break;
    }

    if (route !== null) {
      e.preventDefault();

      if (location.hash.startsWith('#' + route)) {
        // Hard refresh if we're already on the page we're trying to route to
        // so a cached page is not served.
        app.router.refresh();
      } else {
        Backbone.history.navigate(route, {
          trigger: true
        });
      }
    }
  }
});

//manage app being or not in fullscreen mode
ipcRenderer.on('fullscreen-enter', () => {
  $('body').addClass('fullscreen');
});

ipcRenderer.on('fullscreen-exit', () => {
  $('body').removeClass('fullscreen');
});

//implement our statusBar view
app.statusBar = new StatusBarView();
$('#statusBar').html(app.statusBar.render().el);

var setCurrentBitCoin = function(cCode, userModel, callback) {
  getBTPrice(cCode, function (btAve, currencyList) {
    //put the current bitcoin price in the window so it doesn't have to be passed to models
    if (!btAve){
      currencyList = currencyList.join("\n");
      alert("Bitcoin prices for your selected currency are not available. Your currency has been set to BTC. " +
          "You can change this in the settings console. \n\n The following currencies are available: \n\n" + currencyList);
      window.currentBitcoin = 1;
      userModel.set('currency_code', 'BTC');
    }
    window.currentBitcoin = btAve;
    typeof callback === 'function' && callback();
  });
};

var profileLoaded;
var loadProfile = function(landingRoute, onboarded) {
  var externalRoute = remote.getGlobal('externalRoute');

  landingRoute = landingRoute && landingRoute != undefined ? landingRoute : '#';

  profileLoaded = true;

  //get the guid from the user profile to put in the user model
  userProfile.fetch({
    timeout: 4000,
    success: function (model, response) {
      //make sure profile is not blank
      if (response.profile){
        setTheme(model.get('profile').primary_color, model.get('profile').secondary_color, model.get('profile').background_color, model.get('profile').text_color);
        //get the user
        user.fetch({
          success: function (model) {
            var userLang = model.get('language');
            cCode = model.get('currency_code');

            if(userLang != window.polyglot.currentLocale){
              //when switching nodes, the language saved in localStorage can be different than the language in the
              // user model, but the user model does not trigger a change because it hasn't changed
              updatePolyglot(userLang);
            }

            //get user bitcoin price before loading pages
            setCurrentBitCoin(cCode, user, function() {
              newSocketView = new socketView();

              app.pageNav = newPageNavView = new pageNavView({
                model: user,
                socketView: newSocketView,
                userProfile: userProfile,
                showDiscIntro: onboarded
              });

              newPageNavView.render();

              app.chatVw = new ChatVw({
                model: user,
                socketView: newSocketView
              });

              $('#sideBar').html(app.chatVw.render().el);
              startUpLoadingModal.remove();

              // setting up a loadingModal instance that can be used app-wide as necessary.
              app.loadingModal = new LoadingModal({
                dismissOnOverlayClick: false,
                dismissOnEscPress: false,
                showCloseButton: false
              }).render();
              app.loadingModal.__origRemove = app.loadingModal.remove;
              app.loadingModal.remove = () => {
                throw new Error('This instance of the loadingModal is globally shared ' +
                  'and should not be removed. When you are done with it, please close it.');
              };

              // setting up a simpleMessageModal instance that can be used app-wide as necessary.
              app.simpleMessageModal = new SimpleMessageModal({
                removeOnClose: false
              });
              app.simpleMessageModal.__origRemove = app.simpleMessageModal.remove;
              app.simpleMessageModal.remove = () => {
                throw new Error('This instance of the simpleMessageModal is globally shared ' +
                  'and should not be removed. When you are done with it, please close it.');
              };

              // any lang changes after our app has loaded will need an app re-start to fully take effect
              user.on('change:language', function() {
                var restartWarning;

                restartWarning = new Dialog({
                  title: window.polyglot.t('langChangeRestartTitle'),
                  message: window.polyglot.t('langChangeRestartMessage'),
                  buttons: [{
                    text: 'Restart Later',
                    fragment: 'restart-later'
                  }, {
                    text: 'Restart Now',
                    fragment: 'restart-now'
                  }]
                }).on('click-restart-later', () => {
                  restartWarning.close();
                }).on('click-restart-now', () => {
                  location.reload();
                }).render().open();
              });

              // If navigating to a page you're already on, we'll hard refresh so
              // a cached page is not served, which avoids the issue of it looking
              // like nothing happened.
              $(document).on('click', '[href^="#"]', (e) => {
                var href = $(e.target).attr('href');

                if (location.hash.startsWith(href)) {
                  app.router.refresh();
                  e.preventDefault();
                }
              });

              app.router = new router({userModel: user, userProfile: userProfile, socketView: newSocketView});

              if (externalRoute) {
                app.router.translateRoute(externalRoute).done((translatedRoute) => {
                  location.hash = translatedRoute;
                  Backbone.history.start();
                });
              } else {
                location.hash = landingRoute;
                Backbone.history.start();
              }
            });

            //every 15 minutes update the bitcoin price for the currently selected currency
            window.bitCoinPriceChecker = setInterval(function () {
              setCurrentBitCoin(model.get('currency_code'), user);
            }, 54000000);
          },
          error: function(model, response){
            console.log(response);
            alert("Your settings could not be loaded");
          }
        });
      } else {
        alert("Your profile could not be loaded.");
      }
    }
  });
};

$(document).ajaxSend(function(e, jqXhr) {
  // With this we could map ajax responses to the server config
  // that was active when they were initiated.
  jqXhr.serverConfig = app.serverConfigs.getActive();
});

$(document).ajaxError(function(event, jqxhr) {
  if (jqxhr.status === 401 && jqxhr.serverConfig.id === app.serverConfigs.getActive().id) {
    app.serverConnectModal.failConnection('failed-auth', jqxhr.serverConfig)
      .open();
  }
});

launchOnboarding = function(guidCreating) {
  app.serverConnectModal.close();
  onboardingModal && onboardingModal.remove();
  onboardingModal = new OnboardingModal({
    model: user,
    userProfile: userProfile,
    guidCreationPromise: guidCreating,
    dismissOnOverlayClick: false,
    dismissOnEscPress: false,
    showCloseButton: false
  });
  onboardingModal.render().open();
  startUpLoadingModal.close();

  onboardingModal.on('onboarding-complete', function(guid) {
    app.serverConnectModal.succeedConnection(app.serverConfigs.getActive());
    onboardingModal && onboardingModal.remove();
    onboardingModal = null;
    loadProfile('#userPage/' + guid + '/store', true);
    startUpLoadingModal.open();
  });
};

// start - server connection and app initialization flow
(() => {
  var activeServer = app.serverConfigs.getActive();

  pageConnectModal = new PageConnectModal({
    className: 'server-connect',
    initialState: {
      statusText: activeServer && activeServer.get('default') ?
        window.polyglot.t('serverConnectModal.connectingToDefault') :
        window.polyglot.t('serverConnectModal.connectingTo', { serverName: activeServer.get('name') })
    }
  });
})();

pageConnectModal.on('cancel', () => {
  removeStartupRetry();
  app.getHeartbeatSocket()._socket.onclose = null;
  app.getHeartbeatSocket().close();
  pageConnectModal.remove();
  app.serverConnectModal.open();
}).render().open();

app.connectHeartbeatSocket();
app.serverConnectModal = new ServerConnectModal({
  userModel: user
}).render();

app.serverConnectModal.on('connected', () => {
  if (profileLoaded) {
    // If we've already loaded called loadProfile() and then, we connect
    // to a new server (or reconnect to the same server) we'll reload the
    // app since some of the "global" components (Router, PageNav,
    // SocketView...) were not designed to handle a new connection.
    location.reload();
  }
});

app.getHeartbeatSocket().on('open', function() {
  removeStartupRetry();
  pageConnectModal.remove();
  startUpLoadingModal.open();

  if (!profileLoaded) {
    // clear some flags so the heartbeat events will
    // appropriatally loadProfile or launch onboarding
    guidCreating = null;
    loadProfileNeeded = true;
    app.serverConnectModal.close();
    startUpLoadingModal.open();
  }
});

app.getHeartbeatSocket().on('close', startUpRetry = function() {
  if (
    Date.now() - startTime < startUpConnectMaxTime &&
    startUpConnectMaxRetries
  ) {
    startUpRetry.timeout = setTimeout(() => {
      startUpConnectMaxRetries--;
      app.connectHeartbeatSocket();
    }, startUpConnectRetryDelay);
  } else {
    app.serverConnectModal.failConnection(null, app.serverConfigs.getActive())
      .open();
  }
});

removeStartupRetry = function() {
  clearTimeout(startUpRetry.timeout);
  app.getHeartbeatSocket().off('close', startUpRetry);
  app.getHeartbeatSocket().on('close', () => {
    app.serverConnectModal.failConnection(null, app.serverConfigs.getActive());

    if (app.serverConnectModal.getConnectAttempt()) {
      app.serverConnectModal.getConnectAttempt()
        .fail(() => {
          app.serverConnectModal.open();
        });
    } else {
      app.serverConnectModal.open();
    }
  });
};

app.getHeartbeatSocket().on('message', function(e) {
  if (e.jsonData && e.jsonData.status) {
    switch (e.jsonData.status) {
    case 'generating GUID':
      profileLoaded && location.reload();
      if (guidCreating) return;

        // todo: put in some timeout in the off chance the guid
        // creation process doesn't complete after a long time.
      guidCreating = $.Deferred();

        // launch onboarding, pass in guid creating
      launchOnboarding(guidCreating);
      break;
    case 'GUID generation complete':
      profileLoaded && location.reload();

      app.serverConfigs.getActive().save({
        username: e.jsonData.username,
        password: e.jsonData.password
      });

      app.login().done(function() {
        guidCreating.resolve();
      });

      break;
    case 'online':
      if (loadProfileNeeded && !guidCreating) {
        loadProfileNeeded = false;
        onboardingModal && onboardingModal.remove();

        app.login().done(function(data) {
          if (data.success) {
            $.getJSON(app.serverConfigs.getActive().getServerBaseUrl() + '/profile')
                  .done(function(profile, textStatus) {
                    if (textStatus == 'parsererror') {
                      alert(window.polyglot.t('errorMessages.serverError') +"\n\n"+ window.polyglot.t('errorMessages.badJSON'));
                      app.serverConnectModal.failConnection(null, app.serverConfigs.getActive())
                        .open();
                      return;
                    }

                    if (__.isEmpty(profile)) {
                      launchOnboarding(guidCreating = $.Deferred().resolve().promise());
                    } else {
                      app.serverConnectModal.succeedConnection(app.serverConfigs.getActive());
                      loadProfile();
                    }
                  });
          } else {
            app.serverConnectModal.failConnection(
                data.reason === 'too many attempts' ? 'failed-auth-too-many' : 'failed-auth',
                app.serverConfigs.getActive()
              ).open();
          }
        }).fail(function() {
          app.serverConnectModal.failConnection(null, app.serverConfigs.getActive())
              .open();
        });
      }
    }
  }
  if (e.jsonData && e.jsonData.libbitcoin) {
    if (e.jsonData.libbitcoin != "online") {
      if (!this.libbitCoinStatus) {
        this.libbitCoinStatus = app.statusBar.pushMessage({
          type: 'warning',
          msg: '<i>' + window.polyglot.t('LibbitcoinOfflineWarning') + '</i>',
          duration: false
        });
      }
    } else {
      this.libbitCoinStatus && this.libbitCoinStatus.remove();
    }
  }
});
// end - server connection and app initialization flow
