'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    Polyglot = require('node-polyglot'),
    NotificationsCl = require('../collections/notificationsCl.js'), 
    languagesModel = require('../models/languagesMd'),
    baseVw = require('./baseVw'),
    adminPanelView = require('../views/adminPanelVw'),
    NotificationsVw = require('../views/notificationsVw'),
    remote = require('remote'),
    messageModal = require('../utils/messageModal.js');

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
    'click .js-hideSupportModal': 'hideSupportModal',
    'click .js-aboutModal .js-tab': 'aboutModalTabClick',
    'click .js-navNotifications': 'navNotificationsClick',
    'click .js-navProfile': 'navProfileClick',
    'click .js-navRefresh': 'navRefreshClick',
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
    'focus .js-navAddressBar': 'addressBarFocus',
    'keyup .js-navAddressBar': 'addressBarKeyup',
    'click .js-closeStatus': 'closeStatusBar',
    'click .js-homeModal-themeSelected': 'setSelectedTheme',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-navInstallUpdate': 'sendInstallUpdate',
    'click .js-navDismisslUpdate': 'dismissUpdate'
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


    this.currentWindow = remote.getCurrentWindow();

    this.socketNotificationID = Math.random().toString(36).slice(2);
    this.socketView.getNotifications(this.socketNotificationID);

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
    this.notificationsFetch = this.notificationsCl.fetch();

    this.listenTo(this.notificationsCl, 'sync', (cl, resp, options) => {
      // this.setNotificationCount
    });
  },

  sendInstallUpdate: function() {
    ipcRenderer.send('installUpdate');
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  dismissUpdate: function() {
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if(data.id == this.socketNotificationID){
      console.log(data);
    }
  },

  closeNav: function(){
    var targ = this.$el.find('.js-navProfileMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
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
      self.$el.html(loadedTemplate(self.model.toJSON()));
      
      if (!self.notificationsVw) {
        self.notificationsVw = new NotificationsVw({
          socketView: self.socketView,
          collection: self.notificationsCl,
          fetch: self.notificationsFetch
        });
        // self.listenTo(self.notificationsPanel, 'notificationsCounted', self.setNotificationCount);
        // self.subViews.push(self.notificationsPanel);
        self.registerChild(self.notificationsVw);
      }

      self.$('#notificationsPanel').html(self.notificationsVw.render().el);

      //add the admin panel
      self.adminPanel && self.adminPanel.remove();
      self.adminPanel = new adminPanelView({model: self.model});
      self.registerChild(self.adminPanel);
      // self.subViews.push(self.adminPanel);

      self.addressInput = self.$el.find('.js-navAddressBar');
      self.statusBar = self.$el.find('.js-navStatusBar');
      //listen for address bar set events
      self.listenTo(window.obEventBus, "setAddressBar", function(options){
        var text = options.handle || options.addressText;
        self.addressInput.val(text);
        self.closeStatusBar();
      });

      self.listenTo(self.userProfile, 'change:avatar_hash', function(){
        self.model.set('vendor', self.userProfile.get('profile').vendor);
        self.render();
      });

      self.listenTo(window.obEventBus, "socketMessageReceived", function(response){
        self.handleSocketMessage(response);
      });

      if(self.showDiscoverCallout) {
        // display discover callout
        self.$el.find('.js-OnboardingIntroDiscoverHolder').removeClass('hide');
      }

      //when language is changed, re-render
      self.listenTo(self.model, 'change:language', function(){
        self.render();
      });
    });

    return this;
  },

  showAboutModal: function(e){

    // display the modal
    $('.js-aboutModalHolder').fadeIn(300, function(){
      // set the active tab
      $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
      $('.js-about-mainTab').addClass('active');

      // set the active section
      $('.js-aboutModal .modal-section').addClass('hide');
      $('.js-aboutModal .js-modalAboutMain').removeClass('hide');
    });

    // blur the container for extra focus
    $('#obContainer').addClass('blur');
  },

  hideAboutModal: function(e){
    $('.js-aboutModalHolder').fadeOut(300);
    $('#obContainer').removeClass('blur');
  },

  showSupportModal: function(e){
    $('.js-aboutModalHolder').fadeIn(300, function() {
      $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
      $('.js-about-donationsTab').addClass('active');
      $('.js-aboutModal .modal-section').addClass('hide');
      $('.js-aboutModal .js-modalAboutSupport').removeClass('hide');
    });
    $('#obContainer').addClass('blur');
  },

  hideSupportModal: function(e){
    $('.js-aboutModalHolder').fadeOut(300);
    $('#obContainer').removeClass('blur');
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

  navNotificationsClick: function(e){
    e.stopPropagation();
    this.setNotificationCount("");
    var targ = this.$el.find('.js-navNotificationsMenu');
    targ.siblings('.popMenu').addClass('hide');
    if(targ.hasClass('hide')){
      targ.removeClass('hide').addClass('popMenu-notifications-opened');
      $('#overlay').removeClass('hide');
      $('html').on('click.closeNav', function(e){
        if($(e.target).closest(targ).length === 0){
          targ.addClass('hide').removeClass('popMenu-notifications-opened');
          $('#overlay').addClass('hide');
          $(this).off('.closeNav');
        }
      });
    }else{
      targ.addClass('hide');
      $('#overlay').addClass('hide');
    }
  },

  setNotificationCount: function(count){
    if (count > 99) {
      count = "..";
    }

    this.$('.js-navNotifications .badge').attr('data-count', count);
  },

  navProfileClick: function(e){
    e.stopPropagation();
    var targ = this.$el.find('.js-navProfileMenu');
    targ.siblings('.popMenu').addClass('hide');
    if(targ.hasClass('hide')){
      targ.removeClass('hide').addClass('popMenu-navBar-opened');
      $('#overlay').removeClass('hide');
      $('html').on('click.closeNav', function(e){
        if($(e.target).closest(targ).length === 0){
          targ.addClass('hide').removeClass('popMenu-navBar-opened');
          $('#overlay').addClass('hide');
          $(this).off('.closeNav');
        }
      });
    }else{
      targ.addClass('hide');
      $('#overlay').addClass('hide');
    }
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
    } else {
      this.currentWindow.maximize();
    }
  },

  navBackClick: function(){
    window.history.back();
  },

  navFwdClick: function(){
    window.history.forward();
  },

  navRefreshClick: function(){
    this.currentWindow.reload();
  },

  addressBarFocus: function(e){
    // on inital focus of input, select all text (this makes it easier to copy or delete the text)
    $(e.target).one('mouseup', function () {
      $('#addressBar').select();
    });
  },

  addressBarKeyup: function(e){
    var barText = this.addressInput.val();
    //detect enter key
    if (e.keyCode == 13){
      this.addressBarProcess(barText);
    } else {
      this.closeStatusBar();
    }
  },

  addressBarProcess: function(addressBarText){
    var guid = "",
        handle = "",
        state = "",
        itemHash = "",
        addressTextArray = addressBarText.replace(/ /g, "").split("/");

    state = addressTextArray[1] ? "/" + addressTextArray[1] : "";
    itemHash = addressTextArray[2] ? "/" + addressTextArray[2] : "";

    if(addressTextArray[0].charAt(0) == "@"){
      // user entered a handle
      handle = addressTextArray[0].replace('@', '');
      this.processHandle(handle, state, itemHash);
    } else if(!addressTextArray[0].length){
      // user trying to go back to discover
      Backbone.history.navigate('#home', {trigger:true});
    } else if(addressTextArray[0].length === 40){
      // user entered a guid
      guid = addressTextArray[0];
      Backbone.history.navigate('#userPage/' + guid + state + itemHash, {trigger:true});
    } else if(addressTextArray[0].charAt(0) == "#"){
      // user entered a search term
      Backbone.history.navigate('#home/products/' + addressTextArray[0].replace('#', ''), {trigger:true});
    } else {
      //user entered text that doesn't match a known pattern, assume it's a product search
      Backbone.history.navigate('#home/products/' + addressTextArray[0], {trigger:true});
    }
  },

  processHandle: function(handle, state, itemHash){
    if(handle){
      $.ajax({
        url: this.model.get('resolver') + "/v2/users/" + handle,
        dataType: "json"
      }).done(function(resolverData){
        if(resolverData[handle].profile && resolverData[handle].profile.account){
          var account = resolverData[handle].profile.account.filter(function (accountObject) {
            return accountObject.service == "openbazaar";
          });
          Backbone.history.navigate('#userPage/' + account[0].identifier + state + itemHash, {trigger: true});
        } else {
          messageModal.show(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badHandle'));
        }
      }).fail(function(jqXHR, status, errorThrown){
        messageModal.show(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badHandle'));
      });
    }
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

});
