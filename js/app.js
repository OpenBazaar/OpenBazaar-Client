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
    newPageNavView,
    newSocketView,
    user = new userModel(),
    userProfile = new userProfileModel(),
    languages = new languagesModel(),
    socketView = require('./views/socketVw'),
    guid = "",
    avatar_hash = "",
    cCode = "",
    server_urlLocal = "",
    loadProfileCount = 1,
    loadProfileTimeout,
    loadProfileCountdownInterval,
    loadProfileCountdown = 5;

server_urlLocal = localStorage.getItem("server_url") || "http://localhost:18469/api/v1/";

//set the urlRoot of the user model. Defaults to local host if not found
user.urlRoot = server_urlLocal + "settings";

//set the urlRoot of the user model. Defaults to local host if not found
userProfile.urlRoot = server_urlLocal + "profile";

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);

//put the event bus into the window so it's available everywhere
window.obEventBus =  __.extend({}, Backbone.Events);

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
            user.set('server_url', server_urlLocal);
            user.set('guid', guid);
            user.set('avatar_hash', avatar_hash);
            cCode = model.get('currency_code');

            //get user bitcoin price before loading pages
            getBTPrice(cCode, function (btAve) {
              //put the current bitcoin price in the window so it doesn't have to be passed to models
              window.currentBitcoin = btAve;
              //every 15 minutes update the bitcoin price
              setTimeout(function () {
                getBTPrice(cCode, function (btAve) {
                  window.currentBitcoin = btAve;
                });
              }, 54000000);

              $('.js-loadingMessageModal').addClass('hide');
              newSocketView = new socketView({model: user});
              newPageNavView = new pageNavView({model: user, socketView: newSocketView});
              newRouter = new router({userModel: user, socketView: newSocketView});
              Backbone.history.start();
            });
          },
          error: function (model, response) {
            alert("No user was found. Your server may not be working correctly. Loading using default settings.");
            $('.js-loadingMessageModal').addClass('hide');
            user.set('server_url', server_urlLocal);
            newSocketView = new socketView({model: user});
            newPageNavView = new pageNavView({model: user, socketView: newSocketView});
            newRouter = new router({userModel: user, socketView: newSocketView});
            Backbone.history.start();
          }
        });
      }else{
        $('.js-indexLoadingMsg1').text("User profile did not load.");
        $('.js-indexLoadingMsg2').text("Attempting to reach " + server_urlLocal);
        $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount);
        reloadProfile();
      }
    },
    error: function (model, response) {
      $('.js-loadingModal').addClass('hide');
      $('.js-indexLoadingMsg1').text("Information for your user profile could not be loaded: " + response.statusText);
      $('.js-indexLoadingMsg2').text("Attempting to reach " + server_urlLocal);
      $('.js-indexLoadingMsg3').text("Reload attempt " + loadProfileCount);
      reloadProfile();
    }
  });
};

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
    user.set('server_url', server_urlLocal);
    newSocketView = new socketView({model: user});
    newPageNavView = new pageNavView({model: user, socketView: newSocketView});
    newRouter = new router({userModel: user, socketView: newSocketView});
    Backbone.history.start();
    window.clearTimeout(loadProfileTimeout);
  }
};

loadProfile();