var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    Polyglot = require('node-polyglot'),
    languagesModel = require('../models/languagesMd'),
    adminPanelView = require('../views/adminPanelVw'),
    notificationsPanelView = require('../views/notificationsPanelVw'),
    remote = require('remote'),
    messageModal = require('../utils/messageModal.js');

    var ipcRenderer = require('ipc-renderer');  // Allows to talk Electon main process

module.exports = Backbone.View.extend({

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
    'click .js-navInstallUpdate': 'sendInstallUpdate'
  },

  initialize: function(options){
    "use strict";
    var self = this;
    this.options = options || {};
    /* recieves socketView and userProfile from main.js */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.model.set('vendor', this.userProfile.get('profile').vendor);
    this.model.set('moderator', this.userProfile.get('profile').moderator);
    this.subViews = [];
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
    //localLanguage = localLanguageFound ? localLanguage : "en-US";
    //this.model.set('language', localLanguage);
    //this.createTranslation(localLanguage);

    this.render();
  },

  sendInstallUpdate: function() {
    ipcRenderer.send('installUpdate');
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketNotificationID){
      console.log(data);
    }
  },

  closeNav: function(){
    "use strict";
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
    "use strict";
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
      self.notificationsPanel = new notificationsPanelView({
        parentEl: '#notificationsPanel',
        socketView: self.socketView,
        serverUrl: self.options.model.get('serverUrl')
      });
      self.listenTo(self.notificationsPanel, 'notificationsCounted', self.setNotificationCount);
      self.subViews.push(self.notificationsPanel);

      //add the admin panel
      self.adminPanel = new adminPanelView({model: self.model});
      self.subViews.push(self.adminPanel);
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
    "use strict";

    // set the active tab
    $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
    $('.js-about-mainTab').addClass('active');

    // set the active section
    $('.js-aboutModal .modal-section').addClass('hide');
    $('.js-aboutModal .js-modalAboutMain').removeClass('hide');

    // blur the container for extra focus
    $('#obContainer').addClass('blur');

    // display the modal
    $('.js-aboutModal').removeClass('hide');
  },

  hideAboutModal: function(e){
    "use strict";
    $('.js-aboutModal').addClass('hide');
    $('#obContainer').removeClass('blur');
  },

  showSupportModal: function(e){
    "use strict";
    $('.js-aboutModal').removeClass('hide');
    $('.js-aboutModal .navBar .btn.btn-bar').removeClass('active');
    $('.js-about-donationsTab').addClass('active');
    $('.js-aboutModal .modal-section').addClass('hide');
    $('.js-aboutModal .js-modalAboutSupport').removeClass('hide');
    $('#obContainer').addClass('blur');
  },

  hideSupportModal: function(e){
    "use strict";
    $('.js-aboutModal').addClass('hide');
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
    "use strict";
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
    "use strict";
    if(count > 99) {
      count = "..";
    }
    this.$el.find('.js-navNotifications .badge').attr('data-count', count);
  },

  navProfileClick: function(e){
    "use strict";
    e.stopPropagation();
    var targ = this.$el.find('.js-navProfileMenu');
    targ.siblings('.popMenu').addClass('hide');
    if(targ.hasClass('hide')){
      // keep this stuff here for now, going to do something with this on my next branch. I basically hate how the user nav covers the chat panel. The plan is to collapse the sidebar when the nav is opened (to get it out of the way) and then reopen the side bar when the nav closes.
      // $('#sideBar').removeClass('sideBarSlid');
      // $('.container').removeClass('compressed');
      // $('#obContainer').removeClass('noScrollBar');

      targ.removeClass('hide').addClass('popMenu-navBar-opened');
      $('#overlay').removeClass('hide');
      $('html').on('click.closeNav', function(e){
        if($(e.target).closest(targ).length === 0){
          targ.addClass('hide').removeClass('popMenu-navBar-opened');
          $('#overlay').addClass('hide');
          $(this).off('.closeNav');
        }
        // keep this stuff here for now, going to do something with this on my next branch. I basically hate how the user nav covers the chat panel. The plan is to collapse the sidebar when the nav is opened (to get it out of the way) and then reopen the side bar when the nav closes.
        // if ( $('.chatConversation').css('bottom') === "-362px" ){
        //   $('#sideBar').addClass('sideBarSlid');
        //   $('.container').addClass('compressed');
        //   $('.modal-child').addClass('modalCompressed');
        //   $('.spinner-with-logo').addClass('modalCompressed');
        //   $('#obContainer').addClass('noScrollBar');
        //   $('#colorbox').addClass('marginLeftNeg115');
        // }
      });
    }else{
      targ.addClass('hide');
      $('#overlay').addClass('hide');

      // keep this stuff here for now, going to do something with this on my next branch. I basically hate how the user nav covers the chat panel. The plan is to collapse the sidebar when the nav is opened (to get it out of the way) and then reopen the side bar when the nav closes.
      // if ( $('.chatConversation').css('bottom') === "-362px" ){
      //   $('#sideBar').addClass('sideBarSlid');
      //   $('.container').addClass('compressed');
      //   $('.modal-child').addClass('modalCompressed');
      //   $('.spinner-with-logo').addClass('modalCompressed');
      //   $('#obContainer').addClass('noScrollBar');
      //   $('#colorbox').addClass('marginLeftNeg115');
      // }
    }
  },

  navCloseClick: function(){
    "use strict";
    var process = remote.process;
    if (process.platform != 'darwin') {
      this.currentWindow.close();
    } else {
      this.currentWindow.hide();
    }
  },

  navMinClick: function(){
    "use strict";
    this.currentWindow.minimize();
  },

  navMaxClick: function(){
    "use strict";
    if(this.currentWindow.isMaximized()){
      this.currentWindow.unmaximize();
    } else {
      this.currentWindow.maximize();
    }
  },

  navBackClick: function(){
    "use strict";
    window.history.back();
  },

  navFwdClick: function(){
    "use strict";
    window.history.forward();
  },

  navRefreshClick: function(){
    "use strict";
    this.currentWindow.reload();
  },

  addressBarFocus: function(e){
    // on inital focus of input, select all text (this makes it easier to copy or delete the text)
    $(e.target).one('mouseup', function () {
      $('#addressBar').select();
    });
  },

  addressBarKeyup: function(e){
    "use strict";
    var barText = this.addressInput.val();
    //detect enter key
    if (e.keyCode == 13){
      this.addressBarProcess(barText);
    } else {
      this.closeStatusBar();
    }
  },

  addressBarProcess: function(addressBarText){
    "use strict";
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
    "use strict";
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
    "use strict";
    this.statusBar.find('.js-statusBarMessage').text(msgText);
    this.statusBar.removeClass('fadeOut');
  },

  closeStatusBar: function(){
    "use strict";
    this.statusBar.addClass('fadeOut');
  },

  navAdminPanel: function(){
    "use strict";
    this.$el.find('.js-adminModal').fadeIn(300);
    this.adminPanel.updatePage();
  },

  close: function(){
    "use strict";
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  },

  setSelectedTheme: function(e){
    "use strict";
    // Needs to save to the object and update the dom
  },

  shadeColor2: function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

});
