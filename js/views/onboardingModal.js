'use strict';

var Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate'),
    cropit = require('../utils/jquery.cropit'),
    baseModal = require('./baseModal'),
    messageModal = require('../utils/messageModal.js'),
    countryListView = require('../views/countryListVw'),
    currencyListView = require('../views/currencyListVw'),
    languageListView = require('../views/languageListVw'),
    guidStillCreatingModal = require('../views/guidStillCreatingModal');

module.exports = baseModal.extend({
  className: 'js-homeModal',

  events: {
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
    'keypress .js-accordionNext': 'accNextKeypress',
    'keypress .js-accordionPrev': 'accPrevKeypress',
    'click .js-homeModalDone': 'settingsDone',
    'keypress .js-homeModalDone': 'settingsDoneKeypress',
    'click .js-homeModal-themeSelected': 'setSelectedTheme',
    'blur input, textarea': 'validateInput'
  },

  initialize: function(options) {
    var self = this;

    if (!(options.guidCreationPromise && options.guidCreationPromise.then)) {
      throw new Error('Please provide a guidCreationPromise.');
    }

    this.options = options || {};
    this.$document = $(document).on('focus', this.docFocusHandler);
    this.$el.attr('tabIndex', 0);
    this.$loadingModal = $('.js-loadingModal');

    this.listenTo(self.model, 'change:language', function() {
      self.render();
    });
  },

  loadingOff: function() {
    this.$loadingModal.addClass('hide')
      .css('z-index', '');
    this.$el.removeClass('hide');
  },

  open: function() {
    if (!this._accordianReady) {
      this.$loadingModal.removeClass('hide')
        .css('z-index', 99999999999);
      this.$el.addClass('hide');
    }

    baseModal.prototype.open.apply(this, arguments);
  },

  close: function() {
    this.loadingOff();
    baseModal.prototype.close.apply(this, arguments);
  },

  blockClicks: function(e) {
    e.stopPropagation();
  },  

  docFocusHandler: function(e) {
    if (this.isOpen() && !$.contains( this.el, e.target )) {
      e.stopPropagation();
      this.el.focus();
    }
  },

  countrySelect: function(e){
    var targ = $(e.currentTarget);
    var ctry = targ.attr('data-code');
    this.$('.js-homeModal-countryList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('country', ctry);
  },

  currencySelect: function(e){
    var targ = $(e.currentTarget);
    //var crcy = targ.attr('data-name');
    var ccode = targ.attr('data-code');
    this.$('.js-homeModal-currencyList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    //this.model.set('currency', crcy);
    this.model.set('currency_code', ccode);
  },

  languageSelect: function(e){
    var lang = $(e.currentTarget).attr('data-code');
    this.model.set('language', lang);
  },  

  timeSelect: function(e){
    var inpt = $(e.target).closest('input[type=radio]');
    var tz = inpt.val();
    this.$('.js-homeModal-timezoneList').find('input[type=radio]').prop("checked", false);
    inpt.prop("checked", true);
    this.model.set('time_zone', tz);
  },

  newHandle: function(e){
    this.$('.js-homeModal-handleInput').closest('.flexRow').removeClass('hide');
    this.$('.js-homeModal-existingHandle').parent().addClass('hide');
    this.$('.js-homeModal-cancelHandle').parent().removeClass('hide');
  },

  existingHandle: function(e){
    //TODO: add code to connect handle here
  },

  cancelHandle: function(e){
    this.$('.js-homeModal-handleInput').closest('.flexRow').addClass('hide');
    this.$('.js-homeModal-existingHandle').parent().removeClass('hide');
    this.$('.js-homeModal-cancelHandle').parent().addClass('hide');
  },

  accordionReady: function(listReady) {
    var countryList,
        currencyList,
        timeList,
        languageList;

    this._accordianReady = true;
    this.loadingOff();

    countryList = new window.List('homeModal-countryList', {valueNames: ['homeModal-country'], page: 1000});
    currencyList = new window.List('homeModal-currencyList', {valueNames: ['homeModal-currency'], page: 1000});
    timeList = new window.List('homeModal-timeList', {valueNames: ['homeModal-time'], page: 1000});
    languageList = new window.List('homeModal-languageList', {valueNames: ['homeModal-language'], page: 1000});
    
    this.initAccordion('.js-profileAccordion');
    
    // Scroll selected options to the top
    var checkedInput = this.$('.js-homeModal-listParent').find('input:checked').each(function(){
      var checkedInputScrollParent = $(this).closest('ul');
      var checkedInputPosition = $(this).closest('li').position().top;
      var checkedInputOffset = checkedInputScrollParent.position().top;
      checkedInputScrollParent.scrollTop(checkedInputPosition - checkedInputOffset);
    });

    this.$el.find('#image-cropper').cropit({
      smallImage: "stretch",
      exportZoom: 1.33,
      maxZoom: 5,
      onFileReaderError: function(data){console.log(data);},
      onImageError: function(errorObject, errorCode, errorMessage) {
        console.log(errorObject);
        console.log(errorCode);
        console.log(errorMessage);
      }
    });    
  },  

  initAccordion: function(targ){
    this.acc = this.$(targ);
    this.accWidth = this.acc.width();
    this.accHeight = this.acc.height();
    this.accChildren = this.acc.find('.accordion-child');
    this.accNum = this.accChildren.length;
    this.accWin = this.acc.find('.accordion-window');
    this.accWin.css({'left':0, 'width': function(){return this.accWidth * this.accNum;}});
    this.accChildren.css({'width':this.accWidth, 'height':this.accHeight});
  },  

  accNext: function(advanceBy){
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(advanceBy) ? this.accWidth * advanceBy : this.accWidth;

    if(oldPos > (this.accWidth * (this.accNum -1) * -1)){
      this.accWin.css('left', function(){
        return oldPos - moveBy;
      });
      // switch active tab
      var curActive = this.$('.accordion-active');
      curActive.addClass('accordion-inactive').removeClass('accordion-active');
      var newActive = curActive.next('.accordion-child');
      newActive.addClass('accordion-active').removeClass('accordion-inactive');
      // focus search input
      newActive.find('.search').focus();
    }
  },

  accPrev: function(rewindBy){
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(rewindBy) ? this.accWidth * rewindBy : this.accWidth;

    if(oldPos < (0)){
      this.accWin.css('left', function(){
        return oldPos + moveBy;
      });
      // switch active tab
      var curActive = this.$('.accordion-active');
      curActive.addClass('accordion-inactive').removeClass('accordion-active');
      var newActive = curActive.prev('.accordion-child');
      newActive.addClass('accordion-active').removeClass('accordion-inactive');
      // focus search input
      newActive.find('.search').focus();
    }
  },

  triggerOnEnterSpace: function(e, cb) {
    switch (e.which) {
      case 32: // space
      case 13: // return
        event.stopPropagation();
        return cb(e);
    }
    return true;
  },

  accNextKeypress: function(e) {
    this.triggerOnEnterSpace(e, this.accNext.bind(this));
  },

  accPrevKeypress: function(e) {
    this.triggerOnEnterSpace(e, this.accPrev.bind(this));
  },

  settingsDone: function(e){
    var self = this,
        guidCreation;

    guidCreation = this.options.guidCreationPromise;

    if (guidCreation.state() == 'pending') {
      this.guidStillCreatingModal && guidStillCreatingModal.remove();
      this.guidStillCreatingModal = new guidStillCreatingModal();
      this.guidStillCreatingModal.render().open();
    }

    guidCreation.done(function() {
      if (self.isRemoved()) return;

      self._settingsDone(e);
      self.guidStillCreatingModal && self.guidStillCreatingModal.remove();
    });
  },

  _settingsDone: function(e){
    var self = this,
        server = this.model.get('serverUrl'),
        profileFormData = new FormData(),
        settingsFormData = new FormData(),
        uploadImageFormData = new FormData();

    if(this.$('textarea#aboutInput').val() != ""){
        self.model.set('short_description', this.$('textarea#aboutInput').val());
    }

    if(this.$('#storeHandleInput').val() != "" && /^@/.test(this.$('#storeHandleInput').val()) ){
        self.model.set('handle', this.$('#storeHandleInput').val());
    }

    if(this.$('#storeNameInput').val() != ""){
        self.model.set('name', this.$('#storeNameInput').val());
    }else if (self.model.get('name') == undefined){
        //otherwise error since the profile api needs the name parameter and as of now it is not set in the userMd.js
        self.model.set('name', "ob" + Math.random().toString(36).slice(2));
    }

    var themeId = this.$('input[name=theme-selection]:checked');
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

    var imageURI = this.$('#image-cropper').cropit('export', {
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
                var profile = self.options.userProfile;

                if(data.success == true) {
                  //self.currentWindow.reload();
                  // Backbone.history.loadUrl(Backbone.history.fragment);
                  profile.fetch()
                    .done(function() {
                      self.trigger('onboarding-complete', profile.get('profile').guid);
                    });                  
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

    this.close();
    this.showDiscoverCallout = true;

    new Notification(window.polyglot.t('WelcomeToYourPage'));

    // play notification sound
    this.notifcationSound = document.createElement('audio');
    this.notifcationSound.setAttribute('src', './audio/notification.mp3');
    this.notifcationSound.play();
  },

  settingsDoneKeypress: function(e) {
    this.triggerOnEnterSpace(e, this.settingsDone.bind(this));
  },      

  render: function() {
    var self = this;

    loadTemplate('./js/templates/onboardingModal.html', function(t) {
      var timeZoneOffset;

      self.$el.html(t());

      baseModal.prototype.render.apply(self, arguments);

      // pre-select timezone
      var timeZoneOffset = new Date().getTimezoneOffset();
      timeZoneOffset = '(GMT ' + (timeZoneOffset < 0 ? '+' : '-') + parseInt(Math.abs(timeZoneOffset/60)) + ':00)';
      self.$("[id*='" + timeZoneOffset + "']").prop('checked', true);

      self.languageList && self.languageList.remove();
      self.countryList && self.countryList.remove();
      self.currencyList && self.currencyList.remove();

      self.languageList = new languageListView({el: self.$('.js-homeModal-languageList'), selected: self.model.get('language')});
      self.countryList = new countryListView({el: self.$('.js-homeModal-countryList'), selected: self.model.get('country')});
      self.currencyList = new currencyListView({el: self.$('.js-homeModal-currencyList'), selected: self.model.get('currency_code')});

      self.registerChild(self.languageList);
      self.registerChild(self.countryList);
      self.registerChild(self.currencyList);

      if (self.currencyList.ready) {
        self.accordionReady();
      } else {
        self.currencyList.on('currencyListReady', function() {
          self.accordionReady();
        });
      }
    });

    return this;
  },

  remove: function() {
    this.$document.off('focus', this.docFocusHandler);
    this.guidStillCreatingModal && this.guidStillCreatingModal.remove();
    baseModal.prototype.remove.apply(this, arguments);
  }
});
