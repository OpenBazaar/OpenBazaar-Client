var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    listingsModel = require('../models/listingsMd'),
    itemListView = require('./itemListVw'),
    storeListView = require('./userListVw')


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
    "contract_hash": "6d48a290e538de40f0ee9f22f13bf31c7c4b33ef",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item One",
    "thumbnail_hash": "d53cffb48beb8c5685cbd2740fe0df07cc44a0a2",
    "price": 12,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ]
  },
  {
    "contract_hash": "6d48a290e538de40f0ee9f22f13bf31c7c4b33ef",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Two with a Longer Title To See How That Fits in the UI",
    "thumbnail_hash": "d53cffb48beb8c5685cbd2740fe0df07cc44a0a2",
    "price": 379.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ]
  },
  {
    "contract_hash": "6d48a290e538de40f0ee9f22f13bf31c7c4b33ef",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Four",
    "thumbnail_hash": "d53cffb48beb8c5685cbd2740fe0df07cc44a0a2",
    "price": 2.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ]
  },
  {
    "contract_hash": "6d48a290e538de40f0ee9f22f13bf31c7c4b33ef",
    "category": "Test",
    "nsfw": false,
    "title": "Test Item Four",
    "thumbnail_hash": "d53cffb48beb8c5685cbd2740fe0df07cc44a0a2",
    "price": 323479.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ]
  }
];


module.exports = Backbone.View.extend({

  className:"homeView",

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeStoresBtn': 'homeStoresClick'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.subViews = [];
    this.render();
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

  render: function(tmpl){
    var self = this;
    this.$el.appendTo('#content');
    var tmpl = loadTemplate('./js/templates/home.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      self.subRender();
    });
  },

  subRender: function(){
    var itemList = new itemListView({model: fakeItems, el: '.js-list1', userModel: this.options.userModel, showAvatar: true});
    var storeList = new storeListView({model: fakeStores, el: '.js-list2'});
    this.subViews.push(itemList,storeList);
    this.hideList1();
  },

  homeItemsClick: function(e){
    this.hideList1();
  },

  homeStoresClick: function(e){
    this.hideList2();
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