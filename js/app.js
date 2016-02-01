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
    isLocalServerRunning = require('./utils/isLocalServerRunning'),
    isRemoteServerRunning = require('./utils/isRemoteServerRunning'),
    router = require('./router'),
    newRouter,
    userModel = require('./models/userMd'),
    userProfileModel = require('./models/userProfileMd'),
    languagesModel = require('./models/languagesMd'),
    mouseWheel = require('jquery-mousewheel'),
    mCustomScrollbar = require('./utils/jquery.mCustomScrollbar.js'),
    setTheme = require('./utils/setTheme.js'),
    pageNavView = require('./views/pageNavVw'),
    chatAppView = require('./views/chatAppVw'),
    newPageNavView,
    newSocketView,
    newChatAppView,
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    cCode = "",
    // serverUrlLocal = "",
    // // loadProfileCount = 1,
    // // loadProfileCountdownInterval,
    // loadProfileCountdown = 5,
    $loadingModal = $('.js-loadingModal');

var ServerConfigMd = require('./models/serverConfigMd');
// TODO: what is wrong with the localStorage adapter??? shouldn't need
// to manually provide the data to the model. All that should be needed
// is an ID and then a subsequent fetch, but that doesn't return the data.
// Investigate!
var serverConfigMd = new ServerConfigMd( JSON.parse(localStorage['_serverConfig-1']) );
// serverConfigMd.fetch();
window.mooMod = serverConfigMd;

$.get('http://localhost:18469/api/v1/profile');

return;

var setServerUrl;

(setServerUrl = function() {
  var baseServerUrl = serverConfigMd.getServerBaseUrl();
  
  user.urlRoot = baseServerUrl + "/settings";
  user.set('serverUrl', baseServerUrl + '/');
  userProfile.urlRoot = baseServerUrl + "/profile";

  console.log('some urls set:');
  console.log(user.urlRoot);
  console.log(userProfile.urlRoot);
})();

serverConfigMd.on('sync', function(md) {
  setServerUrl();
  startInitSequence();
});

// $.ajax({
//   beforeSend: function() { jqxhr.requestURL = "http://some/url"; },
// });

// serverUrlLocal = localStorage.getItem("serverUrl") || "http://localhost:18469/api/v1/";

//set the urlRoot of the user model. Defaults to local host if not found
// user.urlRoot = serverConfigMd.getServerBaseUrl + "/settings";

console.log('remove mew remove me removal needed');
window.user = user;

//set the urlRoot of the user model. Defaults to local host if not found
// userProfile.urlRoot = serverConfigMd.getServerBaseUrl + "/profile";

console.log('remove mew remove me removal needed');
window.userProfile = userProfile;

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);

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

// var isValidUrl = function(url) {
//   var regexp = /(https?:\/\/)+[\w-]+(\.[\w-]+)*(:\d+)+(\/\S*)?/;
//   return regexp.test(url);
// };

// var loadDefaultServer = function(){
//   "use strict";
//   $('.js-loadingMessageModal').removeClass('hide').find('.js-closeIndexModal').addClass('hide');
//   $('.js-indexLoadingMsg1').text("Information for your user profile could not be loaded.");
//   $('.js-indexLoadingMsg2').text(serverUrlLocal + " could not be reached.");
//   $('.js-indexLoadingMsg3').text("You can enter a different server below.");
//   loadProfileCount = 3;
// };

var loadProfile = function(landingRoute) {
  landingRoute = landingRoute || '#';

  // var reloadProfile = function(){
  //   "use strict";
  //   $('.js-loadingMessageModal').removeClass('hide').find('.js-closeIndexModal').addClass('hide');
  //   loadProfileCountdown=5;

  //   if(loadProfileCount <= 3){
  //     loadProfileCountdownInterval = setInterval(function(){
  //       if(loadProfileCountdown > 0){
  //         $('.js-indexLoadingMsg4').text(loadProfileCountdown);
  //         loadProfileCountdown--;
  //       } else {
  //         $('.js-indexLoadingMsg4').text("");
  //         clearInterval(loadProfileCountdownInterval);
  //         loadProfileCount++;
  //         loadProfile();
  //       }
  //     }, 3000);
  //   } else {
  //     loadDefaultServer();
  //   }
  // };

  //get the guid from the user profile to put in the user model
  userProfile.fetch({
    timeout: 4000,
    success: function (model, response) {
      // $('.js-loadingModal').addClass('hide');
      "use strict";
      //clear the interval
      // clearInterval(loadProfileCountdownInterval);
      //make sure profile is not blank
      if (response.profile){
        setTheme(model.get('profile').primary_color, model.get('profile').secondary_color, model.get('profile').background_color, model.get('profile').text_color);
        //get the user
        user.fetch({
          success: function (model, response) {
            // user.set('serverUrl', serverUrlLocal);
            cCode = model.get('currency_code');

            //get user bitcoin price before loading pages
            setCurrentBitCoin(cCode, user, function() {
              $loadingModal.addClass('hide');
              newSocketView = new socketView({model: user});
              newPageNavView = new pageNavView({model: user, socketView: newSocketView, userProfile: userProfile});
              newChatAppView = new chatAppView({model: user, socketView: newSocketView});
              newRouter = new router({userModel: user, userProfile: userProfile, socketView: newSocketView, chatAppView: newChatAppView});
              location.hash = landingRoute;
              Backbone.history.start();
            });

            //every 15 minutes update the bitcoin price for the currently selected currency
            window.bitCoinPriceChecker = setInterval(function () {
              setCurrentBitCoin(model.get('currency_code'), user);
            }, 54000000);
          },
          // error: function (model, response) {
          //   loadDefaultServer();
          // }
        });
      }else{
        // $('.js-indexLoadingMsg1').text("User profile did not load.");
        // $('.js-indexLoadingMsg2').text("Attempting to reach " + serverUrlLocal);
        // $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount + " of 3");
        // reloadProfile();
      }
    },
    error: function (model, response) {
      // $('.js-loadingModal').addClass('hide');
      // $('.js-indexLoadingMsg1').text("Information for your user profile could not be loaded: " + response.statusText);
      // $('.js-indexLoadingMsg2').text("Attempting to reach " + serverUrlLocal);
      // $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount + " of 3");
      // reloadProfile();
    }
  });
};

// this.loadNewServer = function(newServer) {
//   "use strict";
//   if(isValidUrl(newServer)){
//     newServer = newServer.replace(/((\/)?(api)?(\/)?(v1)?(\/)?)$/, '/api/v1/'); //add trailing slash if missing
//     localStorage.setItem("serverUrl", newServer);
//     serverUrlLocal = newServer;
//     user.urlRoot = newServer + "settings";
//     userProfile.urlRoot = newServer + "profile";
//     loadProfileCount=3;//end any loops
//     loadProfile();
//   } else {
//     alert(newServer + " is not a valid URL. It must start with http:// or https:// and have a port number. ':18469' is the normal port number.");
//   }
// };

// if(isValidUrl(serverUrlLocal)){
//   loadProfile();
// } else {
//   loadDefaultServer();
// }

// $(document).bind("ajaxSend", function(s, req){
//   console.log('slick willy');
//   window.slick = arguments;

//   req.abort();
// });

// loadProfile();

// window.guidCheck = $.get(serverConfigMd.getServerBaseUrl() + '/profile').always(function() {
//   console.log('always and forever');
//   window.always = arguments;
// });

var ServerConnectModal = require('./views/serverConnectModal');
var serverConnectModal;
var OnboardingModal = require('./views/onboardingModal');
var onboardingModal;
var startInitSequence,
    startLocalInitSequence,
    startRemoteInitSequence;
var launchOnboarding;

launchOnboarding = function(creatingGuid) {
  // For local servers, a creatingGuid promise is passed in.
  var options = {
    model: user,
    userProfile: userProfile,
    serverConfig: serverConfigMd
  };

  if (creatingGuid) options[guidCreationPromise] = creatingGuid;
  onboardingModal && onboardingModal.remove();
  onboardingModal = new OnboardingModal(options);
  onboardingModal.render().open();

  if (creatingGuid) {
    creatingGuid.fail(function() {
      // guid creation failed
      // server probably went down during guid creation
      // todo: need to test this very edgy case
      onboardingModal && onboardingModal.remove()
      onboardingModal = null;
      startLocalInitSequence();
      console.log('guid creation failed');
    });
  }

  onboardingModal.on('onboarding-complete', function(guid) {
    console.log('onboarding is complete - hoo to the ray!');
    onboardingModal && onboardingModal.remove()
    onboardingModal = null;
    loadProfile('#userPage/' + guid + '/store');       
  });  
};

launchServerConnect = function() {
  serverConnectModal && serverConnectModal.remove();
  serverConnectModal = new ServerConnectModal({
    model: serverConfigMd
  });

  serverConnectModal.on('connect', function() {
    serverConnectModal.remove();
    startInitSequence();
    $loadingModal.removeClass('hide');
  });

  serverConnectModal.render().open();
  serverConfigMd.isLocalServer() && serverConnectModal.start();
};

startLocalInitSequence = function() {
  return isLocalServerRunning(
    serverConfigMd.getServerBaseUrl() + '/profile',
    serverConfigMd.getGuidCheckUrl(),
    {
      interval: 100, // 10 times a second
      maxAttempts: 1, // for 1 seconds    
    }
  ).done(function(creatingGuid, profileData) {
    console.log('server is running');
    window.server = arguments;

    // server is running
    if (creatingGuid) {
      console.log('guid creation in progress');
      // guid creation in progress
      launchOnboarding(creatingGuid);
    } else {
      // Guid had previously been generated.
      if (profileData.profile.encryption_key) {
        // onboarding complete
        loadProfile();

        // todo: examine and potentially refactor loadProfile().
        // todo: since we have the profile data here,
        // we could pass it into loadProfile and if we do so,
        // it could skip that particular fetch.
      } else {
        // onboarding needed
        launchOnboarding($.Deferred().resolve().promise());
      }
    }
  }).fail(function() {
    console.log('The server is most certainly NOT running.');

    // server is down
    launchServerConnect();
  });
};

startRemoteInitSequence = function() {
  return isRemoteServerRunning(serverConfigMd.getServerBaseUrl() + '/profile')
    .done(function(profileData) {
      console.log('remote server is running');
      
      // remote server is running
      if (__.isEmpty(profileData)) {
        // onboarding needed
        launchOnboarding();
      } else {
        // onboarding complete
        loadProfile();
      }
    }).fail(function() {
      console.log('The remote server is most certainly NOT running.');

      // remote server is down or guid is generating
      launchServerConnect();
    });
};

(startInitSequence = function() {
  if (serverConfigMd.isLocalServer()) {
    startLocalInitSequence();
  } else {
    startRemoteInitSequence();
  }
})();