var __ = require('underscore'),
    Backbone = require('backbone'),
    Moment = require('moment'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),//TODO: Remove FS - it is not used?
    loadTemplate = require('../utils/loadTemplate'),
    itemListView = require('./itemListVw'),
    storeListView = require('./userListVw');


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
    "server": "http://seed.openbazaar.org:18469/api/v1/",
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
    "thumbnail_hash": "63d7f80ce14357d6355150481f81c84356cea2f7",
    "price": 379.0,
    "origin": "UNITED_STATES",
    "currency_code": "usd",
    "ships_to": [
      "UNITED_STATES"
    ],
    "userCurrencyCode": "USD",
    "server": "http://seed.openbazaar.org:18469/api/v1/",
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
    "server": "http://seed.openbazaar.org:18469/api/v1/",
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
    "server": "http://seed.openbazaar.org:18469/api/v1/",
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

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/home.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      self.subRender();
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
