/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    itemsShortlection = require('../collections/itemsShortCL'),
    itemShortView = require('./itemShortVw')

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
    avatar_hash: ""
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

  initialize: function(){
    var self = this;
    this.itemsShort = new itemsShortlection(fakeItems);
    this.render();
  },

  render: function(){
    var self = this;
    _.each(this.itemsShort.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var itemShort = new itemShortView({
      model: item
    });
    $('.js-list1').append(itemShort.render().el);
  }

});

