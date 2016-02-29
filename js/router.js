var ipcRenderer = require('ipc-renderer'),
    __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    messageModal = require('./utils/messageModal.js'),
    homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    donateView = require('./views/donateVw'),
    settingsView = require('./views/settingsVw'),
    transactionsView = require('./views/transactionsVw');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "home": "home",
    "home/:state(/:searchText)": "home",
    "myPage": "userPage",
    "userPage": "userPage",
    "userPage/:userID(/:state)(/:itemHash)(/:skipNSFWmodal)": "userPage",
    "transactions": "transactions",
    "transactions/:state": "transactions",
    "settings": "settings",
    "settings/:state": "settings",
    "about": "about",
    "support": "donate"
  },  

  initialize: function(options){
    this.options = options || {};
    /*
    expects options.userModel, options userProfile, socketView from main.js
     */
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.socketView = options.socketView;

    ipcRenderer.on('external-route', (e, route) => {
      this.translateRoute(route).done((translatedRoute) => {
        this.navigate(translatedRoute, { trigger: true });
      });
    });
  },

  translateRoute: function(route) {
    var guid = "",
        handle = "",
        state = "",
        itemHash = "",
        routeArray = route.replace(/ /g, "").split("/"),
        deferred = $.Deferred();

    state = routeArray[1] ? "/" + routeArray[1] : "";
    itemHash = routeArray[2] ? "/" + routeArray[2] : "";

    if(routeArray[0].charAt(0) == "@"){
      // user entered a handle
      handle = routeArray[0].replace('@', '');
      this.processHandle(handle, state, itemHash).done((route) => {
        deferred.resolve(route);
      }).fail(() => {
        deferred.reject('bad-handle');
      });
    } else if(!routeArray[0].length){
      // user trying to go back to discover
      deferred.resolve('#home');
    } else if(routeArray[0].length === 40){
      // user entered a guid
      guid = routeArray[0];
      deferred.resolve('#userPage/' + guid + state + itemHash);
    } else if(routeArray[0].charAt(0) == "#"){
      // user entered a search term
      deferred.resolve('#home/products/' + routeArray[0].replace('#', ''));
    } else {
      //user entered text that doesn't match a known pattern, assume it's a product search
      deferred.resolve('#home/products/');
    }

    return deferred.promise();
  },

  processHandle: function(handle, state, itemHash) {
    var deferred = $.Deferred();

    if (handle) {
      $.ajax({
        url: this.userModel.get('resolver') + "/v2/users/" + handle,
        dataType: "json"
      }).done(function(resolverData){
        if(resolverData[handle].profile && resolverData[handle].profile.account){
          var account = resolverData[handle].profile.account.filter(function (accountObject) {
            return accountObject.service == "openbazaar";
          });
          deferred.resolve('#userPage/' + account[0].identifier + state + itemHash);
        } else {
          messageModal.show(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badHandle'));
          deferred.reject();
        }
      }).fail(function(jqXHR, status, errorThrown){
        messageModal.show(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badHandle'));
        deferred.reject();
      });
    }

    return deferred.promise();
  },  

  cleanup: function(){
    "use strict";
    $('.js-loadingModal').addClass('hide'); //hide modal if it is still visible
    messageModal.hide();
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
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


  userPage: function(userID, state, itemHash, skipNSFWmodal){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      userID: userID,
      state: state,
      itemHash: itemHash,
      socketView: this.socketView,
      skipNSFWmodal: skipNSFWmodal
    }),"userPage");
  },

  transactions: function(state){
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