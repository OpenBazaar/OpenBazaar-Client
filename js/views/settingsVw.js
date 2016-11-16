'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    pageVw = require('./pageVw'),
    domUtils = require('../utils/dom'),
    app = require('../App.js').getApp(),
    languagesModel = require('../models/languagesMd.js'),
    usersCl = require('../collections/usersCl.js'),
    blockedUsersVw = require('./blockedUsersVw'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    countriesModel = require('../models/countriesMd'),
    cropit = require('cropit'),
    chosen = require('../utils/chosen.jquery.min.js'),
    setTheme = require('../utils/setTheme.js'),
    saveToAPI = require('../utils/saveToAPI'),
    SMTPConnection = require('smtp-connection'),
    MediumEditor = require('medium-editor'),
    validateMediumEditor = require('../utils/validateMediumEditor'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    Sortable = require('sortablejs');

module.exports = pageVw.extend({

  className: "settingsView contentWrapper",

  events: {
    'click .js-generalTab': 'tabClick',
    'click .js-addressesTab': 'tabClick',
    'click .js-pageTab': 'tabClick',
    'click .js-storeTab': 'tabClick',
    'click .js-blockedTab': 'tabClick',
    'click .js-moderatorTab': 'tabClick',
    'click .js-advancedTab': 'tabClick',
    'click .js-cancelGeneral': 'cancelView',
    'click .js-saveGeneral': 'saveGeneralClick',
    'click .js-cancelPage': 'cancelView',
    'click .js-savePage': 'savePageClick',
    'click .js-cancelAddress': 'cancelView',
    'click .js-saveAddress': 'saveAddressClick',
    'click .js-cancelStore': 'cancelView',
    'click .js-saveStore': 'saveStoreClick',
    'click .js-cancelModerator': 'cancelView',
    'click .js-saveModerator': 'saveModeratorClick',
    'click .js-cancelAdvanced': 'cancelView',
    'click .js-saveAdvanced': 'saveAdvancedClick',
    'click .js-showPeers': 'showPeers',
    'click .js-testSMTP': 'testSMTPClick',
    'click .js-changeServerSettings': 'launchServerConfig',
    'change .js-settingsThemeSelection': 'themeClick',
    'click .js-settingsAddressDelete': 'addressDelete',
    'click .js-settingsAddressUnDelete': 'addressUnDelete',
    'click #moderatorYes': 'showModeratorFeeHolder',
    'click #moderatorNo': 'hideModeratorFeeHolder',
    'click .js-shutDownServer': 'shutdownServer',
    'keyup #moderatorFeeInput': 'keypressFeeInput',
    'click #advancedForm input[name="minEffects"]': 'toggleFancyStyles',
    'click #advancedForm input[name="useTestnet"]': 'toggleTestnet',
    'change #advancedForm input[name="appBarStyle"]': 'changeAppBarStyle',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'change #handle': 'handleChange',
    'click .js-avatarRotateLeft': 'rotateAvatarLeft',
    'click .js-avatarRotateRight': 'rotateAvatarRight',
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
    this.subViews = []; //TODO: get rid of subviews, submodels, use proper remove method
    this.subModels = [];
    this.subModels.push(this.userProfile);
    this.cachedScrollPositions = {};

    this.shownMods = []; //array of mods that have been shown, used to prevent duplicates

    this.moderatorFeeInput;
    this.moderatorFeeHolder;
    this.oldFeeValue = options.userProfile.get('profile').moderation_fee || 0;

    this.firstLoadModerators = true;

    this.loading = true;
    app.loadingModal.open();

    this.listenTo(window.obEventBus, 'saveCurrentForm', function(){
      switch (self.state) {
      case 'general':
        self.saveGeneral();
        break;
      case 'page':
        self.savePage();
        break;
      case 'store':
        self.saveStore();
        break;
      case 'addresses':
        self.saveAddress();
        break;
      case 'moderator':
        self.saveModerator();
        break;
      case 'advanced':
        self.saveAdvanced();
        break;
      }
    });

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketModeratorID = Math.random().toString(36).slice(2);
    this.moderatorCount = 0;

    this.fetchModel();

    this.$obContainer = $('#obContainer');

    this.listenTo(app.router, 'cache-will-detach', this.onCacheWillDetach);
    this.listenTo(app.router, 'cache-detached', this.onCacheDetached);
    this.listenTo(app.router, 'cache-reattached', this.onCacheReattached);

    __.bindAll(this, 'validateDescription');


  },

  // disabling caching on settings for now -- too much
  // edge case overhead, like #1720
  cacheExpires: 0,

  onCacheReattached: function(e) {
    var splitRoute = e.route.split('/'),
        state = splitRoute[1];

    if (e.view !== this) return;
    state = state || this.state;

    this.loading && app.loadingModal.open();

    this.blockedUsersScrollHandler &&
      this.$obContainer.on('scroll', this.blockedUsersScrollHandler);

    if (this.cachedScrollPositions[state]) this.$obContainer[0].scrollTop = this.cachedScrollPositions[state];
    this.setTheme();
    this.setState(state);
  },

  onCacheWillDetach: function(e) {
    if (e.view !== this) return;

    this.cachedScrollPositions[this.state] = this.$obContainer[0].scrollTop;
  },

  onCacheDetached: function(e) {
    if (e.view !== this) return;

    app.loadingModal.close();

    this.blockedUsersScrollHandler &&
      this.$obContainer.off('scroll', this.blockedUsersScrollHandler);
  },

  setTheme: function() {
    var profile = this.userProfile.get('profile');

    if (profile) {
      setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    }
  },

  fetchModel: function(){
    var self = this;
    this.firstLoadModerators = true;
    this.userProfile.fetch({
      success: function(model) {
        self.setTheme();
        self.model.set({page: model.toJSON()});
        self.userModel.fetch({
          success: function(model){
            self.model.set({user: model.toJSON()});

            //use default currency to return list of supported currencies
            getBTPrice("USD", function (btAve, currencyList) {
              self.availableCurrenciesList = currencyList;
              self.render();
            });
          }
        });
      },
      error: function(){
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.getError'),
          message: window.polyglot.t('errorMessages.userError')
        });
      },
      complete: function() {
        if (!self.isRemoved()) {
          app.loadingModal.close();
          self.loading = false;
        }
      }
    });
  },

  render: function(){
    var self = this;
    this.shownMods = []; //reset to blank

    loadTemplate('./js/templates/settings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.delegateEvents(); //delegate again for re-render
      self.setFormValues();

      self.newAvatar = false;
      self.newBanner = false;
      self.blockedTabAccessed = false;
      self.setState(self.state || self.options.state);

      $(".chosen").chosen({
        width: '100%',
        search_contains: true,
        no_results_text: window.polyglot.t('chosenJS.noResultsText'),
        placeholder_text_single: window.polyglot.t('chosenJS.placeHolderTextSingle'),
        placeholder_text_multiple: window.polyglot.t('chosenJS.placeHolderTextMultiple')
      });

      var connectedPeers = "<ul>";
      $.ajax({
        url: self.serverUrl + "routing_table",
        success: function(data){
          self.$('.js-numConnectedPeers').text(data.length);
          data.forEach(function (peer) {
            connectedPeers += `<li><a href="#userPage/${peer.guid}">${peer.ip}:${peer.port}</a></li>`;
          });
          self.$('.js-connectedPeers').html(connectedPeers + "</ul>").hide();
        },
        error: function(){
          self.$('.js-numConnectedPeers').text(window.polyglot.t('errorMessages.peersFail'));
        }
      });

      self.avatarCropper = self.$('#settings-image-cropper');

      self.avatarCropper.cropit({
        $preview: self.$('.js-settingsAvatarPreview'),
        $fileInput: self.$('#settingsAvatarInput'),
        smallImage: "stretch",
        maxZoom: 2,
        onFileReaderError: function(data){
          console.log(data);
        },
        onImageLoading: function(){
          self.newAvatar = true;
          self.$('.js-avatarLoading').removeClass('fadeOut');
        },
        onImageLoaded: function(){
          self.$('.js-avatarZoom, .js-avatarRotateLeft, .js-avatarRotateRight').removeClass('disabled');
          self.$('.js-avatarLoading').addClass('fadeOut');
        },
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });

      //cache elements used more than once
      self.$moderatorFeeInput = self.$('#moderatorFeeInput');
      self.$moderatorFeeHolder = self.$('.js-settingsModeratorFee');

      if (self.model.get('page').profile.avatar_hash){
        $('#settings-image-cropper').cropit('imageSrc', self.serverUrl +'get_image?hash='+self.model.get('page').profile.avatar_hash);
        self.newAvatar = false;
      }
      //set existing avatar, if any
      $('#settings-image-cropperBanner').cropit({
        $preview: $('.js-settingsBannerPreview'),
        $fileInput: $('#settingsBannerInput'),
        smallImage: "stretch",
        exportZoom: 1.33,
        maxZoom: 5,
        onFileReaderError: function(data){
          console.log(data);
        },
        onImageLoading: function(){
          self.newBanner = true;
          self.$('.js-bannerLoading').removeClass('fadeOut');
        },
        onImageLoaded: function(){
          self.$('.js-bannerLoading').addClass('fadeOut');
        },
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });

      if (self.model.get('page').profile.header_hash){
        $('#settings-image-cropperBanner').cropit('imageSrc', self.serverUrl +'get_image?hash='+self.model.get('page').profile.header_hash);
        self.newBanner = false;
      }

      var editor = new MediumEditor('#about', {
        placeholder: {
          text: ''
        },
        toolbar: {
          imageDragging: false
        },
        paste: {
          cleanPastedHTML: false,
          forcePlainText: false
        }
      });
      editor.subscribe('blur', self.validateDescription);

      self.sortableAddresses && self.sortableAddresses.destroy();
      if (self.$('.js-sortableAddresses').length) {
        self.sortableAddresses = Sortable.create(self.$('.js-sortableAddresses')[0], {
          chosenClass: "addressBoxDragging",
          ghostClass: "addressBoxGhost"
        });
      }
    });
    return this;
  },

  showPeers: function () {
    this.$el.find('.js-connectedPeers').toggle();
  },

  validateDescription: function() {
    validateMediumEditor.checkVal(this.$('#about'));
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
          }
          return response;
        };

        model.fetch({ data: { guid: model.get('guid')} });
      });
    }
  },

  renderBlocked: function(options) {
    var self = this,
        modelsPerBatch = 5,
        blockedUsersCl,
        $blockedContainer;

    options = options || {};
    $blockedContainer = this.$('#blockedForm > :first-child');

    if (options.useCached) {
      if (!this.$lazyLoadTrigger.length) {
        throw new Error('Some expected state is missing. renderBlocked() can only'
            + ' be called with the useCached option after it has been called at least once'
            + ' without the useCached option.');
      }

      $blockedContainer.html(this.blockedUsersVw.el);
      this.blockedUsersVw.delegateEvents();

      if (!document.contains(this.$lazyLoadTrigger[0])) {
        $blockedContainer.append(this.$lazyLoadTrigger);
      }

      return;
    }

    function getBlockedGuids() {
      return self.userModel.get('blocked_guids').map(function(guid) {
        return { guid: guid };
      });
    }

    blockedUsersCl = new usersCl(getBlockedGuids().slice(0, modelsPerBatch));
    this.patchAndFetchBlockedUsers(blockedUsersCl.models);

    this.blockedUsersVw = new blockedUsersVw({
      model: this.userModel,
      collection: blockedUsersCl,
      serverUrl: this.serverUrl
    });

    $blockedContainer.html(
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
    this.listenTo(window.obEventBus, 'unblockingUser', this.blockedUsersUnblockHandler = (e) => {
      blockedUsersCl.remove(
          blockedUsersCl.findWhere({ guid: e.guid })
      );
      this.firstLoadModerators = true;
    });

    // implement scroll based lazy loading of blocked users
    this.blockedUsersScrollHandler && this.$obContainer.off('scroll', this.blockedUsersScrollHandler);
    this.blockedUsersScrollHandler = __.throttle(function() {
      var colLen;

      if (
          self.state === 'blocked' &&
          blockedUsersCl.length < getBlockedGuids().length &&
          domUtils.isScrolledIntoView(self.$lazyLoadTrigger[0], self.$obContainer[0])
      ) {
        colLen = blockedUsersCl.length;

        blockedUsersCl.add(
            getBlockedGuids().slice(colLen, colLen + modelsPerBatch)
        );

        self.patchAndFetchBlockedUsers(
            blockedUsersCl.slice(colLen, colLen + modelsPerBatch)
        );
      }
    }, 200);

    this.$obContainer.on('scroll', this.blockedUsersScrollHandler);
    // end - implement scroll based lazy loading of blocked users
  },

  setFormValues: function(){
    var self = this,
        countries = new countriesModel(),
        languages = new languagesModel(),
        countryList = countries.get('countries'),
        currencyList = countries.get('countries'),
        languageList = languages.get('languages'),
        country = this.$('#country'),
        ship_country = this.$('#settingsShipToCountry'),
        currency = this.$('#currency_code'),
        language = this.$('#language'),
        generalForm = this.$('#generalForm'),
        advancedForm = this.$('#advancedForm'),
        user = this.model.get('user'),
        ship_country_str = "",
        country_str = "",
        currency_str = "",
        language_str = "",
        pageNSFW = this.model.get('page').profile.nsfw,
        bitcoinUnit = app.getBitcoinUnit(),
        notifications = user.notifications,
        moderatorStatus = this.model.get('page').profile.moderator,
        vendorStatus = this.model.get('page').profile.vendor,
        fancyStatus = window.localStorage.getItem('minEffects'),
        smtp_notifications = user.smtp_notifications == 1;

    this.$("#pageForm").find("input[name=nsfw]").val([String(pageNSFW)]);
    generalForm.find("input[name=nsfw][value=" + localStorage.getItem('NSFWFilter') + "]").prop('checked', true);
    generalForm.find("input[name=bitcoinUnit][value=" + bitcoinUnit + "]").prop('checked', true);
    generalForm.find("input[name=notifications][value=" + notifications + "]").prop('checked', true);
    this.$("#storeForm").find("input[name=vendor][value=" + vendorStatus + "]").prop('checked', true);
    advancedForm.find("input[name=minEffects][value=" + fancyStatus + "]").prop('checked', true);
    advancedForm.find("input[name=additionalPaymentData][value=" + localStorage.getItem('AdditionalPaymentData') + "]").prop('checked', true);
    advancedForm.find("input[name=smtp_notifications][value=" + smtp_notifications + "]").prop('checked', true);
    advancedForm.find("input[name=smtp_notifications][value=" + smtp_notifications + "]").prop('checked', true);
    advancedForm.find("input[name=appBarStyle][value=" + app.appBar.getStyle() + "]").prop('checked', true);

    currencyList = __.uniq(currencyList, function(item){
      return item.code;
    });

    //translate the currency list
    __.each(currencyList, function(currencyCode){
      currencyCode.trCur = window.polyglot.t('currencies.'+currencyCode.code);
    });

    //alphabatize the currency list using the translated values
    currencyList.sort(function(a, b) {
      return a.trCur.localeCompare(b.trCur);
    });

    //add BTC
    currencyList.unshift({code: "BTC", currency: "Bitcoin", currencyUnits: "4", trCur: window.polyglot.t('currencies.BTC')});

    //translate the country list
    __.each(countryList, function(country){
      country.name = window.polyglot.t('countries.'+country.dataName);
    });

    //alphabatize the country list using the translated values
    countryList.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    __.each(countryList, function(c){
      var country_option = $('<option value="'+c.dataName+'">'+c.name+'</option>');
      var ship_country_option = $('<option value="'+c.dataName+'" data-name="'+c.name+'">'+c.name+'</option>');
      country_option.attr("selected", user.country == c.dataName);
      //if user has a country in their profile, preselect it in the new address section
      ship_country_option.attr("selected", user.country== c.dataName);
      ship_country_str += ship_country_option[0].outerHTML;
      country_str += country_option[0].outerHTML;
    });

    __.each(currencyList, function(c){
      //only show currently available currencies
      if (self.availableCurrenciesList.indexOf(c.code) > -1 || c.code === "BTC"){
        var currency_option = $('<option value="'+c.code+'">'+ c.trCur +'</option>');
        currency_option.attr("selected", user.currency_code == c.code);
        currency_str += currency_option[0].outerHTML;
      }
    });

    __.each(languageList, function(l){
      var language_option = $('<option value="'+l.langCode+'">'+l.langName+'</option>');
      language_option.attr("selected", user.language == l.langCode);
      language_str += language_option[0].outerHTML;
    });

    ship_country.html(ship_country_str);
    currency.html(currency_str);
    country.html(country_str);
    language.html(language_str);

    //set moderator status
    this.$('#moderatorForm').find('input[name=moderator]').val([String(moderatorStatus)]);
    advancedForm.find('input[name=smtp_mo]').val([String(moderatorStatus)]);
  },

  showModeratorFeeHolder: function(){
    this.$moderatorFeeHolder.removeClass('hide');
    this.$moderatorFeeInput.val(this.oldFeeValue);
  },

  hideModeratorFeeHolder: function(){
    this.$moderatorFeeHolder.addClass('hide');
    this.oldFeeValue = this.$moderatorFeeInput.val();
    this.$moderatorFeeInput.val(0);
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if (data.id == this.socketModeratorID){
      this.renderModerator(data.moderator);
    }
  },

  renderModerator: function(moderator){
    var self = this,
        existingMods = this.userModel.get('moderator_guids'),
        isExistingMod = existingMods.indexOf(moderator.guid) > -1;

    //make sure this moderator is not a duplicate
    if (this.shownMods.indexOf(moderator.guid) > -1){
      return;
    }
    this.shownMods.push(moderator.guid);

    if (moderator.guid != this.model.get('page').profile.guid && this.userModel.get('blocked_guids').indexOf(moderator.guid) == -1){
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
        if (moderator.fromModel){
          this.$('.js-settingsCurrentMods').append(modShort.el);
          if (!this.$('.js-loadingMsgOld').hasClass('foldIn')){
            //hide spinners after a while
            setTimeout(()=> {
              this.$('.js-loadingMsgOld').addClass('foldIn');
            }, 2000);
          }
        }
      } else {
        this.$('.js-settingsNewMods').append(modShort.el);
        if (!this.$('.js-loadingMsgNew').hasClass('foldIn')){
          //hide spinners after a while
          setTimeout(()=> {
            this.$('.js-loadingMsgNew').addClass('foldIn');
          }, 2000);
        }
      }
      this.moderatorCount++;
      this.subViews.push(modShort);
      this.registerChild(modShort);
    }
  },

  validateInput: function(e) {
    var $input = $(e.target);

    e.target.checkValidity();
    $input.closest('.flexRow').addClass('formChecked');
  },

  handleChange: function(e) {
    var $field = $(e.target),
        val = $field.val();

    val && val.charAt(0) !== '@' && $field.val('@' + val);
  },

  addTabToHistory: function(state){
    //add action to history
    Backbone.history.navigate("#settings/" + state, { replace: true });
  },

  setTab: function(activeTab, showContent){
    this.$('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state){
    if (state){
      this.state = state;
      this.setTab(this.$('.js-' + state + 'Tab'), this.$('.js-' + state));

      if (state == "store") {
        if (this.firstLoadModerators) {
          this.$('.js-settingsNewMods').html("");
          this.$('.js-settingsCurrentMods').html("");
          this.socketView.getModerators(this.socketModeratorID);

          __.each(this.userModel.get('moderators'), (modID)=> {
            if (modID) {
              modID.fromModel = true;
              this.renderModerator(modID);
            }
          });
        }
        this.firstLoadModerators = false;
      } else if (state === 'blocked') {
        // Since the Blocked Users View kicks off many server calls (one
        // for each blocked user) and since we are re-rendering the entire
        // settings view often (after each save), we will cache the Blocked
        // Users View.
        if (!this.blockedRendered && !this.blockedTabAccessed) {
          this.renderBlocked();
          this.blockedRendered = true;
          this.blockedTabAccessed = true;
        } else {
          this.renderBlocked({ useCached: true });
        }
      }
    } else {
      this.state = "general";
      this.setTab(this.$('.js-generalTab'), this.$('.js-general'));
    }
  },

  tabClick: function(e){
    var tab = $(e.target).closest('.btn-tab').data('tab');
    this.setState(tab);
    this.addTabToHistory(tab);
  },

  cancelView: function(){
    app.router.refresh();
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

  rotateAvatarLeft: function() {
    this.avatarCropper.cropit('rotateCCW');
  },

  rotateAvatarRight: function() {
    this.avatarCropper.cropit('rotateCW');
  },

  scrollToFirstError: function($container) {
    var $firstErr;

    $container = $container && $container.length ? $container : this.$el;
    $firstErr = $container.find(':invalid, .invalid').eq(0);
    $firstErr.length && $firstErr[0].scrollIntoViewIfNeeded();
  },

  saveGeneralClick: function() {
    this.saveGeneral();
  },

  savePageClick: function() {
    this.savePage();
  },

  saveStoreClick: function() {
    this.saveStore();
  },

  saveAddressClick: function() {
    this.saveAddress();
  },

  saveModeratorClick: function() {
    this.saveModerator();
  },

  saveAdvancedClick: function() {
    this.saveAdvanced();
  },

  testSMTPClick: function() {
    this.testSMTP();
  },

  saveGeneral: function() {
    var self = this,
        form = this.$("#generalForm"),
        cCode = this.$('#currency_code').val(),
        bitcoinUnit = this.$("#generalForm input[name=bitcoinUnit]:checked").val(),
        $saveBtn = this.$('.js-saveGeneral');

    $saveBtn.addClass('loading');

    localStorage.setItem('NSFWFilter', this.$("#generalForm input[name=nsfw]:checked").val());
    app.setBitcoinUnit(bitcoinUnit);

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings",
        function(){
          app.statusBar.pushMessage({
            type: 'confirmed',
            msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
          });

          self.setCurrentBitCoin(cCode);
          self.refreshView();
        }, '', '', '',
        function(){
          //on invalid
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.saveError'),
            message: window.polyglot.t('errorMessages.missingError')
          });
          self.scrollToFirstError(self.$('#generalForm'));
        }).always(function(){
          $saveBtn.removeClass('loading');
        });
  },

  savePage: function(){
    var self = this,
        form = this.$("#pageForm"),
        avatarCrop = this.$('#settings-image-cropper'),
        imageURI,
        bannerURI,
        img64Data = {},
        banner64Data = {},
        pageData = {},
        socialInputCount = 0,
        socialInputs = self.$('#settingsFacebookInput, #settingsTwitterInput, #settingsInstagramInput, #settingsSnapchatInput'),
        pColor = self.$('#primaryColor'),
        sColor = self.$('#secondaryColor'),
        bColor = self.$('#backgroundColor'),
        tColor = self.$('#textColor'),
        pColorVal = pColor.val(),
        bColorVal = bColor.val(),
        sColorVal = sColor.val(),
        tColorVal = tColor.val(),
        skipKeys = ["avatar_hash", "header_hash"],
        $saveBtn = this.$('.js-savePage');

    $saveBtn.addClass('loading');

    var sendPage = function(){
      //change color inputs to hex values
      pageData.primary_color = parseInt(pColorVal.slice(1), 16);
      pageData.secondary_color = parseInt(sColorVal.slice(1), 16);
      pageData.background_color = parseInt(bColorVal.slice(1), 16);
      pageData.text_color = parseInt(tColorVal.slice(1), 16);

      saveToAPI(form, self.model.get('page').profile, self.serverUrl + "profile", function(){
        window.obEventBus.trigger("updateProfile");

        app.statusBar.pushMessage({
          type: 'confirmed',
          msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
        });

        self.refreshView();
      }, '', pageData, skipKeys, function(){
        //on invalid
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.saveError'),
          message: window.polyglot.t('errorMessages.missingError')
        });

        self.scrollToFirstError(self.$('#pageForm'));
      }).always(function(){
        $saveBtn.removeClass('loading');
      });
    };

    var checkSocialCount = function(){
      var socialSend = function (socialInput) {
        var socialData = {};
        socialInputCount++;
        if (socialInput.val()){
          socialData.account_type = socialInput.data('type');
          socialData.username = socialInput.val();
          saveToAPI("", "", self.serverUrl + "social_accounts",
              function(){
                checkSocialCount();
              },
              function(data){
                $saveBtn.removeClass('loading');

                app.simpleMessageModal.open({
                  title: window.polyglot.t('errorMessages.saveError'),
                  message: '<i>' + data.reason + '</i>'
                });
              }, socialData);
        } else {
          checkSocialCount();
        }
      };

      if (socialInputCount < socialInputs.length){
        socialSend($(socialInputs[socialInputCount]));
      } else {
        sendPage();
      }
    };

    var checkBanner = function(){
      var bannerCrop = self.$('#settings-image-cropperBanner');
      if (self.newBanner && bannerCrop.cropit('imageSrc')){
        bannerURI = bannerCrop.cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: false
        });
        bannerURI = bannerURI.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
        banner64Data.image = bannerURI;

        saveToAPI('', '', self.serverUrl + "upload_image", function (data) {
          var img_hash = data.image_hashes[0];
          if (img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40){
            pageData.header = img_hash;
            checkSocialCount();
          }
        }, "", banner64Data);
      } else {
        checkSocialCount();
      }
    };

    //if an avatar has been set, upload it first and get the hash
    if (self.newAvatar && avatarCrop.cropit('imageSrc')){
      imageURI = avatarCrop.cropit('export', {
        type: 'image/jpeg',
        quality: 0.75,
        originalSize: false
      });
      imageURI = imageURI.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
      img64Data.image = imageURI;

      saveToAPI('', '', self.serverUrl + "upload_image", function (data) {
        var img_hash = data.image_hashes[0];
        if (img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && img_hash.length == 40){
          pageData.avatar = img_hash;
          checkBanner();
        }
      }, "", img64Data);
    } else {
      checkBanner();
    }
  },

  keypressFeeInput: function(){
    var fee = this.$moderatorFeeInput.val();

    if (fee.indexOf('.') > 0 && fee.split('.')[1].length > 2) {
      fee = fee.substr(0, fee.length-1);
      this.$moderatorFeeInput.val(fee);
    }
  },

  saveStore: function(){
    var self = this,
        form = this.$("#storeForm"),
        settingsData = {},
        moderatorsNew = form.find('.js-settingsNewMods .js-userShortView input:checked'),
        moderatorList = this.userModel.get('moderator_guids'),
        manualModList,
        moderatorsUnChecked = form.find('.js-settingsCurrentMods .js-userShortView input:not(:checked)'),
        onFail,
        $saveBtn = this.$('.js-saveStore');

    $saveBtn.addClass('loading');

    //first, remove any existing moderators that have been unchecked. This prevents removing saved moderators that don't show up in the UI for some reason
    moderatorsUnChecked.each(function() {
      moderatorList = __.without(moderatorList, $(this).data('guid'));
    });

    //add any new moderators that have been checked
    moderatorsNew.each(function() {
      moderatorList.push($(this).data('guid'));
    });

    //add any manually entered mods
    manualModList = this.$('#addManualMods').val().split(',');
    __.each(manualModList, function(mod){
      if (mod.length === 40){
        moderatorList.push(mod);
      }
    });

    settingsData.moderators = moderatorList.length > 0 ? moderatorList : "";

    onFail = (data) => {
      $saveBtn.removeClass('loading');
      self.scrollToFirstError(self.$('#storeForm'));
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.saveError'),
        message: '<i>' + data.reason + '</i>'
      });
    };

    saveToAPI(form, "", self.serverUrl + "profile", function() {
      saveToAPI(form, self.userModel.toJSON(), self.serverUrl + "settings",
          function () {
            app.statusBar.pushMessage({
              type: 'confirmed',
              msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
            });

            self.refreshView();
          }, function(data){
            onFail(data);
          }, settingsData).always(function(){
            $saveBtn.removeClass('loading');
          });
    }, function(data){
      onFail(data);
    });
  },

  saveAddress: function(){
    var self = this,
        form = this.$("#addressesForm"),
        newAddress = {},
        newAddresses = [],
        addressData = {},
        $saveBtn = this.$('.js-saveAddress');

    $saveBtn.addClass('loading');
    this.$('#settingsShipToName').removeClass('invalid');

    newAddress.name = this.$('#settingsShipToName').val();
    newAddress.street = this.$('#settingsShipToStreet').val();
    newAddress.city = this.$('#settingsShipToCity').val();
    newAddress.state = this.$('#settingsShipToState').val();
    newAddress.postal_code = this.$('#settingsShipToPostalCode').val();
    newAddress.alternate_contact = this.$('#settingsShipToOther').val();
    newAddress.country = this.$('#settingsShipToCountry').val();
    newAddress.displayCountry = this.$('#settingsShipToCountry option:selected').data('name');

    //if form is partially filled out throw error
    if (newAddress.name || newAddress.street || newAddress.city || newAddress.state || newAddress.postal_code || newAddress.alternate_contact) {
      if (!newAddress.name) {
        this.$('#settingsShipToName').addClass('invalid');
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.saveError'),
          message: window.polyglot.t('errorMessages.missingErrorList', {errorList: window.polyglot.t('ShipToName')})
        });
        $saveBtn.removeClass('loading');
        return;
      }
    }


    if (newAddress.name && newAddress.country) {
      newAddresses.push(JSON.stringify(newAddress));
    }

    this.$('.js-settingsAddress:not(:checked)').each(function(){
      newAddresses.push(JSON.stringify(self.model.get('user').shipping_addresses[$(this).val()]));
    });

    addressData.shipping_addresses = newAddresses;

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings", function(){
      app.statusBar.pushMessage({
        type: 'confirmed',
        msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
      });

      self.refreshView();
    }, function(){
      $saveBtn.removeClass('loading');
      self.scrollToFirstError(self.$('#addressesForm'));
    }, addressData);
  },

  saveModerator: function(){
    var self = this,
        form = this.$("#moderatorForm"),
        moderatorStatus = this.$('#moderatorYes').is(':checked'),
        makeModeratorUrl = moderatorStatus ? self.serverUrl + "make_moderator" : self.serverUrl + "unmake_moderator",
        $saveBtn = this.$('.js-saveModerator');

    $saveBtn.addClass('loading');

    saveToAPI(form, '', self.serverUrl + "profile", function(){
      app.statusBar.pushMessage({
        type: 'confirmed',
        msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
      });

      window.obEventBus.trigger("updateProfile");
      self.refreshView();
    }, function(){
      self.scrollToFirstError(self.$('#moderatorForm'));
    }).always(function(){
      $saveBtn.removeClass('loading');
    });

    $.ajax({
      type: "POST",
      url: makeModeratorUrl,
      processData: false,
      dataType: "json",
      error: function(){
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.saveError'),
          message: '<i>' + window.polyglot.t('errorMessages.serverError') + '</i>'
        });
      }
    });
  },

  testSMTP: function(){
    var hostport = $('#advancedForm').find('input[name="smtp_server"]').val();
    hostport = hostport.split(':');

    $('#testSMTPButton').addClass('loading');

    var connection = new SMTPConnection({
      host: hostport[0],
      port: hostport[1]
    });

    connection.on('error', () => {
      $('#testSMTPButton').removeClass('loading');
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.smtpServerError'),
        message: window.polyglot.t('errorMessages.noSMTPConnection')
      });
    });

    connection.connect(function() {

      var username = $('#advancedForm').find('input[name="smtp_username"]').val();
      var password = $('#advancedForm').find('input[name="smtp_password"]').val();

      connection.login({
        user: username,
        pass: password
      }, (err) => {
        if (err) {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.smtpServerError'),
            message: window.polyglot.t('errorMessages.badSMTPAuthentication')
          });
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.smtpServerSuccess'),
            message: window.polyglot.t('errorMessages.goodSMTPAuthentication')
          });
        }
        $('#testSMTPButton').removeClass('loading');
      });
    });
  },

  saveAdvanced: function(){
    var self = this,
        form = this.$("#advancedForm"),
        $saveBtn = this.$('.js-saveAdvanced');

    $saveBtn.addClass('loading');

    localStorage.setItem('AdditionalPaymentData', form.find('input[name=additionalPaymentData]:checked').val());

    saveToAPI(form, this.userModel.toJSON(), self.serverUrl + "settings", function(){
      app.statusBar.pushMessage({
        type: 'confirmed',
        msg: '<i>' + window.polyglot.t('saveMessages.SaveSuccess') + '</i>'
      }, function(){
        self.scrollToFirstError(self.$('#advancedForm'));
      }, '', '', '');

      self.refreshView();
    }).always(function(){
      $saveBtn.removeClass('loading');
    });
  },

  refreshView: function(){
    this.fetchModel();
  },

  addressDelete: function(e){
    $(e.target).closest('.js-address').addClass('div-fadeExtra');
  },

  addressUnDelete: function(e){
    $(e.target).closest('.js-address').removeClass('div-fadeExtra');
  },

  setCurrentBitCoin: function(cCode) {
    getBTPrice(cCode, function (btAve) {
      window.currentBitcoin = btAve;
    });
  },

  launchServerConfig: function() {
    app.serverConnectModal.open();
  },

  shutdownServer: function(){
    var self = this;
    $.ajax({
      type: "GET",
      url: self.serverUrl + "shutdown"
    });
  },

  toggleFancyStyles: function(){
    var $html = $('html');

    if ($('#advancedForm').find('input[name="minEffects"]').prop('checked')){
      $html.addClass('minEffects');
      localStorage.setItem('minEffects', "true");
    } else {
      $html.removeClass('minEffects');
      localStorage.setItem('minEffects', "false");
    }
  },

  toggleTestnet: function(){
    window.config.setTestnet($('#advancedForm').find('input[name="useTestnet"]').prop('checked'));
    window.location.reload();
  },

  changeAppBarStyle: function(e) {
    app.appBar.setStyle($(e.target).val());
  },

  remove: function() {
    this.blockedUsersVw && this.blockedUsersVw.remove();
    this.blockedUsersScrollHandler &&
      this.$obContainer.off('scroll', this.blockedUsersScrollHandler);

    this.serverConnectSyncHandler &&
      app.serverConfigs.getActive().off(null, this.serverConnectSyncHandler);

    pageVw.prototype.remove.apply(this, arguments);
  }
});
