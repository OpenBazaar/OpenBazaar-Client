var __ = require('underscore'),
  Backbone = require('backbone'),
  $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  events: {
    'click .js-descriptionTab': 'descriptionClick',
    'click .js-reviewsTab': 'reviewsClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-buyButton': 'buyClick'
  },

  initialize: function(){
    var self = this;
    //don't render immediately, wait for the model to update itself with converted prices
    this.listenTo(this.model, 'change:priceSet', this.render);
  },

  render: function(){
    var self = this;
    __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(imageHash, i){
      "use strict";
      var imageExtension = self.model.get('imageExtension') || "";
    });
    //el must be passed in from the parent view
    loadTemplate('./js/templates/item.html', function(loadedTemplate) {
        self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  descriptionClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-description'));
  },

  reviewsClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-reviews'));
  },

  shippingClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-shipping'));
  },

  tabClick: function(activeTab, showContent){
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  buyClick: function(){
    console.log("placeholder for buy button clicked");
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
    delete this.$el;
    delete this.el;
  }
});