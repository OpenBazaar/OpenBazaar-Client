var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userPageModel = require('../models/userPageMd'),
    listingsModel = require('../models/listingsMd'),
    usersModel = require('../models/usersMd'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    simpleMessageView = require('./simpleMessageVw')

module.exports = Backbone.View.extend({

  classname: "userView",

  events: {
    'click .js-aboutTab': 'aboutClick',
    'click .js-followersTab': 'followersClick',
    'click .js-followingTab': 'followingClick',
    'click .js-storeTab': 'storeClick'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.subViews = [];
    this.model = new Backbone.Model();
    this.userModel = options.userModel;
    this.userPage = new userPageModel();
    //models have to be passed the dynamic URL
    this.userPage.url = options.userModel.get('server')+"get_profile";
    this.listings = new listingsModel();
    this.listings.url = options.userModel.get('server')+"get_listings";
    this.followers = new usersModel();
    this.followers.url = options.userModel.get('server')+"get_followers";
    this.following = new usersModel();
    this.following.url = options.userModel.get('server')+"get_following";

    this.userPage.fetch({success: function(model){
      self.model.set({user: self.userModel.toJSON(), page: model.toJSON()});
      self.render();
    }});
  },

  render: function(){
    var self = this;
    this.$el.appendTo('#content');
    var tmpl = loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.listings.fetch({
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
      self.setState(self.options.state);
    });
    return this;
  },

  renderItems: function(model){
    var itemList = new itemListView({model:model, el: '.js-list3', userModel: this.options.userModel, showAvatar: false});
    this.subViews.push(itemList);
  },

  renderFollowers: function(model){
    var followerList = new personListView({model:model, el: '.js-list1', title: "You Don't Have Any Followers Yet", message: ""});
    this.subViews.push(followerList);
  },

  renderFollowing: function(model){
    var followingList = new personListView({model:model, el: '.js-list2', title: "You Aren't Following Anyone Yet", message: ""});
    this.subViews.push(followingList);
  },

  showError: function(title, message, target){
    var errorView = new simpleMessageView({title: title, message: message, el: target});
    this.subViews.push(errorView);
  },

  setState: function(state) {
    if(state)
    {
      this.tabClick($(".js-" + state + "Tab"), this.$el.find(".js-" + state), state);
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
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
    //add action to history
    Backbone.history.navigate('#myPage/'+state);
  },

  close: function(){
    _.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }

});

