var App = require('./App');
    app = new App();

var __ = window.__ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
//add to global scope for non-modular libraries
window.Backbone = Backbone;
window.$ = $;
window.jQuery = $;
window.Backbone.$ = $;
window.focused = true;

// we need to know this for notifications
window.onfocus = function() {
  window.focused = true;
};

window.onblur = function() {
  window.focused = false;
};

var Polyglot = require('node-polyglot'),
    getBTPrice = require('./utils/getBitcoinPrice'),
    router = require('./router'),
    userModel = require('./models/userMd'),
    userProfileModel = require('./models/userProfileMd'),
    languagesModel = require('./models/languagesMd'),
    mouseWheel = require('jquery-mousewheel'),
    mCustomScrollbar = require('./utils/jquery.mCustomScrollbar.js'),
    setTheme = require('./utils/setTheme.js'),
    pageNavView = require('./views/pageNavVw'),
    chatAppView = require('./views/chatAppVw'),
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    cCode = "",
    $loadingModal = $('.js-loadingModal'),
    ServerConnectModal = require('./views/serverConnectModal'),
    OnboardingModal = require('./views/onboardingModal'),
    serverConfigMd = app.serverConfig,
    heartbeat = app.getHeartbeatSocket(),
    loadProfileNeeded = true,
    extendPolyglot,
    newRouter,
    newPageNavView,
    newSocketView,
    newChatAppView,
    serverConnectModal,
    onboardingModal,
    startInitSequence,
    startLocalInitSequence,
    startRemoteInitSequence,
    launchOnboarding,
    launchServerConnect,
    login,
    setServerUrl,
    guidCreating;

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

(extendPolyglot = function(lang) {
  window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);
})(window.lang);

user.on('change:language', function(md, lang) {
  window.lang = lang;
  extendPolyglot(lang);
});

//keep user and profile urls synced with the server configuration
(setServerUrl = function() {
  var baseServerUrl = serverConfigMd.getServerBaseUrl();
  
  user.urlRoot = baseServerUrl + "/settings";
  user.set('serverUrl', baseServerUrl + '/');
  userProfile.urlRoot = baseServerUrl + "/profile";
})();

serverConfigMd.on('sync', function(md) {
  setServerUrl();
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
$('body').on('click', '.js-externalLink, .about a, .js-listingDescription a', function(e){
  e.preventDefault();
  var extUrl = $(this).attr('href');
  if (!/^https?:\/\//i.test(extUrl)) {
    extUrl = 'http://' + extUrl;
  }
  require("shell").openExternal(extUrl);
});

//record changes to the app state
$(window).bind('hashchange', function(){
  "use strict";
  localStorage.setItem('route', Backbone.history.getFragment());
});

//prevent dragging a file to the window from loading that file
window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

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
var loadProfile = function(landingRoute) {
  landingRoute = landingRoute || '#';
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
              $loadingModal.addClass('hide');
             
              newSocketView = new socketView({model: serverConfigMd});
              newPageNavView = new pageNavView({model: user, socketView: newSocketView, userProfile: userProfile});
              newChatAppView = new chatAppView({model: user, socketView: newSocketView});

              location.hash = landingRoute;
              newRouter = new router({userModel: user, userProfile: userProfile, socketView: newSocketView, chatAppView: newChatAppView});
              Backbone.history.start();
            });

            //every 15 minutes update the bitcoin price for the currently selected currency
            window.bitCoinPriceChecker = setInterval(function () {
              setCurrentBitCoin(model.get('currency_code'), user);
            }, 54000000);
          }
        });
      }
    }
  });
};

$(document).ajaxSend(function(e, jqxhr, settings) {
  var username = serverConfigMd.get('username'),
      pw = serverConfigMd.get('password'),
      serverBaseUrl = serverConfigMd.getServerBaseUrl();

  if (username && pw && settings.url.startsWith(serverBaseUrl)) {
    jqxhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + pw));    
  }
});

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
  if (jqxhr.status === 401) {
    launchServerConnect();
  }
});

launchOnboarding = function(guidCreating) {
  serverConnectModal && serverConnectModal.remove();
  serverConnectModal = null;  

  onboardingModal && onboardingModal.remove();
  onboardingModal = new OnboardingModal({
    model: user,
    userProfile: userProfile,
    serverConfig: serverConfigMd,
    guidCreationPromise: guidCreating
  });
  onboardingModal.render().open();

  onboardingModal.on('onboarding-complete', function(guid) {
    onboardingModal && onboardingModal.remove()
    onboardingModal = null;
    $loadingModal.removeClass('hide');
    loadProfile('#userPage/' + guid + '/store');
  });
};

launchServerConnect = function() {
  if (!serverConnectModal) {
    serverConnectModal = new ServerConnectModal({
      model: serverConfigMd
    });

    serverConnectModal.on('connected', function() {
      // clear some flags so the heartbeat events will
      // appropriatally loadProfile or launch onboarding
      guidCreating = null;
      loadProfileNeeded = true;

      $loadingModal.removeClass('hide');      

      // todo: perhaps only re-load if the server changed and on
      // re-connect of the same server, just refresh the current
      // route or let loadProfile happen if it hadn't already?
      if (profileLoaded) {
        location.reload();
      }
    });

    serverConnectModal.on('authenticated', function() {
      serverConnectModal && serverConnectModal.remove();
      serverConnectModal = null;
    });    

    serverConnectModal.render()
      .open()
      .start();
  } else {
    if (!serverConnectModal.isOpen()) {
      serverConnectModal.open();
      if (!serverConnectModal.isStarted()) serverConnectModal.start();
    }
  }
};

login = function() {
  return $.post(serverConfigMd.getServerBaseUrl() + '/login', {
    username: serverConfigMd.get('username'),
    password: serverConfigMd.get('password')
  });
}

heartbeat.on('close', function(e) {
  // server down
  launchServerConnect();
});

heartbeat.on('message', function(e) {
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
        serverConfigMd.save({
          username: e.jsonData.username,
          password: e.jsonData.password
        });

        login().done(function() {
          guidCreating.resolve();
        });

        break;
      case 'online':
        if (loadProfileNeeded && !guidCreating) {
          loadProfileNeeded = false;

          login().done(function() {
            $.getJSON(serverConfigMd.getServerBaseUrl() + '/profile').done(function(profile) {
              if (__.isEmpty(profile)) {
                launchOnboarding(guidCreating = $.Deferred().resolve().promise());
              } else {
                loadProfile();              
              }
            });
          });
        }

        // todo: check for edge case where guid creating
        // is still pending here, meaning the GUID generation
        // complete message never arrived. Auth will fail.
    }
  }
});