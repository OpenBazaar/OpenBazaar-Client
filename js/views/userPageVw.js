var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    colpicker = require('../utils/colpick.js'),
    cropit = require('../utils/jquery.cropit'),
    userProfileModel = require('../models/userProfileMd'),
    listingsModel = require('../models/listingsMd'),
    usersModel = require('../models/usersMd'),
    itemModel = require('../models/itemMd'),
    baseVw = require('./baseVw'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    itemVw = require('./itemVw'),
    itemEditVw = require('./itemEditVw'),
    messageModal = require('../utils/messageModal.js'),
    setTheme = require('../utils/setTheme.js'),
    sanitizeHTML = require('sanitize-html'),
    storeWizardVw = require('./storeWizardVw'),
    moderatorSettingsVw = require('./moderatorSettingsVw');

//create a default item because a new itemModel will be created with only flat attributes
var defaultItem = {
  "vendor_offer": {
    "signature": "",
    "listing": {
      "shipping": {
        "shipping_regions": [
          "UNITED_STATES"
        ],
        "est_delivery": {
          "international": "",
          "domestic": ""
        },
        "shipping_origin": "UNITED_STATES",
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
            "currency_code": "usd"
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
          "pubkeys": {
            "encryption": {
              "key": "",
              "signature": ""
            },
            "signing": {
              "key": "",
              "signature": ""
            },
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

var recommendedPrimaryColors = ['#4c877c','#dc6c7d','#ce738b','#3a4352','#80bbad','#106c88','#58a6ad','#90545d','#b53b4d','#6c9052','#89a4b3','#ffffff','#827341','#74b69e','#716e86','#935456','#929e8e','#9aa1a5','#d9d8c6'];

function shadeColor2(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

module.exports = baseVw.extend({

  classname: "userView",

  events: {
    'click .js-aboutTab': 'aboutClick',
    'click .js-followersTab': 'followersClick',
    'click .js-followingTab': 'followingClick',
    'click .js-storeTab': 'storeTabClick',
    'click .js-returnToStore': 'storeClick',
    'click .js-returnToStoreCategory': 'storeCatClick',
    'click .js-sellItem': 'sellItem',
    'click .js-customize': 'customizePage',
    'click .js-editItem': 'editItem',
    'click .js-deleteItem': 'deleteItemClick',
    'click .js-cancelItem': 'cancelClick',
    'click .js-saveItem': 'saveItem',
    'click .js-saveCustomization': 'saveCustomizePage',
    'click .js-cancelCustomization': 'cancelCustomizePage',
    'click .js-createStore': 'createStore',
    'click .js-follow': 'followUserClick',
    'click .js-unfollow': 'unfollowUserClick',
    'click .js-message': 'sendMessage',
    'click .js-moderatorSettings': 'showModeratorModal',
    'click .js-customizeSecondaryColor': 'displayCustomizeSecondaryColor',
    'click .js-customizePrimaryColor': 'displayCustomizePrimaryColor',
    'click .js-customizeBackgroundColor': 'displayCustomizeBackgroundColor',
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
    'change .js-categories': 'categoryChanged'
  },

  initialize: function (options) {
    "use strict";

    var self = this;
    this.options = options || {};
    /* expected options are:
    userModel: this is set by app.js, then by a call to the settings API.
    userProfile: this is set by app.js, it is not the same as the page's userProfile, it belongs to the current user
    userID: if userID is in the route, it is set here
    state: if state is in the route, it is set here
    itemHash: if itemHash is in the route, it is set here
     */
    //if userID was passed by router, set it as pageID
    this.pageID = options.userID;
    //set view's userID from the userModel;
    this.userID = options.userModel.get('guid');
    this.userProfileFetchParameters = {};
    this.itemFetchParameters = {};
    this.subViews = [];
    this.subModels = [];
    this.model = new Backbone.Model();
    this.globalUserProfile = options.userProfile;
    this.userProfile = new userProfileModel();
    //models have to be passed the dynamic URL
    this.userProfile.urlRoot = options.userModel.get('serverUrl') + "profile";
    this.listings = new listingsModel();
    this.listings.urlRoot = options.userModel.get('serverUrl') + "get_listings";
    this.followers = new usersModel();
    this.followers.urlRoot = options.userModel.get('serverUrl') + "get_followers";
    this.following = new usersModel();
    this.following.urlRoot = options.userModel.get('serverUrl') + "get_following";
    this.subModels.push(this.userProfile, this.listings,this.followers, this.following);
    //store a list of the viewing user's followees. They will be different from the page followers if this is not their own page.
    this.ownFollowing = [];
    this.socketView = options.socketView;
    this.chatAppView = options.chatAppView;
    this.slimVisible = false;
    this.confirmDelete = false;
    this.state = this.options.state;
    this.lastTab = "about"; //track the last tab clicked
    //flag to hold state when customizing
    this.customizing = false;
    //hold changes to the page for undoing, such as custom colors
    this.undoCustomAttributes = {
      profile: {
        primary_color: "",
        secondary_color: "",
        text_color: "",
        background_color: ""
      }
    };

    //show loading modal before fetching user data
    $('.js-loadingModal').removeClass('hide');

    //listen to follow and unfollow events
    this.listenTo(window.obEventBus, "followUser", function(guid){
      this.followUser(guid);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(guid){
      this.unfollowUser(guid);
    });

    this.listenTo(window.obEventBus, "itemShortEdit", function(options){
      this.setItem(options.contract_hash, function(){
        self.editItem();
      });
    });

    this.listenTo(window.obEventBus, "itemShortDelete", function(options){
      this.setItem(options.contract_hash, function(){
        self.deleteItem();
      });
    });

    this.listenTo(window.obEventBus, "moderatorStatus", function(options){
      this.changeModeratorStatus(options.status, options.fee);
    });

    //determine if this is the user's own page or another profile's page
    //if no userID is passed in, or it matches the user's ID, then this is their page
    //sometimes it can be set to the string 'null', check for that too
    if(!this.pageID || this.pageID == this.userID || this.pageID == 'null'){
      //set page ID to be the user's own ID
      this.pageID = this.userID;
      this.options.ownPage = true;
    } else {
      this.options.ownPage = false;
      this.userProfileFetchParameters = $.param({'guid': this.pageID});
    }

    this.userProfile.fetch({
      data: self.userProfileFetchParameters,
      processData: true,
      timeout: 4000,
      success: function(model, response){
        //don't render if view has been closed and the $el has been deleted
        if (self.isRemoved()) return;

        if (response.profile){
          $('.js-loadingModal').addClass('hide');
          if (self.options.ownPage === true){
            model.set('headerURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').header_hash);
            model.set('avatarURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').avatar_hash);
          }else{
            model.set('headerURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').header_hash + "&guid=" + self.pageID);
            model.set('avatarURL', self.options.userModel.get('serverUrl') + "get_image?hash=" + model.get('profile').avatar_hash + "&guid=" + self.pageID);
          }
        }else{
          //model was returned as a blank object
          $('.js-loadingModal').addClass('hide');
          messageModal.show(window.polyglot.t('errorMessages.pageUnavailable'), window.polyglot.t('errorMessages.userError') + "<br/><br/>" + self.pageID);
          self.bindModalCloseHandler();
        }

        // Cache user avatar in localStorage
        var profile = model.toJSON().profile;
        window.localStorage.setItem("avatar_" + self.pageID, profile.avatar_hash);

        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
        self.model.set({ownPage: self.options.ownPage});
        self.render();
      },
      error: function(model, response){
        if (self.isRemoved()) return;

        $('.js-loadingModal').addClass('hide');
        messageModal.show(window.polyglot.t('errorMessages.pageUnavailable'), window.polyglot.t('errorMessages.userError') + "<br/><br/>" + self.pageID);
        self.bindModalCloseHandler();
        self.model.set({user: self.options.userModel.toJSON(), page: {profile: ""}});
        self.render();
      }
    });
  },

  bindModalCloseHandler: function(e) {
    if (this.modalCloseHandler) return;

    this.modalCloseHandler = function() {
      window.history.back();
    };

    messageModal.$el.find('.js-closeIndexModal')
      .one('click', this.modalCloseHandler);
  },

  render: function(){
    "use strict";
    var self = this;
    //make sure container is cleared
    $('#content').html(this.$el);
    loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.setCustomStyles();
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.subRender();
      //save state of the page
      self.undoCustomAttributes.background_color = self.model.get('page').profile.background_color;
      self.undoCustomAttributes.primary_color = self.model.get('page').profile.primary_color;
      self.undoCustomAttributes.secondary_color = self.model.get('page').profile.secondary_color;
      self.undoCustomAttributes.text_color = self.model.get('page').profile.text_color;
      self.setCustomStyles();
      self.setState(self.state, self.options.itemHash);
      self.$el.find('.js-externalLink').on('click', function(e){
        e.preventDefault();
        var extUrl = $(this).attr('href');
        if (!/^https?:\/\//i.test(extUrl)) {
          extUrl = 'http://' + extUrl;
        }
        require("shell").openExternal(extUrl);
      });

      self.$el.find('#image-cropper').cropit({
        smallImage: "stretch",
        maxZoom: 5,
        onFileReaderError: function(data){console.log(data);},
        onFileChange: function(){
          $('.js-headerLoading').removeClass('fadeOut');
          if(self.$el.find('#image-cropper').cropit('isZoomable')){
            $('.js-bannerRangeInput').removeClass('hide');
          }
        },
        onImageLoaded: function(){$('.js-headerLoading').addClass('fadeOut');},
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });

      $("#obContainer").scroll(function(){
        if ($(this).scrollTop() > 400 && self.slimVisible === false ) {
          self.slimVisible = true;
          $('.user-page-header-slim').addClass('textOpacity1').addClass('top70');
          $('.user-page-header').removeClass('shadow-inner1').addClass('zIndex4');
          $('.user-page-header .rowItem').hide();
          $('.user-page-navigation-buttons').addClass('positionFixed positionTop68');
        }
        if ($(this).scrollTop() < 400 && self.slimVisible === true ) {
          self.slimVisible = false;
          $('.user-page-header-slim').removeClass('top70');
          $('.user-page-header').addClass('shadow-inner1').removeClass('zIndex4');
          $('.user-page-header .rowItem').show();
          $('.user-page-navigation-buttons').removeClass('positionFixed positionTop68');
        }
      });

      var about = sanitizeHTML(self.model.get('page').profile.about, {
        allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u','ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote' ]
      });

      $('.js-userAbout').html(about);
    });

    return this;
  },

  setCustomStyles: function() {
    "use strict";
    var self = this,
        profile = this.model.get('page').profile;
    //only do the following if page has been set in the model
    if(profile){
      setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);

      //set custom color input values
      self.$el.find('.js-customizeColorInput').each(function(){
        var newColor = self.model.get('page').profile[$(this).attr('id')];
        $(this).val(newColor);
        $(this).closest('.positionWrapper').find('.js-customizeColor').css('background-color', newColor);
      });
    }
  },

  setState: function(state, hash) {
    "use strict";
    var currentAddress,
        addressState,
        currentHandle = this.model.get('page').profile.handle;

    if(state === "item"){
      //clear old templates
      this.$el.find('.js-list4').html("");
      this.renderItem(hash);
      $('#obContainer').scrollTop(352);
    }else if(state === "itemOld") {
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-item"));
      $('#obContainer').scrollTop(352);
    }else if(state === "itemNew"){
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
      $('#obContainer').scrollTop(352);
      this.addTabToHistory('newItem');
      this.sellItem();
    } else if(state === "createStore"){
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
      this.addTabToHistory('about');
      this.createStore();
    } else if(state === "customize"){
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
      this.addTabToHistory('about');
      this.customizePage();
    }else if(state){
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
    }else{
      //if no state was set
      if(this.userProfile.get('profile').vendor){
        state="store";
      } else {
        state="about";
      }
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
    }
    this.setControls(state);
    if(state != "customize" && state != this.state && state != "itemNew" && this.state != "itemNew"){
      this.lastTab = this.state;
      this.state = state;
    }

    //set address bar
    //taking out handle for now, since lookup by handle is not available yet
    /*
    if(currentHandle){
      currentAddress = currentHandle + "/" + state;
    } else {
      currentAddress = this.model.get('page').profile.guid + "/" + state;
    }
    */
    if(state == "itemOld" || state == "itemNew") {
      addressState = "item";
    } else {
      addressState = state;
    }
    currentAddress = this.model.get('page').profile.guid + "/" + addressState;
    if(addressState === "item" && hash) {
      currentAddress += "/"+ hash;
    } else if(addressState === "createStore"){
      currentAddress = this.model.get('page').profile.guid;
    }
    window.obEventBus.trigger("setAddressBar", currentAddress);
  },

  setControls: function(state){
    "use strict";
    //hide all the state controls
    this.$el.find('.js-userPageControls, #customizeControls, .js-itemCustomizationButtons, .js-pageCustomizationButtons').addClass('hide');
    this.$el.find('.js-deleteItem').removeClass('confirm');
    this.$el.find('.user-page-header-slim-bg-cover').removeClass('user-page-header-slim-bg-cover-customize');
    document.getElementById('obContainer').classList.remove("box-borderDashed");
    document.getElementById('obContainer').classList.remove("noScrollBar");
    document.getElementById('obContainer').classList.remove("overflowHidden");
    //unhide the ones that are needed
    if(this.options.ownPage === true) {
      if(state === "item" || state === "itemOld") {
        this.$el.find('.js-itemButtons').removeClass('hide');
      } else if(state === "itemEdit" || state === "itemNew") {
        this.$el.find('.js-itemEditButtons').removeClass('hide');
      } else if(state === "customize") {
        this.$el.find('.js-pageCustomizationButtons').removeClass('hide');
        this.$el.find('#customizeControls').removeClass('hide');
        this.$el.find('.user-page-header-slim-bg-cover').addClass('user-page-header-slim-bg-cover-customize');
        document.getElementById('obContainer').classList.add("box-borderDashed");
        document.getElementById('obContainer').classList.add("noScrollBar");
        document.getElementById('obContainer').classList.add("overflowHidden");
      } else {
        this.$el.find('.js-pageButtons').removeClass('hide');
      }
      //if store has been created, swap create button for sell button
      if(this.model.get('page').profile.vendor === true) {
        this.$el.find('.js-sellItem').removeClass('hide');
        this.$el.find('.js-createStore').addClass('hide');
      } else {
        this.$el.find('.js-sellItem').addClass('hide');
        this.$el.find('.js-createStore').removeClass('hide');
      }
    }else{
      this.$el.find('.js-notOwnPageButtons').removeClass('hide');
    }
  },

  setCategory: function(category) {
    var $select;

    if (category) {
      $select = this.$el.find('.js-categories');

      if ($select.val() !== category && $select.find('option[value="' + category + '"]').length) {
        $select.val(category);
        this.categoryChanged();
      }
    }
  },

  categoryChanged: function() {
    this.renderItems(this.listings.get('listings'));
  },

  toggleFollowButtons: function(followed) {
    "use strict";
    var followBtn = this.$el.find('.js-follow'),
        unfollowBtn = this.$el.find('.js-unfollow');
    if(followed === true){
      followBtn.addClass('hide');
      unfollowBtn.removeClass('hide');
    } else {
      followBtn.removeClass('hide');
      unfollowBtn.addClass('hide');
    }
  },

  subRender: function() {
    "use strict";
    var self = this;
    this.listings.fetch({
      data: self.userProfileFetchParameters,
      timeout: 5000,
      success: function(model){
        if (self.isRemoved()) return;
        self.renderItems(model.get('listings'));
      },
      error: function(model, response){
        if (self.isRemoved()) return;
        messageModal.show(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Items'));
      }
    });
    this.following.fetch({
      data: self.userProfileFetchParameters,
      timeout: 5000,
      success: function(model){
        if (self.isRemoved()) return;

        if(self.options.ownPage === true){
          self.ownFollowing = model.get('following') || [];
          self.ownFollowing = self.ownFollowing.map(function(followingObject){
            var followingGuid = followingObject.guid;
            return followingGuid;
          });
          self.renderFollowing(model.get('following'));
          //call followers 2nd so list of following is available
          self.fetchFollowers();
        } else {
          $.ajax({
            url: self.options.userModel.get('serverUrl') + "get_following",
            dataType: "json",
            timeout: 4000
          }).done(function(ownFollowingData){
            if (self.isRemoved()) return;
            self.ownFollowing = ownFollowingData.following || [];
            self.ownFollowing = self.ownFollowing.map(function(followingObject){
              var followingGuid = followingObject.guid;
              return followingGuid;
            });
            self.renderFollowing(model.get('following'));
            //call followers 2nd so list of following is available
            self.fetchFollowers();
          }).fail(function(jqXHR, status, errorThrown){
            if (self.isRemoved()) return;
            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
          });
        }
      },
      error: function(model, response){
        if (self.isRemoved()) return;
        messageModal.show(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Following'));
      }
    });
  },

  fetchFollowers: function(){
    var self = this;

    this.followers.fetch({
      data: self.userProfileFetchParameters,
      timeout: 5000,
      success: function(model){
        var followerArray = model.get('followers');

        if (self.isRemoved()) return;

        self.renderFollowers(followerArray);
        //if this is not their page, see if they are being followed
        if(self.options.ownPage === false){
          self.toggleFollowButtons(Boolean(__.findWhere(followerArray, {guid: self.userID})));
        }
      },
      error: function(model, response){
        if (self.isRemoved()) return;
        messageModal.show(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Followers'));
      }
    });
  },

  renderItems: function (model) {
    "use strict";
    
    var self = this;
    var select = this.$el.find('.js-categories');
    model = model || [];
    __.each(model, function (arrayItem) {
      arrayItem.userCurrencyCode = self.options.userModel.get('currency_code');
      arrayItem.serverUrl = self.options.userModel.get('serverUrl');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = self.model.get('page').profile.avatar_hash;
      arrayItem.handle = self.model.get('page').profile.handle;
      arrayItem.userID = self.pageID;
      arrayItem.ownPage = self.options.ownPage;
      if (arrayItem.category != "" && self.$el.find('.js-categories option[value="' + arrayItem.category + '"]').length == 0){
        var opt = document.createElement('option');
        opt.value = arrayItem.category;
        opt.innerHTML = arrayItem.category;
        select.append(opt);
      }
      if(self.options.ownPage === true){
        arrayItem.imageURL = self.options.userModel.get('serverUrl')+"get_image?hash="+arrayItem.thumbnail_hash;
      } else {
        arrayItem.imageURL = self.options.userModel.get('serverUrl')+"get_image?hash="+arrayItem.thumbnail_hash+"&guid="+self.pageID;
      }
    });
    this.itemList = new itemListView({
      model: model, 
      el: '.js-list3', 
      title: window.polyglot.t('NoListings'), 
      message: "",
      userModel: this.options.userModel, 
      category: this.$el.find('.js-categories').val()
    });
    this.subViews.push(this.itemList);

    this.$('.js-listingCount').html(model.length);

    if (model.length) {
      new window.List('searchStore', {valueNames: ['js-searchTitle'], page: 1000});
    }
  },

  renderFollowers: function (model) {
    "use strict";

    model = model || [];
    this.followerList = new personListView({
      model: model,
      el: '.js-list1',
      title: window.polyglot.t('NoFollowers'),
      message: "",
      ownFollowing: this.ownFollowing,
      hideFollow: true,
      serverUrl: this.options.userModel.get('serverUrl')
    });
    this.subViews.push(this.followerList);

    this.$('.js-userFollowerCount').html(model.length);

    if (model.length) {
      new window.List('searchFollowers', {valueNames: ['js-searchName', 'js-searchHandle'], page: 1000});
    }
  },

  renderFollowing: function (model) {
    "use strict";

    model = model || [];
    this.followingList = new personListView({
      model: model,
      followed: true,
      el: '.js-list2',
      title: window.polyglot.t('NotFollowingAnyone'),
      message: "",
      ownFollowing: this.ownFollowing,
      hideFollow: true,
      serverUrl: this.options.userModel.get('serverUrl')
    });
    this.subViews.push(this.followingList);
    
    this.$('.js-userFollowingCount').html(model.length);
      
    if (model.length) {
      new window.List('searchFollowing', {valueNames: ['js-searchName', 'js-searchHandle'], page: 1000});
    }
  },

  setItem: function(hash, onSucceed){
    "use strict";
    var self = this;
    this.item = new itemModel({
      userCurrencyCode: self.options.userModel.get('currency_code'),
      userCountry: self.options.userModel.get('country'),
      serverUrl: self.options.userModel.get('serverUrl'),
      showAvatar: false,
      avatar_hash: self.model.get('page').profile.avatar_hash,
      handle: self.model.get('page').profile.handle,
      ownPage: self.options.ownPage,
      itemHash: hash,
      user: self.model.get('user'),
      page: self.model.get('page'),
    });
    this.item.urlRoot = this.options.userModel.get('serverUrl')+"contracts";
    //remove old item before rendering
    if(this.itemView){
      this.itemView.undelegateEvents();
    }
    this.itemView = new itemVw({model:this.item, el: '.js-list4', userModel: self.options.userModel, socketView: this.socketView});
    this.subViews.push(this.itemView);
    //set the parameters for the fetch
    if(this.options.ownPage === true){
      this.itemFetchParameters = $.param({'id': hash});
    } else {
      this.itemFetchParameters = $.param({'id': hash, 'guid': this.pageID});
    }
    this.item.fetch({
      data: self.itemFetchParameters,
      timeout: 4000,
      success: function(model, response){
        if (self.isRemoved()) return;

        //set id after fetch, otherwise Backbone includes it in the fetch url
        model.set('id', hash);
        if (self.options.ownPage === false){
          model.set('imageExtension', "&guid=" + model.get('vendor_offer').listing.id.guid);
        }
        //model may arrive empty, set this flag to trigger a change event
        model.set({fetched: true});
        onSucceed(model, response);
      },
      error: function(model, response){
        if (self.isRemoved()) return;
        messageModal.show(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Item'));
      }
    });
  },

  renderItem: function(hash){
    "use strict";
    var self = this;
    this.setItem(hash, function(model, response) {
          if (response.vendor_offer){
            self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-item'));
          }else{
            messageModal.show(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Item'));
            window.history.back();
          }
        }
    );
  },

  renderItemEdit: function(model){
    "use strict";
    var self = this,
        hash = "";
    if(model) {
      //if editing existing product, clone the model
      this.itemEdit = model.clone();
    } else {
      defaultItem.serverUrl =self.options.userModel.get('serverUrl');
      defaultItem.userCountry = self.options.userModel.get('country');
      defaultItem.userCurrencyCode = self.options.userModel.get('currency_code');
      defaultItem.vendor_offer.listing.item.price_per_unit.fiat.currency_code =self.options.userModel.get('currency_code');
      defaultItem.vendor_offer.listing.id.guid = self.model.get('page').profile.guid;
      this.itemEdit = new itemModel(defaultItem);
    }
    //add the moderator list to the item model
    this.itemEdit.set('moderators', self.model.get('user').moderators);
    //unbind any old view
    if(this.itemEditView){
      this.itemEditView.undelegateEvents();
    }
    this.itemEditView = new itemEditVw({model:this.itemEdit, el: '.js-list5'});
    this.listenTo(this.itemEditView, 'saveNewDone', this.saveNewDone);
    this.listenTo(this.itemEditView, 'deleteOldDone', this.deleteOldDone);
    this.subViews.push(this.itemEditView);
    this.subModels.push(this.itemEdit);
    self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-itemEdit'));
  },

  aboutClick: function(e){
    "use strict";
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-about'));
    this.addTabToHistory('about');
    this.setState('about');
  },

  followersClick: function(e){
    "use strict";
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-followers'));
    this.addTabToHistory('followers');
    this.setState('followers');
    // $('#inputFollowers').focus();
  },

  followingClick: function(e){
    "use strict";
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-following'));
    this.addTabToHistory('following');
    this.setState('following');
    // $('#inputFollowing').focus();
  },

  storeClick: function(e){
    "use strict";

    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
    this.addTabToHistory('store');
    this.setState('store');
    // $('#inputStore').focus();
  },

  storeTabClick: function(e) {
    if (this.$el.find('.js-categories').val() != "all"){
        $(".js-categories option[value='all']").attr("selected", "selected");
        this.categoryChanged();
    }

    this.storeClick(e);    
  },

  storeCatClick: function(e) {
    this.setCategory($(e.target).text());
    this.storeClick(e);
  },

  tabClick: function(activeTab, showContent){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  addTabToHistory: function(state){
    "use strict";
    //add action to history if not an item
    Backbone.history.navigate('#userPage/'+this.model.get('page').profile.guid + "/" + state);
  },

  sellItem: function(){
    "use strict";
    this.renderItemEdit();
    this.setControls("itemEdit");
  },

  customizePage: function(){
    "use strict";
    this.customizing = true;
    this.setControls('customize');
    $('.user-page-content').addClass('pull-up4');
    $('.user-page-header').addClass('shadow-inner1-strong');
    $('#obContainer').animate({ scrollTop: "0" });
  },

  hideColorRecommendations: function(e) {
    "use strict";
    $('.js-customizeColorRecommendations').removeClass('width270');
  },

  clickCustomColorChoice: function(e) {
    "use strict";
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
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    if ( !$(e.currentTarget).hasClass('js-customColorChoicePicker') ){
      this.hideColorRecommendations();
      $('.colpick').removeClass('show');
    }
  },

  displayCustomizePrimaryColor: function(e) {
    "use strict";

    $('#primary_color').colpickHide();

    if(this.$el.find('.customizePrimaryColorRecommendations').hasClass('width270')){
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('width270');
    }else{
      $('.seeTooltip').hide();

      // set recommendations
      this.$el.find('.customColorChoice').css('background','#fff'); // reset to white to give a cool transition
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:first').css('background','transparent'); // set to transparent
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:nth-child(2)').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:nth-child(3)').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:nth-child(4)').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:nth-child(5)').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:nth-child(6)').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start
      this.$el.find('.customizePrimaryColorRecommendations .customColorChoice:last').css('background', recommendedPrimaryColors[Math.floor(Math.random() * recommendedPrimaryColors.length)]); // random colors to start

      // slide background_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').addClass('width270');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('width270');
      this.$el.find('.customizeTextColorRecommendations').removeClass('width270');
    }
  },

  displayCustomizeSecondaryColor: function(e) {
    "use strict";
    var primaryColor = this.model.get('page').profile.primary_color;

    $('#secondary_color').colpickHide();

    if(this.$el.find('.customizeSecondaryColorRecommendations').hasClass('width270')){
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('width270');
    }else{
      // set recommendations
      this.$el.find('.customColorChoice').css('background','#fff');  // reset to white to give a cool transition
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:first').css('background','transparent'); // set to transparent
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:nth-child(2)').css('background', shadeColor2(primaryColor, -0.25)); // 20% lighter than primary_color
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:nth-child(3)').css('background', shadeColor2(primaryColor, -0.15)); // 15% lighter than primary_color
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:nth-child(4)').css('background', shadeColor2(primaryColor, -0.1)); // 10% lighter than primary_color
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:nth-child(5)').css('background', shadeColor2(primaryColor, 0.1)); // 10% darker than primary_color
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:nth-child(6)').css('background', shadeColor2(primaryColor, 0.15)); // 15% darker than primary_color
      this.$el.find('.customizeSecondaryColorRecommendations .customColorChoice:last').css('background', shadeColor2(primaryColor, 0.20)); // 25% darker than primary_color

      // slide secondary_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeSecondaryColorRecommendations').addClass('width270');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('width270');
      this.$el.find('.customizeTextColorRecommendations').removeClass('width270');
    }

  },

  displayCustomizeBackgroundColor: function(e) {
    "use strict";
    var secondaryColor = this.model.get('page').profile.secondary_color;

    $('#background_color').colpickHide();

    if(this.$el.find('.customizeBackgroundColorRecommendations').hasClass('width270')){
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('width270');
    }else{
      // set recommendations
      this.$el.find('.customColorChoice').css('background','#fff'); // reset to white to give a cool transition
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:first').css('background','transparent'); // set to transparent
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:nth-child(2)').css('background', shadeColor2(secondaryColor, -0.70)); // 70% darker than primary_color
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:nth-child(3)').css('background', shadeColor2(secondaryColor, -0.65)); // 65% darker than primary_color
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:nth-child(4)').css('background', shadeColor2(secondaryColor, -0.55)); // 55% darker than primary_color
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:nth-child(5)').css('background', shadeColor2(secondaryColor, -0.45)); // 45% darker than primary_color
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:nth-child(6)').css('background', shadeColor2(secondaryColor, -0.35)); // 35% darker than primary_color
      this.$el.find('.customizeBackgroundColorRecommendations .customColorChoice:last').css('background', shadeColor2(secondaryColor, -0.25)); // 25% darker than primary_color

      // slide background_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeBackgroundColorRecommendations').addClass('width270');
      this.$el.find('.customizeTextColorRecommendations').removeClass('width270');
    }
  },

  displayCustomizeTextColor: function(e) {
    "use strict";

    $('#text_color').colpickHide();

    if(this.$el.find('.customizeTextColorRecommendations').hasClass('width270')){
      this.$el.find('.customizeTextColorRecommendations').removeClass('width270');
    }else{
      // set recommendations
      this.$el.find('.customColorChoice').css('background','#fff');  // reset to white to give a cool transition
      this.$el.find('.customizeTextColorRecommendations .customColorChoice:first').css('background','transparent'); // set to transparent
      this.$el.find('.customizeTextColorRecommendations .customColorChoice:nth-child(2)').css('background', '#ffffff'); 
      this.$el.find('.customizeTextColorRecommendations .customColorChoice:last').css('background', '#000000');

      // slide background_color recommendations out + hide others
      this.$el.find('.customizePrimaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeSecondaryColorRecommendations').removeClass('width270');
      this.$el.find('.customizeBackgroundColorRecommendations').removeClass('width270');
      this.$el.find('.customizeTextColorRecommendations').addClass('width270');
    }
  },

  customizeColorClick: function(e) {
    "use strict";

    var self = this,
        colorInput = $(e.target).closest('.positionWrapper').find('.js-customizeColorInput'),
        colorKey = colorInput.attr('id'),
        newColor = this.model.get('page').profile[colorKey].slice(1),
        parent = $('.js-customizeColorRecommendations.width270'),
        parentHeight = parent.height(),
        topPosition = parent.offset().top + parentHeight + 2;

    colorInput.colpick({
      layout: "rgbhex", //can also be full, or hex
      colorScheme: "dark", //can also be light
      submitText: "Submit",
      onShow: function(el) {
        var colorKey = $(this).attr('id');
        $(this).colpickSetColor(self.model.get('page').profile[colorKey].slice(1), true);
        $('.colpick').addClass('colpick-customizeColor show').css('top', topPosition);
      },
      onSubmit: function(hsb, hex, rgb, el, visible) {
        self.setCustomColor(hex, $(el).attr('id'));
        $(el).closest('.positionWrapper').find('.js-customizeColor').css('background-color', '#' + hex);
        if(visible) {
          $(el).colpickHide();
        }
      },
      onHide: function(){
        // $('.customizeSecondaryColorRecommendations').hide();
        // $('.colpick').removeClass('colpick-customizeColor');
      }
    });
    colorInput.colpickSetColor(newColor, true);
    colorInput.colpickShow();
  },

  setCustomColor: function(newColor, colorKey) {
    "use strict";
    var tempPage  =  __.clone(this.model.get('page'));
    tempPage.profile[colorKey] = '#'+newColor;
    this.model.set('page', tempPage);
    this.setCustomStyles();
  },

  uploadUserPageImage: function() {
    "use strict";
    var self = this;
    //var formData = new FormData(this.$el.find('#userPageImageForm')[0]);
    var serverUrl = self.options.userModel.get('serverUrl'),
        imageURI = self.$el.find('#image-cropper').cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: false
        });

    if(imageURI){
      imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
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
            }else if (imageHash == "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
              messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.serverError'));
            }else{
              messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.serverError'));
            }
          }else if (data.success === false){
            messageModal.show(window.polyglot.t('errorMessages.serverError'), "<i>" + data.reason + "</i>");
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

  saveCustomizePage: function() {
    "use strict";
    this.customizing = false;
    this.uploadUserPageImage();
    $('.js-bannerRangeInput').addClass('hide');
  },

  saveUserPageModel: function(){
    "use strict";
    var self = this,
        formData = new FormData(),
        pageData = this.model.get('page').profile;

    for(var profileKey in pageData) {
      if(pageData.hasOwnProperty(profileKey)){
        //don't include nested objects in the form
        if(pageData[profileKey] !== 'object' && pageData[profileKey]){
          if(profileKey == 'background_color' || profileKey == 'primary_color' || profileKey == 'text_color' || profileKey == 'secondary_color'){
            //convert hex to decimal
            var profileColor = pageData[profileKey].slice(1);
            profileColor = is.hexColor(profileColor) ? parseInt(profileColor, 16) : profileColor;
            formData.append(profileKey, profileColor);
          } else if(profileKey == "header" || profileKey == "name" || profileKey == "location") {
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

        if(data.success === true){
          if (!self.isRemoved()) {
            self.setCustomStyles();
            self.setState(self.lastTab);
          }

          //refresh the universal profile model
          self.globalUserProfile.fetch();
        }else if(data.success === false && !self.isRemoved()){
          messageModal.show(window.polyglot.t('errorMessages.serverError'), "<i>" + data.reason + "</i>");
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
    "use strict";
    //this.undoColorCustomization();
    //this.setControls();
    //refresh the current page
    Backbone.history.loadUrl();
  },

  saveNewDone: function(newHash) {
    "use strict";
    this.setState('item', newHash);
    this.subRender();
  },

  deleteOldDone: function(newHash) {
    "use strict";
    if(newHash) {
      this.setState('item', newHash);
      this.subRender();
    } else {
      this.tabClick($('.js-storeTab'), this.$el.find('.js-store'));
      this.addTabToHistory('store');
      this.setState('store');
    }
  },

  cancelClick: function(){
    "use strict";
    this.setState(this.lastTab);
    $('#obContainer').animate({ scrollTop: 0 });
  },

  editItem: function(){
    "use strict";
    this.renderItemEdit(this.item);
    this.setControls("itemEdit");
    this.lastTab = "itemOld";
  },

  deleteItemClick: function(){
    "use strict";
    this.deleteItem(true);
  },

  deleteItem: function(confirm){
    "use strict";
    var self=this;

    if(this.confirmDelete === false && confirm){
      this.$el.find('.js-deleteItem').addClass('confirm');
      this.confirmDelete = true;
    } else {
      $.ajax({
        type: "DELETE",
        url: self.item.get('serverUrl') + "contracts/?id=" + self.item.get('id'),
        success: function () {
          if (self.isRemoved()) return;

          //destroy the model. Do it this way because the server can't accept a standard destroy call, and we don't want to call the server twice.
          self.item.trigger('destroy', self.item);
          self.subRender();
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

  saveItem: function(){
    "use strict";
    if(this.itemEditView){
      this.itemEditView.saveChanges();
    }
  },

  createStore: function() {
    "use strict";
    var self = this,
        storeWizardModel = new Backbone.Model();
    storeWizardModel.set(this.model.attributes);
    this.storeWizardView = new storeWizardVw({model:storeWizardModel, parentEl: '#modalHolder', socketView: this.socketView});
    this.listenTo(this.storeWizardView, 'storeCreated', this.storeCreated);
    this.subViews.push(this.storeWizardView);
    this.subModels.push(storeWizardModel);
  },

  storeCreated: function() {
    "use strict";
    //recreate the entire page with the new data
    Backbone.history.loadUrl();
  },

  followUserClick: function(){
    this.followUser({'guid': this.pageID});
  },

  unfollowUserClick: function(){
    this.unfollowUser({'guid': this.pageID});
  },

  followUser: function(options){
    "use strict";
    var self = this;

    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "follow",
      success: function(data) {
        if (self.isRemoved()) return;
        self.subRender();
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
    "use strict";
    var self = this;
    
    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "unfollow",
      success: function() {
        if (self.isRemoved()) return;
        self.subRender();
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
    "use strict";
    var key = this.userProfile.get('profile').encryption_key;
    var guid = this.userProfile.get('profile').guid;
    window.obEventBus.trigger("openChat", guid, key);
  },

  showModeratorModal: function(){
    "use strict";
    var self = this,
        moderatorSettingsModel = new Backbone.Model();
    moderatorSettingsModel.set(this.model.attributes);
    this.moderatorSettingsView = new moderatorSettingsVw({model:moderatorSettingsModel, parentEl: '#modalHolder'});
    this.subViews.push(this.moderatorSettingsView);
    this.subModels.push(moderatorSettingsModel);
  },

  changeModeratorStatus: function(status, fee){
    "use strict";
    //set new moderator values without a fetch
    var tempPage = __.clone(this.model.get('page'));
    tempPage.profile.moderator = status;
    tempPage.profile.moderation_fee = fee;
    this.model.set('page', tempPage);

    //set button state without re-rendering
    if(status){
      this.$('.js-userPageEditModerator').removeClass('hide');
      this.$('.js-userPageBecomeModerator').addClass('hide');
    } else {
      this.$('.js-userPageEditModerator').addClass('hide');
      this.$('.js-userPageBecomeModerator').removeClass('hide');
    }
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

    // close colorbox to make sure the overlay doesnt remain open when going to a different page
    $.colorbox.close();
    messageModal.$el.off('click', this.modalCloseHandler);
  }

});
