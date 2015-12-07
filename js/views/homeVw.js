var __ = require('underscore'),
    Backbone = require('backbone'),
    Moment = require('moment'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),//TODO: Remove FS - it is not used?
    loadTemplate = require('../utils/loadTemplate'),
    itemListView = require('./itemListVw'),
    storeListView = require('./userListVw'),
    userProfileModel = require('../models/userProfileMd'),
    itemShortView = require('./itemShortVw'),
    itemShortModel = require('../models/itemShortMd'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  className:"homeView",

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeFeedBtn': 'homeFeedClick',
    'click .js-homeStoresBtn': 'homeStoresClick',
    'click .js-homeCreateStore': 'createStore'
  },

  initialize: function(options){
    var self = this;
    this.model = new Backbone.Model();
    this.options = options || {};
    this.userModel = options.userModel;
    this.userProfile = new userProfileModel();
    this.userProfile.urlRoot = this.userModel.get('serverUrl') + "profile";
    this.socketView = options.socketView;
    this.slimVisible = false;
    this.subViews = [];
    this.lookingCount = 0;
    this.homeLookingTimeout = setInterval(function(){
      if(self.lookingCount < 10){
        self.lookingCount++;
      } else {
        self.endLookingCount();
      }
    }, 1000);

    this.userProfile.fetch({
      //no id is passed, this will always be a request for the user's own profile
      success: function(model){
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
        self.render();
      },
      error: function(model, response){
        console.log("Information for user "+options.userID+" fetch failed: " + response.statusText);
        alert("loading the user profile has failed");
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketItemID = Math.random().toString(36).slice(2);
    this.socketVendorID = Math.random().toString(36).slice(2);
  },

  resetLookingCount: function(){
    "use strict";
    this.lookingCount = 0;
  },

  endLookingCount: function(){
    "use strict";
    this.$el.find('.js-loadingMsg').addClass('hide');
    clearInterval(this.homeLookingTimeout);
  },

  hideList: function(e){
    $('.js-list1, .js-list2, .js-list3').addClass('hide');
    $('.js-homeItemsSearch, .js-homeStoresSearch, .js-homeFeedSearch').addClass('hide');
    $('.js-homeItemsBtn, .js-homeStoresBtn, .js-homeFeedBtn').removeClass('active');
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketItemID){
      this.renderItem(data);
    } else if(data.id == this.socketVendorID) {
      this.renderUser(data.vendor);
    }
    this.resetLookingCount();
  },

  render: function(){
    "use strict";
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/home.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      if(self.model.get('page').profile.vendor == true) {
        self.$el.find('.js-homeCreateStore').addClass('hide');
        self.$el.find('.js-homeMyPage').addClass('show');
      }

      //get vendors and items
      self.socketView.getItems(self.socketItemID);
      self.socketView.getVendors(self.socketVendorID);

      // $("#obContainer").scroll(function(){
      //   if ($(this).scrollTop() > 20 && self.slimVisible === false ) {
      //     self.slimVisible = true;
      //     $('.home-page-navigation-filler').show();
      //     $('.home-page-header').addClass('home-page-header-slim');
      //     $('.home-page-header-slim').show();
      //     $('.home-page-content .thumbnail-large').addClass('thumbnail-large-slim');
      //   }
      //   if ($(this).scrollTop() < 20 && self.slimVisible === true ) {
      //     self.slimVisible = false;
      //     $('.home-page-navigation-filler').hide();
      //     $('.home-page-header').removeClass('home-page-header-slim');
      //     $('.home-page-header-slim').hide();
      //     $('.home-page-content .thumbnail-large').removeClass('thumbnail-large-slim');
      //   }
      // });

      // Auto focus the search input
      // $('.js-homeItemsSearch input').focus();
    });
  },

  renderItem: function(item){
    "use strict";
    //get data from inside the listing object
    item = item.listing;
    item.userCurrencyCode = this.userModel.get('currency_code');
    item.imageURL = this.userModel.get('serverUrl')+"get_image?hash="+item.thumbnail_hash+"&guid="+item.guid;
    item.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+item.avatar_hash+"&guid="+item.guid;
    item.showAvatar = true;
    item.userID = item.guid;
    var newItemModel = new itemShortModel(item);
    var itemShort = new itemShortView({model: newItemModel});
    this.$el.find('.js-list1 .js-loadingMsg').before(itemShort.el);
    this.subViews.push(itemShort);
  },

  renderUser: function(user){
    "use strict";
    user.serverUrl = this.userModel.get('serverUrl');
    user.userID = user.guid;
    user.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+user.avatar_hash+"&guid="+user.guid;
    var newUserModel = new userShortModel(user);
    var storeShort = new userShortView({model: newUserModel});
    this.$el.find('.js-list2 .js-loadingMsg').before(storeShort.el);
    this.subViews.push(storeShort);
  },

  renderNoneFound: function(){
    "use strict";
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  homeItemsClick: function(e){
    "use strict";
    this.hideList();
    $('.js-list1').removeClass('hide');
    $('.js-homeItemsBtn').addClass('active');

    // Auto focus the search input
    $('.js-homeItemsSearch').removeClass('hide');
    // $('.js-homeItemsSearch input').focus();
  },

  homeStoresClick: function(e){
    "use strict";
    this.hideList();
    $('.js-list2').removeClass('hide');
    $('.js-homeStoresBtn').addClass('active');

    // Auto focus the search input
    $('.js-homeStoresSearch').removeClass('hide');
    // $('.js-homeStoresSearch input').focus();
  },

  homeFeedClick: function(e){
    "use strict";
    this.hideList();
    $('.js-list3').removeClass('hide');
    $('.js-homeFeedBtn').addClass('active');

    // Auto focus the search input
    $('.js-homeFeedSearch').removeClass('hide');
    // $('.js-homeFeedSearch input').focus();    
  },  

  createStore: function() {
    "use strict";
    Backbone.history.navigate('#userPage/'+this.userModel.get('guid')+'/createStore', {trigger: true});
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    clearInterval(this.homeLookingTimeout);
    this.unbind();
    this.remove();
  }

});
