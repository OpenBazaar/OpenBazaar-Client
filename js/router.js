'use strict';

var ipcRenderer = require('ipc-renderer'),
    __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    app = require('./App').getApp(),
    homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    settingsView = require('./views/settingsVw'),
    transactionsView = require('./views/transactionsVw'),
    PageConnectModal = require('./views/pageConnectModal');

module.exports = Backbone.Router.extend({
  initialize: function(options){
    var self = this,
        routes,
        originalHistoryBack,
        originalHistoryForward;

    this.options = options || {};

    routes = [
      ["", "index"],
      ["home", "home"],
      ["home/:state(/:searchText)", "home"],
      ["userPage", "userPage"],
      ["userPage/:userID(/:state)(/:itemHash)(/:skipNSFWmodal)", "userPage"],
      [/^@([^\/]+)(.*)$/, "userPageViaHandle"],
      ["transactions", "transactions"],
      ["transactions/:state(/:orderID)(/:tabState)", "transactions"],
      ["settings", "settings"],
      ["settings/:state", "settings"]
    ];

    routes.forEach((route) => {
      this.route.apply(this, route);
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

    this.$obContainer = $('#obContainer');
    this.viewCache = {};

    window.setInterval(() => {
      var cached;

      for (var key in this.viewCache) {
        if (this.viewCache.hasOwnProperty(key)) {
          cached = this.viewCache[key];

          if (Date.now() - cached.cachedAt >= cached.view.cacheExpires) {
            delete this.viewCache[key];
          }
        }
      }
    }, this.cleanCacheInterval);
  },

  // how often to clean out expired cached views
  cleanCacheInterval: 1 * 60 * 1000,

  refresh: function() {
    if (this.view) {
      // clear any cache for the view, so a fresh view is created
      delete this.viewCache[this.view.constructor.getCacheIndex(Backbone.history.getFragment())];
    }

    Backbone.history.loadUrl();
  },

  translateRoute: function(route) {
    if (!route) throw new Error('You must provide a route');

    var guid = "",
        state = "",
        itemHash = "",
        routeArray = route.replace("ob://", "").replace(/ /g, "").split("/"),
        deferred = $.Deferred();

    state = routeArray[1] ? "/" + routeArray[1] : "";
    itemHash = routeArray[2] ? "/" + routeArray[2] : "";

    if (routeArray[0].charAt(0) == "@"){
      // user entered a handle
      deferred.resolve(routeArray[0] + state + itemHash);
    } else if (!routeArray[0].length){
      // user trying to go back to discover
      deferred.resolve('#home');
    } else if (routeArray[0].length === 40){
      // user entered a guid
      guid = routeArray[0];
      deferred.resolve('#userPage/' + guid + state + itemHash);
    } else if (routeArray[0].charAt(0) == "#"){
      // user entered a search term
      deferred.resolve('#home/products/' + routeArray[0].replace('#', ''));
    } else {
      //user entered text that doesn't match a known pattern, assume it's a product search
      deferred.resolve('#home/products/' + routeArray[0]);
    }

    return deferred.promise();
  },

  processHandle: function(handle) {
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
    if (this.historyAction == 'default') {
      this.historyPosition += 1;
      this.historySize = this.historyPosition;
    } else if (this.historyAction == 'back') {
      this.historyPosition -= 1;
    } else if (this.historyAction == 'forward' && this.previousName != name && name != "index") {
      //don't increment if the same state is navigated to twice
      //don't increment on index since that isn't a real state
      this.historyPosition += 1;
    }
    this.historyAction = 'default';

    if (this.historyPosition == this.historySize) {
      $('.js-navFwd').addClass('disabled-icon');
    } else {
      $('.js-navFwd').removeClass('disabled-icon');
    }

    if (this.historyPosition == 1) {
      $('.js-navBack').addClass('disabled-icon');
    } else {
      $('.js-navBack').removeClass('disabled-icon');
    }

    if (callback) callback.apply(this, args);
  },

  cleanup: function() {
    app.loadingModal.close();
    app.simpleMessageModal.close();
    window.obEventBus.trigger('cleanNav');
  },

  cacheView: function(view, fragment) {
    var index;

    fragment = fragment || Backbone.history.getFragment();
    index = view.constructor.getCacheIndex(fragment);

    this.viewCache[index] = {
      cachedAt: Date.now(),
      view: this.view
    };
  },

  newView: function(View, options) {
    var now = Date.now(),
        cached = this.viewCache[View.getCacheIndex(Backbone.history.getFragment())],
        requestedRoute = Backbone.history.getFragment(),
        loadingConfig;

    options = __.extend({
      // viewArgs can be an array of args to pass into the view or a single
      // arg (most likely an options object)
      viewArgs: [{}],
      addressBarText: '',
      bodyID: '',
      bodyClass: ''
    }, options || {});

    options.viewArgs = options.viewArgs.length ? options.viewArgs : [options.viewArgs];

    this.cleanup();
    window.obEventBus.trigger('setAddressBar', options.addressBarText);

    $('body').attr('id', options.bodyID);
    $('body').attr('class', options.bodyClass);

    this.pageConnectModal && this.pageConnectModal.remove();
    this.pageConnectModal = null;

    // let's update the cache of our existing view (if it's cached && not expired) so
    // cachedAt is updated and the user has up until the view's 'cacheExpires' amount of
    // time to come back to it in it's current state.
    for (var key in this.viewCache) {
      if (this.viewCache.hasOwnProperty(key)) {
        let cached = this.viewCache[key];

        if (
            cached.view === this.view &&
            (Date.now() - cached.cachedAt < cached.view.cacheExpires)
          ) {
          cached.cachedAt = Date.now();
        }
      }
    }

    // remove / detach any existing view
    if (this.view) {
      if (this.view.cacheExpires) {
        this.trigger('cache-will-detach', { view: this.view });
        this.view.$el.detach();
        this.trigger('cache-detached', { view: this.view });
      } else {
        this.view.close ? this.view.close() : this.view.remove();
      }
    }

    if (cached && (now - cached.cachedAt < cached.view.cacheExpires)) {
      // we have an un-expired cached view, let's reattach it
      this.view = cached.view;

      $('#content').html(this.view.$el);
      this.view.delegateEvents();
      this.$obContainer[0].scrollTop = 0;

      this.trigger('cache-reattached', {
        view: this.view,
        route: requestedRoute
      });
    } else {
      this.view = new (Function.prototype.bind.apply(View, [null].concat(options.viewArgs)));
      $('#content').html(this.view.$el);
      this.$obContainer[0].scrollTop = 0;

      if (
        (loadingConfig = __.result(this.view, 'loadingConfig')) &&
        loadingConfig.promise &&
        typeof loadingConfig.promise.then === 'function') {
        this.launchPageConnectModal(loadingConfig).done(() => {
          this.view.cacheExpires && this.cacheView(this.view);
        }).fail(() => {
          this.view.remove();
        });
      } else {
        this.view.cacheExpires && this.cacheView(this.view);
      }
    }
  },

  launchPageConnectModal: function(config) {
    var defaults = {
      connectText: 'Connecting...',
      failedText: 'Unable to Connect.'
    },
    deferred = $.Deferred();

    if (!(
        config &&
        config.promise &&
        typeof config.promise.then === 'function'
      )) {
      throw new Error('At a minimum, the config must contain a config.promise.');
    }

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
      deferred.reject();
    });

    this.pageConnectModal.on('retry', () => {
      // recall the same route
      var route = location.hash;

      this.navigate('blah-blah', { replace: true });
      this.navigate(route, { replace: true, trigger: true });
    });

    this.pageConnectModal.on('cancel', () => {
      typeof config.promise.cancel === 'function' && config.promise.cancel();
      deferred.reject();
      history.back();
    });

    config.promise.done(() => {
      this.pageConnectModal && this.pageConnectModal.remove();
      this.pageConnectModal = null;
      deferred.resolve();
    }).fail(() => {
      this.pageConnectModal && this.pageConnectModal.setState({
        statusText: config.failedText,
        mode: 'failed-connect',
        tooltip: config.failedTooltip
      });
      deferred.reject();
    });

    return deferred.promise();
  },

  index: function(){
    const host = encodeURIComponent(app.serverConfigs.getActive().getServerBaseUrl());
    const route = localStorage.getItem(host);
    if (route){
      this.navigate('#' + route, {trigger: true});
    } else {
      this.navigate('#home', {trigger: true});
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

    // hide the discover onboarding callout
    this.$discoverHolder = this.$discoverHolder || $('.js-OnboardingIntroDiscoverHolder');
    this.$discoverHolder.addClass('hide');

    app.appBar.setTitle(window.polyglot.t('Discover'));
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

    if (!userID) {
      this.navigate(`userPage/${this.userModel.get('guid')}`, { replace: true });
    }

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
        this.navigate(`userPage/${guid}${subPath ? '/' + subPath.join('/') : ''}`, { replace: true });
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
    this.newView(transactionsView, {
      viewArgs: {
        userModel: this.userModel,
        userProfile: this.userProfile,
        socketView: this.socketView,
        state: state,
        orderID: orderID,
        tabState: tabState //opens a tab in the order modal
      },
      bodyID: 'userPage'
    });

    app.appBar.setTitle(window.polyglot.t('Transactions'));
  },

  settings: function(state){
    this.newView(settingsView, {
      viewArgs: {
        userModel: this.userModel,
        userProfile: this.userProfile,
        state: state,
        socketView: this.socketView
      },
      bodyID: 'userPage'
    });

    app.appBar.setTitle(window.polyglot.t('Settings'));
  }
});
