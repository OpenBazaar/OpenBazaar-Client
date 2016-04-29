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
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    cCode = "",
    $loadingModal = $('.js-loadingModal'),
    ServerConfigsCl = require('./collections/serverConfigsCl'),
    ServerConnectModal = require('./views/serverConnectModal'),
    OnboardingModal = require('./views/onboardingModal'),
    PageConnectModal = require('./views/pageConnectModal'), 
    serverConfigMd = app.serverConfig,
    heartbeat = app.getHeartbeatSocket(),
    loadProfileNeeded = true,
    startUpConnectMaxRetries = 2,
    startUpConnectRetryDelay = 2 * 1000,
    startUpConnectMaxTime = 6 * 1000,
    startTime = Date.now(),
    startUpRetry,
    removeStartupRetry,
    onActiveServerSync,
    extendPolyglot,
    newPageNavView,
    newSocketView,
    serverConnectModal,
    onboardingModal,
    pageConnectModal,
    launchOnboarding,
    setServerUrl,
    guidCreating;

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
//retrieve the stored value, since user is a blank model at this point
window.lang = localStorage.getItem('lang') || "en-US";

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

(extendPolyglot = function(lang) {
  // Make sure the language exists in the languages model
  if (__.where(languages.get('languages'), {langCode: window.lang}).length) {
    var language = require('./languages/' + window.lang + '.json');

    window.polyglot.extend(language);
  }
})(window.lang);

user.on('change:language', function(md, lang) {
  window.lang = lang;
  extendPolyglot(lang);
  localStorage.setItem('lang', lang);
  //trigger translation function on index
  window.translateIndex();

});

app.serverConfigs = new ServerConfigsCl();
app.serverConfigs.fetch().done(() => {
  if (!app.serverConfigs.getActive()) {
    app.serverConfigs.setActive(
      app.serverConfigs.create({
        name: polyglot.t('serverConnectModal.defaultServerName'),
        default: true
      }).id
    );
  }  
});

//keep user and profile urls synced with the active server configuration
(setServerUrl = function() {
  var baseServerUrl = app.serverConfigs.getActive().getServerBaseUrl();

  user.urlRoot = baseServerUrl + "/settings";
  user.set('serverUrl', baseServerUrl + '/');
  userProfile.urlRoot = baseServerUrl + "/profile";
})();

app.serverConfigs.getActive().on('sync', (onActiveServerSync = function(md) {
  setServerUrl();
}));

app.serverConfigs.on('activeServerChange', (md) => {
  setServerUrl();
  app.serverConfigs.getActive().off(null, onActiveServerSync);
  app.serverConfigs.getActive().off('sync', onActiveServerSync);
});

//put the event bus into the window so it's available everywhere
window.obEventBus =  __.extend({}, Backbone.Events);

// fix zoom issue on Linux hiDPI
var platform = process.platform;

if(platform === "linux") {
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

  if(targUrl.startsWith('ob')){
    e.preventDefault();
    app.router.translateRoute(targUrl.replace('ob://', '')).done((route) => {
      Backbone.history.navigate(route, {trigger:true});
    });
  } else if(linkPattern.test(targUrl) || $(this).is('.js-externalLink, .js-externalLinks a, .js-listingDescription')){
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
  function(e) {
    var thisHref = $(this).attr('href'),
        linkPattern = /^[a-zA-Z]+:\/\//;
    if(thisHref && linkPattern.test(thisHref)){
      $(this).attr({
        'data-tooltip': thisHref,
        'data-href-tooltip': true
      }).addClass('tooltip');
    }
  });

$(document).on('mouseleave', 'a[data-href-tooltip]', function(e) {
  $(this).removeAttr('data-tooltip')
    .removeAttr('data-href-tooltip')
    .removeClass('tooltip');
});

//record changes to the app state
$(window).bind('hashchange', function(){
  localStorage.setItem('route', Backbone.history.getFragment());
});

//set fancy styles class
if(localStorage.getItem('notFancy') == "true"){
  $('html').addClass('notFancy')
}

//prevent dragging a file to the window from loading that file
window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

//prevent enter from submitting forms
$('body').on('keypress', 'input', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

//keyboard shortucts
$(window).bind('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && !e.altKey) { //test for alt key to prevent international keyboard issues
    var route = null,
        char = String.fromCharCode(e.which).toLowerCase();

    switch (char) {
      case config.keyShortcuts.discover:
        route = 'home';
        break;
      case config.keyShortcuts.myPage:
        route = 'userPage';
        break;
      case config.keyShortcuts.customizePage:
        route = 'userPage/' + user.get('guid') + '/customize';
        break;
      case config.keyShortcuts.create:
        route = 'userPage/' + user.get('guid') + '/listingNew';
        break;
      case config.keyShortcuts.purchases:
        route = 'transactions/purchases';
        break;
      case config.keyShortcuts.sales:
        route = 'transactions/sales';
        break;
      case config.keyShortcuts.cases:
        route = 'transactions/cases';
        break;
      case config.keyShortcuts.settings:
        route = 'settings';
        break;
    }

    if (route !== null) {
      e.preventDefault();
      Backbone.history.navigate(route, {
        trigger: true
      });
    }

    // Select all text in address bar
    if (char === config.keyShortcuts.addressBar) {
      // Select all text in address bar
      $('.js-navAddressBar').select();
    }
  }
});

//manage app being or not in fullscreen mode
ipcRenderer.on('fullscreen-enter', (e) => {
  $('body').addClass('fullscreen');
});

ipcRenderer.on('fullscreen-exit', (e) => {
  $('body').removeClass('fullscreen');
});

//implement our statusBar view
app.statusBar = new StatusBarView();
$('#statusBar').html(app.statusBar.render().el);

var setCurrentBitCoin = function(cCode, userModel, callback) {
  "use strict";
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
      "use strict";
      //make sure profile is not blank
      if (response.profile){
        setTheme(model.get('profile').primary_color, model.get('profile').secondary_color, model.get('profile').background_color, model.get('profile').text_color);
        //get the user
        user.fetch({
          success: function (model, response) {
            cCode = model.get('currency_code');

            //get user bitcoin price before loading pages
            setCurrentBitCoin(cCode, user, function() {
              newSocketView = new socketView({model: serverConfigMd});

              newPageNavView = new pageNavView({
                model: user,
                socketView: newSocketView,
                userProfile: userProfile,
                showDiscIntro: onboarded
              }).render();

              app.chatVw = new ChatVw({
                model: user,
                socketView: newSocketView
              });

              $('#sideBar').html(app.chatVw.render().el);

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

$(document).ajaxSend(function(e, jqXhr, settings) {
  // With this we could map ajax responses to the server config
  // that was active when they were initiated.
  jqXhr.serverConfig = app.serverConfigs.getActive().id;
});

launchOnboarding = function(guidCreating) {
  app.serverConnectModal.close();
  onboardingModal && onboardingModal.remove();
  onboardingModal = new OnboardingModal({
    model: user,
    userProfile: userProfile,
    serverConfig: serverConfigMd,
    guidCreationPromise: guidCreating
  });
  onboardingModal.render().open();

  onboardingModal.on('onboarding-complete', function(guid) {
    app.serverConnectModal.succeedConnection(app.serverConfigs.getActive());
    onboardingModal && onboardingModal.remove();
    onboardingModal = null;
    loadProfile('#userPage/' + guid + '/store', true);
    $loadingModal.removeClass('hide');
  });
};

// start - server connection and app initialization flow
(() => {
  var activeServer = app.serverConfigs.getActive();

  pageConnectModal = new PageConnectModal({
    className: 'startup-server-connect top0',
    initialState: {
      statusText: activeServer && activeServer.get('default') ?
        polyglot.t('serverConnectModal.connectingToDefault') :
        polyglot.t('serverConnectModal.connectingTo', { serverName: activeServer.get('name') })
    }
  });
})()

pageConnectModal.on('cancel', () => {
  removeStartupRetry();
  app.getHeartbeatSocket().close();
  pageConnectModal.remove();
  app.serverConnectModal.open();
}).render().open();

app.connectHeartbeatSocket();
app.serverConnectModal = new ServerConnectModal().render();
app.serverConnectModal.on('connected', (authenticated) => {
  $loadingModal.removeClass('hide');

  if (authenticated) {
    profileLoaded && location.reload();
    app.serverConnectModal.close();
  }
});

app.getHeartbeatSocket().on('open', function(e) {
  removeStartupRetry();
  pageConnectModal.remove();
  $loadingModal.removeClass('hide');
  onboardingModal && onboardingModal.remove();

  // clear some flags so the heartbeat events will
  // appropriatally loadProfile or launch onboarding
  guidCreating = null;
  loadProfileNeeded = true;
});

app.getHeartbeatSocket().on('close', (startUpRetry = function(e) {
  if (
    Date.now() - startTime < startUpConnectMaxTime &&
    startUpConnectMaxRetries
  ) {
    setTimeout(() => {
      startUpConnectMaxRetries--;
      app.connectHeartbeatSocket();
    }, startUpConnectRetryDelay);
  } else {
    app.serverConnectModal.failConnection(null, app.serverConfigs.getActive())
      .open();
  }
}));

removeStartupRetry = function() {
  app.getHeartbeatSocket().off('close', startUpRetry);
  app.getHeartbeatSocket().on('close', () => {
    app.serverConnectModal.failConnection(null, app.serverConfigs.getActive())
      .open();    
  });
};

app.getHeartbeatSocket().on('message', function(e) {
  if (e.jsonData && e.jsonData.status) {
    switch (e.jsonData.status) {
      case 'generating GUID':
        if (guidCreating) return;

        // todo: put in some timeout in the off chance the guid
        // creation process doesn't complete after a long time.
        guidCreating = $.Deferred();

        // launch onboarding, pass in guid creating
        launchOnboarding(guidCreating);
        break;
      case 'GUID generation complete':
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

          app.login().done(function(data) {
            if (data.success) {
              $.getJSON(app.serverConfigs.getActive().getServerBaseUrl() + '/profile')
                  .done(function(profile, textStatus) {
                    if (textStatus == 'parsererror') {
                      alert(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badJSON'));
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
});
// end - server connection and app initialization flow
