var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    //userProfileModel = require('../models/userProfileMd'),
    loadTemplate = require('../utils/loadTemplate'),
    timezonesModel = require('../models/timezonesMd'),
    languagesModel = require('../models/languagesMd.js'),
    //personListView = require('./userListVw'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    countriesModel = require('../models/countriesMd'),
    showErrorModal = require('../utils/showErrorModal.js'),
    cropit = require('../utils/jquery.cropit'),
    chosen = require('../utils/chosen.jquery.min.js'),
    setTheme = require('../utils/setTheme.js'),
    saveToAPI = require('../utils/saveToAPI'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = Backbone.View.extend({

  className: "settingsView",

  events: {
    'click .js-generalTab': 'generalClick',
    'click .js-addressesTab': 'addressesClick',
    'click .js-pageTab': 'pageClick',
    'click .js-storeTab': 'storeClick',
    'click .js-blockedTab': 'blockedClick',
    'click .js-advancedTab': 'advancedClick',
    'click .js-cancelGeneral': 'cancelView',
    'click .js-saveGeneral': 'saveGeneral',
    'click .js-cancelPage': 'cancelView',
    'click .js-savePage': 'savePage',
    'click .js-cancelAddress': 'cancelView',
    'click .js-saveAddress': 'saveAddress',
    'click .js-cancelStore': 'cancelView',
    'click .js-saveStore': 'saveStore',
    'click .js-cancelAdvanced': 'cancelView',
    'click .js-saveAdvanced': 'saveAdvanced',
    'change .js-settingsThemeSelection': 'themeClick',
    'click .js-settingsAddressDelete': 'addressDelete',
    'click .js-settingsAddressUnDelete': 'addressUnDelete',
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
    this.user = this.options.userModel;
    this.model = new Backbone.Model();
    this.subViews = [];
    this.subModels = [];
    this.subModels.push(this.userProfile);

    this.newAvatar = false;
    this.newBanner = false;

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
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
        self.user.fetch({
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
        showErrorModal(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.userError'));
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
      self.setState(self.options.state);
      //self.renderBlocked(self.model.get("user").blocked);
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

      self.socketView.getModerators(self.socketModeratorID);
    });
    return this;
  },
/* this is not how this should work
  renderBlocked: function (model) {
    "use strict";
    this.blockedList = new personListView({model: model,
                                           el: '.js-list1',
                                           title: "No one blocked",
                                           message: ""});
    this.subViews.push(this.blockedList);
  },
  */

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
        pageNSFW = this.model.get('page').profile.nsfw;

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

    __.each(this.model.get('page').profile.moderator_list, function(modID){
      "use strict";
      if(modID) {
        self.renderModerator({'guid': modID, "isBlank": true});
      }
    });
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
        existingMods = this.model.get('page').profile.moderator_list,
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
        //remove blank version that was already added
        this.$el.find('.js-blankMod[data-guid="' + moderator.guid + '"]').remove();
        this.$el.find('.js-settingsCurrentMods').append(modShort.el);
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
    "use strict";
    if(state){
      this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    } else {
      this.setTab(this.$el.find('.js-generalTab'), this.$el.find('.js-general'));
    }
    $('#content').find('input:visible:first').focus();
  },

  generalClick: function(){
    "use strict";
    this.setState("general");
    this.addTabToHistory("general");
  },

  addressesClick: function(){
    "use strict";
    this.setState("addresses");
    this.addTabToHistory("addresses");
  },

  pageClick: function(){
    "use strict";
    this.setState("page");
    this.addTabToHistory("page");
  },

  storeClick: function(){
    "use strict";
    this.setState("store");
    this.addTabToHistory("store");
  },

  blockedClick: function(){
    "use strict";
    this.setState("blocked");
    this.addTabToHistory("blocked");
  },

  advancedClick: function(){
    "use strict";
    this.setState("advanced");
    this.addTabToHistory("advanced");
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
        form = this.$el.find("#generalForm");

    saveToAPI(form, this.model.get('user'), self.serverUrl + "settings", function(){
      "use strict";
      showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
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
        "use strict";
        showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
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
                showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
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
        storeData = {},
        moderatorsChecked = this.$el.find('.js-userShortView input:checked'),
        modList = [];

    moderatorsChecked.each(function() {
      modList.push($(this).data('guid'));
    });

    storeData.moderator_list = modList.length > 0 ? modList : "";
    storeData.vendor = true;

    saveToAPI(form, "", self.serverUrl + "profile", function(){
      "use strict";
      showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.refreshView();
    }, "", storeData);
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
        showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
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

    saveToAPI(form, this.model.get('user'), self.serverUrl + "settings", function(){
      "use strict";
      showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.refreshView();
    }, "", addressData);
  },

  saveAdvanced: function(){
    "use strict";
    var self = this,
        form = this.$el.find("#advancedForm");

    saveToAPI(form, this.model.get('user'), self.serverUrl + "settings", function(){
      "use strict";
      showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
      self.refreshView();
    });
  },

  refreshView: function(){
    "use strict";
    //window.location.reload();
    //this.render();
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

    this.model.off();
    this.off();
    this.remove();
    delete this.$el;
    delete this.el;
  }

});
