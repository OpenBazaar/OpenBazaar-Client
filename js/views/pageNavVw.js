'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    Polyglot = require('node-polyglot'),
    NotificationsCl = require('../collections/notificationsCl.js'),
    languagesModel = require('../models/languagesMd'),
    baseVw = require('./baseVw'),
    //adminPanelView = require('../views/adminPanelVw'),
    NotificationsVw = require('../views/notificationsVw'),
    remote = require('remote'),
    pjson = require('../../package.json');

var ipcRenderer = require('ipc-renderer');  // Allows to talk Electon main process

module.exports = baseVw.extend({

  el: '#pageNav',

  events: {
    'click .js-navClose': 'navCloseClick',
    'click .js-navMin': 'navMinClick',
    'click .js-navMax': 'navMaxClick',
    'click .js-navBack': 'navBackClick',
    'click .js-navFwd': 'navFwdClick',
    'click .js-showAboutModal': 'showAboutModal',
    'click .js-hideAboutModal': 'hideAboutModal',
    'click .js-showSupportModal': 'showSupportModal',
    'click .js-aboutModal .js-tab': 'aboutModalTabClick',
    'click .js-navRefresh': 'navRefreshClick',
    'click .js-navRestart': 'navRestartClick',
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
    'focus .js-navAddressBar': 'addressBarFocus',
    'keyup .js-navAddressBar': 'addressBarKeyup',
    'blur .js-navAddressBar': 'addressBarBlur',
    'click .js-closeStatus': 'closeStatusBar',
    'click .js-homeModal-themeSelected': 'setSelectedTheme',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-navInstallUpdate': 'sendInstallUpdate',
    'click .js-navDismisslUpdate': 'dismissUpdate',
    'click [data-popmenu]': 'onPopMenuNavClick',
    'click .js-OnboardingIntroDiscover': 'hideDiscoverIntro'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    /* recieves socketView and userProfile from main.js */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.model.set('vendor', this.userProfile.get('profile').vendor);
    this.model.set('moderator', this.userProfile.get('profile').moderator);
    this.languages = new languagesModel();
    this.showDiscIntro = options.showDiscIntro;
    this.notificationsRecord = {}; //store notification timestamps to prevent too many from the same user

    this.currentWindow = remote.getCurrentWindow();

    this.listenTo(window.obEventBus, "updateProfile", function(response){
      this.refreshProfile();
    });
    this.listenTo(window.obEventBus, "updateUserModel", function(response){
      this.model.fetch();
    });

    // pre-select lauguage.
    var localLanguage = window.navigator.language;
    var localLanguageFound = false;
    var languageList = this.languages.get('languages');
    for(var i in languageList) {
      if(languageList[i].langCode == localLanguage) {
        localLanguageFound = true;
        break;
      }
    }

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

    this.listenTo(window.obEventBus, "onboarding-complete", function(){
      this.showDiscoverIntro();
    });

    this.listenTo(window.obEventBus, "cleanNav", function(){
      this.cleanNav();
    });

    //when language is changed, re-render
    this.listenTo(this.model, 'change:language', function(){
      this.render();
    });

    $(document).on('click', this.onDocumentClick.bind(this));
  },

  showDiscoverIntro: function(){
    this.$('.js-OnboardingIntroDiscoverHolder').removeClass('hide');
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
    this.hideAboutModal();
    this.closeNav();
    this.closeStatusBar();
    obEventBus.trigger('closeBuyWizard');
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data),
        username,
        avatar,
        notif,
        notifStamp;

    if (data.hasOwnProperty('notification')) {
      notif = data.notification;
      username = notif.handle ? notif.handle : notif.guid.substring(0,10) + '...';
      avatar = notif.image_hash ? app.serverConfig.getServerBaseUrl + '/get_image?hash=' +
        notif.image_hash + '&guid=' + notif.guid : 'imgs/defaultUser.png';
      notifStamp = Date.now();

      this.unreadNotifsViaSocket++;

      this.notificationsCl.add(
          __.extend({}, notif, { read: false })
      );

      //prevent message spamming from one user
      if(!this.notificationsRecord[username]){
        this.notificationsRecord[username] = {};
      }
      if(this.notificationsRecord[username].notifStamp && notifStamp - this.notificationsRecord[username].notifStamp < 30000){
        return;
      }
      this.notificationsRecord[username].notifStamp = notifStamp;

      switch(notif.type) {
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

  notificationClick: function(e) {
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
    this.model.set('ctrlCmdKey', window.navigator.platform === 'MacIntel' ? '&#8984;' : 'Ctrl+');
    this.model.set('version', pjson.version);
    loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

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

      //add the admin panel
      /*
      self.adminPanel && self.adminPanel.remove();
      self.adminPanel = new adminPanelView({model: self.model});
      self.registerChild(self.adminPanel);
      */

      self.addressInput = self.$el.find('.js-navAddressBar');
      self.statusBar = self.$el.find('.js-navStatusBar');
      //listen for address bar set events
      self.listenTo(window.obEventBus, "setAddressBar", function(options){
        var text = options.handle || options.addressText;
        self._lastSetAddressBarText = text;
        self.addressInput.val(text);
        self.closeStatusBar();
      });
      if(self.showDiscIntro){
        self.showDiscoverIntro();
      }
    });

    return this;
  },

  showAboutModal: function(e){

    this.cleanNav();

    // display the modal
    $('.js-aboutModalHolder').fadeIn(300);

    // set the active tab
    $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
    $('.js-about-mainTab').addClass('active');

    // set the active section
    $('.js-aboutModal .modal-section').addClass('hide');
    $('.js-aboutModal .js-modalAboutMain').removeClass('hide');

    // blur the container for extra focus
    $('#obContainer').addClass('blur');
  },

  hideAboutModal: function(e){
    $('.js-aboutModalHolder').fadeOut(300);
    $('#obContainer').removeClass('blur');
  },

  showSupportModal: function(e){
    $('.js-aboutModalHolder').fadeIn(300);
    $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
    $('.js-about-donationsTab').addClass('active');
    $('.js-aboutModal .modal-section').addClass('hide');
    $('.js-aboutModal .js-modalAboutSupport').removeClass('hide');
    $('#obContainer').addClass('blur');
  },

  aboutModalTabClick: function(e){
    var tab = $(e.currentTarget).data('tab');
    $('.js-aboutModal .btn-tab').removeClass('active');
    $(e.currentTarget).addClass('active');

    switch(tab) {
      case "about":
        $('.modal-about-section').addClass('hide');
        $('.js-modalAboutMain').removeClass('hide');
        break;
      case "support":
        $('.modal-about-section').addClass('hide');
        $('.js-modalAboutSupport').removeClass('hide');
        break;
      case "contributors":
        $('.modal-about-section').addClass('hide');
        $('.js-modalAboutContributors').removeClass('hide');
        break;
      case "licensing":
        $('.modal-about-section').addClass('hide');
        $('.js-modalAboutLicensing').removeClass('hide');
        break;
    }
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
    return this.unreadNotifsViaSocket + this.notificationsCl.getUnreadCount() -
      this.fetchNotifsMarkedAsRead || 0;
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
        url: app.serverConfig.getServerBaseUrl() + '/mark_notification_as_read',
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

    if (!(
        $target.hasClass('popMenu') ||
        $target.parents('.popMenu').length ||
        $target.is('[data-popmenu]') ||
        $target.parents('[data-popmenu]').length
      )) {
      app.hideOverlay();
      $popMenu = self.$('.popMenu.popMenu-opened').removeClass('popMenu-opened');
      $popMenu.each((index, el) => {
        closeHandler = $(el).data('onclose');
        closeHandler && this[closeHandler] && this[closeHandler].call(this);
      });
    }
  },

  closeNav: function() {
    app.hideOverlay();
    self.$('.js-navProfileMenu').removeClass('popMenu-opened');    
  },

  navCloseClick: function(){
    var process = remote.process;
    if (process.platform != 'darwin') {
      this.currentWindow.close();
    } else {
      this.currentWindow.hide();
    }
  },

  navMinClick: function(){
    this.currentWindow.minimize();
  },

  navMaxClick: function(){
    if(this.currentWindow.isMaximized()){
      this.currentWindow.unmaximize();
      $('.js-navMax').attr('data-tooltip', window.polyglot.t('Maximize'));
    } else {
      this.currentWindow.maximize();
      $('.js-navMax').attr('data-tooltip', window.polyglot.t('Restore'));
    }
  },

  navBackClick: function(){
    window.history.back();
  },

  navFwdClick: function(){
    window.history.forward();
  },

  navRefreshClick: function(){
    Backbone.history.loadUrl();
  },
  
  navRestartClick: function(){
    location.reload();
  },

  trimAddressBar: function() {
    this.addressInput.val(function (i, value) {
      return value.replace('ob://', '');
    });
  },

  untrimAddressBar: function(){
    this.addressInput.val(function (i, value) {
      if(value) {
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

  addressBarBlur: function(e){
    this.trimAddressBar();
  },

  addressBarKeyup: function(e){
    var barText = this.addressInput.val(),
        sliced;

    //detect enter key
    if (e.keyCode == 13){
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
      Backbone.history.navigate(route, {trigger:true});
    });
  },

  showStatusBar: function(msgText){
    this.statusBar.find('.js-statusBarMessage').text(msgText);
    this.statusBar.removeClass('fadeOut');
  },

  closeStatusBar: function(){
    this.statusBar.addClass('fadeOut');
  },

  navAdminPanel: function(){
    this.$el.find('.js-adminModal').fadeIn(300);
    this.adminPanel.updatePage();
  },

  setSelectedTheme: function(e){
    // Needs to save to the object and update the dom
  },

  shadeColor2: function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  validateInput: function(e) {
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  remove: function() {
    $(document).off('click', this.onDocumentClick);

    baseVw.prototype.remove.apply(this, arguments);
  }
});
