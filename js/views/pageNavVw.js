var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    Polyglot = require('node-polyglot'),
    languagesModel = require('../models/languagesMd'),
    countryListView = require('../views/countryListVw'),
    currencyListView = require('../views/currencyListVw'),
    languageListView = require('../views/languageListVw'),
    adminPanelView = require('../views/adminPanelVw'),
    notificationsPanelView = require('../views/notificationsPanelVw'),
    remote = require('remote'),
    cropit = require('../utils/jquery.cropit'),
    showErrorModal = require('../utils/showErrorModal.js');


module.exports = Backbone.View.extend({

  el: '#pageNav',

  events: {
    'click .js-navClose': 'navCloseClick',
    'click .js-navMin': 'navMinClick',
    'click .js-navMax': 'navMaxClick',
    'click .js-navBack': 'navBackClick',
    'click .js-navFwd': 'navFwdClick',
    'click .js-navNotifications': 'navNotificationsClick',
    'click .js-navProfile': 'navProfileClick',
    'click .js-navRefresh': 'navRefreshClick',
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
    'click .js-homeModal': 'blockClicks',
    'click .js-homeModal-countrySelect': 'countrySelect',
    'click .js-homeModal-currencySelect': 'currencySelect',
    'click .js-homeModal-languageSelect': 'languageSelect',
    'click .js-homeModal-timeSelect': 'timeSelect',
    'click .js-homeModal-newHandle': 'newHandle',
    'click .js-homeModal-existingHandle': 'existingHandle',
    'click .js-homeModal-cancelHandle': 'cancelHandle',
    'click .js-accordionNext': 'accNext',
    'click .js-accordionPrev': 'accPrev',
    'click .js-homeModalDone': 'settingsDone',
    'keyup .js-navAddressBar': 'addressBarKeyup',
    'click .js-closeStatus': 'closeStatusBar',
    'click .js-homeModal-themeSelected': 'setSelectedTheme',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(options){
    "use strict";
    var self = this;
    this.options = options || {};
    /* recieves socketView and userProfile from app.js */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.model.set('vendor', this.userProfile.get('profile').vendor);
    this.subViews = [];
    this.languages = new languagesModel();


    this.currentWindow = remote.getCurrentWindow();

    //when language is changed, re-render
    this.listenTo(this.model, 'change:language', function(){
      var newLang = this.model.get("language");
      window.polyglot = new Polyglot({locale: newLang});
      window.polyglot.extend(__.where(this.languages.get('languages'), {langCode: newLang})[0]);
      this.render();
    });

    this.socketNotificationID = Math.random().toString(36).slice(2);
    this.socketView.getNotifications(this.socketNotificationID);

    this.listenTo(window.obEventBus, "countryListRendered", function(){this.accordionReady("country");});
    this.listenTo(window.obEventBus, "currencyListRendered", function(){this.accordionReady("currency");});
    this.listenTo(window.obEventBus, "languageListRendered", function(){this.accordionReady("language");});
    this.listenTo(window.obEventBus, "updateProfile", function(response){
      this.userProfile.fetch();
    });

    this.render();
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketNotificationID){
      console.log(data);
    }
  },

  refreshProfile: function() {
    "use strict";
    var self = this;
    this.userProfile.fetch({
      success: function(){
        self.render();
      }
    });
  },

  accordionReady: function(listReady) {
    "use strict";
    var self = this;

    if(listReady == "country") {
      this.countryReady = true;
    } else if(listReady == "currency") {
      this.currencyReady = true;
    } else if(listReady == "language") {
      this.languageReady = true;
    }
    if(this.countryReady && this.currencyReady && this.languageReady){
      var countryList = new window.List('homeModal-countryList', {valueNames: ['homeModal-country'], page: 1000});
      var currencyList = new window.List('homeModal-currencyList', {valueNames: ['homeModal-currency'], page: 1000});
      var timeList = new window.List('homeModal-timeList', {valueNames: ['homeModal-time'], page: 1000});
      var languageList = new window.List('homeModal-languageList', {valueNames: ['homeModal-language'], page: 1000});
      self.initAccordion('.js-profileAccordion');
    }
  },

  initAccordion: function(targ){
    "use strict";
    this.acc = $(targ);
    this.accWidth = this.acc.width();
    this.accHeight = this.acc.height();
    this.accChildren = this.acc.find('.accordion-child');
    this.accNum = this.accChildren.length;
    this.accWin = this.acc.find('.accordion-window');
    this.accWin.css({'left':0, 'width': function(){return this.accWidth * this.accNum;}});
    this.accChildren.css({'width':this.accWidth, 'height':this.accHeight});
  },

  accNext: function(advanceBy){
    "use strict";
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(advanceBy) ? this.accWidth * advanceBy : this.accWidth;

    if(oldPos > (this.accWidth * (this.accNum -1) * -1)){
      this.accWin.css('left', function(){
        return oldPos - moveBy;
      });
      // focus search input
      $(this).closest('.accordion-child').next('.accordion-child').find('.search').focus();
    }
  },

  accPrev: function(rewindBy){
    "use strict";
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(rewindBy) ? this.accWidth * rewindBy : this.accWidth;

    if(oldPos < (0)){
      this.accWin.css('left', function(){
        return oldPos + moveBy;
      });
      // focus search input
      $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
    }
  },

  closeNav: function(){
    "use strict";
    var targ = this.$el.find('.js-navProfileMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');

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
      if(localStorage.getItem("onboardingComplete") != "true") {
        self.$el.find('.js-homeModal').removeClass("hide");
        self.countryList = new countryListView({el: '.js-homeModal-countryList', selected: self.model.get('country')});
        self.currencyList = new currencyListView({el: '.js-homeModal-currencyList', selected: self.model.get('currency_code')});
        self.languageList = new languageListView({el: '.js-homeModal-languageList', selected: self.model.get('language')});
        self.subViews.push(self.countryList);
        self.subViews.push(self.currencyList);
        self.subViews.push(self.languageList);
      }

      self.notificationsPanel = new notificationsPanelView({
        parentEl: '#notificationsPanel',
        socketView: self.socketView,
        serverUrl: self.options.model.get('serverUrl')
      });
      self.listenTo(self.notificationsPanel, 'notificationsCounted', self.setNotificationCount);
      self.subViews.push(self.notificationsPanel);
      self.$el.find('#image-cropper').cropit();
      //add the admin panel
      self.adminPanel = new adminPanelView({model: self.model});
      self.subViews.push(self.adminPanel);
      self.addressInput = self.$el.find('.js-navAddressBar');
      self.statusBar = self.$el.find('.js-navStatusBar');
      //listen for address bar set events
      self.listenTo(window.obEventBus, "setAddressBar", function(setText){
        self.addressInput.val(setText);
        self.closeStatusBar();
      });

      self.listenTo(self.userProfile, 'change:avatar_hash', function(){
        self.model.set('vendor', self.userProfile.get('profile').vendor);
        self.render();
      });

      self.listenTo(window.obEventBus, "socketMessageRecived", function(response){
        self.handleSocketMessage(response);
      });
    });
    return this;
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

  addressBarKeyup: function(e){
    "use strict";
    var barText = this.addressInput.val();
    if(barText.length > 0){
      //detect enter key
      if (e.keyCode == 13){
        this.addressBarProcess(barText);
      } else {
        this.closeStatusBar();
      }
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
        addressTextArray = addressBarText.split("/");

    state = addressTextArray[1] ? "/" + addressTextArray[1] : "";
    itemHash = addressTextArray[2] ? "/" + addressTextArray[2] : "";

    if(addressTextArray[0].charAt(0) == "@"){
      handle = addressTextArray[0];
      this.showStatusBar('Navigation by handle is not supported yet.');
    } else if(addressTextArray[0].length === 40){
      guid = addressTextArray[0];
      Backbone.history.navigate('#userPage/' + guid + state + itemHash, {trigger:true});
    } else {
      this.showStatusBar('This is not a valid user GUID or handle.');
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

  countrySelect: function(e){
    "use strict";
    var targ = $(e.currentTarget);
    var ctry = targ.attr('data-code');
    $('.js-homeModal-countryList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('country', ctry);
  },

  currencySelect: function(e){
    "use strict";
    var targ = $(e.currentTarget); 
    //var crcy = targ.attr('data-name');
    var ccode = targ.attr('data-code');
    $('.js-homeModal-currencyList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    //this.model.set('currency', crcy);
    this.model.set('currency_code', ccode);
  },

  languageSelect: function(e){
    "use strict";
    var targ = $(e.currentTarget); 
    var lang = targ.attr('data-code');
    $('.js-homeModal-languageList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('language', lang);
  },

  timeSelect: function(e){
    "use strict";
    var inpt = $(e.target).closest('input[type=radio]'); 
    var tz = inpt.attr('id');
    $('.js-homeModal-timezoneList').find('input[type=radio]').prop("checked", false);
    inpt.prop("checked", true);
    this.model.set('time_zone', tz);
  },

  newHandle: function(e){
    "use strict";
    this.$el.find('.js-homeModal-handleInput').closest('.flexRow').removeClass('hide');
    this.$el.find('.js-homeModal-existingHandle').parent().addClass('hide');
    this.$el.find('.js-homeModal-cancelHandle').parent().removeClass('hide');
  },

  existingHandle: function(e){
    "use strict";
    //TODO: add code to connect handle here
  },

  cancelHandle: function(e){
    "use strict";
    this.$el.find('.js-homeModal-handleInput').closest('.flexRow').addClass('hide');
    this.$el.find('.js-homeModal-existingHandle').parent().removeClass('hide');
    this.$el.find('.js-homeModal-cancelHandle').parent().addClass('hide');
  },

  settingsDone: function(e){
    "use strict";

    var self = this,
        server = this.model.get('serverUrl'),
        profileFormData = new FormData(),
        settingsFormData = new FormData(),
        uploadImageFormData = new FormData();

    localStorage.setItem("onboardingComplete", "true");

    if($('textarea#aboutInput').val() != ""){
        self.model.set('short_description', $('textarea#aboutInput').val());
    }

    if($('#storeHandleInput').val() != "" && /^@/.test($('#storeHandleInput').val()) ){
        self.model.set('handle', $('#storeHandleInput').val());
    }

    if($('#storeNameInput').val() != ""){
        self.model.set('name', $('#storeNameInput').val());
    }else if (self.model.get('name') == undefined){
        //otherwise error since the profile api needs the name parameter and as of now it is not set in the userMd.js
        self.model.set('name', "ob" + Math.random().toString(36).slice(2));
    }


    var themeId = $('input[name=theme-selection]:checked');
    if(themeId.length > 0){
      var header = themeId.data('header');
      var primaryColor = parseInt(themeId.data('primary-color').slice(1), 16);
      var secondaryColor = parseInt(themeId.data('secondary-color').slice(1), 16);
      var backgroundColor = parseInt(themeId.data('background-color').slice(1), 16);
      var textColor = parseInt(themeId.data('text-color').slice(1), 16);

      self.model.set('primary_color', primaryColor);
      self.model.set('secondary_color', secondaryColor);
      self.model.set('text_color', textColor);
      self.model.set('background_color', backgroundColor);
    }

    $.each(this.model.attributes,
            function(i,el) {
                if(i == "country") {
                    profileFormData.append("location",el);
                }
                if(i == "name" || i == "handle" || i =="short_description"|| (themeId && (i == "primary_color" || i == "secondary_color" || i == "text_color"|| i =="background_color" ))) {
                    profileFormData.append(i,""+el);
                } else {
                    settingsFormData.append(i,el);
                }
            }
        );

    var imageURI = $('#image-cropper').cropit('export', {
      type: 'image/jpeg',
      quality: 0.75,
      originalSize: false
    });
    if(imageURI) {
      imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
      uploadImageFormData.append('image', imageURI);
    }


   var submit = function(img_hash) {
            if(img_hash) {
                profileFormData.append("avatar",img_hash);
            }

            $.ajax({
                type: "POST",
                url: server + "settings",
                contentType: false,
                processData: false,
                data: settingsFormData,
                dataType: "json",
                success: function(data) {
                    if(data.success) {
                        $.ajax({
                            type: "POST",
                            url: server + "profile",
                            contentType: false,
                            processData: false,
                            data: profileFormData,
                            dataType: "json",
                            success: function(data) {
                                 if(data.success == true) {
                                   //self.currentWindow.reload();
                                   Backbone.history.loadUrl(Backbone.history.fragment);
                                   self.refreshProfile();
                                 }
                            },
                            error: function(jqXHR, status, errorThrown){
                                console.log(jqXHR);
                                console.log(status);
                                console.log(errorThrown);
                            }
                        });
                    }
                },
                error: function(jqXHR, status, errorThrown){
                    console.log(jqXHR);
                    console.log(status);
                    console.log(errorThrown);
                }
            });

        };

        //Lets upload the image first, if there is one
        //to get the hash

        if(imageURI) {
            $.ajax({
                type: "POST",
                url: server + "upload_image",
                contentType: false,
                processData: false,
                data: uploadImageFormData,
                dataType: "JSON",
                success: function(data) {
                     var img_hash = data.image_hashes[0];
                    if(data.success === true && img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40) {
                        submit(img_hash);
                    }
                },
                error: function(jqXHR, status, errorThrown){
                    console.log(jqXHR);
                    console.log(status);
                    console.log(errorThrown);
                }
            });

        } else { //Otherwise lets just submit right away
            submit();
        }
    this.$el.find('.js-homeModal').hide();
    
    // Start application walkthrough (coming soon once I have better designs)
    new Notification(window.polyglot.t('WelcomeToYourPage'));
  },

  navAdminPanel: function(){
    "use strict";
    this.$el.find('.js-adminModal').fadeIn(300);
    this.adminPanel.updatePage();
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();
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

