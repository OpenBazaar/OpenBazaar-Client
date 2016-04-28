var ipcRenderer = require('ipc-renderer'),
    __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    app = require('./App').getApp(),    
    messageModal = require('./utils/messageModal.js'),
    homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    donateView = require('./views/donateVw'),
    settingsView = require('./views/settingsVw'),
    transactionsView = require('./views/transactionsVw'),
    PageConnectModal = require('./views/pageConnectModal');

module.exports = Backbone.Router.extend({
  initialize: function(options){
    var self = this;
      
    var routes;

    this.options = options || {};

    routes = [
      ["", "index"],
      ["home", "home"],
      ["home/:state(/:searchText)", "home"],
      ["myPage", "userPage"],
      ["userPage", "userPage"],
      ["userPage/:userID(/:state)(/:itemHash)(/:skipNSFWmodal)", "userPage"],
      [/^@([^\/]+)(.*)$/, "userPageViaHandle"],
      ["userPageViaHandle", "userPageViaHandle"],
      ["transactions", "transactions"],
      ["transactions/:state(/:orderID)", "transactions"],
      ["settings", "settings"],
      ["settings/:state", "settings"]
    ];

    routes.forEach((route) => {
      this.route.apply(this, route)
    });  

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
    
    var originalHistoryBack = history.back;
    history.back = function() {
        self.historyAction = 'back';
        return originalHistoryBack(arguments);
    }

    var originalHistoryForward = history.forward;
    history.forward = function() {
        self.historyAction = 'forward';
        return originalHistoryForward(arguments);
    }
    
    this.historySize = -1;
    this.historyPosition = -1;
    this.historyAction = 'default';
  },

  translateRoute: function(route) {
    var guid = "",
        handle = "",
        state = "",
        itemHash = "",
        routeArray = route.replace("ob://","").replace(/ /g, "").split("/"),
        deferred = $.Deferred();
    
    state = routeArray[1] ? "/" + routeArray[1] : "";
    itemHash = routeArray[2] ? "/" + routeArray[2] : "";

    if(routeArray[0].charAt(0) == "@"){
      // user entered a handle
      deferred.resolve(routeArray[0] + state + itemHash);
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
      deferred.resolve('#home/products/' + routeArray[0]);
    }

    return deferred.promise();
  },

  processHandle: function(handle, state, itemHash) {
    var deferred = $.Deferred(),
        guidFetch;

    if (handle) {
      guidFetch = app.getGuid(handle, this.userModel.get('resolver') + '/v2/users/')
        .done((guid) => {
          deferred.resolve(guid);
        }).fail(() => {
          deferred.reject();
        });
    } else {
      deferred.reject();
    }

    deferred.cancel = () => {
      guidFetch && guidFetch.abort();
    };

    return deferred.promise();
  },
  
  execute: function(callback, args, name) {
    if (this.historyAction == 'default') {
      this.historyPosition += 1;
      this.historySize = this.historyPosition;
    } else if (this.historyAction == 'back') {
      this.historyPosition -= 1;
    } else if(this.historyAction == 'forward' && this.previousName != name && name != "index") {
      //don't increment if the same state is navigated to twice
      //don't increment on index since that isn't a real state
      this.historyPosition += 1;
    }
    this.historyAction = 'default';

    if (this.historyPosition == this.historySize)
        $('.js-navFwd').addClass('disabled-icon');
    else
        $('.js-navFwd').removeClass('disabled-icon');
    
    if (this.historyPosition == 1)
        $('.js-navBack').addClass('disabled-icon');
    else
        $('.js-navBack').removeClass('disabled-icon');
    
    if (callback) callback.apply(this, args);
  },

  cleanup: function(){
    "use strict";
    $('#loadingModal').addClass('hide'); //hide modal if it is still visible
    messageModal.hide();
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
    obEventBus.trigger('cleanNav');
  },

  newView: function(view, bodyID, addressBarText, bodyClass){
    var loadingConfig;

    this.cleanup();
    //clear address bar. This will be replaced on the user page
    addressBarText = addressBarText || "";
    window.obEventBus.trigger("setAddressBar", addressBarText);

    if($('body').attr('id') != bodyID){
      $('body').attr("id", bodyID || "");
    }
    if(bodyClass){
      $('body').attr('class', bodyClass);
    }
    $('#obContainer').removeClass("box-borderDashed noScrollBar overflowHidden"); //remove customization styling if present
    
    this.pageConnectModal && this.pageConnectModal.remove();
    this.pageConnectModal = null;

    if (
      (loadingConfig = __.result(view, 'loadingConfig')) &&
      loadingConfig.promise &&
      typeof loadingConfig.promise.then === 'function') {
      this.launchPageConnectModal(loadingConfig);
    }
    
    this.view && (this.view.close ? this.view.close() : this.view.remove());
    this.view = view;

    $('#obContainer')[0].scrollTop = 0;
  },

  launchPageConnectModal: function(config) {
    var defaults = {
      connectText: 'Connecting...',
      failedText: 'Unable to Connect.'
    };

    if (!(
        config &&
        config.promise &&
        typeof config.promise.then === 'function'
      )) {
      throw new Error('At a minimum, the config must contain a config.promise.');
    }

    $('#loadingModal').addClass('hide');
    config = __.extend({}, defaults, config);

    this.pageConnectModal && this.pageConnectModal.remove();
    this.pageConnectModal = new PageConnectModal({
      initialState: {
        statusText: config.connectText,
        tooltip: config.connectTooltip
      }
    }).render().open();    

    this.pageConnectModal.on('back', () => {
      history.back();
    });

    this.pageConnectModal.on('retry', () => {
      // recall the same route
      var route = location.hash;

      this.navigate('blah-blah', { replace: true });
      this.navigate(route, { replace: true, trigger: true });
    });

    this.pageConnectModal.on('cancel', () => {
      typeof config.promise.cancel === 'function' && config.promise.cancel();
      history.back();
    });

    config.promise.done(() => {
      this.pageConnectModal && this.pageConnectModal.remove();
      this.pageConnectModal = null;
    }).fail(() => {
      this.pageConnectModal.setState({
        statusText: config.failedText,
        mode: 'failed-connect',
        tooltip: config.failedTooltip
      });
    });
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
    this.newView(new homeView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      state: state,
      searchItemsText: searchText
    }),'',{'addressText': searchText ? "#" + searchText : ""});

    // hide the discover onboarding callout
    $('.js-OnboardingIntroDiscoverHolder').addClass('hide');
  },

  userPage: function(userID, state, itemHash, skipNSFWmodal, handle){
    var options = {
      userModel: this.userModel,
      userProfile: this.userProfile,
      userID: userID,
      state: state,
      itemHash: itemHash,
      socketView: this.socketView,
      skipNSFWmodal: skipNSFWmodal
    };

    if (handle) options.handle = handle;

    this.newView(new userPageView(options),"userPage",'','onPage');
  },

  userPageViaHandle: function(handle, subPath) {
    var processHandle;

    processHandle = this.processHandle(handle).done((guid) => {
      var state,
          itemHash,
          skipNSFWmodal;

      subPath = subPath && subPath.slice(1).split('/');
      state = subPath && subPath[0] || null;
      itemHash = subPath && subPath[1] || null;
      skipNSFWmodal = subPath && subPath[2] || null;

      // we want this to happen after the launchPageConnectModal processes
      // the resolution of the promise, hence the timeout.
      setTimeout(() => {
        this.userPage(guid, state, itemHash, skipNSFWmodal, '@' + handle);
      }, 0);
    });

    this.launchPageConnectModal({
      promise: processHandle,
      connectText: window.polyglot.t('pageConnectingMessages.handleConnect').replace('${handle}', handle),
      failedText: window.polyglot.t('pageConnectingMessages.handleFail'),
      cancel: () => {
        processHandle.cancel();
      }
    });
  },

  transactions: function(state, orderID){
    "use strict";
    this.newView(new transactionsView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      state: state,
      orderID: orderID
    }),"userPage");
  },

  settings: function(state){
    "use strict";
    $('.js-loadingModal').addClass('show');
    this.newView(new settingsView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      state: state,
      socketView: this.socketView
    }), "userPage");
  }
});
