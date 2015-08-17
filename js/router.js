var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var homeView = require('./views/homeVw');

module.exports = Backbone.Router.extend({
  routes: {
    "": "home",
    "myPage": "myPage",
    "customizePage": "customizePage",
    "sellItem": "sellItem",
    "purchases": "purchases",
    "sales": "sales",
    "cases": "cases",
    "notifications": "notifications",
    "settings": "settings",
    "about": "about",
    "support": "support"
  },

  home: function(){
    var home = new homeView();
  },

  myPage: function(){
    console.log("myPage");
  },

  customizePage: function(){
    console.log("customizePage");
  },

  sellItem: function(){
    console.log("sellItem");
  },

  purchases: function(){
    console.log("purchases");
  },

  sales: function(){
    console.log("sales");
  },

  cases: function(){
    console.log("cases");
  },

  notifications: function(){
    console.log("notifications");
  },

  settings: function(){
    console.log("settings");
  },

  about: function(){
    console.log("about");
  },

  support: function(){
    console.log("support");
  },

});