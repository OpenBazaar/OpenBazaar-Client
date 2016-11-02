"use strict";

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    app = require('../App.js').getApp(),
    loadTemplate = require('../utils/loadTemplate'),
    colpicker = require('../utils/colpick.js'),
    cropit = require('cropit'),
    ratingCl = require('../collections/ratingCl'),
    userProfileModel = require('../models/userProfileMd'),
    listingsModel = require('../models/listingsMd'),
    usersModel = require('../models/usersMd'),
    itemModel = require('../models/itemMd'),
    pageVw = require('./pageVw'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    reviewsView = require('./reviewsVw'),
    itemVw = require('./itemVw'),
    itemEditVw = require('./itemEditVw'),
    setTheme = require('../utils/setTheme.js'),
    storeWizardVw = require('./storeWizardVw'),
    saveToAPI = require('../utils/saveToAPI'),
    ModeratorSettingsModal = require('./moderatorSettingsModal'),
    HiddenWarningModal = require('./hiddenWarningModal'),
    UserPageVw;

var defaultItem = {
  "vendor_offer": {
    "signature": "",
    "listing": {
      "shipping": {
        "shipping_regions": [],
        "est_delivery": {
          "international": "",
          "domestic": ""
        },
        "shipping_origin": "",
        "flat_fee": {
          "fiat": {
            "price": {
              "international": 0,
              "domestic": 0
            }
          }
        },
        "free": false
      },
      "item": {
        "category": "",
        "sku": "",
        "description": "",
        "price_per_unit": {
          "fiat": {
            "price": "",
            "currency_code": ""
          }
        },
        "title": "",
        "process_time": "",
        "image_hashes": [],
        "nsfw": false,
        "keywords": [],
        "condition": ""
      },
      "moderators": [
        {
          "fee": 0,
          "name": "",
          "avatar": "",
          "short_description": "",
          "pubkeys": {
            "guid": "",
            "bitcoin": {
              "key": "",
              "signature": ""
            }
          },
          "guid": "",
          "blockchain_id": ""
        }
      ],
      "policy": {
        "terms_conditions": "",
        "returns": ""
      },
      "id": {
        "pubkeys": {
          "guid": "",
          "bitcoin": ""
        },
        "guid": "",
        "blockchain_id": ""
      },
      "metadata": {
        "category": "",
        "version": "",
        "category_sub": "",
        "expiry": ""
      }
    }
  }
};

var recommendedPrimaryColors = ['#4c877c', '#dc6c7d', '#ce738b', '#3a4352', '#80bbad', '#106c88', '#58a6ad', '#90545d', '#b53b4d', '#6c9052', '#89a4b3', '#ffffff', '#827341', '#74b69e', '#716e86', '#935456', '#929e8e', '#9aa1a5', '#d9d8c6'];

function shadeColor2(color, percent) {
  var f=parseInt(color.slice(1), 16), t=percent<0?0:255, p=percent<0?percent*-1:percent, R=f>>16, G=f>>8&0x00FF, B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

UserPageVw = pageVw.extend({

  className: "userView contentWrapper",

  events: {
    'click .js-aboutTab': 'aboutClick',
    'click .js-reviewsTab': 'reviewsClick',
    'click .js-followersTab': 'followersClick',
    'click .js-followingTab': 'followingClick',
    'click .js-storeTab': 'storeTabClick',
    'click .js-returnToStore': 'storeClick',
    'click .js-returnToStoreCategory': 'storeCatClick',
    'click .js-sellItem': 'sellItem',
    'click .js-customize': 'customizePage',
    'click .js-editItem': 'editItemClick',
    'click .js-cloneItem': 'cloneItem',
    'click .js-deleteItem': 'deleteItemClick',
    'click .js-cancelItem': 'cancelClick',
    'click .js-saveItem': 'saveItemClick',
    'click .js-saveCustomization': 'saveCustomizePageClick',
    'click .js-cancelCustomization': 'cancelCustomizePage',
    'click .js-createStore': 'createStore',
    'click .js-follow': 'followUserClick',
    'click .js-unfollow': 'unfollowUserClick',
    'click .js-addmoderator': 'addModeratorClick',
    'click .js-removemoderator': 'removeModeratorClick',
    'click .js-moreButtonsOwnPage': 'moreButtonsOwnPageClick',
    'click .js-moreButtonsNotOwnPage': 'moreButtonsNotOwnPageClick',
    'click .js-message': 'sendMessage',
    'click .js-moderatorSettings': 'showModeratorModal',
    'click .js-customColorChoicePicker': 'customizeColorClick',
    'mouseenter .js-customColorChoice': 'clickCustomColorChoice',
    'click .js-customizePrimaryColor .js-customizeColor': 'displayCustomizePrimaryColor',
    'click .js-customizeSecondaryColor .js-customizeColor': 'displayCustomizeSecondaryColor',
    'click .js-customizeBackgroundColor .js-customizeColor': 'displayCustomizeBackgroundColor',
    'click .js-customizeTextColor .js-customizeColor': 'displayCustomizeTextColor',
    'click .js-customizePrimaryColor .js-customColorChoice': 'customizeSelectColor',
    'click .js-customizeSecondaryColor .js-customColorChoice': 'customizeSelectColor',
    'click .js-customizeBackgroundColor .js-customColorChoice': 'customizeSelectColor',
    'click .js-customizeTextColor .js-customColorChoice': 'customizeSelectColor',
    'click .js-block': 'blockUserClick',
    'click .js-unblock': 'unblockUserClick',
    'change .js-categories': 'categoryChanged',
    'click .backToTop': 'clickBackToTop'
  },

  initialize: function (options) {
    var self = this;
    this.options = options || {};

    /* expected options are:
    userModel: this is set by main.js, then by a call to the settings API.
    userProfile: this is set by main.js, it is not the same as the page's userProfile, it belongs to the current user
    userID: if userID is in the route, it is set here
    state: if state is in the route, it is set here
    itemHash: if itemHash is in the route, it is set here
     */
    //if userID was passed by router, set it as pageID
    this.pageID = options.userID;
    //set view's userID from the userModel;
    this.userID = options.userModel.get('guid');
    this.userProfileFetchParameters = {};
    this.followerFetchStart = 0;
    this.followersFetchPer = 30;
    this.followerFetchTotal = 0;
    this.itemFetchParameters = {};
    this.model = new Backbone.Model();
    //this.globalUserProfile = options.userProfile;
    this.userProfile = new userProfileModel();
    //models have to be passed the dynamic URL
    this.userProfile.urlRoot = options.userModel.get('serverUrl') + "profile";
    this.listings = new listingsModel();
    this.listings.urlRoot = options.userModel.get('serverUrl') + "get_listings";
    this.followers = new usersModel();
    this.followers.urlRoot = options.userModel.get('serverUrl') + "get_followers";
    this.following = new usersModel();
    this.following.urlRoot = options.userModel.get('serverUrl') + "get_following";
    this.reviews = new ratingCl();
    //store a list of the viewing user's followees. They will be different from the page followers if this is not their own page.
    this.ownFollowing = [];
    this.socketView = options.socketView;
    this.slimVisible = false;
    this.confirmDelete = false;
    this.state = options.state;
    this.lastTab = "about"; //track the last tab clicked
    //flag to hold state when customizing
    this.customizing = false;
    this.editing = false;
    this.skipNSFWmodal = options.skipNSFWmodal;
    this.showNSFW = options.skipNSFWmodal ? options.skipNSFWmodal : JSON.parse(localStorage.getItem('NSFWFilter'));
    this.showNSFWContent = this.showNSFW;
    this.currentItemHash = options.itemHash;
    this.$obContainer = $('#obContainer');
    /*
    //hold changes to the page for undoing, such as custom colors
    this.undoCustomAttributes = {
      profile: {
        primary_color: "",
        secondary_color: "",
        text_color: "",
        background_color: ""
      }
    };
    */

    this.loadingDeferred = $.Deferred();

    //listen to follow and unfollow events
    this.listenTo(window.obEventBus, "followUser", function(guid){
      this.followUser(guid);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(guid){
      this.unfollowUser(guid);
    });

    this.listenTo(window.obEventBus, "itemShortEdit", function(options){
      this.setItem(options.contract_hash, null, function(){
        self.editItem();
      });
    });

    this.listenTo(window.obEventBus, "itemShortClone", function(options){
      this.setItem(options.contract_hash, null, function(){
        self.cloneItem();
      });
    });

    this.listenTo(window.obEventBus, "itemShortDelete", function(options){
      self.deleteItem(false, options.contract_hash);
    });

    this.listenTo(window.obEventBus, "moderatorStatus", function(options){
      this.changeModeratorStatus(options.status, options.fee);
    });

    this.listenTo(window.obEventBus, 'blockingUser', (e) => {
      if (e.guid === this.model.get('page').profile.guid) {
        this.renderUserBlocked();
      }
    });

    this.listenTo(window.obEventBus, 'unblockingUser', (e) => {
      if (e.guid === this.model.get('page').profile.guid) {
        this.renderUserUnblocked();
      }
    });

    this.listenTo(window.obEventBus, 'saveCurrentForm', function(){
      if (self.editing) {
        self.saveItem();
      } else if (self.customizing) {
        self.saveCustomizePage();
      }
    });

    //determine if this is the user's own page or another profile's page
    //if no userID is passed in, or it matches the user's ID, then this is their page
    //sometimes it can be set to the string 'null', check for that too
    if (!this.pageID || this.pageID == this.userID || this.pageID == 'null'){
      //set page ID to be the user's own ID
      this.pageID = this.userID;
      this.options.ownPage = true;
      this.showNSFWContent = true;
    } else {
      this.options.ownPage = false;
      this.userProfileFetchParameters = $.param({'guid': this.pageID});
    }

    this.userProfileFetch = this.userProfile.fetch({
      data: self.userProfileFetchParameters,
      processData: true,
      //timeout: 4000,
      success: function(model, response){
        //don't render if view has been closed and the $el has been deleted
        if (self.isRemoved()) return;

        if (response.profile){
          if (self.options.ownPage === true){
            model.set('headerURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').header_hash);
            model.set('avatarURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').avatar_hash);
          } else {
            model.set('headerURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').header_hash + "&guid=" + self.pageID);
            model.set('avatarURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').avatar_hash + "&guid=" + self.pageID);
          }

          // Cache user avatar in localStorage
          var profile = model.toJSON().profile;
          window.localStorage.setItem("avatar_" + self.pageID, profile.avatar_hash);

          if (response.profile.website) {
            var website = profile.website;
            self.short_website = self.trimUrl(website);
          }

          self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
          self.model.set({ownPage: self.options.ownPage});
          self.render();
          !self.currentItemHash && self.loadingDeferred.resolve();

          // Handle was requested
          if (profile.handle) {
            window.obEventBus.trigger('handleObtained', profile);
            app.appBar.setTitle(profile.handle);
          }

        } else {
          //model was returned as a blank object
          self.loadingDeferred.reject();
        }
      },
      error: function(){
        if (self.isRemoved()) return;

        self.loadingDeferred.reject();
      },
      complete: function(xhr, textStatus) {
        if (textStatus == 'parsererror'){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });

          throw new Error("The user profile data returned from the API has a parsing error.");
        }
      }
    });
  },

  cacheExpires: 0,

  loadingConfig: function() {
    var config = {
      promise: this.loadingDeferred.promise(),
      cancel: () => {
        this.userProfileFetch && this.userProfileFetch.abort();
        this.itemFetch && this.itemFetch.abort();
      }
    };

    if (this.currentItemHash) {
      config.connectText = window.polyglot.t('pageConnectingMessages.listingConnect').replace('${listing}', this.currentItemHash);
      config.failedText = window.polyglot.t('pageConnectingMessages.listingFail');
    } else if (this.options.handle) {
      config.connectText = window.polyglot.t('pageConnectingMessages.handleConnect').replace('${handle}', this.options.handle);
      config.failedText = window.polyglot.t('pageConnectingMessages.handleFail');
    } else {
      config.connectText = window.polyglot.t('pageConnectingMessages.userConnect').replace('${guid}', this.pageID);
      config.failedText = window.polyglot.t('pageConnectingMessages.userFail');
    }

    return config;
  },

  render: function(){
    var self = this,
        blocked = this.options.userModel.get('blocked_guids') || [],
        isBlocked = blocked.indexOf(this.pageID) !== -1;

    this.model.set('isBlocked', isBlocked); //add blocked status to model

    loadTemplate('./js/templates/backToTop.html', function(backToTopTmpl) {
      loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
        self.setCustomStyles();
        self.$el.html(loadedTemplate(
          __.extend(self.model.toJSON(), {
            backToTopTmpl: backToTopTmpl,
            short_website: self.short_website
          })
        ));
        self.fetchReviews();
        self.fetchFollowing();
        self.getIsModerator();
        self.fetchListings();
        self.setCustomStyles();
        self.setState(self.state, self.currentItemHash, { replaceHistory: true });
        self.$backToTop = self.$('.backToTop');
        self.$categorySelect = self.$('.js-categories');

        //check if user is blocked
        if (!self.options.ownPage && isBlocked) {
          self.needsBlockedWarning = true;
        }

        if (!self.options.ownPage && !self.skipNSFWmodal && self.model.get('page').profile.nsfw && !self.showNSFW){
          self.needsNSFWWarning = true;
        }

        if (self.needsBlockedWarning) {
          self.hideThisUser('blocked');
        } else if (self.needsNSFWWarning) {
          self.hideThisUser('nsfw');
        }

        self.headerCropper = self.$('#image-cropper');

        self.headerCropper.cropit({
          smallImage: "stretch",
          maxZoom: 5,
          $preview: self.$('.headerCropperPreview'),
          onFileReaderError: function(data){
            console.log(data);
          },
          onFileChange: function(){
            if (self.headerCropper.cropit('isZoomable')){
              $('.js-bannerRangeInput').removeClass('hide');
            }
          },
          onImageError: function(errorObject, errorCode, errorMessage){
            console.log(errorObject);
            console.log(errorCode);
            console.log(errorMessage);
          }
        });

        self.scrollHandler = __.bind(
          __.throttle(self.onScroll, 100),
          self
        );

        self.$obContainer.off('scroll', self.scrollHandler);
        self.$obContainer.on('scroll', self.scrollHandler);
      });
    });

    return this;
  },

  onScroll: function() {
    if (this.$obContainer.scrollTop() > 400 && this.slimVisible === false ) {
      this.slimVisible = true;
      this.$('.user-page-header-slim').addClass('scrolledIntoView');
      this.$('.user-page-header').removeClass('shadow-inner1')
        .addClass('zIndex4')
        .find('.rowItem')
        .hide();
      this.$('.user-page-navigation-buttons').addClass('positionFixed positionTop68');
      this.$backToTop.addClass('slideUp');
    } else if (this.$obContainer.scrollTop() < 400 && this.slimVisible === true ) {
      this.slimVisible = false;
      this.$('.user-page-header-slim').removeClass('scrolledIntoView');
      this.$('.user-page-header').addClass('shadow-inner1')
        .removeClass('zIndex4')
        .find('.rowItem')
        .show();
      this.$('.user-page-navigation-buttons').removeClass('positionFixed positionTop68');
      this.$backToTop.removeClass('slideUp');
    }
  },

  clickBackToTop: function() {
    this.$obContainer.animate({ scrollTop: 0 }, {
      complete: () => {
        this.$backToTop.removeClass('slideUp');
      }
    });
  },

  setCustomStyles: function() {
    var self = this,
        profile = this.model.get('page').profile;
    //only do the following if page has been set in the model
    if (profile){
      setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);

      //set custom color input values
      self.$el.find('.js-customizeColorInput').each(function(){
        var newColor = self.model.get('page').profile[$(this).attr('id')];
        $(this).val(newColor);
        $(this).closest('.positionWrapper').find('.js-customizeColor').css('background-color', newColor);
      });
    }
  },

  setState: function(state, hash, options) {
    var currentHandle = this.model.get('page').profile.handle,
        addressState,
        currentAddress;

    options = options || {};

    if (state === "listing" && hash){
      //clear old templates
      this.$el.find('.js-list4').html("");
      this.tabClick(this.$el.find('.js-storeTab'), this.$el.find('.js-item'));
      this.renderItem(hash);
      this.$obContainer.scrollTop(352);
    } else if (state === "listingOld") {
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-item"));
      this.$obContainer.scrollTop(352);
    } else if (state === "listingNew"){
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
      this.$obContainer.scrollTop(352);
      this.addTabToHistory('listingNew', options.replaceHistory);
      this.sellItem();
    } else if (state === "createStore") {
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
      this.addTabToHistory('about', options.replaceHistory);
      this.createStore();
    } else if (state === "becomeModerator"){
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
      this.addTabToHistory('about', options.replaceHistory);
      this.showModeratorModal();
    } else if (state === "customize"){
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
      this.addTabToHistory('about', options.replaceHistory);
      this.customizePage();
    } else if (state == "store"){
      //if this page is not a vendor, don't go to their store
      if (this.model.get('page').profile.vendor){
        state="store";
      } else {
        state="about";
      }
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
      this.addTabToHistory(state, options.replaceHistory);
    } else if (state && state !== 'listing'){
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
    } else {
      //if no state was set
      if (this.model.get('page').profile.vendor){
        state="store";
      } else {
        state="about";
      }
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
    }
    this.setControls(state);
    if (state != "customize" && state != this.state && state != "listingNew" && this.state != "listingNew"){
      this.lastTab = this.state;
      this.state = state;
    }

    if (state == "listing" || state == "listingOld" || state == "listingNew") {
      addressState = "/listing";
      addressState = hash ? addressState + "/" + hash : addressState;
    } else {
      addressState = "/" + state;
    }

    currentAddress = currentHandle || this.model.get('page').profile.guid;
    currentAddress += addressState;

    window.obEventBus.trigger("setAddressBar", {'addressText': currentAddress});
  },

  setControls: function(state){
    //hide all the state controls
    this.$el.find('.js-userPageControls, #customizeControls, .js-itemCustomizationButtons, .js-pageCustomizationButtons').addClass('hide');
    this.$el.find('.js-deleteItem').removeClass('confirm');
    this.$el.find('.js-unfollow').removeClass('confirm');
    this.$el.find('.js-removemoderator').removeClass('confirm');
    this.$el.find('.user-page-header-slim-bg-cover').removeClass('user-page-header-slim-bg-cover-customize');
    this.$obContainer.removeClass("customizeUserPage", "noScrollBar", "overflowHidden");
    //unhide the ones that are needed
    if (this.options.ownPage === true) {
      if (state === "listing" || state === "listingOld") {
        this.$el.find('.js-itemButtons').removeClass('hide');
      } else if (state === "listingEdit" || state === "listingNew") {
        this.$el.find('.js-itemEditButtons').removeClass('hide');
      } else if (state === "customize") {
        this.$el.find('.js-pageCustomizationButtons').removeClass('hide');
        this.$el.find('#customizeControls').removeClass('hide');
        this.$el.find('.user-page-header-slim-bg-cover').addClass('user-page-header-slim-bg-cover-customize');
        this.$obContainer.addClass("customizeUserPage", "noScrollBar", "overflowHidden");
      } else {
        this.$el.find('.js-pageButtons').removeClass('hide');
      }
      //if store has been created, swap create button for sell button
      if (this.model.get('page').profile.vendor === true) {
        this.$el.find('.js-sellItem').removeClass('hide');
        this.$el.find('.js-createStore').addClass('hide');
      } else {
        this.$el.find('.js-sellItem').addClass('hide');
        this.$el.find('.js-createStore').removeClass('hide');
      }
    } else {
      this.$el.find('.js-notOwnPageButtons').removeClass('hide');
    }
  },

  setCategorySelect: function(category) {
    if (category && this.$categorySelect.val() !== category &&
        this.$categorySelect.find('option[value="' + category + '"]').length) {
        this.$categorySelect.val(category);
    }
    this.showCategory(category);
  },

  categoryChanged: function() {
    this.showCategory(this.$categorySelect.val());
  },

  showCategory: function(category) {
    if (this.itemList) {
      this.itemList.category = category;
      this.itemList.render();
    } else {
      this.renderItems(this.cachedListings);
    }
  },

  setFollowingPlaceholder: function(totalLength, currentLength) {
    if (totalLength > currentLength) {
      this.$('#inputFollowing').attr('placeholder', window.polyglot.t('SearchForFollowingPlaceholderMore'));
    } else {
      this.$('#inputFollowing').attr('placeholder', window.polyglot.t('SearchForFollowingPlaceholder'));
    }
  },

  setFollowersPlaceholder: function(totalLength, currentLength) {
    if (totalLength > currentLength) {
      this.$('#inputFollowers').attr('placeholder', window.polyglot.t('SearchForFollowersPlaceholderMore'));
    } else {
      this.$('#inputFollowers').attr('placeholder', window.polyglot.t('SearchForFollowersPlaceholder'));
    }
  },

  toggleFollowButtons: function(followed) {
    var followBtn = this.$('.js-follow'),
        unfollowBtn = this.$('.js-unfollow');
    if (followed === true){
      followBtn.addClass('hide');
      unfollowBtn.removeClass('hide');
    } else {
      followBtn.removeClass('hide');
      unfollowBtn.addClass('hide');
    }
    followBtn.removeClass('loading');
    unfollowBtn.removeClass('loading');
  },

  toggleModeratorButtons: function(moderated) {
    var addBtn = this.$('.js-addmoderator'),
        removeBtn = this.$('.js-removemoderator');
    if (moderated == true){
      addBtn.addClass('hide');
      removeBtn.removeClass('hide');
    } else {
      addBtn.removeClass('hide');
      removeBtn.addClass('hide');
    }
    addBtn.removeClass('loading');
    removeBtn.removeClass('loading');
  },

  fetchListings: function() {
    var self = this;
    this.listings.fetch({
      data: self.userProfileFetchParameters,
      success: function (model) {
        if (self.isRemoved()) return;
        self.cachedListings = model.get('listings'); //cache for rerendering
        self.renderItems(self.cachedListings);
      },
      error: function () {
        if (self.isRemoved()) return;

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.notFoundError'),
          message: window.polyglot.t('Listings')
        });
      },
      complete: function (xhr, textStatus) {
        if (textStatus == 'parsererror') {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });

          throw new Error("The listings data returned from the API has a parsing error.");
        }
      }
    });
  },

  fetchReviews: function(){
    var self = this;
    this.reviews.fetch({
      data: self.userProfileFetchParameters,
      success: function(model){
        if (self.isRemoved()) return;
        self.renderReviews(model);
      },
      error: function () {
        if (self.isRemoved()) return;

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.notFoundError'),
          message: window.polyglot.t('Reviews')
        });
      }
    });
  },

  fetchFollowing: function(){
    var self = this;
    this.following.fetch({
      data: self.userProfileFetchParameters,
      success: function(model){
        var followingArray = model.get('following') || [];
        if (self.isRemoved()) return;

        if (self.options.ownPage === true){
          self.ownFollowing = followingArray || [];
          self.ownFollowing = self.ownFollowing.map(function(followingObject){
            return followingObject.guid;
          });
          self.renderFollowing(followingArray);
          self.setFollowingPlaceholder(followingArray.length, self.ownFollowing.length);

          //call followers 2nd so list of following is available
          self.fetchFollowers();
        } else {
          $.ajax({
            url: self.options.userModel.get('serverUrl') + "get_following",
            dataType: "json"
            //timeout: 4000
          }).done(function(ownFollowingData){
            if (self.isRemoved()) return;
            self.ownFollowing = ownFollowingData.following || [];
            self.ownFollowing = self.ownFollowing.map(function(followingObject){
              return followingObject.guid;
            });
            self.renderFollowing(followingArray);
            self.setFollowingPlaceholder(followingArray.length, self.ownFollowing.length);

            //call followers 2nd so list of following is available
            self.fetchFollowers();

            //mark whether page is following you
            if (self.options.ownPage === false && Boolean(__.findWhere(followingArray, {guid: self.userID}))){
              self.$('.js-followsMe').removeClass('hide');
            }
            //mark whether page is being followed
            if (self.options.ownPage === false){
              self.toggleFollowButtons(Boolean(__.findWhere(ownFollowingData.following, {guid: self.pageID})));
            }
          }).fail(function(jqXHR, status, errorThrown){
            if (self.isRemoved()) return;
            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
          });
        }
      },
      error: function(){
        if (self.isRemoved()) return;

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.notFoundError'),
          message: window.polyglot.t('Following')
        });
      },
      complete: function(xhr, textStatus) {
        if (textStatus == 'parsererror'){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });

          throw new Error("The following data returned from the API has a parsing error.");
        }
      }
    });
  },

  fetchFollowers: function(ignoreTotal){
    var self = this,
        fetchFollowersParameters;

    if (!ignoreTotal && this.followerFetchStart > 0 && this.followerFetchStart >= this.followerFetchTotal){
      //don't fetch again if all of the followers have been fetched
      return;
    }

    if (this.fetchingFollowers){
      //don't cue up multiple calls
      return;
    }

    this.fetchingFollowers = true;

    if (this.options.ownPage){
      fetchFollowersParameters = $.param({'start': this.followerFetchStart});
    } else {
      fetchFollowersParameters = $.param({'guid': this.pageID, 'start': this.followerFetchStart});
    }

    this.followers.fetch({
      data: fetchFollowersParameters,
      success: (model)=> {
        var followerArray = model.get('followers') || [];

        this.followerFetchTotal = model.get('count') || followerArray.length; //the length is for older servers
        this.$('.js-userFollowerCount').html(this.followerFetchTotal);

        if (self.isRemoved()) return;

        if (followerArray.length || this.followerFetchTotal == 0){
          //always render the first time so the no followers message is shown for no followers
          this.renderFollowers(followerArray, this.followerFetchTotal);
          this.setFollowersPlaceholder(this.followerFetchTotal, this.followerFetchStart);
        }
      },
      error: function(){
        if (self.isRemoved()) return;

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.notFoundError'),
          message: window.polyglot.t('Followers')
        });
      },
      complete: function(xhr, textStatus) {
        self.fetchingFollowers = false;
        if (textStatus == 'parsererror'){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });

          throw new Error("The followers data returned from the API has a parsing error.");
        }
      }
    });
    this.followerFetchStart += this.followersFetchPer;
  },

  getIsModerator: function () {
    this.toggleModeratorButtons(Boolean(__.findWhere(this.model.get('user').moderators, {guid: this.pageID})));
  },

  renderItems: function (model, skipNSFWmodal) {
    var self = this,
        selectOptions = [],
        addressCountries = self.options.userModel.get('shipping_addresses').map(function(address){
          return address.country;
        }),
        userCountry = self.options.userModel.get('country');

    addressCountries.push(userCountry);
    skipNSFWmodal = skipNSFWmodal || this.skipNSFWmodal;
    model = model || [];
    __.each(model, (arrayItem) => {

      if (!this.showNSFWContent && !this.showNSFW &&!skipNSFWmodal && arrayItem.nsfw){
        arrayItem.cloak = true;
      } else {
        arrayItem.cloak = false;
      }
      arrayItem.userCurrencyCode = this.options.userModel.get('currency_code');
      arrayItem.serverUrl = this.options.userModel.get('serverUrl');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = this.model.get('page').profile.avatar_hash;
      arrayItem.handle = this.model.get('page').profile.handle;
      arrayItem.userID = this.pageID;
      arrayItem.ownPage = this.options.ownPage;
      arrayItem.onUserPage = true;
      arrayItem.userCountries = addressCountries;
      arrayItem.skipNSFWmodal = skipNSFWmodal;
      if (arrayItem.category != "" && this.$el.find('.js-categories option[value="' + arrayItem.category + '"]').length == 0){
        selectOptions[arrayItem.category] = true;
      }
      if (this.options.ownPage === true){
        arrayItem.imageURL = this.options.userModel.get('serverUrl')+"get_image?hash="+arrayItem.thumbnail_hash;
      } else {
        arrayItem.imageURL = this.options.userModel.get('serverUrl')+"get_image?hash="+arrayItem.thumbnail_hash+"&guid="+this.pageID;
      }
    });

    Object.keys(selectOptions).sort().forEach((selectOption) => {
      var opt = document.createElement('option');
      opt.value = selectOption;
      opt.innerHTML = selectOption;
      this.$categorySelect.append(opt);
    });

    this.itemList = new itemListView({
      model: model,
      el: '.js-list3',
      title: window.polyglot.t('NoListings'),
      message: "",
      userModel: this.options.userModel,
      category: this.$categorySelect.val(),
    });

    this.registerChild(this.itemList);

    this.$('.js-listingCount').html(model.length);

    this.listenTo(this.itemList, 'rendered', ()=>{
      this.storeSearch = new window.List('searchStore', {valueNames: ['js-searchTitle'], page: 1000});
      var searchTerms = this.$('#inputStore').val();
      searchTerms && this.storeSearch.search(searchTerms);
    });
  },

  renderReviews: function (model) {
    model = model || [];

    this.reviewsVw && this.reviewsVw.remove();
    this.reviewsVw = new reviewsView({
      collection: model
    });
    this.registerChild(this.reviewsVw);

    this.$('.js-list6').html(this.reviewsVw.render().el);
    this.$('.js-userReviewsCount').html(model.length);
  },

  renderFollowers: function (model, followerCount) {

    model = model || [];
    //if view doesn't exist, create it
    if (!this.followerList) {
      this.followerList = new personListView({
        model: model,
        el: '.js-list1',
        title: window.polyglot.t('NoFollowers'),
        message: "",
        ownFollowing: this.ownFollowing,
        hideFollow: true,
        serverUrl: this.options.userModel.get('serverUrl'),
        reverse: true,
        followerCount: followerCount
      });
      this.registerChild(this.followerList);
    } else if (model.length) {
      this.followerList.addUsers(model);
    }

    if (model.length) {
      //refresh search
      this.followersSearch = new window.List('searchFollowers', {
        valueNames: ['js-searchName', 'js-searchHandle'],
        page: 1000
      });
    }

    this.listenTo(this.followerList, 'usersAdded', ()=>{
      var searchTerms = this.$('#inputFollowers').val();
      this.followersSearch.reIndex();
      searchTerms && this.followersSearch.search(searchTerms);
    });

    this.listenTo(this.followerList, 'fetchMoreUsers', ()=>{
      this.fetchFollowers();
    });
  },

  renderFollowing: function (model) {
    model = model || [];
    this.followingList = new personListView({
      model: model,
      followed: true,
      el: '.js-list2',
      title: window.polyglot.t('NotFollowingAnyone'),
      message: "",
      ownFollowing: this.ownFollowing,
      hideFollow: true,
      serverUrl: this.options.userModel.get('serverUrl'),
      reverse: true
    });
    this.registerChild(this.followingList);

    this.$('.js-userFollowingCount').html(model.length);

    if (model.length) {
      this.followingSearch = new window.List('searchFollowing', {
        valueNames: ['js-searchName', 'js-searchHandle'],
        page: 1000
      });
    }

    this.listenTo(this.followingList, 'usersAdded', ()=>{
      var searchTerms = this.$('#inputFollowing').val();
      if (this.followingSearch){
        this.followingSearch.reIndex();
        searchTerms && this.followingSearch.search(searchTerms);

        this.setFollowingPlaceholder(model.length, this.followingSearch.size());
      }
    });
  },


  setItem: function(hash, onSucceed, afterUpdate){
    var self = this;
    this.item = new itemModel({
      userCurrencyCode: self.options.userModel.get('currency_code'),
      userCountry: self.options.userModel.get('country'),
      userAddresses: self.options.userModel.get('shipping_addresses'),
      serverUrl: self.options.userModel.get('serverUrl'),
      showAvatar: false,
      avatar_hash: self.model.get('page').profile.avatar_hash,
      handle: self.model.get('page').profile.handle,
      ownPage: self.options.ownPage,
      itemHash: hash,
      user: self.model.get('user'),
      page: self.model.get('page'),
      showNSFWContent: self.showNSFWContent,
      skipNSFWmodal: self.skipNSFWmodal
    });
    this.item.urlRoot = this.options.userModel.get('serverUrl')+"contracts";
    //remove old item before rendering
    if (this.itemView){
      this.itemView.undelegateEvents();
    }
    this.itemView = new itemVw({model: this.item, el: '.js-list4', userModel: self.options.userModel, socketView: this.socketView});
    this.registerChild(this.itemView);
    //set the parameters for the fetch
    if (this.options.ownPage === true){
      this.itemFetchParameters = $.param({'id': hash});
    } else {
      this.itemFetchParameters = $.param({'id': hash, 'guid': this.pageID});
    }
    this.itemFetch = this.item.fetch({
      data: self.itemFetchParameters,
      //timeout: 4000,
      success: function(model, response){
        if (self.isRemoved()) return;

        //set id after fetch, otherwise Backbone includes it in the fetch url
        model.set('id', hash);
        if (self.options.ownPage === false){
          model.set('imageExtension', "&guid=" + model.get('vendor_offer').listing.id.guid);
        }

        model.updateAttributes(afterUpdate);
        onSucceed && onSucceed(model, response);

      },
      error: function(){
        if (self.isRemoved()) return;

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.notFoundError'),
          message: window.polyglot.t('Listing')
        });
      },
      complete: function(xhr, textStatus) {
        if (textStatus == 'parsererror'){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });

          throw new Error("The contract data returned from the API has a parsing error.");
        }
      }
    });
  },

  renderItem: function(hash){
    var self = this;
    this.setItem(hash, function(model, response) {
      if (response.vendor_offer){
        self.loadingDeferred.resolve();
      } else {
        self.loadingDeferred.reject();
      }
    }
    );
  },

  renderItemEdit: function(useCurrentItem, clone){
    var self = this;

    if (useCurrentItem) {
      //if editing existing product, clone the model
      this.itemEdit = this.item.clone();

      if (clone) {
        this.itemEdit.unset('id');
      }
    } else {
      defaultItem.serverUrl =self.options.userModel.get('serverUrl');
      defaultItem.userCountry = self.options.userModel.get('country');
      defaultItem.userCurrencyCode = self.options.userModel.get('currency_code');
      defaultItem.vendor_offer.listing.item.price_per_unit.fiat.currency_code =self.options.userModel.get('currency_code');
      defaultItem.vendor_offer.listing.id.guid = self.model.get('page').profile.guid;
      defaultItem.vendor_offer.listing.item.image_hashes = [];
      this.itemEdit = new itemModel(defaultItem);
    }
    //add the moderator list to the item model
    this.itemEdit.set('moderators', self.model.get('user').moderators);
    //unbind any old view
    if (this.itemEditView){
      this.itemEditView.remove();
    }
    this.itemEditView = new itemEditVw({model: this.itemEdit});
    this.$('.js-list5').html('');
    this.$('.js-list5').append(this.itemEditView.$el);
    this.registerChild(this.itemEditView);
    this.listenTo(this.itemEditView, 'saveNewDone', this.saveNewDone);
    self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-itemEdit'));

    this.editing = true;
  },

  aboutClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-about'));
    this.addTabToHistory('about');
    this.setState('about');
  },

  reviewsClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-reviews'));
    this.addTabToHistory('reviews');
    this.setState('reviews');
  },

  followersClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-followers'));
    this.addTabToHistory('followers');
    this.setState('followers');
    // $('#inputFollowers').focus();
  },

  followingClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-following'));
    this.addTabToHistory('following');
    this.setState('following');
    // $('#inputFollowing').focus();
  },

  storeClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
    this.addTabToHistory('store');
    this.setState('store');
    // $('#inputStore').focus();
  },

  storeTabClick: function(e) {
    this.storeClick(e);
  },

  storeCatClick: function(e) {
    this.setCategorySelect($(e.target).text());
    this.storeClick(e);
  },

  tabClick: function(activeTab, showContent){
    this.$('.js-userPageTabs > .js-tab').removeClass('active');
    this.$('.js-userPageSubViews > .js-tabTarg').addClass('hide');
    activeTab.addClass('active');
    showContent.removeClass('hide');

    this.customizing = false;
    this.editing = false;
  },

  addTabToHistory: function(state){
    //add action to history if not an item
    Backbone.history.navigate('#userPage/'+this.model.get('page').profile.guid + "/" + state, { replace: true });
  },

  sellItem: function(){
    this.renderItemEdit();
    this.setControls("listingEdit");
  },

  customizePage: function(){
    this.customizing = true;
    this.setControls('customize');
    $('.user-page-content').addClass('pull-up4');
    $('.user-page-header').addClass('shadow-inner1-strong');
    this.$obContainer.animate({ scrollTop: "0" });
  },

  hideColorRecommendations: function() {
    $('.js-customizeColorRecommendations').removeClass('show');
  },

  clickCustomColorChoice: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var colorKey = $(e.currentTarget).data('colorKey');

    if (colorKey){
      $('.js-customColorChoice').removeClass('outline2');
      $(e.currentTarget).addClass('outline2');

      this.setCustomColor(rgb2hex($(e.currentTarget).css('background-color')), colorKey);
    }
  },

  customizeSelectColor: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( !$(e.currentTarget).hasClass('js-customColorChoicePicker') ){
      this.hideColorRecommendations();
      $('.colpick').removeClass('show');
    }
  },


  displayCustomizePrimaryColor: function() {
    var $customizePrimaryColorRecommendations = this.$el.find('.customizePrimaryColorRecommendations'),
        $customColorChoice = $customizePrimaryColorRecommendations.find('.customColorChoice');

    $('#primary_color').colpickHide();

    if ($customizePrimaryColorRecommendations.hasClass('show')){
      $customizePrimaryColorRecommendations.removeClass('show');
    } else {
      $('.seeTooltip').hide();

      // set recommendations
      $customColorChoice.css('background', '#fff'); // reset to white to give a cool transition
      $customColorChoice.first().css('background', 'transparent'); // set to transparent

      for (var i = 2; i <= 6; i++) {
        $customColorChoice.eq(i).css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      }

      // slide background_color recommendations out + hide others
      $customizePrimaryColorRecommendations.addClass('show');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('show');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('show');
      this.$el.find('.customizeTextColorRecommendations').removeClass('show');
    }
  },

  displayCustomizeSecondaryColor: function() {
    var $customizeSecondaryColorRecommendations = this.$el.find('.customizeSecondaryColorRecommendations'),
        $customColorChoice = $customizeSecondaryColorRecommendations.find('.customColorChoice'),
        primaryColor = this.model.get('page').profile.primary_color,
        shades = [-0.25, -0.15, -0.1, 0.1, 0.15];

    $('#secondary_color').colpickHide();

    if ($customizeSecondaryColorRecommendations.hasClass('show')){
      $customizeSecondaryColorRecommendations.removeClass('show');
    } else {
      // set recommendations
      $customColorChoice.css('background', '#fff');  // reset to white to give a cool transition
      $customColorChoice.first().css('background', 'transparent'); // set to transparent

      for (var i = 2; i <= 6; i++) {
        $customColorChoice.eq(i).css('background', shadeColor2(primaryColor, shades[i-2]));
      }

      // slide secondary_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('show');
      $customizeSecondaryColorRecommendations.addClass('show');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('show');
      this.$el.find('.customizeTextColorRecommendations').removeClass('show');
    }

  },

  displayCustomizeBackgroundColor: function() {
    var $customizeBackgroundColorRecommendations = this.$el.find('.customizeBackgroundColorRecommendations'),
        $customColorChoice = $customizeBackgroundColorRecommendations.find('.customColorChoice'),
        secondaryColor = this.model.get('page').profile.secondary_color,
        shades = [-0.70, -0.65, -0.55, -0.45, -0.35];

    $('#background_color').colpickHide();

    if ($customizeBackgroundColorRecommendations.hasClass('show')){
      $customizeBackgroundColorRecommendations.removeClass('show');
    } else {
      // set recommendations
      $customColorChoice.css('background', '#fff'); // reset to white to give a cool transition
      $customColorChoice.first().css('background', 'transparent'); // set to transparent

      for (var i = 2; i <= 6; i++) {
        $customColorChoice.eq(i).css('background', shadeColor2(secondaryColor, shades[i-2])); // 70% darker than primary_color
      }

      // slide background_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('show');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('show');
      $customizeBackgroundColorRecommendations.addClass('show');
      this.$el.find('.customizeTextColorRecommendations').removeClass('show');
    }
  },

  displayCustomizeTextColor: function() {

    var $customizeTextColorRecommendations = this.$el.find('.customizeTextColorRecommendations'),
        $customColorChoice = $customizeTextColorRecommendations.find('.customColorChoice');

    $('#text_color').colpickHide();

    if ($customizeTextColorRecommendations.hasClass('show')){
      $customizeTextColorRecommendations.removeClass('show');
    } else {
      // set recommendations
      $customColorChoice.css('background', '#fff');  // reset to white to give a cool transition
      $customColorChoice.first().css('background', 'transparent'); // set to transparent
      $customColorChoice.eq(2).css('background', '#ffffff');
      $customColorChoice.last().css('background', '#000000');

      // slide background_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('show');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('show');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('show');
      $customizeTextColorRecommendations.addClass('show');
    }
  },

  customizeColorClick: function(e) {
    var self = this,
        colorInput = $(e.target).closest('.positionWrapper').find('.js-customizeColorInput'),
        colorKey = colorInput.attr('id'),
        newColor = this.model.get('page').profile[colorKey].slice(1),
        parent = $('.js-customizeColorRecommendations.show'),
        parentHeight = parent.height(),
        topPosition = parent.offset().top + parentHeight + 2;

    colorInput.colpick({
      layout: "rgbhex", //can also be full, or hex
      colorScheme: "dark", //can also be light
      submitText: "Submit",
      onShow: function() {
        var colorKey = $(this).attr('id');
        $(this).colpickSetColor(self.model.get('page').profile[colorKey].slice(1), true);
        $('.colpick').addClass('colpick-customizeColor show').css('top', topPosition);
      },
      onSubmit: function(hsb, hex, rgb, el, visible) {
        self.setCustomColor(hex, $(el).attr('id'));
        $(el).closest('.positionWrapper').find('.js-customizeColor').css('background-color', '#' + hex);
        if (visible) {
          $(el).colpickHide();
        }
      }
      /*
      onHide: function(){
         $('.customizeSecondaryColorRecommendations').hide();
         $('.colpick').removeClass('colpick-customizeColor');
      }
      */
    });
    colorInput.colpickSetColor(newColor, true);
    colorInput.colpickShow();
  },

  setCustomColor: function(newColor, colorKey) {
    var tempPage = __.clone(this.model.get('page'));
    tempPage.profile[colorKey] = '#'+newColor;
    this.model.set('page', tempPage);
    this.setCustomStyles();
  },

  uploadUserPageImage: function() {
    var self = this;
    //var formData = new FormData(this.$el.find('#userPageImageForm')[0]);
    var serverUrl = self.options.userModel.get('serverUrl'),
        imageURI = self.$el.find('#image-cropper').cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: false
        });

    if (imageURI){
      imageURI = imageURI.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
      var formData = new FormData();
      formData.append('image', imageURI);
      $.ajax({
        type: "POST",
        url: serverUrl + "upload_image",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: function (data) {
          var imageHash,
              tempPage;

          if (self.isRemoved()) return;

          if (data.success === true){
            imageHash = data.image_hashes[0] || [];
            if (imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && imageHash.length){
              tempPage = __.clone(self.model.get('page'));
              tempPage.profile.header = imageHash;
              self.model.set('page', tempPage);
              self.$el.find('.js-userPageBanner').css('background-image', 'url(' + serverUrl + "get_image?hash=" + imageHash + ')');
              self.saveUserPageModel();
            } else if (imageHash == "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
              app.simpleMessageModal.open({
                title: window.polyglot.t('errorMessages.saveError'),
                message: window.polyglot.t('errorMessages.serverError')
              });
            } else {
              app.simpleMessageModal.open({
                title: window.polyglot.t('errorMessages.saveError'),
                message: window.polyglot.t('errorMessages.serverError')
              });
            }
          } else if (data.success === false){
            app.simpleMessageModal.open({
              title: window.polyglot.t('errorMessages.serverError'),
              message: '<i>' + data.reason + '</i>'
            });
          }
        },
        error: function (jqXHR, status, errorThrown) {
          if (self.isRemoved()) return;
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    } else {
      self.saveUserPageModel();
    }
  },

  saveCustomizePageClick: function() {
    this.saveCustomizePage();
  },

  saveCustomizePage: function() {
    this.customizing = false;
    this.uploadUserPageImage();
    $('.js-bannerRangeInput').addClass('hide');
  },

  saveUserPageModel: function(){
    var self = this,
        formData = new FormData(),
        pageData = this.model.get('page').profile;

    for (var profileKey in pageData) {
      if (pageData.hasOwnProperty(profileKey)){
        //don't include nested objects in the form
        if (pageData[profileKey] !== 'object' && pageData[profileKey]){
          if (profileKey == 'background_color' || profileKey == 'primary_color' || profileKey == 'text_color' || profileKey == 'secondary_color'){
            //convert hex to decimal
            var profileColor = pageData[profileKey].slice(1);
            profileColor = is.hexColor(profileColor) ? parseInt(profileColor, 16) : profileColor;
            formData.append(profileKey, profileColor);
          } else if (profileKey == "header" || profileKey == "name" || profileKey == "location") {
            formData.append(profileKey, String(pageData[profileKey]));
          }
        }
      }
    }

    $.ajax({
      type: "POST",
      url: self.model.get('user').serverUrl + "profile",
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        data = JSON.parse(data);

        if (data.success === true){
          if (!self.isRemoved()) {
            self.setCustomStyles();
            self.setState(self.lastTab);
          }

          //refresh the universal profile model
          //self.globalUserProfile.fetch();
        } else if (data.success === false && !self.isRemoved()){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: '<i>' + data.reason + '</i>'
          });
        }
      },
      error: function(jqXHR, status, errorThrown){
        if (self.isRemoved()) return;

        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  cancelCustomizePage: function() {
    //refresh the current page
    Backbone.history.loadUrl();
  },

  saveNewDone: function(newHash) {
    this.setState('listing', newHash);
    this.fetchListings();

    this.editing = false;
  },

  cancelClick: function(){
    this.setState(this.lastTab);
    this.$obContainer.animate({ scrollTop: 0 });

    this.editing = false;
  },

  editItem: function(clone){
    this.renderItemEdit(true, clone);
    this.setControls("listingEdit");
    this.lastTab = "listingOld";
  },

  editItemClick: function(){
    this.editItem();
  },

  cloneItem: function(){
    this.editItem(true);
  },

  deleteItemClick: function(){
    this.deleteItem(true);
  },

  deleteItem: function(confirm, id){
    var self=this,
        deleteID = id || this.item.get('id');

    if (this.confirmDelete === false && confirm){
      this.$el.find('.js-deleteItem').addClass('confirm');
      this.confirmDelete = true;
    } else {
      $.ajax({
        type: "DELETE",
        url: self.model.get('user').serverUrl + "contracts/?id=" + deleteID,
        success: function () {
          if (self.isRemoved()) return;

          //destroy the model. Do it this way because the server can't accept a standard destroy call, and we don't want to call the server twice.
          if (self.item){
            self.item.trigger('destroy', self.item);
          }
          self.fetchListings();
          self.setState("store");
        },
        error: function (jqXHR, status, errorThrown) {
          if (self.isRemoved()) return;
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    }
  },

  saveItemClick: function() {
    this.saveItem();
  },

  saveItem: function(){
    if (this.itemEditView) {
      var $saveBtn = this.$('.js-saveItem');

      $saveBtn.addClass('loading');

      this.itemEditView.saveChanges().always(() => $saveBtn.removeClass('loading'))
      .fail(() => {
        var $firstErr = this.$('.js-itemEdit .invalid, .js-itemEdit :invalid').not('form').eq(0);

        $firstErr.length && $firstErr[0].scrollIntoViewIfNeeded();
      });
    }
  },

  createStore: function() {
    var storeWizardModel = new Backbone.Model();

    storeWizardModel.set(this.model.attributes);
    this.storeWizardView && this.storeWizardView.remove();
    this.storeWizardView = new storeWizardVw({
      model: storeWizardModel,
      socketView: this.socketView
    }).on('close', () => this.storeWizardView.remove())
      .render()
      .open();
    this.listenTo(this.storeWizardView, 'storeCreated', this.storeCreated);
    this.registerChild(this.storeWizardView);
  },

  storeCreated: function() {
    //recreate the entire page with the new data
    Backbone.history.loadUrl();
  },

  followUserClick: function(e){
    var $targ = $(e.target).closest('.js-follow');

    $targ.addClass('loading');
    this.followUser({'guid': this.pageID}).fail(() => {
      $targ.removeClass('loading');
    });
  },

  unfollowUserClick: function(e){
    var $targ = $(e.target).closest('.js-unfollow');

    if ($targ.hasClass('confirm')){
      $targ.addClass('loading').removeClass('confirm');
      this.unfollowUser({'guid': this.pageID}).fail(() => {
        $(e.target).removeClass('loading');
      });
    } else {
      $targ.addClass('confirm');
    }

  },

  addModeratorClick: function(e){
    var $targ = $(e.target).closest('.js-addmoderator'),
        self = this,
        modList = {};

    $targ.addClass('loading');

    modList.moderators = this.model.get('user').moderator_guids;
    modList.moderators.push(this.pageID);

    saveToAPI('', this.model.get('user'), this.model.get('user').serverUrl + "settings",
      function(){
        // confirmed
        self.options.userModel.fetch({
          success: function(model) {
            if (self.isRemoved()) return;
            self.model.set('user', model.toJSON());
            self.getIsModerator();
          }
        });
      }, '', modList, '', '').always(function(){
        $targ.removeClass('loading');
      });
  },

  removeModeratorClick: function(e){
    var $targ = $(e.target).closest('.js-removemoderator'),
        self = this,
        modList = {};

    if ($targ.hasClass('confirm')){
      $targ.addClass('loading').removeClass('confirm');

      modList.moderators = __.without(this.model.get('user').moderator_guids, self.pageID);

      saveToAPI('', this.model.get('user'), this.model.get('user').serverUrl + "settings",
        function(){
          // confirmed
          self.options.userModel.fetch({
            success: function(model) {
              if (self.isRemoved()) return;
              self.model.set('user', model.toJSON());
              self.getIsModerator();
            }
          });
        }, '', modList, '', '').always(function(){
          $targ.removeClass('loading');
        });
    } else {
      $targ.addClass('confirm');
    }

  },

  moreButtonsOwnPageClick: function(){
    var extBtn = $('.js-extraButtonsOwnPage'),
        moreExtBtn = $('.js-moreButtonsOwnPage');
    if (extBtn.hasClass('hide')){
      extBtn.removeClass('hide');
      moreExtBtn.html('x');
    } else {
      extBtn.addClass('hide');
      moreExtBtn.html('...');
    }
  },
  moreButtonsNotOwnPageClick: function(){
    var extBtn = $('.js-extraButtonsNotOwnPage'),
        moreExtBtn = $('.js-moreButtonsNotOwnPage');
    if (extBtn.hasClass('hide')){
      extBtn.removeClass('hide');
      moreExtBtn.html('x');
    } else {
      extBtn.addClass('hide');
      moreExtBtn.html('...');
    }
  },

  followUser: function(options){
    var self = this;

    return $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "follow",
      success: function() {
        if (self.isRemoved()) return;
        self.fetchFollowing();
      },
      error: function(jqXHR, status, errorThrown){
        if (self.isRemoved()) return;
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  unfollowUser: function(options){
    var self = this;

    return $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "unfollow",
      success: function() {
        if (self.isRemoved()) return;
        self.fetchFollowing();
      },
      error: function(jqXHR, status, errorThrown){
        if (self.isRemoved()) return;
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  sendMessage: function(){
    app.chatVw.openConversation(
      new userProfileModel(this.userProfile.get('profile'))
    );
  },

  showModeratorModal: function(){
    if (this.moderatorSettingsModal) {
      this.moderatorSettingsModal.open();
    } else {
      this.moderatorSettingsModal = new ModeratorSettingsModal({ model: this.model });
      this.registerChild(this.moderatorSettingsModal);
      this.moderatorSettingsModal.render()
        .on('close', () => {
          this.moderatorSettingsModal.remove();
          this.moderatorSettingsModal = null;
        }).open();
    }
  },

  changeModeratorStatus: function(status, fee){
    //set new moderator values without a fetch
    var tempPage = __.clone(this.model.get('page'));
    tempPage.profile.moderator = status;
    tempPage.profile.moderation_fee = fee;
    this.model.set('page', tempPage);

    //set button state without re-rendering
    if (status){
      this.$('.js-userPageEditModerator').removeClass('hide');
      this.$('.js-userPageBecomeModerator').addClass('hide');
    } else {
      this.$('.js-userPageEditModerator').addClass('hide');
      this.$('.js-userPageBecomeModerator').removeClass('hide');
    }
  },

  blockUserClick: function() {
    this.options.userModel.blockUser(this.userProfile.get('profile').guid);
    this.renderUserBlocked();
  },

  renderUserBlocked: function() {
    this.$('.js-unblock').removeClass('hide');
    this.$('.js-block').addClass('hide');
    this.hideThisUser('blocked');
  },

  unblockUserClick: function() {
    this.options.userModel.unblockUser(this.userProfile.get('profile').guid);
    this.renderUserUnblocked();
  },

  renderUserUnblocked: function() {
    this.$('.js-unblock').addClass('hide');
    this.$('.js-block').removeClass('hide');
  },

  hideThisUser: function(reason){
    this.hiddenWarningModal && this.hiddenWarningModal.remove();

    if (reason == 'blocked') {
      this.hiddenWarningModal = new HiddenWarningModal();
      this.registerChild(this.hiddenWarningModal);
      this.hiddenWarningModal.render()
        .open()
        .on('showPage', () => {
          this.hiddenWarningModal.remove();
          this.needsBlockedWarning = false;
          this.needsNSFWWarning && this.hideThisUser('nsfw');
        });
    } else if (reason == 'nsfw') {
      this.hiddenWarningModal = new HiddenWarningModal({
        reason: 'nsfw'
      });
      this.registerChild(this.hiddenWarningModal);

      this.hiddenWarningModal.render()
        .open()
        .on('showPage', () => {
          this.hiddenWarningModal.remove();
          this.needsNSFWWarning = false;
          this.showNSFWContent = true;
          this.showNSFW = true;

          if (this.state == "listing") {
            this.renderItem(this.currentItemHash);
          }

          this.renderItems(this.cachedListings, true);
          this.needsBlockedWarning && this.hideThisUser('blocked');
        });
    }
  },

  remove: function(){
    // close colorbox to make sure the overlay doesnt remain open when going to a different page
    //$.colorbox.close();
    $('#obContainer').off('scroll', this.onScroll).removeClass('customizeUserPage ');

    pageVw.prototype.remove.apply(this, arguments);
  },

  trimUrl: function(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
  }

});

module.exports = UserPageVw;
