var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userModel = require('../models/userMd'),
    userPageModel = require('../models/userPageMd'),
    itemListView = require('../views/itemListVw')

var fakeUserPage = {
  active: true,
  categories: ["ponies", "autonomous collectives"],
  moderators: ["ob1", "Name of a Moderator Here"],
  shipsTo: "Bolivia",
  bannerImg: "/imgs/defaultBanner.png",
  about: "Example about text. This is plain text only. It can be as long or as short as a user wants it to be.",
  website: "http://www.exampleOfWebsite.com",
  email: "example@exampleOfEmail.com",
  facebook: "https://www.facebook.com/bitcoins",
  twitter: "https://twitter.com/bitcoin",
  instagram: "https://instagram.com/bitcoin/",
  followers: ["handle1", "handle2", "handle3"],
  following: ["handle4", "handle5", "handle6"],
  customization: "",
  contracts: ["ID1", "ID2", "ID3"]
}

module.exports = Backbone.View.extend({

  tagname: "userView",

  events: {
    'click .btn': 'btnClick'
  },

  initialize: function(){
    var self = this;
    this.subViews = [];
    this.model = new Backbone.Model();
    this.userModel = new userModel();
    this.userPageModel = new userPageModel();
    this.model.set({user: this.userModel.toJSON(), page: this.userPageModel.toJSON()});
    this.render();
  },

  render: function(){
    var self = this;
    this.$el.appendTo('#content');
    var tmpl = loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    this.subRender();
    return this;
  },

  subRender: function(){
    var itemList = new itemListView();
    this.subViews.push(itemList);
  },

  btnClick: function(e){
    console.log("click");
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

