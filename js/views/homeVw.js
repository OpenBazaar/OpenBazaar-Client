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
    storeWizardVw = require('./storeWizardVw');


var fakeStores = [
  {
    name: "A Store",
    handle: 0,
    avatar_hash: "",
    nsfw: false
  },
  {
    name: "A Second Store",
    handle: 0,
    avatar_hash: "",
    nsfw: false
  },
  {
    name: "A Third Store",
    handle: 0,
    avatar_hash: "",
    nsfw: false
  }
];

var fakeItems = [
  {
    "contract_hash": "2fefc6d167eb0e21ae0019821a64c59771d830fc",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item One",
    "thumbnail_hash": "a8a38198fbfba2cfb6c45f16a3b0cb44ef769414",
    "price": 12,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ],
    "userCurrencyCode": "USD",
    "server_url": "http://seed.openbazaar.org:18469/api/v1/",
    "showAvatar": true,
    "avatar_hash": "",
    "handle": "test user 1",
    "guid": "1"
  },
  {
    "contract_hash": "66a3de906bed05a635d6876997f0f74f6d37c4f7",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Two with a Longer Title To See How That Fits in the UI",
    "thumbnail_hash": "",
    "price": 379.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ],
    "userCurrencyCode": "USD",
    "server_url": "http://seed.openbazaar.org:18469/api/v1/",
    "showAvatar": true,
    "avatar_hash": "",
    "handle": "test user 1",
    "guid": "1"
  },
  {
    "contract_hash": "a62c340b4d5ab8124123cc8de24a5ebd9ec338be",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Four",
    "thumbnail_hash": "79f5c703e48cd3a4cc6b0ea861612f1fa17bd26d",
    "price": 2.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ],
    "userCurrencyCode": "USD",
    "server_url": "http://seed.openbazaar.org:18469/api/v1/",
    "showAvatar": true,
    "avatar_hash": "",
    "handle": "test user 1",
    "guid": "1"
  },
  {
    "contract_hash": "601875c82657469636940ffcc52c148d63621403",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Four",
    "thumbnail_hash": "e9e37e8efc72c57d59741a235e944e56781849a3",
    "price": 323479.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ],
    "userCurrencyCode": "USD",
    "server_url": "http://seed.openbazaar.org:18469/api/v1/",
    "showAvatar": true,
    "avatar_hash": "",
    "handle": "test user 1",
    "guid": "1"
  }
];


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
    this.subViews = [];

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

  render: function(){
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
    var itemList = new itemListView({model: fakeItems, el: '.js-list1', userModel: this.options.userModel, showAvatar: true});
    var storeList = new storeListView({model: fakeStores, el: '.js-list2'});
    this.subViews.push(itemList,storeList);
    this.hideList1();

    //render current date
    $('.js-currentDate').html(Moment().format('MMMM Do, YYYY'));
  },

  homeItemsClick: function(e){
    this.hideList1();
  },

  homeStoresClick: function(e){
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
