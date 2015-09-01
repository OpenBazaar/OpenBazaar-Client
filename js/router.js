var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw');

module.exports = Backbone.Router.extend({

  initialize: function(options){
    this.options = options || {};
  },

  routes: {
    "": "home",
    "home": "home",
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

  newView: function(view){
    this.view && (this.view.close ? this.view.close() : this.view.remove());
    this.view = view;
    $('body').removeClass("body-neutral");//add other body style classes if they are created
  },

  home: function(){
    this.newView(new homeView({userModel: this.options.userModel}));
  },

  myPage: function(){
    this.newView(new userPageView({userModel: this.options.userModel}));
    $('body').addClass("body-neutral");
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