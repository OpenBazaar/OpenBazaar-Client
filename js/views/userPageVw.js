var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    colpicker = require('../utils/colpick.js'),
    userProfileModel = require('../models/userProfileMd'),
    listingsModel = require('../models/listingsMd'),
    usersModel = require('../models/usersMd'),
    itemModel = require('../models/itemMd'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    simpleMessageView = require('./simpleMessageVw'),
    itemVw = require('./itemVw'),
    itemEditVw = require('./itemEditVw'),
    storeWizardVw = require('./storeWizardVw');

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
    'change .js-userPageImageUpload': 'uploadUserPageImage',
    'click .js-customizeColor': 'customizeColorClick',
    'click .js-createStore': 'createStore'
  },

  initialize: function (options) {
    "use strict";
    var self = this;
    this.options = options || {};
    /* expected options are:
    userModel: this is set by app.js, then by a call to the settings API. (not complete yet)
    userID: if userID is in the route, it is set here
    state: if state is in the route, it is set here
    itemHash: if itemHash is in the route, it is set here
     */
    this.subViews = [];
    this.model = new Backbone.Model();
    this.userProfile = new userProfileModel();
    //models have to be passed the dynamic URL
    this.userProfile.urlRoot = options.userModel.get('server_url') + "profile";
    this.listings = new listingsModel();
    this.listings.urlRoot = options.userModel.get('server_url') + "get_listings";
    this.followers = new usersModel();
    this.followers.urlRoot = options.userModel.get('server_url') + "get_followers";
    this.following = new usersModel();
    this.following.urlRoot = options.userModel.get('server_url') + "get_following";
    this.lastTab = "about"; //track the last tab clicked
    this.pageID = "";
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

    this.userProfile.fetch({
      data: $.param({'id': this.pageID}),
      success: function(model){
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
        //if no userID is passed in, or it matches the user's ID, then this is their page
        //sometimes it can be set to the string 'null', check for that too
        if(!options.userID || options.userID == self.model.get('page').profile.guid || options.userID == 'null') {
          self.pageID = self.model.get('page').profile.guid;
          self.options.ownPage = true;
        } else {
          self.pageID = options.userID;
          self.options.ownPage = false;
        }
        self.model.set({ownPage: self.options.ownPage});
        self.render();
      },
      error: function(model, response){
        console.log("Information for user "+options.userID+" fetch failed: " + response.statusText);
        alert("User Profile cannot be read");
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
      //save state of the page
      self.undoCustomAttributes.background_color = self.model.get('page').profile.background_color;
      self.undoCustomAttributes.primary_color = self.model.get('page').profile.primary_color;
      self.undoCustomAttributes.secondary_color = self.model.get('page').profile.secondary_color;
      self.undoCustomAttributes.text_color = self.model.get('page').profile.text_color;
      self.setCustomStyles();
      self.setState(self.options.state, self.options.itemHash);
      self.$el.find('.js-externalLink').on('click', function(e){
        e.preventDefault();
        require("shell").openExternal($(this).attr('href'));
      })
    });
    self.errorModal = $('.js-messageModal');
    return this;
  },

  setCustomStyles: function() {
    "use strict";
    var self = this;
    //only do the following if page has been set in the model
    if(this.model.get('page')){
      var customStyleTag = document.getElementById('customStyle') || document.createElement('style');
      customStyleTag.setAttribute('id', 'customStyle');
      customStyleTag.innerHTML =
          "#ov1 .userPage .custCol-background, #ov1 .userPage.body { background-color: " + this.model.get('page').profile.background_color + ";}" +
          "#ov1 .userPage .custCol-primary-light { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1);  background-color: " + this.shadeColor2(this.model.get('page').profile.primary_color, 0.04) + ";}" +
          "#ov1 .userPage .custCol-primary, #ov1 .userPage .chosen-drop, #ov1 .userPage .no-results { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + this.model.get('page').profile.primary_color + ";}" +
          "#ov1 .userPage .btn-tab.active { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + this.model.get('page').profile.primary_color + ";}" +
          "#ov1 .userPage .custCol-secondary { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + this.model.get('page').profile.secondary_color + ";}" +
          "#ov1 .userPage .custCol-border-secondary { border-color: " + this.model.get('page').profile.secondary_color + " !important;}" +
          "#ov1 .userPage .radioLabel:before { border-color: " + this.model.get('page').profile.text_color + " !important;}" +
          "#ov1 .userPage input[type='radio'].fieldItem:checked + label:before { background: " + this.model.get('page').profile.text_color + " !important;}" +
          "#ov1 .userPage .custCol-text::-webkit-input-placeholder { color: " + this.model.get('page').profile.text_color + " !important;}" +
          "#ov1 .userPage .chosen-choices { background-color: " + this.shadeColor2(this.model.get('page').profile.primary_color, 0.04) + "; border: 0; background-image: none; box-shadow: none; padding: 5px 7px}" +
          "#ov1 .userPage .search-choice { background-color: " + this.model.get('page').profile.secondary_color + "; background-image: none; border: none; padding: 10px; color: " + this.model.get('page').profile.text_color + " ; font-size: 13px; box-shadow: none; border-radius: 3px;}" +
          "#ov1 .userPage .chosen-results li { border-bottom: solid 1px " + this.model.get('page').profile.secondary_color + "}" +
          "#ov1 .userPage .custCol-text, .search-field input { color: " + this.model.get('page').profile.text_color + "!important;}";

      document.body.appendChild(customStyleTag);
      //set custom color input values
      self.$el.find('.js-customizeColorInput').each(function(){
        var newColor = self.model.get('page').profile[$(this).attr('id')];
        $(this).val(newColor);
        $(this).closest('.positionWrapper').find('.js-customizeColor').css('background-color', newColor);
      });
    }
  },

  shadeColor2: function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  setState: function(state, hash) {
    "use strict";
    if(state === "item"){
      this.renderItem(hash);
    }else if(state === "itemOld") {
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-item"));
    }else if(state === "itemNew") {
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
      this.sellItem();
    }else if(state){
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state));
    }else{
      //if no state was set for some reason
      this.tabClick(this.$el.find(".js-aboutTab"), this.$el.find(".js-about"));
    }
    this.setControls(state);
    this.subRender(state);
    this.lastTab = state;
  },

  setControls: function(state){
    "use strict";
    //hide all the state controls
    this.$el.find('.js-userPageControls, .js-itemButtons, #customizeControls, .js-itemCustomizationButtons, .js-pageButtons').addClass('hide');
    //unhide the ones that are needed
    if(this.options.ownPage == true) {
      if(state === "item" || state === "itemOld") {
        this.$el.find('.js-itemButtons').removeClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      } else if(state === "itemEdit") {
        this.$el.find('.js-itemEditButtons').removeClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      } else if(state === "customize") {
        this.$el.find('.js-itemCustomizationButtons').removeClass('hide');
        this.$el.find('#customizeControls').removeClass('hide');
        document.getElementById('obContainer').classList.add("box-borderDashed");
      } else {
        this.$el.find('.js-pageButtons').removeClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      }
      //if store has been created, swap create button for sell button
      if(this.model.get('page').profile.vendor === true) {
        this.$el.find('.js-sellItem').removeClass('hide');
        this.$el.find('.js-createStore').addClass('hide');
      } else {
        this.$el.find('.js-sellItem').addClass('hide');
        this.$el.find('.js-createStore').removeClass('hide');
      }
    }
  },

  subRender: function(state) {
    "use strict";
    var self = this;
    if(state === "about" || !state) {
      //this is the default state of the page. Activate tab
      this.tabClick(self.$el.find('.js-aboutTab'), this.$el.find('.js-about'));
    } else if (state === "store") {

      this.listings.fetch({
        data: function(){
          //don't send the guid if this is the user's own page
          if(this.options.ownPage != true) {
            return $.param({'guid': self.pageID});
          }
        },
        success: function(model){
          self.renderItems(model.get('listings'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Store listings are not available. The error code is: "+response.statusText, '.js-list3');
        }
      });
    } else if (state === "followers") {
      this.followers.fetch({
        success: function(model){
          self.renderFollowers(model.get('followers'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Followers are not available. The error code is: "+response.statusText, '.js-list1');
        }
      });
    } else if (state === "following") {
      this.following.fetch({
        success: function(model){
          self.renderFollowing(model.get('following'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Users your are following are not available. The error code is: "+response.statusText, '.js-list2');
        }
      });
    }
  },

  renderItems: function (model) {
    "use strict";
    var self = this;
    __.each(model, function (arrayItem) {
      arrayItem.userCurrencyCode = self.options.userModel.get('currency_code');
      arrayItem.server_url = self.options.userModel.get('server_url');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = self.model.get('page').profile.avatar_hash;
      arrayItem.handle = self.model.get('page').profile.handle;
      arrayItem.userID = self.pageID;
    });
    this.itemList = new itemListView({model: model, el: '.js-list3', userModel: this.options.userModel});
    this.subViews.push(this.itemList);
  },

  renderFollowers: function (model) {
    "use strict";
    this.followerList = new personListView({model: model, el: '.js-list1', title: "No Followers Yet", message: ""});
    this.subViews.push(this.followerList);
  },

  renderFollowing: function (model) {
    "use strict";
    this.followingList = new personListView({model: model, el: '.js-list2', title: "Not Following Anyone Yet", message: ""});
    this.subViews.push(this.followingList);
  },

  renderItem: function(hash){
    "use strict";
    var self = this;
    this.item = new itemModel({
      userCurrencyCode: self.options.userModel.get('currency_code'),
      userCountry: self.options.userModel.get('country'),
      server_url: self.options.userModel.get('server_url'),
      showAvatar: false,
      avatar_hash: self.model.get('page').profile.avatar_hash,
      handle: self.model.get('page').profile.handle,
      ownPage: self.options.ownPage,
      //userID: self.model.get('page').profile.guid,
      itemHash: hash
        //id: hash
    });
    this.item.urlRoot = this.options.userModel.get('server_url')+"contracts";
    //remove old item before rendering
    if(this.itemView){
      this.itemView.undelegateEvents();
      //this.itemView.remove();
    }
    this.itemView = new itemVw({model:this.item, el: '.js-list4'});
    this.subViews.push(this.itemView);
    this.item.fetch({
      data: $.param({'id': hash}),
      success: function(model){
        self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-item'));
        //set id after fetch, otherwise Backbone includes it in the fetch url
        model.set('id', hash);
        //model may arrive empty, set this flag to trigger a change event
        model.set({fetched: true});
      },
      error: function(model, response){
        console.log("Fetch of itemModel from userPageView has failed");
        self.showError("There Has Been An Error","This item is not available. The error code is: "+response.statusText, '.js-list4');
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
      this.itemEdit = new itemModel({
        server_url: self.options.userModel.get('server_url'),
        userCountry: self.options.userModel.get('country'),
        userCurrencyCode: self.options.userModel.get('currency_code'),
        vendor_offer: {'listing': {'item': {'price_per_unit': {'fiat': {'currency_code': self.options.userModel.get('currency_code')}}},'id': {'pubkeys__guid': self.model.get('page').profile.guid }}},
      });
    }
    //this.itemEdit.urlRoot = this.options.userModel.get('server_url')+"contracts";
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
    self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-itemEdit'));
  },

  showError: function(title, message, target){
    "use strict";
    var errorView = new simpleMessageView({title: title, message: message, el: target});
    this.subViews.push(errorView);
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
    $('#inputFollowers').focus();
  },

  followingClick: function(e){
    "use strict";
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-following'));
    this.addTabToHistory('following');
    this.setState('following');
    $('#inputFollowing').focus();
  },

  storeClick: function(e){
    "use strict";
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
    this.addTabToHistory('store');
    this.setState('store');
    $('#inputStore').focus();
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

  customizePage: function(e){
    "use strict";
    this.customizing = true;
    this.setControls('customize');
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
      onSubmit: function(hsb,hex,rgb,el) {
        self.setCustomColor(hex, $(el).attr('id'));
        $(el).closest('.positionWrapper').find('.js-customizeColor').css('background-color', '#' + hex);
        $(el).colpickHide();
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

  showErrorModal: function(errorTitle, errorMessage) {
    "use strict";
    this.errorModal.removeClass('hide');
    this.errorModal.find('.js-messageModal-title').text(errorTitle);
    this.errorModal.find('.js-messageModal-message').html(errorMessage);
  },

  uploadUserPageImage: function() {
    "use strict";
    var self = this;
    var formData = new FormData(this.$el.find('#userPageImageForm')[0]);
    var server_url = self.options.userModel.get('server_url');
    $.ajax({
      type: "POST",
      url: server_url + "upload_image",
      contentType: false,
      processData: false,
      data: formData,
      dataType: "json",
      success: function(data) {
        var errorModal = $('.js-messageModal'),
            imageHash,
            tempPage;
        if(data.success == true){
          imageHash = data.image_hashes[0];
          if(imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && imageHash.length){
            tempPage  =  __.clone(self.model.get('page'));
            tempPage.profile.header = imageHash;
            self.model.set('page', tempPage);
            self.$el.find('.js-userPageBanner').css('background-image', 'url(' + server_url + "get_image?hash=" + imageHash + ')');
          } else if (imageHash == "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
            self.showErrorModal("Changes Could Not Be Saved", "Uploading the image has failed due to the following error: <br/><br/><i>Image hash returned is blank.</i>");
          } else {
            self.showErrorModal("Changes Could Not Be Saved", "Uploading the image has failed due to the following error: <br/><br/><i>No image hash was returned.</i>");
          }
        } else if (data.success === false){
          self.showErrorModal("Changes Could Not Be Saved", "Uploading the image has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  saveCustomizePage: function() {
    "use strict";
    this.customizing = false;
    this.saveUserPageModel();
  },

  saveUserPageModel: function(){
    "use strict";
    var self = this;
    var formData = new FormData();
    var pageData = this.model.get('page').profile;
    for(var profileKey in pageData) {
      if(pageData.hasOwnProperty(profileKey)){
        //don't include nested objects in the form
        if(pageData[profileKey] !== 'object' && pageData[profileKey]){
          if(profileKey == 'background_color' || profileKey == 'primary_color' || profileKey == 'text_color' || profileKey == 'secondary_color'){
            //convert hex to decimal
            var profileColor = pageData[profileKey].slice(1);
            profileColor = is.hexColor(profileColor) ? parseInt(profileColor, 16) : profileColor;
            formData.append(profileKey, profileColor);
          } else {
            formData.append(profileKey, String(pageData[profileKey]));
          }
        }
      }
    }

    $.ajax({
      type: "POST",
      url: self.model.get('user').server_url + "profile",
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        data = JSON.parse(data);
        if(data.success === true){
          self.setCustomStyles();
          self.setState(self.lastTab);
        }else if(data.success === false){
          console.log("failed");
          self.showErrorModal("Changes Could Not Be Saved", "Customization has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");

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
    this.undoColorCustomization();
    this.setControls();
  },

  undoColorCustomization: function(){
    "use strict";
    if(this.customizing === true) { //TODO: Enumerate over array or entity with loop
      this.model.get('page').profile.background_color = this.undoCustomAttributes.background_color;
      this.model.get('page').profile.primary_color = this.undoCustomAttributes.primary_color;
      this.model.get('page').profile.secondary_color = this.undoCustomAttributes.secondary_color;
      this.model.get('page').profile.text_color = this.undoCustomAttributes.text_color;
      this.customizing = false;
      this.setCustomStyles();
    }
  },

  saveNewDone: function() {
    "use strict";
    this.addTabToHistory('store');
    this.setState('store');
  },

  deleteOldDone: function(newHash) {
    "use strict";
    if(newHash) {
      this.setState('item', newHash);
    } else {
      //this.tabClick($('.js-storeTab'), this.$el.find('.js-store'));
      this.addTabToHistory('store');
      this.setState('store');
    }
  },

  cancelClick: function(){
    "use strict";
    this.setState(this.lastTab);
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

    $.ajax({
      type: "DELETE",
      url: self.item.get('server_url') + "contracts/?id="+ self.item.get('id'),
      success: function() {
        //destroy the model. Do it this way because the server can't accept a standard destroy call, and we don't want to call the server twice.
        self.item.trigger('destroy', self.item);
        self.setState("store");
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
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
    this.storeWizardView = new storeWizardVw({model:storeWizardModel, parentEl: '#modalHolder'});
    this.listenTo(this.storeWizardView, 'storeCreated', this.storeCreated);
    this.subViews.push(this.storeWizardView);
  },

  storeCreated: function() {
    "use strict";
    var currentState = this.lastTab || "about";
    this.storeWizardView.closeWizard();
    //recreate the entire page with the new data
    Backbone.history.loadUrl();
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
  }

});

