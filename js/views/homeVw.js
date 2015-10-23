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
    storeWizardVw = require('./storeWizardVw'),
    itemShortView = require('./itemShortVw'),
    itemShortModel = require('../models/itemShortMd'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  className:"homeView",

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeStoresBtn': 'homeStoresClick',
    'click .js-homeCreateStore': 'createStore'
  },

  initialize: function(options){
    var self = this;
    this.model = new Backbone.Model();
    this.options = options || {};
    this.userModel = options.userModel;
    this.userProfile = new userProfileModel();
    this.userProfile.urlRoot = this.userModel.get('server_url') + "profile";
    this.socketView = options.socketView;
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

    // Josh, not sure where this should go, move wherever needed
    var slimVisible = false;
    $("#obContainer").scroll(function(){
      if ($(this).scrollTop() > 20 && slimVisible === false ) {
        slimVisible = true;
        $('.home-page-navigation-filler').show();
        $('.home-page-header').addClass('home-page-header-slim');
        $('.home-page-header-slim').show();
        $('.home-page-content .thumbnail-large').addClass('thumbnail-large-slim');
      }
      if ($(this).scrollTop() < 20 && slimVisible === true ) {
        slimVisible = false;
        $('.home-page-navigation-filler').hide();
        $('.home-page-header').removeClass('home-page-header-slim');
        $('.home-page-header-slim').hide();
        $('.home-page-content .thumbnail-large').removeClass('thumbnail-large-slim');
      }
    });

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){this.handleSocketMessage(response)});
    this.socketItemID = Math.random().toString(36).slice(2);
    this.socketVendorID = Math.random().toString(36).slice(2);
    this.socketView.getItems(this.socketItemID);
    this.socketView.getVendors(this.socketVendorID);
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

  hideList1: function(e){
    $('.js-list1').show();
    $('.js-list2').hide();
    $('.js-homeItemsBtn').addClass('active');
    $('.js-homeStoresBtn').removeClass('active');
  },

  hideList2: function(e){
    $('.js-list1').hide();
    $('.js-list2').show();
    $('.js-homeItemsBtn').removeClass('active');
    $('.js-homeStoresBtn').addClass('active');
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
      self.subRender();
      if(self.model.get('page').profile.vendor == true) {
        self.$el.find('.js-homeCreateStore').addClass('hide');
        self.$el.find('.js-homeMyPage').addClass('show');
      }
    });
  },

  subRender: function(){
    "use strict";
    //var itemList = new itemListView({model: fakeItems, el: '.js-list1', userModel: this.options.userModel, showAvatar: true});
    //var storeList = new storeListView({model: fakeStores, el: '.js-list2'});
    //this.subViews.push(itemList,storeList);
    this.hideList1();

    //render current date
    $('.js-currentDate').html(Moment().format('MMMM Do, YYYY'));
  },

  renderItem: function(item){
    "use strict";
    //get data from inside the listing object
    item = item.listing;
    item.userCurrencyCode = this.userModel.get('currency_code');
    item.server_url = this.userModel.get('server_url');
    item.userID = item.guid;
    var newItemModel = new itemShortModel(item);
    //var itemShort = new itemShortView({model: newItemModel, el: '.js-list1'});
    var itemShort = new itemShortView({model: newItemModel});
    this.$el.find('.js-list1').append(itemShort.el);
    this.subViews.push(itemShort);
  },

  renderUser: function(user){
    "use strict";
    user.server_url = this.userModel.get('server_url');
    user.userID = user.guid;
    var newUserModel = new userShortModel(user)
    //var storeShort = new userShortView({model: newUserModel, el: '.js-list2'});
    var storeShort = new userShortView({model: newUserModel});
    this.$el.find('.js-list2').append(storeShort.el);
    this.subViews.push(storeShort);
  },

  renderNoneFound: function(){
    "use strict";
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  homeItemsClick: function(e){
    "use strict";
    this.hideList1();
  },

  homeStoresClick: function(e){
    "use strict";
    this.hideList2();
  },

  createStore: function() {
    "use strict";
    var self = this,
        storeWizardModel = new Backbone.Model();
    //copy the view model into the new wizard model
    storeWizardModel.set(this.model.attributes);
    this.storeWizardView = new storeWizardVw({model:storeWizardModel, parentEl: '#modalHolder'});
    this.listenTo(this.storeWizardView, 'storeCreated', this.storeCreated);
    this.subViews.push(this.storeWizardView);
  },

  storeCreated: function() {
    "use strict";
    this.storeWizardView.closeWizard();
    this.$el.find('.js-homeCreateStore').addClass('hide');
    this.$el.find('.js-homeMyPage').removeClass('hide');
    //if updates to this page change the page, it will need to be reloaded with the code below
    //Backbone.history.navigate('#home', {trigger: true});
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
