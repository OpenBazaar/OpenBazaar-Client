/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    storesShortCollection = require('../collections/storesShortCL'),
    storeShortView = require('./storeShortVw')

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

module.exports = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.storesShort = new storesShortCollection(fakeStores);
    this.render();
  },

  render: function(){
    var self = this;
    _.each(this.storesShort.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var storeShort = new storeShortView({
      model: item
    });
    $('.js-list2').append(storeShort.render().el);
  }

});

