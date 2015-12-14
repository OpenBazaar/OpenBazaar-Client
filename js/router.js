var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    aboutView = require('./views/aboutVw'),
    donateView = require('./views/donateVw'),
    settingsView = require('./views/settingsVw');

module.exports = Backbone.Router.extend({

  initialize: function(options){
    this.options = options || {};
    /*
    expects options.userModel, options userProfile, socketView, chatAppView from app.js
     */
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.socketView = options.socketView;
    this.chatAppView = options.chatAppView;
  },

  routes: {
    "": "index",
    "home": "home",
    "myPage": "userPage",
    "userPage": "userPage",
    "userPage/:userID(/:state)(/:itemHash)": "userPage",
    "customizePage": "customizePage",
    "sellItem": "sellItem",
    "purchases": "purchases",
    "sales": "sales",
    "cases": "cases",
    "notifications": "notifications",
    "settings": "settings",
    "settings/:state": "settings",
    "about": "about",
    "support": "donate"
  },

  cleanup: function(){
    "use strict";
    $('.js-loadingModal').addClass('hide'); //hide modal if it is still visible
  },

  newView: function(view, bodyClass){
    "use strict";
    if($('body').attr('id') != bodyClass){
      $('body').attr("id", bodyClass || "");
    }
    $('#obContainer').removeClass("box-borderDashed"); //remove customization styling if present
    this.view && (this.view.close ? this.view.close() : this.view.remove());
    this.view = view;
    //clear address bar. This will be replaced on the user page
    window.obEventBus.trigger("setAddressBar", "");
  },

  index: function(){
    "use strict";
    if(this.userModel.get('beenSet') === true){
      this.home();
    } else {
      this.userPage();
    }
  },

  home: function(){
    "use strict";
    this.cleanup();
    this.newView(new homeView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView
    }));
  },

  userPage: function(userID, state, itemHash){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.userModel,
      userID: userID,
      state: state,
      itemHash: itemHash,
      socketView: this.socketView,
      chatAppView: this.chatAppView
    }),"userPage");
  },

  customizePage: function(){
    "use strict";
    this.cleanup();
    console.log("customizePage");
  },

  sellItem: function(){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.userModel,
      state: 'itemNew',
      socketView: this.socketView
    }),"userPage");
  },

  purchases: function(){
    "use strict";
    this.cleanup();
    console.log("purchases");
  },

  sales: function(){
    "use strict";
    this.cleanup();
    console.log("sales");
  },

  cases: function(){
    "use strict";
    this.cleanup();
    console.log("cases");
  },

  notifications: function(){
    "use strict";
    this.cleanup();
    console.log("notifications");
  },

  settings: function(state){
    "use strict";
    $('.js-loadingModal').addClass('show');
    this.cleanup();
    this.newView(new settingsView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      state: state,
      socketView: this.socketView
    }), "userPage");
  },

  about: function(){
    "use strict";
    this.cleanup();
    this.newView(new aboutView());
  },

  donate: function(){
    "use strict";
    this.cleanup();
    this.newView(new donateView());
  }

});
