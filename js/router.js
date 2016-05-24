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
    var self = this,
        routes,
        originalHistoryBack;
        // origBackboneNavigate;

    this.options = options || {};

    routes = [
      ["", "index"],
      ["home", "home"],
      ["home/:state(/:searchText)", "home"],
      // ["myPage", "userPage"],
      ["userPage", "userPage"],
      ["userPage/:userID(/:state)(/:itemHash)(/:skipNSFWmodal)", "userPage"],
      [/^@([^\/]+)(.*)$/, "userPageViaHandle"],
      // ["userPageViaHandle", "userPageViaHandle"],
      ["transactions", "transactions"],
      ["transactions/:state(/:orderID)(/:tabState)", "transactions"],
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
    
    originalHistoryBack = history.back;
    history.back = function() {
      self.historyAction = 'back';
      return originalHistoryBack.apply(this, arguments);
    };

    originalHistoryForward = history.forward;
    history.forward = function() {
      self.historyAction = 'forward';
      return originalHistoryForward.apply(this, arguments);
    };
    
    this.historySize = -1;
    this.historyPosition = -1;
    this.historyAction = 'default';

    // origBackboneNavigate = Backbone.history.navigate;
    // Backbone.history.navigate = function(fragment, options) {
    //   options && options.replace && !options.trigger &&
    //     self.cacheReplacedRoutes.apply(self, arguments);
    //   return origBackboneNavigate.apply(this, arguments);
    // };

    this.viewCache = {};
    window.moo = this.viewCache;
  },

  // cacheReplacedRoutes: function(fragment) {
  //   console.log(`replacin the state with ${fragment}`);

  //   // ensure replaced routes update the cache (i.e. since some views
  //   // correspond to multiple routes, ensure a cached view is
  //   // keyed by all it's routes that have been navigated to)
  //   this.view && this.view.expires && this.cacheView(this.view, fragment);
  // },

  translateRoute: function(route) {
    if(!route) throw new Error('You must provide a route');
    
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
      guidFetch = app.getGuid(handle, this.userModel.get('resolver').replace(/\/+$/, "") + '/v2/users/')
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
    console.log(`routing to ${Backbone.history.getFragment()}`);

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
    $('#loadingModal').addClass('hide'); //hide modal if it is still visible
    messageModal.hide();
    $('#obContainer').removeClass('overflowHidden blur');
    obEventBus.trigger('cleanNav');
  },

  cacheView: function(view, fragment) {
    var index = view.getCacheIndex(Backbone.history.getFragment());

    // console.log(`fragment is ${fragment}`);
    fragment = fragment || Backbone.history.getFragment();
    // console.log(`smashing caching: ${fragment}`);    
    
    this.viewCache[index] = {
      cachedAt: Date.now(),
      view: this.view
    }
  },

  newView: function(View, options) {
    var now = Date.now(),
        cached = this.view && this.viewCache[this.view.getCacheIndex(Backbone.history.getFragment())],
        loadingConfig;

    options = __.extend({
      // viewArgs can be an array of args to pass into the view or a single
      // arg (most likely an object)
      viewArgs: [{}],
      addressBarText: '',
      bodyID: '',
      bodyClass: ''
    }, options || {});

    options.viewArgs = options.viewArgs.length ? options.viewArgs : [options.viewArgs];

    this.cleanup();
    //clear address bar. This will be replaced on the user page
    window.obEventBus.trigger('setAddressBar', options.addressBarText);

    $('body').attr('id', options.bodyID);
    $('body').attr('class', options.bodyClass);
    $('#obContainer').removeClass('box-borderDashed noScrollBar overflowHidden'); //remove customization styling if present
    
    this.pageConnectModal && this.pageConnectModal.remove();
    this.pageConnectModal = null;

    if (cached && (now - cached.cachedAt < cached.view.expires)) {
      // we have an un-expired cached view, let's reattach it
      console.log('using cached');
      $('#content').html(cached.view.$el);
      cached.view.delegateEvents();
      this.view = cached.view;
      obEventBus.trigger('cache-reattach', { view: this.view });
    } else {
      console.log('using brand spanking new');
      if (this.view) {
        if (this.view.expires) {
          this.view.$el.detach();
          obEventBus.trigger('cache-detach', { view: this.view });
        } else {
          this.view.close ? this.view.close() : this.view.remove()          
        }
      }

      this.view = new (Function.prototype.bind.apply(View, [null].concat(options.viewArgs)));
      this.view.expires && this.cacheView(this.view);

      $('#content').html(this.view.$el);

      if (
        (loadingConfig = __.result(this.view, 'loadingConfig')) &&
        loadingConfig.promise &&
        typeof loadingConfig.promise.then === 'function') {
        this.launchPageConnectModal(loadingConfig);
      }      
    }

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
    if(localStorage.getItem("route")){
      this.navigate('#' + localStorage.getItem("route"), {trigger: true});
    } else {
      this.home();
    }
  },

  home: function(state, searchText){
    this.newView(homeView, {
      viewArgs: {
        userModel: this.userModel,
        userProfile: this.userProfile,
        socketView: this.socketView,
        state: state,
        searchItemsText: searchText
      }
    });

    // this.newView(new homeView({
    //   userModel: this.userModel,
    //   userProfile: this.userProfile,
    //   socketView: this.socketView,
    //   state: state,
    //   searchItemsText: searchText
    // }),'',{'addressText': searchText ? "#" + searchText : ""});    

    // hide the discover onboarding callout
    this.$discoverHolder = this.$discoverHolder || $('.js-OnboardingIntroDiscoverHolder');
    this.$discoverHolder.addClass('hide');

    app.appBar.setTitle(polyglot.t('Discover'));
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

    this.newView(userPageView, {
      viewArgs: options,
      bodyID: 'userPage',
      bodyClass: 'onPage'
    });

    app.appBar.setTitle(handle ? handle : options.userId || this.userModel.get('guid'));
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

  transactions: function(state, orderID, tabState){
    "use strict";
    this.newView(new transactionsView({
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      state: state,
      orderID: orderID,
      tabState: tabState //opens a tab in the order modal
    }),"userPage");
    app.appBar.setTitle(polyglot.t('Transactions'));
  },

  settings: function(state){
    $('.js-loadingModal').addClass('show');

    // this.newView(new settingsView({
    //   userModel: this.userModel,
    //   userProfile: this.userProfile,
    //   state: state,
    //   socketView: this.socketView
    // }), "userPage");

    this.newView(settingsView, {
      viewArgs: {
        userModel: this.userModel,
        userProfile: this.userProfile,
        state: state,
        socketView: this.socketView
      }
    });

    app.appBar.setTitle(polyglot.t('Settings'));
  }
});
