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
    this.subViews = [];
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
    this.listenTo(window.obEventBus, "followUser", function(guid){
      self.followUser(guid);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(guid){
      self.unfollowUser(guid);
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
      console.log(self.ownFollowing);
      typeof callback === 'function' && callback();
    }).fail(function(jqXHR, status, errorThrown){
      console.log(jqXHR);
      console.log(status);
      console.log(errorThrown);
    });
  },

  setSocketTimeout: function(){
    "use strict";
    var self = this;
    this.$el.find('.js-loadingSpinner').removeClass('fadeOut');
    this.socketTimeout = window.setTimeout(function(){
        self.$el.find('.js-loadingSpinner').addClass('fadeOut');
        window.clearTimeout(self.socketTimeout);
    }, 2000);

  },

  resetLookingCount: function(){
    "use strict";
    this.lookingCount = 0;
  },

  hideList: function(){
    $('.js-feed, .js-products, .js-vendors, .js-productsSearch').addClass('hide');
    $('.js-productsTab, .js-vendorsTab, .js-feedTab').removeClass('active');
  },

  handleSocketMessage: function(response) {
    "use strict";
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
    "use strict";
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
      self.obContainer.on('scroll', function(){self.scrollHandler();});

      //populate search field
      if(self.searchItemsText){
        self.$el.find('.js-homeSearchItems').val(self.searchItemsText);
      }
    });
  },

  renderItem: function(item){
    "use strict";
    var self = this;
    //get data from inside the listing object
    item = item.listing;
    item.userCurrencyCode = this.userModel.get('currency_code');
    item.imageURL = this.userModel.get('serverUrl')+"get_image?hash="+item.thumbnail_hash+"&guid="+item.guid;
    item.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+item.avatar_hash+"&guid="+item.guid;
    item.showAvatar = true;
    item.userID = item.guid;
    item.discover = true;
    if(this.ownFollowing.indexOf(item.guid) != -1){
      item.ownFollowing = true;
    }    

    var newItem = function(){
      var newItemModel = new itemShortModel(item);
      var itemShort = new itemShortView({model: newItemModel});
      self.$el.find('.js-products .js-loadingSpinner').before(itemShort.el);
      self.subViews.push(itemShort);
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
    "use strict";
    var self = this;
    user.serverUrl = this.userModel.get('serverUrl');
    user.userID = user.guid;
    user.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+user.avatar_hash+"&guid="+user.guid;
    if(this.ownFollowing.indexOf(user.guid) != -1){
      user.ownFollowing = true;
    }
    var newUserModel = new userShortModel(user);
    var storeShort = new userShortView({model: newUserModel});
    self.$el.find('.js-vendors .js-loadingSpinner').before(storeShort.el);
    self.subViews.push(storeShort);
  },

  renderNoneFound: function(){
    "use strict";
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  setState: function(state, searchItemsText){
    "use strict";
    if(!state){
      state = "products";
    }
    this.hideList();
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active');
    this.$el.find('.js-' + state + 'Search').removeClass('hide');

    if(searchItemsText){
      //add action to history
      Backbone.history.navigate("#home/" + state + "/" + searchItemsText);
    } else {
      //add action to history
      Backbone.history.navigate("#home/" + state);
    }

    this.state = state;
  },

  createStore: function(){
    "use strict";
    Backbone.history.navigate('#userPage/'+this.userModel.get('guid')+'/createStore', {trigger: true});
  },

  createListing: function(){
    "use strict";
    Backbone.history.navigate('#sellItem', {trigger: true});
  },

  _followUnfollowUser: function(follow, options) {
    var self = this;
    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + (follow ? "follow" : "unfollow"),
      success: function(data) {
        options.target.closest('.js-userShortView').removeClass('div-fade');
        //get_following will not be ready right away after this call
        var state = self.state;
        window.setTimeout(function(){
          self.fetchOwnFollowing(function() {
            if (state == 'products') {
              self.loadUsers();

              if (!follow) {
                console.log('keep it real yall');
              }

              if (!follow && self.onlyFollowing) {
                console.log('foo');
                window.foo = options;
              }
            } else if (state == 'vendors') {
              self.loadItemsOrSearch();
            }
          });
        }, 1000);
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });    
  },

  followUser: function(options){
    // this._followUnfollowUser(true, options);

    // return;
    "use strict";
    var self = this;
    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "follow",
      success: function(data) {
        options.target.closest('.js-userShortView').removeClass('div-fade');
        //get_following will not be ready right away after this call
        var state = self.state;
        window.setTimeout(function(){
          self.loadItemsOrSearch();
          self.loadUsers();
        }, 1000);
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  unfollowUser: function(options){
    // this._followUnfollowUser(false, options);

    // return;
    "use strict";
    var self = this;
    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "unfollow",
      success: function() {
        options.target.closest('.js-userShortView').removeClass('div-fade');
        //get_following will not be ready right away after this call
        var state = self.state;
        window.setTimeout(function(){
          self.loadItemsOrSearch();
          self.loadUsers();
        }, 1000);
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  scrollHandler: function(){
    "use strict";
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
    "use strict";
    this.$el.find('.js-products > *').not('.js-loadingSpinner').remove();
  },

  clearUsers: function(){
    "use strict";
    this.$el.find('.js-vendors > *').not('.js-loadingSpinner').remove();
  },

  searchItemsKeyup: function(e){
    "use strict";
    var target = $(e.target),
        targetText = target.val();

    if(targetText.length > 0 && e.keyCode == 13){
      this.searchItems(targetText);
    }
  },

  searchItemsClear: function(){
    "use strict";
    this.setState("products");
    this.loadItems();
  },

  searchItems: function(searchItemsText){
    "use strict";
    if(searchItemsText){
      this.searchItemsText = searchItemsText;
      this.clearItems();
      this.socketSearchID = Math.random().toString(36).slice(2);
      this.socketView.search(this.socketSearchID, searchItemsText);
      this.setSocketTimeout();
      this.$el.find('.js-homeSearchItemsClear').removeClass('hide');
      this.setState('products', searchItemsText);
    }
  },

  loadItems: function(){
    "use strict";
    this.clearItems();
    this.socketItemsID = Math.random().toString(36).slice(2);
    this.loadingProducts = true;
    this.socketView.getItems(this.socketItemsID);
    this.setSocketTimeout();
    this.searchItemsText = "";
    this.$el.find('.js-homeSearchItems').val("");
    this.$el.find('.js-homeSearchItemsClear').addClass('hide');
  },

  loadUsers: function(){
    "use strict";
    this.clearUsers();
    this.socketUsersID = Math.random().toString(36).slice(2);
    this.loadingVendors = true;
    this.socketView.getVendors(this.socketUsersID);
    this.setSocketTimeout();
  },

  setFollowingFilter: function(e){
    "use strict";
    var filterBy = $(e.target).val();
    if(filterBy == "following"){
      this.onlyFollowing = true;
    } else {
      this.onlyFollowing = false;
    }
    this.loadItemsOrSearch();
  },

  loadItemsOrSearch: function(){
    console.log('what-what: ' + this.onlyFollowing);
    if(this.searchItemsText){
      this.searchItems(this.searchItemsText);
    } else {
      this.loadItems();
    }
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
