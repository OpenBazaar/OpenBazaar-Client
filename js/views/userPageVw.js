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
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    itemVw = require('./itemVw'),
    itemEditVw = require('./itemEditVw'),
    showErrorModal = require('../utils/showErrorModal.js'),
    setTheme = require('../utils/setTheme.js'),
    storeWizardVw = require('./storeWizardVw');

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

module.exports = Backbone.View.extend({

  classname: "userView",

  events: {
    'click .js-aboutTab': 'aboutClick',
    'click .js-followersTab': 'followersClick',
    'click .js-followingTab': 'followingClick',
    'click .js-storeTab': 'storeClick',
    'click .js-returnToStore': 'storeClick',
    'click .js-sellItem': 'sellItem',
    'click .js-customize': 'customizePage',
    'click .js-editItem': 'editItem',
    'click .js-deleteItem': 'deleteItem',
    'click .js-cancelItem': 'cancelClick',
    'click .js-saveItem': 'saveItem',
    'click .js-saveCustomization': 'saveCustomizePage',
    'click .js-cancelCustomization': 'cancelCustomizePage',
    'click .js-customizeColor': 'customizeColorClick',
    'click .js-createStore': 'createStore',
    'click .js-follow': 'followUser',
    'click .js-unfollow': 'unfollowUser',
    'click .js-message': 'sendMessage',
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
    this.socketView = options.socketView;
    this.chatAppView = options.chatAppView;
    this.slimVisible = false;
    this.confirmDelete = false;
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
      timeout: 10000,
      success: function(model, response){
        //don't render if view has been closed and the $el has been deleted
        if(self.$el){
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
            showErrorModal(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.userError') + "<br/><br/>" + self.pageID);
          }

          // Cache user avatar in localStorage
          var profile = model.toJSON().profile;
          window.localStorage.setItem("avatar_" + self.pageID, profile.avatar_hash);

          self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
          self.model.set({ownPage: self.options.ownPage});
          self.render();
        }
      },
      error: function(model, response){
        $('.js-loadingModal').addClass('hide');
        showErrorModal(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.userError') + "<br/><br/>" + self.pageID);
        self.model.set({user: self.options.userModel.toJSON(), page: {profile: ""}});
        self.render();
      }
    });
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
      self.setState(self.options.state, self.options.itemHash);
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

    //clear old templates
    this.$el.find('.js-list4').html("");

    if(state === "item"){
      this.renderItem(hash);
      $('#obContainer').scrollTop(352);
    }else if(state === "itemOld") {
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-item"));
      $('#obContainer').scrollTop(352);
    }else if(state === "itemNew"){
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
      $('#obContainer').scrollTop(352);
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
      //if no state was set for some reason
      state="store";
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
    }
    this.setControls(state);
    if(state !== "customize"){
      this.lastTab = state;
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
    if(addressState === "item") {
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
    document.getElementById('obContainer').classList.remove("box-borderDashed");
    //unhide the ones that are needed
    if(this.options.ownPage === true) {
      if(state === "item" || state === "itemOld") {
        this.$el.find('.js-itemButtons').removeClass('hide');
      } else if(state === "itemEdit") {
        this.$el.find('.js-itemEditButtons').removeClass('hide');
      } else if(state === "customize") {
        this.$el.find('.js-pageCustomizationButtons').removeClass('hide');
        this.$el.find('#customizeControls').removeClass('hide');
        document.getElementById('obContainer').classList.add("box-borderDashed");
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
      success: function(model){
        self.renderItems(model.get('listings'));
      },
      error: function(model, response){
        showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Items'));
      }
    });
    this.followers.fetch({
      data: self.userProfileFetchParameters,
      success: function(model){
        var followerArray = model.get('followers');
        self.renderFollowers(followerArray);
        //if this is not their page, see if they are being followed
        if(self.options.ownPage === false){
          self.toggleFollowButtons(Boolean(__.findWhere(followerArray, {guid: self.userID})));
        }
      },
      error: function(model, response){
        showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Followers'));
      }
    });
    this.following.fetch({
      data: self.userProfileFetchParameters,
      success: function(model){
        self.renderFollowing(model.get('following'));
      },
      error: function(model, response){
        showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Following'));
      }
    });
  },

  renderItems: function (model) {
    "use strict";
    var self = this;
    var select = this.$el.find('.js-categories');
    __.each(model, function (arrayItem) {
      arrayItem.userCurrencyCode = self.options.userModel.get('currency_code');
      arrayItem.serverUrl = self.options.userModel.get('serverUrl');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = self.model.get('page').profile.avatar_hash;
      arrayItem.handle = self.model.get('page').profile.handle;
      arrayItem.userID = self.pageID;
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
    this.itemList = new itemListView({model: model, el: '.js-list3', userModel: this.options.userModel, category: this.$el.find('.js-categories').val()});
    this.subViews.push(this.itemList);
  },

  renderFollowers: function (model) {
    "use strict";
    this.followerList = new personListView({model: model, el: '.js-list1', title: "No followers", message: "", serverUrl: this.options.userModel.get('serverUrl')});
    this.subViews.push(this.followerList);
  },

  renderFollowing: function (model) {
    "use strict";
    this.followingList = new personListView({model: model, el: '.js-list2', title: "Not following anyone", message: "", serverUrl: this.options.userModel.get('serverUrl')});
    this.subViews.push(this.followingList);
  },

  renderItem: function(hash){
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
      //this.itemView.remove();
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
      timeout: 5000,
      success: function(model, response){
        if(response.vendor_offer){
          self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-item'));
          //set id after fetch, otherwise Backbone includes it in the fetch url
          model.set('id', hash);
          if(self.options.ownPage === false){
            model.set('imageExtension', "&guid="+model.get('vendor_offer').listing.id.guid);
          }
          //model may arrive empty, set this flag to trigger a change event
          model.set({fetched: true});
        } else {
          showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Item'));
          window.history.back();
        }
      },
      error: function(model, response){
        console.log("Fetch of itemModel from userPageView has failed");
        if(response.statusText){
          showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Item'));
        } else {
          showErrorModal(window.polyglot.t('errorMessages.notFoundError'), window.polyglot.t('Item'));
        }
      }
    });
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
    this.itemEdit.set('moderator_list', self.model.get('page').profile.moderator_list);
    //this.itemEdit.urlRoot = this.options.userModel.get('serverUrl')+"contracts";
    //add the user information
    //this.itemEdit.set({user: self.options.userModel.toJSON()});
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
    if (this.$el.find('.js-categories').val() != "all"){
        $(".js-categories option[value='all']").attr("selected", "selected");
        this.categoryChanged();
    }
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
    this.addTabToHistory('store');
    this.setState('store');
    // $('#inputStore').focus();
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

  customizeColorClick: function(e) {
    "use strict";
    var self = this,
        colorInput = $(e.target).closest('.positionWrapper').find('.js-customizeColorInput'),
        colorKey = colorInput.attr('id'),
        newColor = this.model.get('page').profile[colorKey].slice(1);
    $(e.target).closest('.positionWrapper').find('.labelWrap').addClass('fadeIn');
    colorInput.colpick({
      layout: "rgbhex", //can also be full, or hex
      colorScheme: "dark", //can also be light
      submitText: "Change",
      onShow: function(el) {
        var colorKey = $(this).attr('id');
        $(this).colpickSetColor(self.model.get('page').profile[colorKey].slice(1), true);
      },
      onSubmit: function(hsb, hex, rgb, el, visible) {
        self.setCustomColor(hex, $(el).attr('id'));
        $(el).closest('.positionWrapper').find('.js-customizeColor').css('background-color', '#' + hex);
        if(visible) {
          $(el).colpickHide();
        }
        $('.labelWrap').removeClass('fadeIn');
      },
      onHide: function(){
        $('.labelWrap').removeClass('fadeIn');
      }
    });
    colorInput.colpickSetColor(newColor, true);
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
    var serverUrl = self.options.userModel.get('serverUrl');
    var imageURI = self.$el.find('#image-cropper').cropit('export', {
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
          if (data.success === true){
            imageHash = data.image_hashes[0] || [];
            if (imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && imageHash.length){
              tempPage = __.clone(self.model.get('page'));
              tempPage.profile.header = imageHash;
              self.model.set('page', tempPage);
              self.$el.find('.js-userPageBanner').css('background-image', 'url(' + serverUrl + "get_image?hash=" + imageHash + ')');
              self.saveUserPageModel();
            }else if (imageHash == "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
              showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.serverError'));
            }else{
              showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.serverError'));
            }
          }else if (data.success === false){
            showErrorModal(window.polyglot.t('errorMessages.serverError'), "<i>" + data.reason + "</i>");
          }
        },
        error: function (jqXHR, status, errorThrown) {
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
          } else if(profileKey == "header") {
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
          self.setCustomStyles();
          self.setState(self.lastTab);
          //refresh the universal profile model
          self.globalUserProfile.fetch();
        }else if(data.success === false){
          showErrorModal(window.polyglot.t('errorMessages.serverError'), "<i>" + data.reason + "</i>");
        }
      },
      error: function(jqXHR, status, errorThrown){
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

  deleteItem: function(){
    "use strict";
    var self=this;

    if(this.confirmDelete === false){
      this.$el.find('.js-deleteItem').addClass('confirm');
      this.confirmDelete = true;
    } else {
      $.ajax({
        type: "DELETE",
        url: self.item.get('serverUrl') + "contracts/?id=" + self.item.get('id'),
        success: function () {
          //destroy the model. Do it this way because the server can't accept a standard destroy call, and we don't want to call the server twice.
          self.item.trigger('destroy', self.item);
          self.subRender();
          self.setState("store");
        },
        error: function (jqXHR, status, errorThrown) {
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
    //this.storeWizardView.closeWizard();
    var currentState = this.lastTab || "about";
    //recreate the entire page with the new data
    Backbone.history.loadUrl();
  },

  followUser: function(){
    "use strict";
    var self = this;
    $.ajax({
      type: "POST",
      data: this.userProfileFetchParameters,
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "follow",
      success: function(data) {
        self.subRender();
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  unfollowUser: function(){
    "use strict";
    var self = this;
    $.ajax({
      type: "POST",
      data: this.userProfileFetchParameters,
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "unfollow",
      success: function() {
        self.subRender();
      },
      error: function(jqXHR, status, errorThrown){
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
  }

});
