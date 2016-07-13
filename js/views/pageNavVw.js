'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    NotificationsCl = require('../collections/notificationsCl.js'),
    languagesModel = require('../models/languagesMd'),
    baseVw = require('./baseVw'),
    //adminPanelView = require('../views/adminPanelVw'),
    AboutModal = require('../views/aboutModal'),
    NotificationsVw = require('../views/notificationsVw'),
    PageNavServersVw = require('../views/pageNavServersVw'),
    SuggestionsVw = require('../views/suggestionsVw'),
    pjson = require('../../package.json');

var ipcRenderer = require('ipc-renderer');  // Allows to talk Electon main process

module.exports = baseVw.extend({

  el: '#pageNav',

  events: {
    'click .js-navBack': 'navBackClick',
    'click .js-navFwd': 'navFwdClick',
    'click .js-showAboutModal': 'showAboutModal',
    'click .js-showSupportModal': 'showSupportModal',
    'click .js-navRefresh': 'navRefreshClick',
    //'click .js-navRestart': 'navRestartClick',
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
    'focus .js-navAddressBar': 'addressBarFocus',
    'keyup .js-navAddressBar': 'addressBarKeyup',
    'blur .js-navAddressBar': 'addressBarBlur',
    'click .js-closeStatus': 'closeStatusBar',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-navInstallUpdate': 'sendInstallUpdate',
    'click .js-navDismisslUpdate': 'dismissUpdate',
    'click [data-popmenu]': 'onPopMenuNavClick',
    'click .js-OnboardingIntroDiscover': 'hideDiscoverIntro',
    'mouseenter .js-serverSubmenuTrigger': 'mouseenterServerSubmenuTrigger',
    'mouseleave .js-serverSubmenuTrigger': 'mouseleaveServerSubmenuTrigger',
    'mouseenter .js-serverSubmenu': 'mouseenterServerSubmenu',
    'mouseleave .js-serverSubmenu': 'mouseleaveServerSubmenu'
  },

  initialize: function(options){
    this.options = options || {};
    /* recieves socketView and userProfile from main.js */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.model.set('vendor', this.userProfile.get('profile').vendor);
    this.model.set('moderator', this.userProfile.get('profile').moderator);
    this.languages = new languagesModel();
    this.showDiscIntro = options.showDiscIntro;

    this.listenTo(window.obEventBus, "updateProfile", function(){
      this.refreshProfile();
    });
    this.listenTo(window.obEventBus, "updateUserModel", function(){
      this.model.fetch();
    });

    /*
    // pre-select lauguage.
    var localLanguage = window.navigator.language;
    var localLanguageFound = false;
    var languageList = this.languages.get('languages');
    for (var i in languageList) {
      if (languageList[i].langCode == localLanguage) {
        localLanguageFound = true;
        break;
      }
    }
    */

    this.notificationsCl = new NotificationsCl();
    this.notificationsCl.comparator = function(notif) {
      return -notif.get('timestamp');
    };
    this.notificationsFetch = this.notificationsCl.fetch({
      data: {
        limit: 6
      },
      reset: true
    });

    this.unreadNotifsViaSocket = 0;
    this.fetchNotifsMarkedAsRead = 0;

    this.listenTo(this.notificationsCl, 'reset update', function(cl, options) {
      if (options.xhr) {
        this.fetchNotifsMarkedAsRead = 0;
        this.unreadNotifsViaSocket = 0;
      }

      this.setNotificationCount(this.getUnreadNotifCount());
    });

    this.listenTo(this.userProfile, 'change:avatar_hash', function(){
      this.model.set('vendor', this.userProfile.get('profile').vendor);
      this.render();
    });

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });

    this.listenTo(window.obEventBus, "cleanNav", function(){
      this.cleanNav();
    });
    
    this.listenTo(window.obEventBus, "searchingText", function(text){
      this.saveVisitedTag(text);
    });
    
    this.listenTo(window.obEventBus, "handleObtained", function(profile){
      this.saveVisitedHandle(profile);
    });

    //when language is changed, re-render
    this.listenTo(this.model, 'change:language', function(){
      this.render();
    });

    $(document).on('click', this.onDocumentClick.bind(this));
  },

  showDiscoverIntro: function(){
    this.$('.js-OnboardingIntroDiscoverHolder').removeClass('hide');
    this.showDiscIntro = false;
  },

  hideDiscoverIntro: function(){
    this.$('.js-OnboardingIntroDiscoverHolder').addClass('hide');
  },

  sendInstallUpdate: function() {
    ipcRenderer.send('installUpdate');
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  dismissUpdate: function() {
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  cleanNav: function(){
    this.aboutModal && this.aboutModal.close();
    this.closeNav();
    this.closeStatusBar();
    window.obEventBus.trigger('closeBuyWizard');
  },
  
  saveVisitedTag: function(tag){
    var tagsList = JSON.parse(localStorage.getItem('tagsHistory')) || [],
        tagsListLength = tagsList.length,
        index = tagsList.indexOf(tag);

    // Do nothing if there's just one tag and new one isn't added
    if (tagsListLength !== 1 || index === -1) {
      // List is empty, just add the tag   
      if (tagsListLength === 0) {
        tagsList.push(tag);
      } else {
        // Tag exists, pull it out of the list
        if (index !== -1) {
          tagsList.splice(index, 1);
        }
        
         // Tag goes to the beginning of the list
        tagsList.splice(0, 0, tag);
      }
      
      // History needs to be pruned
      if (tagsListLength > window.config.maxTagHistory) {
        tagsList = tagsList.slice(0, window.config.maxTagHistory);
      }

      // Update the history
      localStorage.setItem('tagsHistory', JSON.stringify(tagsList));
    }
  },
  
  saveVisitedHandle: function(profile){
    var handlesList = JSON.parse(localStorage.getItem('handlesHistory')) || [],
        handlesListLength = handlesList.length,
        index = __.findIndex(handlesList, {handle: profile.handle});
        
    // Do nothing if there's just one tag and new one isn't added
    if (handlesListLength !== 1 || index === -1) {
      let handleObj = {
        guid: profile.guid,
        handle: profile.handle,
        name: profile.name
      };

      // List is empty, just add the tag   
      if (handlesListLength === 0) {
        handlesList.push(handleObj);
      } else {
        // Tag exists, pull it out of the list
        if (index !== -1) {
          handlesList.splice(index, 1);
        }
        
        // Tag goes to the beginning of the list
        handlesList.splice(0, 0, handleObj);
      }
      
      // History needs to be pruned
      if (handlesListLength > window.config.maxHandleHistory) {
        handlesList = handlesList.slice(0, window.config.maxHandleHistory);
      }

      // Update the history
      localStorage.setItem('handlesHistory', JSON.stringify(handlesList));
    }
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data),
        username,
        avatar,
        avatarHash,
        notif;

    if (data.hasOwnProperty('notification') || data.hasOwnProperty('message') && data.message.subject) {
      notif = data.notification || data.message;
      username = notif.handle ? notif.handle : notif.guid;
      username = notif.sender ? notif.sender : username;
      avatarHash = notif.image_hash || notif.avatar_hash;
      avatar = avatarHash ? app.serverConfigs.getActive().getServerBaseUrl + '/get_image?hash=' +
        avatarHash + '&guid=' + notif.guid : 'imgs/defaultUser.png';
      notif.type = notif.type || notif.message_type;
      notif.guid = notif.guid || notif.sender;
      
      this.unreadNotifsViaSocket++;

      this.notificationsCl.add(
          __.extend({}, notif, { 
            read: false,
            username: username,
            image_hash: avatarHash
          })
      );

      switch (notif.type) {
      case "follow":
        new Notification(window.polyglot.t('NotificationFollow', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "dispute_open":
        new Notification(window.polyglot.t('NotificationDispute', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "dispute_close":
        new Notification(window.polyglot.t('NotificationDisputeClosed', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "new order":
        new Notification(window.polyglot.t('NotificationNewOrder', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "payment received":
        new Notification(window.polyglot.t('NotificationPaymentReceived', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "order confirmation":
        new Notification(window.polyglot.t('NotificationOrderConfirmed', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "rating received":
        new Notification(window.polyglot.t('NotificationRatingRecieved', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "ORDER":
        new Notification(window.polyglot.t('NotificationNewTransactionMessage', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      }

      app.playNotificationSound();
    }
  },  

  refreshProfile: function() {
    var self = this;

    this.userProfile.fetch({
      success: function(model){
        self.model.set('vendor', model.get('profile').vendor);
        self.model.set('moderator', model.get('profile').moderator);
        self.render();
      }
    });
  },

  notificationClick: function() {
    this.closeNotificationsMenu();
  },

  render: function(){
    var self = this;
    //reset tests for applying lists or List.js will fail on a re-render
    this.countryReady = false;
    this.currencyReady = false;
    this.languageReady = false;

    //load userProfile data into model
    this.model.set('guid', this.userProfile.get('profile').guid);
    this.model.set('avatar_hash', this.userProfile.get('profile').avatar_hash);

    loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      var connectedServer = app.serverConnectModal.getConnectedServer();

      self.$el.html(loadedTemplate(
        __.extend(self.model.toJSON(), { connectedServer: connectedServer && connectedServer.toJSON() })
      ));

      self.$notifMenu = self.$('.js-navNotificationsMenu');
      self.$navNotif = self.$('.js-navNotifications');

      if (!self.notificationsVw) {
        self.notificationsVw = new NotificationsVw({
          collection: self.notificationsCl,
          initialFetch: self.notificationsFetch,
          notifPerFetch: 10
        });
        self.registerChild(self.notificationsVw);

        self.listenTo(self.notificationsVw, 'notification-click', self.notificationClick);
      }

      self.$notifMenu.find('#notificationsPanel')
          .html(self.notificationsVw.render().el);

      self.setNotificationCount(self.getUnreadNotifCount());

      self.pageNavServersVw && self.pageNavServersVw.remove();
      self.pageNavServersVw = new PageNavServersVw({
        collection: app.serverConfigs
      });
      self.$('.js-serverSubmenu').html(
        self.pageNavServersVw.render().el
      );

      //add the admin panel
      /*
      self.adminPanel && self.adminPanel.remove();
      self.adminPanel = new adminPanelView({model: self.model});
      self.registerChild(self.adminPanel);
      */

      self.$addressInput = self.$el.find('.js-navAddressBar');
      self.$statusBar = self.$el.find('.js-navStatusBar');
      self.$serverSubmenu = self.$('.js-serverSubmenu');
      self.$serverSubmenuTrigger = self.$('.js-serverSubmenuTrigger');
      
      self.suggestionsVw && self.suggestionsVw.remove();
      self.suggestionsVw = new SuggestionsVw({
        $input: self.$addressInput
      });
      
      self.$('.js-mainSearchWrapper').append(self.suggestionsVw.render().el);

      //listen for address bar set events
      self.listenTo(window.obEventBus, 'setAddressBar', function(options){
        var text = options.handle || options.addressText;
        self._lastSetAddressBarText = text;
        self.$addressInput.val(text);
        self.closeStatusBar();
      });
      
      if (self.showDiscIntro){
        self.showDiscoverIntro();
      }

      if (!self.aboutModal) {
        self.aboutModal = new AboutModal({
          version: pjson.version
        });
        self.aboutModal.render();
        self.registerChild(self.aboutModal);
      }
    });

    return this;
  },

  showAboutModal: function(){
    this.cleanNav();
    this.aboutModal.setTab('about')
      .open();
  },

  hideAboutModal: function(){
    this.aboutModal && this.aboutModal.close();
  },

  showSupportModal: function() {
    this.cleanNav();
    this.aboutModal.setTab('support')
      .open();
  },

  closeNotificationsMenu: function() {
    app.hideOverlay();
    this.$notifMenu.removeClass('popMenu-opened');
    this.onNotifMenuClose();
  },

  isNotifMenuOpen: function() {
    return this.$notifMenu.hasClass('popMenu-opened');
  },

  setNotificationCount: function(count){
    if (isNaN(parseInt(count))) return;

    app.setUnreadNotifCount(count);

    if (count > 99) {
      count = '..';
    }

    if (count == 0) {
      this.$navNotif.find('.badge')
          .removeAttr('data-count', count);
    } else {
      this.$navNotif.find('.badge')
          .attr('data-count', count);
    }
  },

  getUnreadNotifCount: function() {
    var count;

    count = this.unreadNotifsViaSocket + this.notificationsCl.getUnreadCount() -
      this.fetchNotifsMarkedAsRead || 0;

    // fudge fix! sometimes the count is coming back as -1 and we can't reproduce it
    // nor track down why, so we're reluctantly fudging it.
    return count < 0 ? 0 : count;
  },

  onNotifMenuOpen: function() {
    this.notificationsVw.resetScroll();
  },

  onNotifMenuClose: function() {
    var unread = [],
        formData = new FormData();

    this.notificationsCl.forEach((notif) => {
      if (!notif.get('read')) {
        notif.set('read', true);
        unread.push(notif.id);
      }
    });

    if (unread.length) {
      unread.forEach((id) => {
        formData.append('id', id);
      });

      $.ajax({
        url: app.serverConfigs.getActive().getServerBaseUrl() + '/mark_notification_as_read',
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        data: formData
      });
    }

    this.fetchNotifsMarkedAsRead += unread.length - this.unreadNotifsViaSocket;
    this.unreadNotifsViaSocket = 0;
    this.setNotificationCount(this.getUnreadNotifCount());
  },

  onPopMenuNavClick: function(e) {
    var $popMenu,
        openHandler,
        closeHandler;

    e.preventDefault();
    e.stopPropagation();

    $popMenu = self.$(
      $(e.target).data('popmenu')
    );

    if (!$popMenu.length) return;

    self.$('.popMenu').not($popMenu)
      .removeClass('popMenu-opened');
    
    $popMenu.toggleClass('popMenu-opened');

    if ($popMenu.hasClass('popMenu-opened')) {
      app.showOverlay();
      this.suggestionsVw.hideSuggestions();
      openHandler = $popMenu.data('onopen');
      openHandler && this[openHandler] && this[openHandler].call(this);
    } else {
      app.hideOverlay();
      closeHandler = $popMenu.data('onclose');
      closeHandler && this[closeHandler] && this[closeHandler].call(this);
    }
  },

  onDocumentClick: function(e) {
    var $target = $(e.target),
        $popMenu,
        closeHandler;
        
    if (!$target.hasClass('js-navAddressBar') && this.suggestionsVw.isVisible()) {
      app.hideOverlay();
      this.suggestionsVw.hideSuggestions();
    } else if ($target.hasClass('js-navAddressBar') ||
      !(
        $target.hasClass('popMenu') ||
        $target.parents('.popMenu').length ||
        $target.is('[data-popmenu]') ||
        $target.parents('[data-popmenu]').length
      ))
    {
      if (!this.suggestionsVw.isVisible()) {
        app.hideOverlay();
      }
      
      $popMenu = self.$('.popMenu.popMenu-opened').removeClass('popMenu-opened');
      $popMenu.each((index, el) => {
        closeHandler = $(el).data('onclose');
        closeHandler && this[closeHandler] && this[closeHandler].call(this);
      });
    }
  },

  closeNav: function(e) {
    if (
      e &&
      (
        e.target === this.$serverSubmenuTrigger[0] ||
        $(e.target).parents('.js-serverSubmenuTrigger').length
      )
    ) {
      return;
    }    

    app.hideOverlay();
    self.$('.js-navProfileMenu').removeClass('popMenu-opened');
    clearTimeout(this.ServerSubmenuTimeout);
    this.$serverSubmenu.removeClass('server-submenu-opened');    
  },

  navBackClick: function(){
    history.back();
  },

  navFwdClick: function(){
    history.forward();
  },

  navRefreshClick: function(){
    app.router.refresh();
  },
  
  navRestartClick: function(){
    location.reload();
  },

  trimAddressBar: function() {
    this.$addressInput.val(function (i, value) {
      return value.replace('ob://', '');
    });
  },

  untrimAddressBar: function(){
    this.$addressInput.val(function (i, value) {
      if (value) {
        value = value.startsWith('ob://') ? value : 'ob://' + value;
      }
      return value;
    });
  },

  addressBarFocus: function(e){

    // on mouseEnter of the address bar input display the ob:// prefix if it doesn't already exist
    this.untrimAddressBar();

    // on inital focus of input, select all text (this makes it easier to copy or delete the text)
    $(e.target).one('mouseup', function () {
      $('#addressBar').select();
    });
  },

  addressBarBlur: function(){
    this.trimAddressBar();
  },

  addressBarKeyup: function(e){
    var barText = this.$addressInput.val(),
        sliced;

    //detect enter key
    if (e.keyCode == 13){
      if (this.suggestionsVw.wasSelectedOnEnter()) {
        //if enter was clicked while a suggestion was highlighted, let the suggestions view handle the routing
        return;
      }
      
      if (barText.startsWith('ob://')) {
        sliced = barText.length > 5 ? barText.slice(5) : '';
        sliced && this.addressBarProcess(sliced);
      } else {
        this.addressBarProcess(barText);  
      }
    } else {
      this.closeStatusBar();
    }
  },

  addressBarProcess: function(addressBarText){
    app.router.translateRoute(addressBarText).done((route) => {
      Backbone.history.navigate(route, {trigger: true});
    });
  },

  showStatusBar: function(msgText){
    this.$statusBar.find('.js-statusBarMessage').text(msgText);
    this.$statusBar.removeClass('fadeOut');
  },

  closeStatusBar: function(){
    this.$statusBar.addClass('fadeOut');
  },

  navAdminPanel: function(){
    this.$el.find('.js-adminModal').fadeIn(300);
    this.adminPanel.updatePage();
  },

  shadeColor2: function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1), 16), t=percent<0?0:255, p=percent<0?percent*-1:percent, R=f>>16, G=f>>8&0x00FF, B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  validateInput: function(e) {
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  mouseenterServerSubmenuTrigger: function() {
    this.$serverSubmenu.css('right', this.$('.popMenu-navBarSubMenu-pageNav').outerWidth());

    this.ServerSubmenuTimeout = setTimeout(() => {
      this.$serverSubmenu.addClass('server-submenu-opened');
    }, 150);
  },

  mouseleaveServerSubmenuTrigger: function() {
    clearTimeout(this.ServerSubmenuTimeout);

    setTimeout(() => {
      if (!this.overServerSubmenu) {
        this.$serverSubmenu.removeClass('server-submenu-opened');
      }
    }, 100);
  },

  mouseenterServerSubmenu: function() {
    this.overServerSubmenu = true;
  },

  mouseleaveServerSubmenu: function() {
    this.overServerSubmenu = false;
    clearTimeout(this.ServerSubmenuTimeout);
    this.$serverSubmenu.removeClass('server-submenu-opened');
  },  

  remove: function() {
    $(document).off('click', this.onDocumentClick);

    baseVw.prototype.remove.apply(this, arguments);
  }
});
