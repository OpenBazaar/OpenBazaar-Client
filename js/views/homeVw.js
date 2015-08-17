/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    itemListView = require('../views/itemListVw'),
    storeListView = require('../views/storeListVw')


module.exports = Backbone.View.extend({

  el: '#content',

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeStoresBtn': 'homeStoresClick'
  },

  initialize: function(){
    var self = this;
    this.subViews = [];
    var tmpl = loadTemplate('./js/templates/home.html', function(loadedTemplate){
      self.render(loadedTemplate);
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

  render: function(tmpl){
    this.$el.html(tmpl());
    this.subRender();
  },

  subRender: function(){
    var itemList = new itemListView();
    var storeList = new storeListView();
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