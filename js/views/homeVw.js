/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    itemListView = require('./itemListVw'),
    storeListView = require('./userListVw')


var fakeStores = [
  {
    name: "A Store",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png",
    nsfw: false
  },
  {
    name: "A Second Store",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png",
    nsfw: false
  },
  {
    name: "A Third Store",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png",
    nsfw: false
  }
];

var fakeItems = [
  {
    title: "Item Name",
    contract_hash: 0,
    price: 32.91,
    thumbnail_hash: "",
    avatar_hash: ""
  },
  {
    title: "Item Two",
    contract_hash: 0,
    price: 32.91,
    thumbnail_hash: "imgs/defaultItem.png",
    avatar_hash: "imgs/defaultItem.png"
  },
  {
    title: "Item Three",
    contract_hash: 0,
    price: 32.91,
    thumbnail_hash: "imgs/defaultItem.png",
    avatar_hash: ""
  },
  {
    title: "Item Four",
    contract_hash: 0,
    price: 32.91,
    thumbnail_hash: "imgs/defaultItem.png",
    avatar_hash: ""
  }
];


module.exports = Backbone.View.extend({

  className:"homeView",

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeStoresBtn': 'homeStoresClick'
  },

  initialize: function(){
    var self = this;
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
    var itemList = new itemListView({model: fakeItems, el: '.js-list1'});
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