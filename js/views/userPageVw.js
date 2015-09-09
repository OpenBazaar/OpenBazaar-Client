var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
  userPageModel = require('../models/userPageMd'),
  listingsModel = require('../models/listingsMd'),
  usersModel = require('../models/usersMd'),
  itemModel = require('../models/itemMd'),
  itemListView = require('./itemListVw'),
  personListView = require('./userListVw'),
  simpleMessageView = require('./simpleMessageVw'),
  itemView = require('./itemVw');

module.exports = Backbone.View.extend({

  classname: "userView",

  events: {
    'click .js-aboutTab': 'aboutClick',
    'click .js-followersTab': 'followersClick',
    'click .js-followingTab': 'followingClick',
    'click .js-storeTab': 'storeClick'
  },

  initialize: function (options) {
    "use strict";
    var self = this;
    this.options = options || {};
    this.subViews = [];
    this.model = new Backbone.Model();
    this.userPage = new userPageModel();
    //models have to be passed the dynamic URL
    this.userPage.url = options.userModel.get('server') + "get_profile";
    this.listings = new listingsModel();
    this.listings.url = options.userModel.get('server') + "get_listings";
    this.followers = new usersModel();
    this.followers.url = options.userModel.get('server') + "get_followers";
    this.following = new usersModel();
    this.following.url = options.userModel.get('server') + "get_following";

    this.userPage.fetch({
      data: $.param({'id': options.userID}),
      success: function(model){
        if(options.userModel.get('guid') === model.get('profile').guid) {
          //this is the user's own page
          self.options.ownPage = true;
        }
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON(), ownPage: self.options.ownPage});
        self.render();
      },
      error: function(model, response){
        //console.log("User page information fetch failed: " + response.statusText);
        alert("User Page cannot be read");
      }
    });
  },

  render: function(){
    //console.log("render userPageVw");
    var self = this;
    this.$el.appendTo('#content');
    loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      var userPageID;
      if(!self.options.ownPage) {
        userPageID = self.model.get('page').profile.guid;
      }
      self.listings.fetch({
        data: $.param({'id': userPageID}),
        success: function(model){
          self.renderItems(model.get('listings'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Store listings are not available. The error code is: "+response.statusText, '.js-list3');
        }
      });
      self.followers.fetch({
        success: function(model){
          self.renderFollowers(model.get('followers'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Followers are not available. The error code is: "+response.statusText, '.js-list1');
        }
      });
      self.following.fetch({
        success: function(model){
          self.renderFollowing(model.get('following'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Users your are following are not available. The error code is: "+response.statusText, '.js-list2');
        }
      });
      self.setState(self.options.state, self.options.itemHash);
    });
    return this;
  },

  renderItems: function (model) {
    var self = this,
        itemList;

    __.each(model, function (arrayItem) {
      arrayItem.userCurrencyCode = self.options.userModel.get('currencyCode');
      arrayItem.server = self.options.userModel.get('server');
      arrayItem.showAvatar = false;
      arrayItem.avatar_hash = self.model.get('page').profile.avatar_hash;
      arrayItem.handle = self.model.get('page').profile.handle;
      arrayItem.userID = self.model.get('page').profile.guid;
    });
    //console.log("userPageView set guid on items "+ self.options.userModel.get('guid'));
    itemList = new itemListView({model: model, el: '.js-list3', userModel: this.options.userModel});
    this.subViews.push(itemList);
  },

  renderFollowers: function (model) {
    var followerList = new personListView({model: model, el: '.js-list1', title: "No Followers Yet", message: ""});
    this.subViews.push(followerList);
  },

  renderFollowing: function (model) {
    var followingList = new personListView({model: model, el: '.js-list2', title: "Not Following Anyone Yet", message: ""});
    this.subViews.push(followingList);
  },

  renderItem: function(hash){
    var self = this;
    this.item = new itemModel({
      userCurrencyCode: self.options.userModel.get('currencyCode'),
      server: self.options.userModel.get('server'),
      showAvatar: false,
      avatar_hash: self.model.get('page').profile.avatar_hash,
      handle: self.model.get('page').profile.handle,
      userID: self.model.get('page').profile.guid
    });
    this.item.url = this.options.userModel.get('server')+"get_contract";
    this.item.fetch({
      data: $.param({'id': hash}),
      success: function(model){
        var item = new itemView({model:model, el: '.js-list4'});
        self.subViews.push(item);
        self.tabClick(self.$el.find('.js-storeTab'), self.$el.find('.js-item'), "item/"+hash);
      },
      error: function(model, response){
        //console.log("Fetch of itemModel from userPageView has failed");
        self.showError("There Has Been An Error","This item is not available. The error code is: "+response.statusText, '.js-list4');
      }
    });
  },

  showError: function(title, message, target){
    var errorView = new simpleMessageView({title: title, message: message, el: target});
    this.subViews.push(errorView);
  },

  setState: function(state, hash) {
    console.log("setState url "+ Backbone.history.getFragment());
    //console.log("setState state "+ state);
    if(state === "item") {
      console.log("item state");
      this.renderItem(hash);
    }else if (state){
      //console.log("set not item state "+ state);
      this.tabClick(this.$el.find(".js-" + state + "Tab"), this.$el.find(".js-" + state), state);
    }
  },

  aboutClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-about'), 'about');
  },

  followersClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-followers'), 'followers');
  },

  followingClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-following'), 'following');
  },

  storeClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'), 'store');
  },

  tabClick: function(activeTab, showContent, state){
    //console.log("tabClick state: "+ state);
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
    //if user owns page, hide/show control buttons
    console.log("set page controls "+ this.options.ownPage === true);
    if(this.options.ownPage === true) {
      if(state === "item") {
        this.$el.find('.js-itemButtons').removeClass('hide');
        this.$el.find('.js-pageButtons').addClass('hide');
      } else {
        this.$el.find('.js-itemButtons').addClass('hide');
        this.$el.find('.js-pageButtons').removeClass('hide');
      }
    }
    if(state !== "item") {
      //add action to history if not an item
      console.log("tabClick nav to "+ '#userPage/'+this.model.get('page').profile.guid + "/" + state);
      Backbone.history.navigate('#userPage/'+this.model.get('page').profile.guid + "/" + state);
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

