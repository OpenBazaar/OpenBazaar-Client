var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userPageModel = require('../models/userPageMd'),
    listingsModel = require('../models/listingsMd'),
    itemListView = require('./itemListVw'),
    personListView = require('./userListVw'),
    simpleMessageView = require('./simpleMessageVw')

var fakeFollowers = [
  {
    name: "Following Franklin",
    handle: "sonOfRichards",
    avatar_hash: "http://www.thehindu.com/multimedia/dynamic/01626/ISBS-person_G0N_21_1626148e.jpg",
    nsfw: false
  },
  {
    name: "Following Frankie",
    handle: "HeraldOnFire",
    avatar_hash: "http://www.thehindu.com/multimedia/dynamic/01513/25-ISBS-PERSON__10_1513372e.jpg",
    nsfw: false
  },
  {
    name: "Following Fantine",
    handle: "sheKeepsHerselfSoPureAndClean",
    avatar_hash: "https://oracleoffilm.files.wordpress.com/2014/09/670px-escape-an-angry-person-holding-a-stabbing-object-step-2.jpg",
    nsfw: false
  },
  {
    name: "Following Ford",
    handle: "soLongAndThanksForOnlyTheFirstThreeBooks",
    avatar_hash: "http://greatergood.berkeley.edu/images/made/images/uploads/angerAAF_435_289.jpg",
    nsfw: false
  }
];

var fakeFollowing = [
  {
    name: "Followed Feldspar",
    handle: "RockLord",
    avatar_hash: "http://onin.london/assets/Sad-man-202x300.jpg",
    nsfw: false
  },
  {
    name: "Followed Finn",
    handle: "theHuman",
    avatar_hash: "http://imgick.pennlive.com/home/penn-media/width620/img/midstate_impact/photo/mulhollandpng-4e2607505c5a08e9.png",
    nsfw: false
  },
  {
    name: "Followed Flynn",
    handle: "iamAUser",
    avatar_hash: "http://4.bp.blogspot.com/_Y4Ao_KEr11k/TUQY_QUD87I/AAAAAAAAAG4/Tx4WFQ2KSYE/s1600/smallface.jpg",
    nsfw: false
  },
  {
    name: "Followed Four",
    handle: "ofNine",
    avatar_hash: "http://www.behindthechair.com/multimedia/Articles/Business/1682/db-smiling-lady_orig_large.jpg",
    nsfw: false
  }
];

var fakeItems = [
  {
    title: "Unicorn in a Can",
    contract_hash: 0,
    price: 32.91,
    thumbnail_hash: "http://danindemand.com/wp-content/uploads/2014/05/Unicorn-Meat.jpg",
    avatar_hash: "http://1.bp.blogspot.com/-r7-UG5TX7Jo/UkQt67-DZUI/AAAAAAAAAIM/VIPjVMTjgf8/s1600/Screen+Shot+2013-09-24+at+9.34.07+AM.png"
  },
  {
    title: "Totally Safe Uranium",
    contract_hash: 0,
    price: 21368502452.00,
    thumbnail_hash: "http://web.spotcoolstuff.com/wp-content/uploads/2009/06/uranium-ore.jpg",
    avatar_hash: "http://www.comp.nus.edu.sg/~cs4243/project2012/image/zhang%20ziyi-2.jpg"
  },
  {
    title: "Bandages",
    contract_hash: 0,
    price: 500,
    thumbnail_hash: "http://cdn.ymaservices.com/editorial_service/media/images/000/042/229/original/bacon_bandages_wide.jpg.jpg?1404213961",
    avatar_hash: "http://images.sodahead.com/polls/001889239/327926951_Director20SIPD_answer_4_xlarge.jpeg"
  },
  {
    title: "Weasel Hat",
    contract_hash: 0,
    price: 1.13,
    thumbnail_hash: "https://s-media-cache-ak0.pinimg.com/236x/33/9b/87/339b87c46cd9ee10824dd2e9645d6be4.jpg",
    avatar_hash: "http://www.bugtreat.com/blog/wp-content/uploads/2013/08/Lafont-Darling-319_00.jpg"
  },
  {
    title: "Minimal Viable Item",
    contract_hash: 0,
    price: 1.00,
    thumbnail_hash: "",
    avatar_hash: ""
  }
];

module.exports = Backbone.View.extend({

  classname: "userView",

  events: {
    'click .js-about': 'aboutClick',
    'click .js-followers': 'followersClick',
    'click .js-following': 'followingClick',
    'click .js-stores': 'storeClick'
  },

  initialize: function(options){
    var self = this;
    this.options = options;
    this.subViews = [];
    this.model = new Backbone.Model();
    this.userModel = options.userModel;
    this.userPage = new userPageModel();
    console.log(options.userModel.get('server'));
    this.listings = new listingsModel();
    this.listings.url = options.userModel.get('server')+"/get_listings";

    this.userPage.fetch({success: function(model){
      self.model.set({user: self.userModel.toJSON(), page: model.toJSON()});
      console.log(self.model);
      self.render();
    }});
  },

  render: function(){
    var self = this;
    this.$el.appendTo('#content');
    var tmpl = loadTemplate('./js/templates/userPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.subRender();
      console.log(self.listings);
      self.listings.fetch({
        success: function(model){
          self.renderItems(model.get('listings'));
        },
        error: function(model, response){
          self.showError("There Has Been An Error","Store listings are not available. The error code is: "+response.statusText);
        }
      });
    });
    return this;
  },

  subRender: function(){
    var followerList = new personListView({model:fakeFollowers, el: '.js-list1'});
    this.subViews.push(followerList);
    var followingList = new personListView({model:fakeFollowing, el: '.js-list2'});
    this.subViews.push(followingList);
  },

  renderItems: function(model){
    var itemList = new itemListView({model:model, el: '.js-list3', userModel: this.options.userModel});
    this.subViews.push(itemList);
  },

  showError: function(title, message){
    var errorView = new simpleMessageView({title: title, message: message, el: '.js-list3'});
    this.subViews.push(errorView);
  },

  aboutClick: function(e){
    this.tabClick(e, this.$el.find('.js-about'));
  },

  followersClick: function(e){
    this.tabClick(e, this.$el.find('.js-following'));
  },

  followingClick: function(e){
    this.tabClick(e, this.$el.find('.js-followers'));
  },

  storeClick: function(e){
    this.tabClick(e, this.$el.find('.js-store'));
  },

  tabClick: function(e, showTab){
    this.$el.find('.js-tab').removeClass('active');
    $(e.target).closest('.js-tab').addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showTab.removeClass('hide');
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

