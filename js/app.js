var __ = window.__ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
//add to global scope for non-modular libraries
window.Backbone = Backbone;
window.$ = $;
window.jQuery = $;
window.Backbone.$ = $;

var Polyglot = require('node-polyglot'),
    getBTPrice = require('./utils/getBitcoinPrice'),
    router = require('./router'),
    newRouter,
    userModel = require('./models/userMd'),
    userProfileModel = require('./models/userProfileMd'),
    languagesModel = require('./models/languagesMd'),
    mouseWheel = require('jquery-mousewheel'),
    mCustomScrollbar = require('./utils/jquery.mCustomScrollbar.js'),
    pageNavView = require('./views/pageNavVw'),
    chatAppView = require('./views/chatAppVw'),
    newPageNavView,
    newSocketView,
    newChatAppView,
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    guid = "",
    avatar_hash = "",
    cCode = "",
    serverUrlLocal = "",
    loadProfileCount = 1,
    loadProfileTimeout,
    loadProfileCountdownInterval,
    loadProfileCountdown = 5;

serverUrlLocal = "http://192.168.1.22:18469/api/v1/" || localStorage.getItem("serverUrl") || "http://localhost:18469/api/v1/";

//set the urlRoot of the user model. Defaults to local host if not found
user.urlRoot = serverUrlLocal + "settings";

//set the urlRoot of the user model. Defaults to local host if not found
userProfile.urlRoot = serverUrlLocal + "profile";

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);

//put the event bus into the window so it's available everywhere
window.obEventBus =  __.extend({}, Backbone.Events);

var reloadProfile = function(){
  "use strict";
  $('.js-loadingMessageModal').removeClass('hide').find('.js-closeIndexModal').addClass('hide');
  loadProfileCountdown=3;

  if(loadProfileCount < 10){
    loadProfileCountdownInterval = setInterval(function(){
      if(loadProfileCountdown > 0){
        $('.js-indexLoadingMsg4').text(loadProfileCountdown);
        loadProfileCountdown--;
      } else {
        $('.js-indexLoadingMsg4').text("");
        clearInterval(loadProfileCountdownInterval);
        loadProfileCount++;
        loadProfile();
      }
    }, 2000);
  } else {
    alert("Your server may not be working correctly. Loading using default settings.");
    $('.js-loadingMessageModal').addClass('hide');
    user.set('serverUrl', serverUrlLocal);
    newSocketView = new socketView({model: user});
    newPageNavView = new pageNavView({model: user, socketView: newSocketView});
    newRouter = new router({userModel: user, socketView: newSocketView});
    Backbone.history.start();
    window.clearTimeout(loadProfileTimeout);
  }
};

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
}

var loadProfile = function() {
  //get the guid from the user profile to put in the user model
  userProfile.fetch({
    success: function (model, response) {
      $('.js-loadingModal').addClass('hide');
      "use strict";
      //make sure profile is not blank
      if (response.profile){
        guid = model.get('profile').guid;
        avatar_hash = model.get('profile').avatar_hash;
        //get the user
        user.fetch({
          success: function (model, response) {
            user.set('serverUrl', serverUrlLocal);
            user.set('guid', guid);
            user.set('avatar_hash', avatar_hash);
            cCode = model.get('currency_code');

            //get user bitcoin price before loading pages
            setCurrentBitCoin(cCode, user, function(){
              $('.js-loadingMessageModal').addClass('hide');
              newSocketView = new socketView({model: user});
              newPageNavView = new pageNavView({model: user, socketView: newSocketView});
              newChatAppView = new chatAppView({model: user, socketView: newSocketView})
              newRouter = new router({userModel: user, socketView: newSocketView});
              Backbone.history.start();
            });

            //every 15 minutes update the bitcoin price for the currently selected currency
            window.bitCoinPriceChecker = setInterval(function () {
              setCurrentBitCoin(model.get('currency_code'), user);
            }, 54000000);
          },
          error: function (model, response) {
            alert("No user was found. Your server may not be working correctly. Loading using default settings.");
            $('.js-loadingMessageModal').addClass('hide');
            user.set('serverUrl', serverUrlLocal);
            newSocketView = new socketView({model: user});
            newPageNavView = new pageNavView({model: user, socketView: newSocketView});
            newChatAppView = new chatAppView({model: user, socketView: newSocketView})
            newRouter = new router({userModel: user, socketView: newSocketView});
            Backbone.history.start();
          }
        });
      }else{
        $('.js-indexLoadingMsg1').text("User profile did not load.");
        $('.js-indexLoadingMsg2').text("Attempting to reach " + serverUrlLocal);
        $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount);
        reloadProfile();
      }
    },
    error: function (model, response) {
      $('.js-loadingModal').addClass('hide');
      $('.js-indexLoadingMsg1').text("Information for your user profile could not be loaded: " + response.statusText);
      $('.js-indexLoadingMsg2').text("Attempting to reach " + serverUrlLocal);
      $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount);
      reloadProfile();
    }
  });
};

loadProfile();
