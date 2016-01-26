var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var messageModal = require('./utils/messageModal.js'),
    homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    aboutView = require('./views/aboutVw'),
    donateView = require('./views/donateVw'),
    settingsView = require('./views/settingsVw'),
    transactionsView = require('./views/transactionsVw');

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
    "home/:state(/:searchText)": "home",
    "myPage": "userPage",
    "userPage": "userPage",
    "userPage/:userID(/:state)(/:itemHash)": "userPage",
    "sellItem": "sellItem",
    "transactions": "transactions",
    "transactions/:state": "transactions",
    "settings": "settings",
    "settings/:state": "settings",
    "about": "about",
    "support": "donate"
  },

  cleanup: function(){
    "use strict";
    $('.js-loadingModal').addClass('hide'); //hide modal if it is still visible
    messageModal.hide();
  },

  newView: function(view, bodyClass, addressBarText){
    "use strict";
    if($('body').attr('id') != bodyClass){
      $('body').attr("id", bodyClass || "");
    }
    $('#obContainer').removeClass("box-borderDashed noScrollBar overflowHidden"); //remove customization styling if present
    this.view && (this.view.close ? this.view.close() : this.view.remove());
    this.view = view;
    //clear address bar. This will be replaced on the user page
    addressBarText = addressBarText || "";
    window.obEventBus.trigger("setAddressBar", addressBarText);
  },

  index: function(){
    "use strict";
    if(localStorage.getItem("route")){
      this.navigate('#' + localStorage.getItem("route"), {trigger: true});
    } else if(this.userProfile.get('profile').beenSet == true){
      this.home();
    } else {
      this.userPage();
    }
  },

  home: function(state, searchText){
    "use strict";
    var searchItemsText = "",
        searchUserText = "", //placeholder for future functionality
        addressBarText = searchText ? "#" + searchText : "";
    if(state == "products"){
      searchItemsText = searchText;
    }
    this.cleanup();
    this.newView(new homeView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      state: state,
      searchItemsText: searchItemsText
    }),'',addressBarText);

    // hide the discover onboarding callout 
    $('.js-OnboardingIntroDiscoverHolder').addClass('hide');
  },


  userPage: function(userID, state, itemHash){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      userID: userID,
      state: state,
      itemHash: itemHash,
      socketView: this.socketView,
      chatAppView: this.chatAppView
    }),"userPage");
  },

  sellItem: function(){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      state: 'itemNew',
      socketView: this.socketView,
      chatAppView: this.chatAppView
    }),"userPage");
  },

  transactions: function(state, modalTab){
    "use strict";
    this.cleanup();
    this.newView(new transactionsView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      state: state
    }),"userPage");
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
  },

  donate: function(){
    "use strict";
    this.cleanup();
    this.newView(new donateView());
  }

});
