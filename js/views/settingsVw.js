var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    //userProfileModel = require('../models/userProfileMd'),
    loadTemplate = require('../utils/loadTemplate'),
    domUtils = require('../utils/dom'),
    app = require('../App.js').getApp(),    
    timezonesModel = require('../models/timezonesMd'),
    languagesModel = require('../models/languagesMd.js'),
    usersCl = require('../collections/usersCl.js'),
    blockedUsersVw = require('./blockedUsersVw'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    countriesModel = require('../models/countriesMd'),
    messageModal = require('../utils/messageModal.js'),
    cropit = require('../utils/jquery.cropit'),
    chosen = require('../utils/chosen.jquery.min.js'),
    setTheme = require('../utils/setTheme.js'),
    saveToAPI = require('../utils/saveToAPI'),
    MediumEditor = require('medium-editor'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    ServerConnectModal = require('./serverConnectModal');

module.exports = Backbone.View.extend({

  className: "settingsView",

  events: {
    'click .js-generalTab': 'tabClick',
    'click .js-addressesTab': 'tabClick',
    'click .js-pageTab': 'tabClick',
    'click .js-storeTab': 'tabClick',
    'click .js-blockedTab': 'tabClick',
    'click .js-moderatorTab': 'tabClick',
    'click .js-advancedTab': 'tabClick',
    'click .js-cancelGeneral': 'cancelView',
    'click .js-saveGeneral': 'saveGeneral',
    'click .js-cancelPage': 'cancelView',
    'click .js-savePage': 'savePage',
    'click .js-cancelAddress': 'cancelView',
    'click .js-saveAddress': 'saveAddress',
    'click .js-cancelStore': 'cancelView',
    'click .js-saveStore': 'saveStore',
    'click .js-cancelModerator': 'cancelView',
    'click .js-saveModerator': 'saveModerator',
    'click .js-cancelAdvanced': 'cancelView',
    'click .js-saveAdvanced': 'saveAdvanced',
    'click .js-changeServerSettings': 'launchServerConfig',
    'change .js-settingsThemeSelection': 'themeClick',
    'click .js-settingsAddressDelete': 'addressDelete',
    'click .js-settingsAddressUnDelete': 'addressUnDelete',
    'click #moderatorYes': 'showModeratorFeeHolder',
    'click #moderatorNo': 'hideModeratorFeeHolder',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    /* expected options:
       userModel
       state
       socketView
     */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.serverUrl = options.userModel.get('serverUrl');
    this.userModel = this.options.userModel;
    this.model = new Backbone.Model();
    this.subViews = [];
    this.subModels = [];
    this.subModels.push(this.userProfile);

    this.newAvatar = false;
    this.newBanner = false;

    this.moderatorFeeInput;
    this.moderatorFeeHolder;
    this.oldFeeValue = options.userProfile.get('profile').moderation_fee || 0;

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketModeratorID = Math.random().toString(36).slice(2);
    this.moderatorCount = 0;

    this.fetchModel();
  },

  fetchModel: function(){
    "use strict";
    var self = this;
    this.userProfile.fetch({
      success: function(model) {
        var profile = model.get('profile');
        if (profile){
          setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
        }
        self.model.set({page: model.toJSON()});
        self.userModel.fetch({
          success: function(model){
            "use strict";
            self.model.set({user: model.toJSON()});

            //use default currency to return list of supported currencies
            getBTPrice("USD", function (btAve, currencyList) {
              "use strict";
              self.availableCurrenciesList = currencyList;
              self.render();
              $('.js-loadingModal').removeClass('show');
            });
          }
        });
      },
      error: function(model, response){
        messageModal.show(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.userError'));
      }
    });
  },

  render: function(){
    var self = this;
    $('#content').html(self.$el);
    loadTemplate('./js/templates/settings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.delegateEvents(); //delegate again for re-render
      self.setFormValues();
      
      // Since the Blocked Users View kicks off many server calls (one
      // for each blocked user) and since we are re-rendering the entire
      // settings view often (after each save), we will cache the Blocked
      // Users View.
      if (!self.blockedRendered) {
        self.renderBlocked();
        self.blockedRendered = true;
      } else {
        self.renderBlocked({ useCached: true });
      }

      self.setState(self.options.state);

      $(".chosen").chosen({ width: '100%' });
      $('#settings-image-cropper').cropit({
        $preview: $('.js-settingsAvatarPreview'),
        $fileInput: $('#settingsAvatarInput'),
        smallImage: "stretch",
        maxZoom: 2,
        onFileReaderError: function(data){console.log(data);},
        onImageLoading: function(){
          self.$el.find('.js-avatarLoading').removeClass('fadeOut');
          self.newAvatar = true;
        },
        onImageLoaded: function(){self.$el.find('.js-avatarLoading').addClass('fadeOut');},
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });
      self.moderatorFeeInput = self.$('#moderatorFeeInput');
      self.moderatorFeeHolder = self.$('.js-settingsModeratorFee');
      if(self.model.get('page').profile.avatar_hash){
        $('#settings-image-cropper').cropit('imageSrc', self.serverUrl +'get_image?hash='+self.model.get('page').profile.avatar_hash);
      }
      //set existing avatar, if any
      $('#settings-image-cropperBanner').cropit({
        $preview: $('.js-settingsBannerPreview'),
        $fileInput: $('#settingsBannerInput'),
        smallImage: "stretch",
        exportZoom: 1.33,
        maxZoom: 5,
        onFileReaderError: function(data){console.log(data);},
        onImageLoading: function(){
          self.$el.find('.js-bannerLoading').removeClass('fadeOut');
          self.newBanner = true;
        },
        onImageLoaded: function(){self.$el.find('.js-bannerLoading').addClass('fadeOut');},
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });
      if(self.model.get('page').profile.header_hash){
        $('#settings-image-cropperBanner').cropit('imageSrc', self.serverUrl +'get_image?hash='+self.model.get('page').profile.header_hash);
      }

      var editor = new MediumEditor('#about', {
          placeholder: {
            text: ''
          },
          toolbar: {
            imageDragging: false
          }
      });

      self.socketView.getModerators(self.socketModeratorID);
    });
    return this;
  },

  patchAndFetchBlockedUsers: function(models) {
    var self = this;

    if (models && models.length) {
      __.each(models, function(model) {
        model.urlRoot = self.serverUrl + 'profile';
        
        // Monkey patching parse so the profile is not nested
        // and therefore change events will be in play.
        model.oldParse = model.parse;
        model.parse = function (response) {
          if (response.profile) {
            return model.oldParse(response).profile;
          } else {
            return response;
          }          
        };

        model.fetch({ data: { guid: model.get('guid')} });
      });
    }
  },

  renderBlocked: function(options) {
    var self = this,
        modelsPerBatch = 25,
        $lazyLoadTrigger,
        $blockedForm,
        blockedUsersCl;

    options = options || {};
    $blockedContainer = this.$('#blockedForm > :first-child');

    if (options.useCached) {
      if (!this.$lazyLoadTrigger.length) {
        throw new Error('Some expected state is missing. renderBlocked() can only'
          + ' be called with the useCached option after it has been called at least once'
          + ' without the useCached option.');
      }

      $blockedContainer.html(this.blockedUsersVw.el);

      if (!document.contains(this.$lazyLoadTrigger[0])) {
        $blockedContainer.append(this.$lazyLoadTrigger);
      }

      return;
    }

    function getBlockedGuids() {
      return self.userModel.get('blocked_guids').map(function(guid) {
          return { guid: guid }
        });
    }

    blockedUsersCl = new usersCl(getBlockedGuids().slice(0, modelsPerBatch));
    this.patchAndFetchBlockedUsers(blockedUsersCl.models);

    this.blockedUsersVw = new blockedUsersVw({
      model: this.userModel,
      collection: blockedUsersCl,
      serverUrl: this.serverUrl
    });

    this.$('#blockedForm').html(
      this.blockedUsersVw.render().el
    );

    this.$lazyLoadTrigger = $('<div id="blocked_user_lazy_load_trigger">').css({
      position: 'absolute',
      width: '100%',
      height: 5,
      bottom: 300
    });
    $blockedContainer.append(this.$lazyLoadTrigger);

    this.blockedUsersBlockHandler && this.stopListening(window.obEventBus, null, this.blockedUsersBlockHandler);
    this.listenTo(window.obEventBus, 'blockingUser', this.blockedUsersBlockHandler = function(e) {
      if (getBlockedGuids().length - 1 === blockedUsersCl.length) {
        // if only our newly blocked is missing, we'll
        // add them directly, otherwise, lazy loading
        // will pick them up.
        self.patchAndFetchBlockedUsers([
          blockedUsersCl.add({ guid: e.guid })
        ]);
      }
    });

    this.blockedUsersUnblockHandler && this.stopListening(window.obEventBus, null, this.blockedUsersUnblockHandler);
    this.listenTo(window.obEventBus, 'unblockingUser', this.blockedUsersUnblockHandler = function(e) {
      blockedUsersCl.remove(
        blockedUsersCl.findWhere({ guid: e.guid })
      );
    });    

    // implement scroll based lazy loading of blocked users
    this.$obContainer = this.$obContainer || $('#obContainer');
    this.blockedUsersScrollHandler && this.$obContainer.off('scroll', this.blockedUsersScrollHandler);
    this.blockedUsersScrollHandler = __.throttle(function() {
      var colLen;

      if (
        self.getState() === 'blocked' &&
        blockedUsersCl.length < getBlockedGuids().length &&
        domUtils.isScrolledIntoView(self.$lazyLoadTrigger[0], self.$obContainer[0])
      ) {
        colLen = blockedUsersCl.length;

        blockedUsersCl.add(
          getBlockedGuids().slice(colLen, colLen + modelsPerBatch)
        );

        self.patchAndFetchBlockedUsers(
          blockedUsersCl.slice(colLen, colLen + modelsPerBatch)
        )
      }
    }, 200);

    this.$obContainer.on('scroll', this.blockedUsersScrollHandler);
    // end - implement scroll based lazy loading of blocked users
  },

  setFormValues: function(){
    var self = this,
        countries = new countriesModel(),
        timezones = new timezonesModel(),
        languages = new languagesModel(),
        countryList = countries.get('countries'),
        currecyList = countries.get('countries'),
        timezoneList = timezones.get('timezones'),
        languageList = languages.get('languages'),
        country = this.$el.find('#country'),
        ship_country = this.$el.find('#settingsShipToCountry'),
        currency = this.$el.find('#currency_code'),
        timezone = this.$el.find('#time_zone'),
        language = this.$el.find('#language'),
        user = this.model.get('user'),
        avatar = user.avatar_hash,
        ship_country_str = "",
        country_str = "",
        currency_str = "",
        timezone_str = "",
        language_str = "",
        pageNSFW = this.model.get('page').profile.nsfw,
        moderatorStatus = this.model.get('page').profile.moderator;

    this.$el.find('#pageForm input[name=nsfw]').val([String(pageNSFW)]);

    currecyList = __.uniq(currecyList, function(item){return item.code;});
    currecyList = currecyList.sort(function(a,b){
      var cA = a.currency.toLowerCase(),
          cB = b.currency.toLowerCase();
      if (cA < cB){
        return -1;
      }
      if (cA > cB){
        return 1;
      }
      return 0;
    });
    //add BTC
    currecyList.unshift({code: "BTC", currency:"Bitcoin", currencyUnits: "4"});

    __.each(countryList, function(c, i){
      var country_option = $('<option value="'+c.dataName+'" data-name="'+c.name+'">'+c.name+'</option>');
      var ship_country_option = $('<option value="'+c.dataName+'" data-name="'+c.name+'">'+c.name+'</option>');
      country_option.attr("selected",user.country == c.dataName);
      //if user has a country in their profile, preselect it in the new address section
      ship_country_option.attr("selected",user.country== c.dataName);
      ship_country_str += ship_country_option[0].outerHTML;
      country_str += country_option[0].outerHTML;
    });

    __.each(currecyList, function(c, i){
      //only show currently available currencies
      if(self.availableCurrenciesList.indexOf(c.code) > -1 || c.code === "BTC"){
        var currency_option = $('<option value="'+c.code+'">'+c.currency+'</option>');
        currency_option.attr("selected",user.currency_code == c.code);
        currency_str += currency_option[0].outerHTML;
      }
    });

    __.each(timezoneList, function(t, i){
      var timezone_option = $('<option value="'+t.offset+'">'+t.name+'</option>');
      timezone_option.attr("selected",user.time_zone == t.offset);
      timezone_str += timezone_option[0].outerHTML;
    });

    __.each(languageList, function(l, i){
        var language_option = $('<option value="'+l.langCode+'">'+l.langName+'</option>');
        language_option.attr("selected",user.language == l.langCode);
        language_str += language_option[0].outerHTML;
    });

    ship_country.html(ship_country_str);
    currency.html(currency_str);
    country.html(country_str);
    timezone.html(timezone_str);
    language.html(language_str);

    __.each(this.userModel.get('moderators'), function(modID){
      "use strict";
      if(modID) {
        modID.fromModel = true;
        self.renderModerator(modID);
      }
    });

    //set moderator status
    this.$('#moderatorForm input[name=moderator]').val([String(moderatorStatus)]);
  },

  showModeratorFeeHolder: function(){
    "use strict";
    this.moderatorFeeHolder.removeClass('hide');
    this.moderatorFeeInput.val(this.oldFeeValue);
  },

  hideModeratorFeeHolder: function(){
    "use strict";
    this.moderatorFeeHolder.addClass('hide');
    this.oldFeeValue = this.moderatorFeeInput.val();
    this.moderatorFeeInput.val(0);
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketModeratorID){
      this.renderModerator(data.moderator);
    }
  },

  renderModerator: function(moderator){
    "use strict";
    var self = this,
        existingMods = this.userModel.get('moderator_guids'),
        isExistingMod = existingMods.indexOf(moderator.guid) > -1;

    if(moderator.guid != this.model.get('page').profile.guid){
      moderator.serverUrl = self.serverUrl;
      moderator.userID = moderator.guid;
      moderator.avatarURL = self.serverUrl + "get_image?hash=" + moderator.avatar_hash + "&guid=" + moderator.guid;
      moderator.isModerator = true; //flag for template
      moderator.existingModerator = isExistingMod; //flag for template
      moderator.micro = true; //flag for template
      moderator.userCount = this.moderatorCount;
      var newModModel = new userShortModel(moderator);
      var modShort = new userShortView({model: newModModel});
      if (isExistingMod){
        //don't add unless it comes from the model
        if(moderator.fromModel){
          this.$el.find('.js-settingsCurrentMods').append(modShort.el);
        }
      }else{
        this.$el.find('.js-settingsNewMods').append(modShort.el);
      }
      this.moderatorCount++;
      this.subViews.push(modShort);
    }
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  addTabToHistory: function(state){
    "use strict";
    //add action to history
    Backbone.history.navigate("#settings/" + state);
    this.options.state = state;
  },

  setTab: function(activeTab, showContent){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state){
    if(state){
      this._state = state;
      this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    } else {
      this._state = 'general';
      this.setTab(this.$el.find('.js-generalTab'), this.$el.find('.js-general'));
    }
  },

  getState: function() {
    return this._state;
  },

  tabClick: function(e){
    "use strict";
    var tab = $(e.target).data('tab');
    this.setState(tab);
    this.addTabToHistory(tab);
  },

  cancelView: function(e){
    "use strict";
    Backbone.history.loadUrl();
  },

  themeClick: function(e) {
    var theme = $(e.currentTarget).data();

    // Populate the color inputs on theme change
    $('#primaryColor').val(theme["primaryColor"]);
    $('#secondaryColor').val(theme["secondaryColor"]);
    $('#backgroundColor').val(theme["backgroundColor"]);
    $('#textColor').val(theme["textColor"]);
    //$('.js-settingsCoverPhoto').css('background', 'url(' + theme["coverPhoto"] + ') 50% 50% / cover no-repeat');
    $('#settings-image-cropperBanner').cropit('imageSrc', theme["coverPhoto"]);
    this.newBanner = true;
  },

  saveGeneral: function() {
    "use strict";
    var self = this,
        form = this.$el.find("#generalForm"),
        cCode = this.$('#currency_code').val();

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings", function(){
      "use strict";
      messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.setCurrentBitCoin(cCode);
      self.refreshView();
    });
  },

  savePage: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#pageForm"),
        avatarCrop = this.$el.find('#settings-image-cropper'),
        imageURI,
        bannerURI,
        img64Data = {},
        banner64Data = {},
        pageData = {},
        socialInputCount = 0,
        socialInputs = self.$el.find('#settingsFacebookInput, #settingsTwitterInput, #settingsInstagramInput, #settingsSnapchatInput'),
        pColor = self.$el.find('#primaryColor'),
        sColor = self.$el.find('#secondaryColor'),
        bColor = self.$el.find('#backgroundColor'),
        tColor = self.$el.find('#textColor'),
        pColorVal = pColor.val(),
        bColorVal = bColor.val(),
        sColorVal = sColor.val(),
        tColorVal = tColor.val(),
        skipKeys = ["avatar_hash", "header_hash"];

    var sendPage = function(){
      //change color inputs to hex values
      pageData.primary_color = parseInt(pColorVal.slice(1), 16);
      pageData.secondary_color = parseInt(sColorVal.slice(1), 16);
      pageData.background_color = parseInt(bColorVal.slice(1), 16);
      pageData.text_color = parseInt(tColorVal.slice(1), 16);

      saveToAPI(form, self.model.get('page').profile, self.serverUrl + "profile", function(){
        window.obEventBus.trigger("updateProfile");
        messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
        self.refreshView();
      }, "", pageData, skipKeys);
    };

    var checkSocialCount = function(){
      var socialSend = function (socialInput) {
        var socialData = {};
        socialInputCount++;
        if(socialInput.val()){
          socialData.account_type = socialInput.data('type');
          socialData.username = socialInput.val();
          saveToAPI("", "", self.serverUrl + "social_accounts",
              function(data){
                "use strict";
                checkSocialCount();
              },
              function(data){
                messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
              }, socialData);
        } else {
          checkSocialCount();
        }
      };

      if(socialInputCount < socialInputs.length){
        socialSend($(socialInputs[socialInputCount]));
      } else {
        sendPage();
      }
    };

    var checkBanner = function(){
      var bannerCrop = self.$el.find('#settings-image-cropperBanner');
      if(self.newBanner && bannerCrop.cropit('imageSrc')){

        bannerURI = bannerCrop.cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: false
        });
        bannerURI = bannerURI.replace(/^data:image\/(png|jpeg);base64,/, "");
        banner64Data.image = bannerURI;

        saveToAPI('', '', self.serverUrl + "upload_image", function (data) {
          "use strict";
          var img_hash = data.image_hashes[0];
          if(img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40){
            pageData.header = img_hash;
            checkSocialCount();
          }
        },"", banner64Data);
      } else {
        checkSocialCount();
      }
    };

    //if an avatar has been set, upload it first and get the hash
    if(self.newAvatar && avatarCrop.cropit('imageSrc')){

      imageURI = avatarCrop.cropit('export', {
        type: 'image/jpeg',
        quality: 0.75,
        originalSize: false
      });
      imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
      img64Data.image = imageURI;

      saveToAPI('', '', self.serverUrl + "upload_image", function (data) {
            "use strict";
            var img_hash = data.image_hashes[0];
            if(img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40){
              pageData.avatar = img_hash;
              checkBanner();
            }
          },"", img64Data);
    } else {
      checkBanner();
    }
  },

  saveStore: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#storeForm"),
        profileData = {},
        settingsData = {},
        moderatorsChecked = this.$el.find('.js-userShortView input:checked'),
        modList = [];

    moderatorsChecked.each(function() {
      modList.push($(this).data('guid'));
    });

    settingsData.moderators = modList.length > 0 ? modList : "";
    profileData.vendor = true;

    saveToAPI(form, "", self.serverUrl + "profile", function() {
      saveToAPI(form, self.userModel.toJSON(), self.serverUrl + "settings", function () {
        "use strict";
        messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
        self.refreshView();
      }, "", settingsData);
    }, "", profileData);
  },

  saveAddress: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#addressesForm"),
        newAddress = {},
        newAddresses = [],
        addressData = {};

    newAddress.name = this.$el.find('#settingsShipToName').val();
    newAddress.street = this.$el.find('#settingsShipToStreet').val();
    newAddress.city = this.$el.find('#settingsShipToCity').val();
    newAddress.state = this.$el.find('#settingsShipToState').val();
    newAddress.postal_code = this.$el.find('#settingsShipToPostalCode').val();
    newAddress.country = this.$el.find('#settingsShipToCountry').val();
    newAddress.displayCountry = this.$el.find('#settingsShipToCountry option:selected').data('name');

    //if form is partially filled out throw error
    if(newAddress.name || newAddress.street || newAddress.city || newAddress.state || newAddress.postal_code) {
      if(!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postal_code){
        messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
        return;
      }
    }

    if(newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.postal_code && newAddress.country) {
      newAddresses.push(JSON.stringify(newAddress));
    }

    this.$el.find('.js-settingsAddress:not(:checked)').each(function(){
      newAddresses.push(JSON.stringify(self.model.get('user').shipping_addresses[$(this).val()]));
    });

    addressData.shipping_addresses = newAddresses;

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings", function(){
      "use strict";
      messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.refreshView();
    }, "", addressData);
  },

  saveModerator: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#moderatorForm"),
        moderatorData = {},
        moderatorStatus = this.$('#moderatorYes').is(':checked'),
        makeModeratorUrl = moderatorStatus ? self.serverUrl + "make_moderator" : self.serverUrl + "unmake_moderator";

    moderatorData.name = self.model.get('page').profile.name;
    moderatorData.location = self.model.get('page').profile.location;

    saveToAPI(form, '', self.serverUrl + "profile", function(){
      "use strict";
      messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      window.obEventBus.trigger("updateProfile");
      self.refreshView();
    }, '', moderatorData);

    $.ajax({
      type: "POST",
      url: makeModeratorUrl,
      processData: false,
      dataType: "json",
      error: function(){
        messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + window.polyglot.t('errorMessaes.serverError') + "</i>");
      }
    });
  },

  saveAdvanced: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#advancedForm");

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings", function(){
      "use strict";
      messageModal.show(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.refreshView();
    });
  },

  refreshView: function(){
    "use strict";
    this.fetchModel();
  },

  addressDelete: function(e){
    "use strict";
    $(e.target).closest('.js-address').addClass('div-fadeExtra');
  },

  addressUnDelete: function(e){
    "use strict";
    $(e.target).closest('.js-address').removeClass('div-fadeExtra');
  },

  setCurrentBitCoin: function(cCode) {
    "use strict";
    getBTPrice(cCode, function (btAve) {
      window.currentBitcoin = btAve;
    });
  },

  launchServerConfig: function() {
    var serverConnectModal = new ServerConnectModal({
      includeCloseButton: true
    }).render().open();

    this.serverConnectSyncHandler &&
      this.stopListening(app.serverConfig, null, this.serverConnectSyncHandler);

    this.serverConnectSyncHandler = function() {
      // todo: bit of a hack to hide the close button. really, the
      // modal api should provide this if we want to allow
      // this type of stuff.
      serverConnectModal.$('.js-modal-close').hide();
    };

    this.listenTo(app.serverConfig, 'sync', this.serverConnectSyncHandler);

    serverConnectModal.on('connected', function() {
      location.reload();
    });

    serverConnectModal.on('close', function() {
      serverConnectModal.remove();
      this.stopListening(app.serverConfig, null, this.serverConnectSyncHandler);
    });    
  },

  close: function(){
    "use strict";
    __.each(this.subModels, function(subModel) {
      subModel.off();
    });
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });

    this.blockedUsersVw.remove();

    if (this.blockedUsersScrollHandler && this.$obContainer.length) {
      this.$obContainer.off('scroll', this.blockedUsersScrollHandler);
    }

    this.serverConnectSyncHandler &&
      app.serverConfig.off(null, this.serverConnectSyncHandler);    
    
    this.model.off();
    this.off();
    this.remove();
    delete this.$el;
    delete this.el;
  }

});
