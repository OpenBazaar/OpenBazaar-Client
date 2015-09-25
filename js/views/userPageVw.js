var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userPageModel = require('../models/userPageMd'),
    listingsModel = require('../models/listingsMd'),
    usersModel = require('../models/usersMd'),
    itemModel = require('../models/itemMd'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    simpleMessageView = require('./simpleMessageVw'),
    itemView = require('./itemVw'),
    itemEditView = require('./itemEditVw');

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
    'change .js-customizeColor': 'setCustomColor'
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
    this.userPage = new userPageModel();
    //models have to be passed the dynamic URL
    this.userPage.urlRoot = options.userModel.get('server') + "profile";
    this.listings = new listingsModel();
    this.listings.urlRoot = options.userModel.get('server') + "get_listings";
    this.followers = new usersModel();
    this.followers.urlRoot = options.userModel.get('server') + "get_followers";
    this.following = new usersModel();
    this.following.urlRoot = options.userModel.get('server') + "get_following";
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

    //if no userID is passed in, or it matches the user's ID, then this is their page
    if(options.userID === '' || options.userID === options.userModel.get('guid')) {
      this.pageID = options.userModel.get('guid');
      this.options.ownPage = true;
    } else {
      this.pageID = options.userID;
      this.options.ownPage = false;
    }
    this.options.ownPage = true;

    this.userPage.fetch({
      data: $.param({'id': this.pageID}),
      success: function(model){
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON(), ownPage: self.options.ownPage});
        self.render();
      },
      error: function(model, response){
        console.log("Information for user "+options.userID+" fetch failed: " + response.statusText);
        alert("User Page cannot be read");
      }
    });
  },

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //save state of the page
      self.undoCustomAttributes.background_color = self.model.get('page').profile.background_color;
      self.undoCustomAttributes.primary_color = self.model.get('page').profile.primary_color;
      self.undoCustomAttributes.secondary_color = self.model.get('page').profile.secondary_color;
      self.undoCustomAttributes.text_color = self.model.get('page').profile.text_color;
      self.setCustomStyles();
      self.setState(self.options.state, self.options.itemHash);
    });
    return this;
  },

  setCustomStyles: function() {
    var self = this;
    //only do the following if page has been set in the model
    if(this.model.get('page')){
      var customStyleTag = document.getElementById('customStyle') || document.createElement('style');
      customStyleTag.setAttribute('id', 'customStyle');
      customStyleTag.innerHTML =
          "#ov1 .userPage .custCol-background { background-color: " + this.model.get('page').profile.background_color + ";}" +
          "#ov1 .userPage .custCol-primary { background-color: " + this.model.get('page').profile.primary_color + ";}" +
          "#ov1 .userPage .btn-tab.active { background-color: " + this.model.get('page').profile.primary_color + ";}" +
          "#ov1 .userPage .custCol-secondary { background-color: " + this.model.get('page').profile.secondary_color + ";}" +
          "#ov1 .userPage .custCol-text { color: " + this.model.get('page').profile.text_color + ";}";
      document.body.appendChild(customStyleTag);
      //set custom color input values
      $('.js-customizeColor').each(function(){
        $(this).val(self.model.get('page').profile[$(this).attr('id')]);
      });
    }
  },

  setState: function(state, hash) {
    if(state === "item"){
      this.renderItem(hash);
      this.tabClick(this.$el.find(".js-storeTab"), this.$el.find(".js-store"));
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
    //if user owns page, hide/show control buttons
    if(this.options.ownPage === true) {
      console.log("set state " + state);
      if(state === "item") {
        this.$el.find('.js-itemButtons').removeClass('hide');
        this.$el.find('.js-pageButtons').addClass('hide');
        this.$el.find('.js-itemEditButtons').addClass('hide');
        this.$el.find('.js-itemCustomizationButtons').addClass('hide');
        this.$el.find('#customizeControls').addClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      } else if(state === "itemEdit") {
        this.$el.find('.js-itemButtons').addClass('hide');
        this.$el.find('.js-pageButtons').addClass('hide');
        this.$el.find('.js-itemEditButtons').removeClass('hide');
        this.$el.find('.js-itemCustomizationButtons').addClass('hide');
        this.$el.find('#customizeControls').addClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      } else if(state === "customize") {
        this.$el.find('.js-itemButtons').addClass('hide');
        this.$el.find('.js-pageButtons').addClass('hide');
        this.$el.find('.js-itemEditButtons').addClass('hide');
        this.$el.find('.js-itemCustomizationButtons').removeClass('hide');
        this.$el.find('#customizeControls').removeClass('hide');
        document.getElementById('obContainer').classList.add("box-borderDashed");
      } else {
        this.$el.find('.js-itemButtons').addClass('hide');
        this.$el.find('.js-pageButtons').removeClass('hide');
        this.$el.find('.js-itemEditButtons').addClass('hide');
        this.$el.find('.js-itemCustomizationButtons').addClass('hide');
        this.$el.find('#customizeControls').addClass('hide');
        document.getElementById('obContainer').classList.remove("box-borderDashed");
        this.undoColorCustomization();
      }
    }
  },

  subRender: function(state) {
    var self = this;

    if(state === "about" || !state) {
      //this is the default state of the page. Activate tab
      this.tabClick(self.$el.find('.js-aboutTab'), this.$el.find('.js-about'));
    } else if (state === "store") {
      this.listings.fetch({
        data: $.param({'id': self.pageID}),
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
    var self = this;

    __.each(model, function (arrayItem) {
      arrayItem.userCurrencyCode = self.options.userModel.get('currencyCode');
      arrayItem.server = self.options.userModel.get('server');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = self.model.get('page').profile.avatar_hash;
      arrayItem.handle = self.model.get('page').profile.handle;
      //arrayItem.userID = self.model.get('page').profile.guid;
    });
    this.itemList = new itemListView({model: model, el: '.js-list3', userModel: this.options.userModel});
    this.subViews.push(this.itemList);
  },

  renderFollowers: function (model) {
    this.followerList = new personListView({model: model, el: '.js-list1', title: "No Followers Yet", message: ""});
    this.subViews.push(this.followerList);
  },

  renderFollowing: function (model) {
    this.followingList = new personListView({model: model, el: '.js-list2', title: "Not Following Anyone Yet", message: ""});
    this.subViews.push(this.followingList);
  },

  renderItem: function(hash){
    var self = this;
    this.item = new itemModel({
      userCurrencyCode: self.options.userModel.get('currencyCode'),
      userCountry: self.options.userModel.get('country'),
      server: self.options.userModel.get('server'),
      showAvatar: false,
      avatar_hash: self.model.get('page').profile.avatar_hash,
      handle: self.model.get('page').profile.handle,
      ownPage: self.options.ownPage,
      //userID: self.model.get('page').profile.guid,
      itemHash: hash,
      id: hash
    });
    this.item.urlRoot = this.options.userModel.get('server')+"contracts";
    //remove old item before rendering
    if(this.itemView){
      this.itemView.undelegateEvents();
      this.itemView.remove();
    }
    this.itemView = new itemView({model:this.item, el: '.js-list4'});
    this.subViews.push(this.itemView);
    this.item.fetch({
      data: $.param({'id': hash}),
      success: function(model){
        self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-item'));
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
    var self = this,
        hash = "";
    if(model) {
      //if editing existing product, clone the model
      this.itemEdit = model.clone();
    } else {
      this.itemEdit = new itemModel({
        server: self.options.userModel.get('server'),
        userCountry: self.options.userModel.get('country'),
        userCurrencyCode: self.options.userModel.get('currencyCode'),
        vendor_offer__listing__item__price_per_unit__fiat__currency_code: self.options.userModel.get('currencyCode'),
        vendor_offer__listing__id__pubkeys__guid: self.model.get('page').profile.guid
      });
    }
    this.itemEdit.urlRoot = this.options.userModel.get('server')+"contracts";
    //add the user information
    this.itemEdit.set({user: self.options.userModel.toJSON()});
    //unbind any old view
    if(this.itemEditView){
      this.itemEditView.undelegateEvents();
    }
    this.itemEditView = new itemEditView({model:this.itemEdit, el: '.js-list5'});
    this.listenTo(this.itemEditView, 'saveDone', this.cancelClick);
    this.subViews.push(this.itemEditView);
    self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-itemEdit'));
  },

  showError: function(title, message, target){
    var errorView = new simpleMessageView({title: title, message: message, el: target});
    this.subViews.push(errorView);
  },

  aboutClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-about'));
    this.addTabToHistory('about');
    this.setState('about');
  },

  followersClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-followers'));
    this.addTabToHistory('followers');
    this.setState('followers');
  },

  followingClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-following'));
    this.addTabToHistory('following');
    this.setState('following');
  },

  storeClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
    this.addTabToHistory('store');
    this.setState('store');
  },

  tabClick: function(activeTab, showContent){
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  addTabToHistory: function(state){
    //add action to history if not an item
    Backbone.history.navigate('#userPage/'+this.model.get('page').profile.guid + "/" + state);
  },

  sellItem: function(){
    this.renderItemEdit();
    this.setControls("itemEdit");
  },

  customizePage: function(e){
    this.customizing = true;
    this.setControls('customize');
  },

  setCustomColor: function(e) {
    var colorButton = $(e.target);
    var colorKey = colorButton.attr('id');
    //make temp copy of the page
    var tempPage  =  __.clone(this.model.get('page'));
    tempPage.profile[colorKey] = colorButton.val();
    this.model.set('page', tempPage);
    this.setCustomStyles();
  },

  saveCustomizePage: function() {
    //this.setControls();
    this.customizing = false;
    this.saveUserPageModel();
  },

  saveUserPageModel: function(){
    var self = this;
    var formData = new FormData();
    var pageData = this.model.get('page').profile;
    for(var profileKey in pageData) {
      if(pageData.hasOwnProperty(profileKey)){
        //don't include nested objects in the form
        if(pageData[profileKey] !== 'object'){
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
      url: self.model.get('user').server + "profile",
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        data = JSON.parse(data);
        if(data.success === true){
          self.render();
        }else if(data.success === false){
          console.log("failed");
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
    this.undoColorCustomization();
    this.setControls();
  },

  undoColorCustomization: function(){
    if(this.customizing === true) {
      this.model.get('page').profile.background_color = this.undoCustomAttributes.background_color;
      this.model.get('page').profile.primary_color = this.undoCustomAttributes.primary_color;
      this.model.get('page').profile.secondary_color = this.undoCustomAttributes.secondary_color;
      this.model.get('page').profile.text_color = this.undoCustomAttributes.text_color;
      this.customizing = false;
      this.setCustomStyles();
    }
  },

  cancelClick: function(){
    //consider calling delete here.
    if(this.lastTab === "item" || this.lastTab === "itemNew") {
      this.tabClick(this.$el.find('.js-storeTab'), this.$el.find('.js-item'));
    } else {
      this.tabClick(this.$el.find('.js-' + this.lastTab + 'Tab'), this.$el.find('.js-' + this.lastTab));
      this.setState(this.lastTab);
    }
  },

  editItem: function(){
    this.renderItemEdit(this.item);
    this.setControls("itemEdit");
    this.lastTab = "item";
  },

  deleteItem: function(){
    var self=this;

    $.ajax({
      type: "DELETE",
      url: self.item.get('server') + "contracts/?id="+ self.item.get('id'),
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
    if(this.itemEditView){
      this.itemEditView.saveChanges();
    }
  },


close: function(){
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

