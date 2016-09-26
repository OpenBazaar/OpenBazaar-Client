'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    cropit = require('cropit'),
    app = require('../App').getApp(),
    baseModal = require('./baseModal'),
    languagesModel = require('../models/languagesMd'),
    countryListView = require('../views/countryListVw'),
    currencyListView = require('../views/currencyListVw'),
    languageListView = require('../views/languageListVw'),
    LoadingModal = require('./loadingModal'),
    guidStillCreatingModal = require('../views/guidStillCreatingModal');

module.exports = baseModal.extend({
  className: 'js-homeModal',

  events: {
    'click .js-homeModal': 'blockClicks',
    'click .js-homeModal-countrySelect': 'countrySelect',
    'click .js-homeModal-currencySelect': 'currencySelect',
    'click .js-homeModal-languageSelect': 'languageSelect',
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
    this.languages = new languagesModel();

    this.loadingModal = new LoadingModal({
      showLoadIndexButton: false
    }).render().open();
    setTimeout(() => this.registerChild(this.loadingModal));

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
    localLanguage = localLanguageFound ? localLanguage : "en-US";
    this.model.set('language', localLanguage);

    this.listenTo(self.model, 'change:language', function() {
      self.render();
    });
  },

  open: function() {
    if (!this._accordianReady) {
      this.loadingModal.open();
    }

    baseModal.prototype.open.apply(this, arguments);
  },

  close: function() {
    this.loadingModal.close();
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
    var ccode = targ.attr('data-code');
    this.$('.js-homeModal-currencyList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('currency_code', ccode);
  },

  languageSelect: function(e){
    var lang = $(e.currentTarget).attr('data-code');
    this.model.set('language', lang);
  },

  accordionReady: function() {
    /* eslint-disable */
    var countryList = new window.List('homeModal-countryList', {valueNames: ['homeModal-country'], page: 1000}),
        currencyList = new window.List('homeModal-currencyList', {valueNames: ['homeModal-currency'], page: 1000}),
        timeList = new window.List('homeModal-timeList', {valueNames: ['homeModal-time'], page: 1000}),
        languageList = new window.List('homeModal-languageList', {valueNames: ['homeModal-language'], page: 1000}),
        /* eslint-enable */
        self = this;

    this._accordianReady = true;
    this.loadingModal.close();

    this.initAccordion('.js-profileAccordion');

    // Scroll selected options to the top
    this.$('.js-homeModal-listParent').find('input:checked').each(function(){
      var checkedInputScrollParent = $(this).closest('ul');
      var checkedInputPosition = $(this).closest('li').position().top;
      var checkedInputOffset = checkedInputScrollParent.position().top;
      checkedInputScrollParent.scrollTop(checkedInputPosition - checkedInputOffset);
    });

    this.$el.find('#image-cropper').cropit({
      $preview: self.$('.js-onboardingAvatarPreview'),
      $fileInput: self.$('#onboardingAvatarInput'),
      smallImage: "stretch",
      exportZoom: 1.33,
      maxZoom: 5,
      onImageLoading: function(){
        self.$('.cropit-image-zoom-input').removeClass('hide');
        self.$el.find('.js-avatarLoading').removeClass('fadeOut');
      },
      onImageLoaded: function(){
        self.$el.find('.js-avatarLoading').addClass('fadeOut');
      },
      onFileReaderError: function(data){
        console.log(data);
      },
      onImageError: function(errorObject, errorCode, errorMessage) {
        console.log(errorObject);
        console.log(errorCode);
        console.log(errorMessage);
      }
    });
  },

  initAccordion: function(targ){
    setTimeout(() => { //move to after painting so values are not zero
      this.acc = this.$(targ);
      this.accWidth = this.acc.width();
      this.accHeight = this.acc.height();
      this.accChildren = this.acc.find('.accordion-child');
      this.accNum = this.accChildren.length;
      this.accWin = this.acc.find('.accordion-window');
      this.accWin.css({
        'left': 0, 'width': function () {
          return this.accWidth * this.accNum;
        }
      });
      this.accChildren.css({'width': this.accWidth, 'height': this.accHeight});
    }, 0);
  },

  accNext: function(advanceBy){
    var oldPos = parseInt(this.accWin.css('left').replace("px", "")),
        moveBy = parseInt(advanceBy) ? this.accWidth * advanceBy : this.accWidth;

    if (oldPos > (this.accWidth * (this.accNum -1) * -1)){
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
    var oldPos = parseInt(this.accWin.css('left').replace("px", "")),
        moveBy = parseInt(rewindBy) ? this.accWidth * rewindBy : this.accWidth;

    if (oldPos < (0)){
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
      this.guidStillCreatingModal = new guidStillCreatingModal({
        dismissOnOverlayClick: false,
        dismissOnEscPress: false,
        showCloseButton: false
      });
      this.guidStillCreatingModal.render().open();
    } else {
      this.loadingModal.open();
    }

    guidCreation.done(function() {
      if (self.isRemoved()) return;

      self._settingsDone(e);
    });
  },

  _settingsDone: function(){
    var self = this,
        server = this.model.get('serverUrl'),
        profileFormData = new FormData(),
        settingsFormData = new FormData(),
        bannerUpload = $.Deferred(),
        avatarUpload = $.Deferred(),
        followHandles = [],
        header;


    if (this.$('textarea#aboutInput').val() != ""){
      self.model.set('short_description', this.$('textarea#aboutInput').val());
    }

    if (this.$('#storeNameInput').val() != ""){
      self.model.set('name', this.$('#storeNameInput').val());
    } else if (typeof self.model.get('name') === 'undefined'){
        //otherwise error since the profile api needs the name parameter and as of now it is not set in the userMd.js
      self.model.set('name', "ob" + Math.random().toString(36).slice(2));
    }

    var themeId = this.$('input[name=theme-selection]:checked');
    if (themeId.length > 0){
      var primaryColor = parseInt(themeId.data('primary-color').slice(1), 16),
          secondaryColor = parseInt(themeId.data('secondary-color').slice(1), 16),
          backgroundColor = parseInt(themeId.data('background-color').slice(1), 16),
          textColor = parseInt(themeId.data('text-color').slice(1), 16);

      header = themeId.data('header');

      self.model.set('primary_color', primaryColor);
      self.model.set('secondary_color', secondaryColor);
      self.model.set('text_color', textColor);
      self.model.set('background_color', backgroundColor);
    }

    var nsfwVal = this.$("input[name='nsfw']:checked").val();
    this.model.set('nsfw', nsfwVal);
    localStorage.setItem('NSFWFilter', nsfwVal); //the server ignores the nsfw value currently

    $.each(this.model.attributes,
        function(i, el) {
          if (i == "country") {
            profileFormData.append("location", el);
          }
          if (i == "name" || i =="short_description"|| (themeId && (i == "primary_color" || i == "secondary_color" || i == "text_color"|| i =="background_color" ))) {
            profileFormData.append(i, ""+el);
          } else {
            settingsFormData.append(i, el);
          }
        }
    );

    var submit = function() {
      return $.ajax({
        type: "POST",
        url: server + "settings",
        contentType: false,
        processData: false,
        data: settingsFormData,
        dataType: "json",
        success: function(data) {
          if (data.success) {
            $.ajax({
              type: "POST",
              url: server + "profile",
              contentType: false,
              processData: false,
              data: profileFormData,
              dataType: "json",
              success: function(data) {
                var profile = self.options.userProfile;

                if (data.success == true) {
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

    var imageURI = this.$('#image-cropper').cropit('export', {
      type: 'image/jpeg',
      quality: 0.75,
      originalSize: false
    });

    if (header) {
      this.bannerUpload(header).done((imgHash) => {
        profileFormData.append('header', imgHash);
      }).always(() => bannerUpload.resolve());
    } else {
      bannerUpload.resolve();
    }

    if (imageURI) {
      imageURI = imageURI.replace(/^data:image\/(png|jpeg|webp);base64,/, '');

      this.avatarUpload(imageURI).done((imgHash) => {
        profileFormData.append('avatar', imgHash);
      }).always(() => avatarUpload.resolve());
    } else {
      avatarUpload.resolve();
    }

    this.$('.js-followHandles').find('[data-handle]:checked').each(function() {
      followHandles.push($(this).data('handle'));
    });

    $.when(
      bannerUpload,
      avatarUpload
    ).always(() => {
      submit().always(() => {
        if (followHandles.length) {
          setTimeout( ()=> this.postFollowing(followHandles), 3000); //following fails if it happens too soon after the guid is generated
        }
      });
    });

    new Notification(window.polyglot.t('WelcomeToYourPage'), {
      silent: true
    });

    // play notification sound
    this.notificationSound = document.createElement('audio');
    this.notificationSound.setAttribute('src', './audio/notification.mp3');
    this.notificationSound.play();
  },

  postFollowing: function(followers) {
    var deferred = $.Deferred(),
        failed = 0,
        succeeded = 0;

    if (!followers || !__.isArray(followers) || !followers.length) {
      throw new Error('Please provide a followers array with at least on handle to follow.');
    }

    followers.forEach((follower) => {
      app.getGuid(follower).done((guid) => {
        $.ajax({
          url: this.model.get('serverUrl') + 'follow',
          type: 'POST',
          dataType: 'JSON',
          data: {
            guid: guid
          }
        }).fail(() => {
          failed ++;

          if (failed + succeeded === followers.length) {
            failed ? deferred.reject() : deferred.resolve();
          }

        }).done(function(data) {
          if (data.success) {
            succeeded++;
          } else {
            failed++;
            console.warn(`Unable to set ${follower} as a follower because: ${data.reason}`);
          }

          if (failed + succeeded === followers.length) {
            failed ? deferred.reject() : deferred.resolve();
          }
        });
      }).fail(() => {
        failed++;

        if (failed + succeeded === followers.length) {
          failed ? deferred.reject() : deferred.resolve();
        }

        console.warn(`Unable to obtain a guid for handle: ${follower}`);
      });
    });

    return deferred.promise();
  },

  avatarUpload: function(imgData) {
    var formData = new FormData(),
        deferred = $.Deferred();

    if (!imgData) {
      throw new Error('Please provide the imgData.');
    }

    formData.append('image', imgData);

    $.ajax({
      type: 'POST',
      url: this.model.get('serverUrl') + 'upload_image',
      contentType: false,
      processData: false,
      data: formData,
      dataType: 'JSON',
      success: function(data) {
        var img_hash = data.image_hashes[0];

        if (data.success === true && img_hash !== 'b472a266d0bd89c13706a4132ccfb16f7c3b9fcb' && img_hash.length == 40) {
          deferred.resolve(img_hash);
        } else {
          deferred.reject();
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });

    return deferred.promise();
  },

  bannerUpload: function(bannerPath) {
    var deferred = $.Deferred(),
        xhr = new XMLHttpRequest(),
        self = this;

    if (!bannerPath) {
      throw new Error('Please provide the bannerPath.');
    }

    xhr.open('GET', bannerPath, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      var reader = new FileReader(),
          file = this.response;

      reader.onload = function(event) {
        var res = event.target.result,
            bannerFormData = new FormData();

        bannerFormData.append('image', res.replace(/^data:image\/(png|jpeg|webp);base64,/, ''));

        $.ajax({
          type: 'POST',
          url: self.model.get('serverUrl') + 'upload_image',
          contentType: false,
          processData: false,
          data: bannerFormData,
          dataType: 'JSON',
          success: function(data) {
            var img_hash = data.image_hashes[0];

            if (data.success === true && img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40) {
              deferred.resolve(img_hash);
            } else {
              deferred.reject();
            }
          },
          error: function(jqXHR, status, errorThrown){
            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
            deferred.reject();
          }
        });
      };

      reader.readAsDataURL(file);
    };

    xhr.onerror = function (e) {
      console.log(e);
      deferred.reject();
    };

    xhr.send();

    return deferred.promise();
  },

  settingsDoneKeypress: function(e) {
    this.triggerOnEnterSpace(e, this.settingsDone.bind(this));
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/onboardingModal.html', function(t) {
      var $themeInputs;

      self.$el.html(t());

      baseModal.prototype.render.apply(self, arguments);

      // select a random theme
      $themeInputs = self.$('[name=theme-selection]');

      if ($themeInputs.length) {
        $themeInputs.eq(
          Math.round(Math.random() * ($themeInputs.length - 1))
        ).prop('checked', true);
      }

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
    this.loadingModal.close();
    this.$document.off('focus', this.docFocusHandler);
    this.guidStillCreatingModal && this.guidStillCreatingModal.remove();
    baseModal.prototype.remove.apply(this, arguments);
  }
});
