'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    Moment = require('moment'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw'),
    storeListView = require('./userListVw'),
    userProfileModel = require('../models/userProfileMd'),
    itemShortView = require('./itemShortVw'),
    itemShortModel = require('../models/itemShortMd'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = baseVw.extend({

  className:"homeView",

  events: {
    'click .js-productsTab': function(){this.setState("products");},
    'click .js-feedTab': function(){this.setState("feed");},
    'click .js-vendorsTab': function(){this.setState("vendors");},
    'click .js-homeCreateStore': 'createStore',
    'click .js-homeCreateListing': 'createListing',
    'click .js-homeSearchItemsClear': 'searchItemsClear',
    'keyup .js-homeSearchItems': 'searchItemsKeyup',
    'change .js-homeSelectFollowingFilter': 'setFollowingFilter'
  },

  initialize: function(options){
    var self = this;
    this.model = new Backbone.Model();
    this.options = options || {};
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.socketView = options.socketView;
    this.state = options.state;
    this.searchItemsText = options.searchItemsText;
    this.slimVisible = false;
    this.itemViews = [];
    this.userViews = [];
    this.obContainer = $('#obContainer');
    this.loadingProducts = false;
    this.loadingVendors = false;
    //store a list of the viewing user's followees. They will be different from the page followers if this is not their own page.
    this.ownFollowing = [];
    this.onlyFollowing = false;

    this.model.set({user: this.options.userModel.toJSON(), page: this.userProfile.toJSON()});

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      self.handleSocketMessage(response);
    });
    this.socketItemsID = Math.random().toString(36).slice(2);
    this.socketUsersID = Math.random().toString(36).slice(2);
    this.socketSearchID = '';

    //listen to follow and unfollow events
    this.listenTo(window.obEventBus, "followUser", function(options){
      self.followUser(options);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(options){
      self.unfollowUser(options);
    });

    this.fetchOwnFollowing(this.render());
  },

  fetchOwnFollowing: function(callback){
    var self = this;
    $.ajax({
      url: self.userModel.get('serverUrl') + "get_following",
      dataType: "json",
      timeout: 4000
    }).done(function(ownFollowingData){
      self.ownFollowing = ownFollowingData.following || [];
      self.ownFollowing = self.ownFollowing.map(function(followingObject){
        var followingGuid = followingObject.guid;
        return followingGuid;
      });
      typeof callback === 'function' && callback();
    }).fail(function(jqXHR, status, errorThrown){
      console.log(jqXHR);
      console.log(status);
      console.log(errorThrown);
    });
  },

  setSocketTimeout: function(){
    var self = this;
    this.$el.find('.js-loadingMessage .spinner').removeClass('fadeOut');
    this.$el.find('.js-loadingMessage').removeClass('fadeOut');
    this.socketTimeout = window.setTimeout(function(){
        self.$el.find('.js-loadingMessage').addClass('fadeOut');
    }, 2000);

    // after 4 seconds, if no listings are found, display the no results found message
    this.noResultsTimeout = window.setTimeout(function() {
      if ($('.homeGridItems .gridItem').length === 0){
        self.$el.find('.js-loadingMessage').removeClass('fadeOut');
        self.$el.find('.js-loadingMessage .spinner').addClass('fadeOut');
        self.$el.find('.js-loadingText').html(self.$el.find('.js-loadingText').data('noResultsText'));
      }
    }, 4000);
  },

  clearSocketTimeout: function() {
    this.socketTimeout && window.clearTimeout(this.socketTimeout);
    this.noResultsTimeout && window.clearTimeout(this.noResultsTimeout);
  },

  hideList: function(){
    $('.js-feed, .js-products, .js-vendors, .js-productsSearch').addClass('hide');
    $('.js-productsTab, .js-vendorsTab, .js-feedTab').removeClass('active');
  },

  resetLookingCount: function(){
    this.lookingCount = 0;
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if(data.id == this.socketItemsID){
      this.loadingProducts = false;
      this.renderItem(data);
    } else if(data.id == this.socketUsersID) {
      this.loadingVendors = false;
      this.renderUser(data.vendor);
    } else if(data.id == this.socketSearchID) {
      this.renderItem(data);
    }
    
    this.resetLookingCount();
  },

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/home.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      self.setState(self.state, self.searchItemsText);
      if(self.model.get('page').profile.vendor == true) {
        self.$el.find('.js-homeCreateStore').addClass('hide');
        self.$el.find('.js-homeMyPage').addClass('show');
        self.$el.find('.js-homeCreateListing').addClass('show');
      }else{
        self.$el.find('.js-homeCreateStore').addClass('show');
        self.$el.find('.js-homeCreateListing').addClass('hide');
      }

      //get vendors and items
      self.loadItemsOrSearch();
      self.loadingVendors = true;
      self.socketView.getVendors(self.socketUsersID);

      //listen to scrolling on container
      self.scrollHandler = __.bind(
        __.throttle(self.onScroll, 100),
        self
      );
      self.obContainer.on('scroll', self.scrollHandler);

      //populate search field
      if(self.searchItemsText){
        self.$el.find('.js-homeSearchItems').val("#" + self.searchItemsText);
        $('#obContainer').scrollTop(0);
      }
    });
  },

  renderItem: function(item){
    var self = this,
        blocked;
    //get data from inside the listing object
    item = item.listing;
    item.userCurrencyCode = this.userModel.get('currency_code');
    item.imageURL = this.userModel.get('serverUrl')+"get_image?hash="+item.thumbnail_hash+"&guid="+item.guid;
    item.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+item.avatar_hash+"&guid="+item.guid;
    item.showAvatar = true;
    item.userID = item.guid;
    item.discover = true;

    item.ownFollowing = false;
    if(this.ownFollowing.indexOf(item.guid) != -1){
      item.ownFollowing = true;
    }

    blocked = this.userModel.get('blocked_guids') || [];    
    item.isBlocked = blocked.indexOf(item.guid) !== -1;

    var newItem = function(){
      var newItemModel,
          itemShort;

      if (item.isBlocked) {
        self.setListingsBlockedCount(self.getListingsBlockedCount() + 1);
        return;
      }

      newItemModel = new itemShortModel(item);
      itemShort = new itemShortView({model: newItemModel});

      self.listenTo(newItemModel, 'change:isBlocked', function(model, isBlocked, options) {
        if (isBlocked) {
          self.removeItemView(itemShort);
          self.setListingsBlockedCount(self.getListingsBlockedCount() + 1);
        }
      });

      self.listenTo(itemShort, 'blockUserClick', self.blockUserClick);
      self.listenTo(itemShort, 'unblockUserClick', self.unblockUserClick);

      item.isBlocked && itemShort.$el.hide().addClass('blocked-user');
      self.$el.find('.js-products .js-loadingSpinner').before(itemShort.el);
      self.registerChild(itemShort);
      self.itemViews.push(itemShort);
    };

    if(this.onlyFollowing){
      if(item.ownFollowing){
        newItem();
      }
    } else {
      newItem();
    }    
  },

  renderUser: function(user){
    var self = this,
        blocked = this.userModel.get('blocked_guids') || [];

    if (blocked.indexOf(user.guid) !== -1) return;

    user.serverUrl = this.userModel.get('serverUrl');
    user.userID = user.guid;
    user.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+user.avatar_hash+"&guid="+user.guid;
    
    if(this.ownFollowing.indexOf(user.guid) != -1){
      user.ownFollowing = true;
    }

    var newUserModel = new userShortModel(user);

    this.listenTo(newUserModel, 'change:isBlocked', function(model, isBlocked, options) {
      if (isBlocked) {
        self.removeUserView(storeShort);
      }
    });

    var storeShort = new userShortView({model: newUserModel});
    this.$el.find('.js-vendors .js-loadingSpinner').before(storeShort.el);
    this.registerChild(storeShort);
    this.userViews.push(storeShort);
  },

  setState: function(state, searchItemsText){
    if(!state){
      state = "products";
    }
    this.hideList();
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active');
    this.$el.find('.js-' + state + 'Search').removeClass('hide');

    if(searchItemsText){
      //add action to history
      Backbone.history.navigate("#home/" + state + "/" + searchItemsText.replace(/ /g, ""));
    } else {
      //add action to history
      Backbone.history.navigate("#home/" + state);
    }

    this.state = state;
  },

  createStore: function(){
    Backbone.history.navigate('#userPage/'+this.userModel.get('guid')+'/createStore', {trigger: true});
  },

  createListing: function(){
    Backbone.history.navigate('#sellItem', {trigger: true});
  },

  addFollower: function(guid) {
    if (guid && this.ownFollowing.indexOf(guid) == -1) {
      this.ownFollowing.push(guid);
    }
  },

  removeFollower: function(guid) {
    var index;

    if (guid && (index = this.ownFollowing.indexOf(guid)) !== -1) {
      this.ownFollowing.splice(index, 1);
    }
  },

  _followUnfollowUser: function(follow, options) {
    var self = this;

    if (typeof follow == 'object') {
      options = follow;
      follow = true;
    }

    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + (follow ? "follow" : "unfollow"),
      success: function(data) {
        options.target.closest('.js-userShortView').removeClass('div-fade');
        follow ? self.addFollower(options.guid) : self.removeFollower(options.guid);

        if (self.state == 'products') {
          self.loadUsers();

          // if we're unfollowing on the 'Stores i follow'
          // filter, let's remove all the views for the guid
          // that we've just unfollowed.
          if (!follow && self.onlyFollowing) {
            __.each(self.itemViews, function(item, i) {
              if (item.model.get('guid') === options.guid) {
                self.removeItemView(item);
              }
            });
          }
        } else if (self.state == 'vendors') {
          self.loadItemsOrSearch();
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });    
  },

  followUser: function(options){
    this._followUnfollowUser(options);
  },

  unfollowUser: function(options){
    this._followUnfollowUser(false, options);
  },

  blockUserClick: function(e) {
    this.userModel.blockUser(e.view.model.get('guid'));
  },

  unblockUserClick: function(e) {
    this.userModel.unblockUser(e.view.model.get('guid'));
  },  

  onScroll: function(){
    if(this.obContainer[0].scrollTop + this.obContainer[0].clientHeight + 200 > this.obContainer[0].scrollHeight && !this.searchItemsText){
      if(this.state == "products" && !this.loadingProducts){
        this.setSocketTimeout();
        this.loadingProducts = true;
        this.socketView.getItems(this.socketItemsID);
      } else if(this.state == "vendors" && !this.loadingVendors){
        this.setSocketTimeout();
        this.loadingVendors = true;
        this.socketView.getVendors(this.socketUsersID);
      }
    }
  },

  clearItems: function(){
    this.itemViews.forEach(function (view) {
      view.remove();
    });

    this.itemViews = [];
    this.setListingsBlockedCount(0);
  },

  clearUsers: function(){
    this.userViews.forEach(function (view) {
      view.remove();
    });

    this.userViews = [];
  },

  searchItemsKeyup: function(e){
    var target = $(e.target),
        targetText = target.val().replace("#",'').replace(/ /g, ""),
        addressText = targetText;

    if(e.keyCode == 13){
      this.searchItems(targetText);
      addressText = addressText ? "#" + addressText.replace(/\s+/g, '') : "";
      target.val(addressText);
      window.obEventBus.trigger("setAddressBar", addressText);
    }
  },

  searchItemsClear: function(){
    this.setState("products");
    this.loadItems();

    //clear address bar
    window.obEventBus.trigger("setAddressBar", "");
    
    this.$el.find('.js-discoverHeading').html(window.polyglot.t('Discover'));

    // change loading text copy
    this.$el.find('.js-loadingText').html(this.$el.find('.js-loadingText').data('defaultText'));
    this.$el.find('.js-discoverSearchKeyword').addClass('hide');

  },

  searchItems: function(searchItemsText){
    if(searchItemsText){
      this.searchItemsText = searchItemsText;
      this.clearItems();
      this.socketSearchID = Math.random().toString(36).slice(2);
      this.socketView.search(this.socketSearchID, searchItemsText);
      this.setSocketTimeout();      
      this.$el.find('.js-discoverSearchKeyword').html("#" + searchItemsText);
      this.$el.find('.js-discoverHeading').html("#" + searchItemsText);
      this.$el.find('.js-loadingText').html(this.$el.find('.js-loadingText').data('searchingText'));
      this.$el.find('.js-discoverSearchKeyword').removeClass('hide');
      this.$el.find('.js-homeSearchItemsClear').removeClass('hide');
      this.setState('products', searchItemsText);
    }else{
      this.searchItemsClear();
    }
  },

  loadItems: function(){
    this.clearItems();
    this.socketItemsID = Math.random().toString(36).slice(2);
    this.loadingProducts = true;
    this.socketView.getItems(this.socketItemsID);
    this.setSocketTimeout();
    this.searchItemsText = "";
    this.$el.find('.js-homeSearchItems').val("");
    this.$el.find('.js-homeSearchItemsClear').addClass('hide');
  },

  setListingsBlockedCount: function(count) {
    var text = '';

    count = count || 0;
    if (this._blockedItemCount === count) return;
    this._blockedItemCount = count;
    
    if (count) {
      text = count + ' blocked item' + (count !== 1 ? 's' : '') + ' not shown';
    }

    this.$listingsBlockedCount = this.$listingsBlockedCount || this.$('.homeGridItems .js-blocked-listings-count');
    this.$listingsBlockedCount.text(text);
  },

  getListingsBlockedCount: function() {
    return this._blockedItemCount || 0;
  },

  loadUsers: function(){
    this.clearUsers();
    this.socketUsersID = Math.random().toString(36).slice(2);
    this.loadingVendors = true;
    this.socketView.getVendors(this.socketUsersID);
    this.setSocketTimeout();
  },

  setFollowingFilter: function(e){
    var filterBy = $(e.target).val();
    if(filterBy == "following"){
      this.onlyFollowing = true;
    } else {
      this.onlyFollowing = false;
    }
    this.loadItemsOrSearch();
  },

  loadItemsOrSearch: function(){
    if(this.searchItemsText){
      this.searchItems(this.searchItemsText);
    } else {
      this.loadItems();
    }
  },

  _removeSubView: function(list, view) {
    if (list && Array.isArray(list) && view) {
      for (var i = list.length; i--;) {
        if (view == list[i]) {
          view.remove();
          break;
        }
      }
    }
  },

  removeItemView: function(view) {
    if (!view) return;

    this._removeSubView(this.itemViews, view);
  },

  removeUserView: function(view) {
    if (!view) return;

    this._removeSubView(this.userViews, view);
  },

  remove: function() {
    this.clearSocketTimeout();
    this.scrollHandler && this.obContainer.off('scroll', this.scrollHandler);
    baseVw.prototype.remove.apply(this, arguments);
  }
});
