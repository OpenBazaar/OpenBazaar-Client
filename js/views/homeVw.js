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
    'click .js-homeCreateStore': 'createStore'
  },

  initialize: function(options){
    var self = this;
    this.model = new Backbone.Model();
    this.options = options || {};
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.socketView = options.socketView;
    this.state = options.state;
    this.slimVisible = false;
    this.subViews = [];
    this.obContainer = $('#obContainer');
    this.loadingProducts = false;
    this.loadingVendors = false;

    this.model.set({user: this.options.userModel.toJSON(), page: this.userProfile.toJSON()});

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketItemID = Math.random().toString(36).slice(2);
    this.socketVendorID = Math.random().toString(36).slice(2);

    //listen to follow and unfollow events
    this.listenTo(window.obEventBus, "followUser", function(guid){
      this.followUser(guid);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(guid){
      this.unfollowUser(guid);
    });

    this.render();
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
    $('.js-feed, .js-products, .js-vendors').addClass('hide');
    $('.js-homeItemsSearch, .js-homeStoresSearch, .js-homeFeedSearch').addClass('hide');
    $('.js-productsTab, .js-vendorsTab, .js-feedTab').removeClass('active');
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketItemID){
      this.loadingProducts = false;
      this.renderItem(data);
    } else if(data.id == this.socketVendorID) {
      this.loadingVendors = false;
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
      self.setState(self.state);
      if(self.model.get('page').profile.vendor == true) {
        self.$el.find('.js-homeCreateStore').addClass('hide');
        self.$el.find('.js-homeMyPage').addClass('show');
      }

      //get vendors and items
      self.loadingProducts = true;
      self.socketView.getItems(self.socketItemID);
      self.loadingVendors = true;
      self.socketView.getVendors(self.socketVendorID);
      self.setSocketTimeout();

      //listen to scrolling on container
      self.obContainer.on('scroll', function(){self.scrollHandler();});
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
    this.$el.find('.js-products .js-loadingSpinner').before(itemShort.el);
    this.subViews.push(itemShort);
  },

  renderUser: function(user){
    "use strict";
    user.serverUrl = this.userModel.get('serverUrl');
    user.userID = user.guid;
    user.avatarURL = this.userModel.get('serverUrl')+"get_image?hash="+user.avatar_hash+"&guid="+user.guid;
    var newUserModel = new userShortModel(user);
    var storeShort = new userShortView({model: newUserModel});
    this.$el.find('.js-vendors .js-loadingSpinner').before(storeShort.el);
    this.subViews.push(storeShort);
  },

  renderNoneFound: function(){
    "use strict";
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  setState: function(state){
    "use strict";
    if(!state){
      state = "products";
    }
    this.hideList();
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active');
    this.$el.find('.js-' + state + 'Search').removeClass('hide');

    //add action to history
    Backbone.history.navigate("#home/" + state);
    this.state = state;

  },

  createStore: function(){
    "use strict";
    Backbone.history.navigate('#userPage/'+this.userModel.get('guid')+'/createStore', {trigger: true});
  },

  followUser: function(options){
    "use strict";
    console.log(options);
    var self = this;
    $.ajax({
      type: "POST",
      data: {'guid': options.guid},
      dataType: 'json',
      url: this.options.userModel.get('serverUrl') + "follow",
      success: function(data) {
        //self.subRender();
        options.target.closest('.js-userShortView').removeClass('div-fade');
      },
      error: function(jqXHR, status, errorThrown){
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
        //self.subRender();
        options.target.closest('.js-userShortView').removeClass('div-fade');
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
    if(this.obContainer[0].scrollTop + this.obContainer[0].clientHeight + 200 > this.obContainer[0].scrollHeight){
      if(this.state == "products" && !this.loadingProducts){
        this.setSocketTimeout();
        this.loadingProducts = true;
        this.socketView.getItems(this.socketItemID);
      } else if(this.state == "vendors" && !this.loadingVendors){
        this.setSocketTimeout();
        this.loadingVendors = true;
        this.socketView.getVendors(this.socketVendorID);
      }
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
