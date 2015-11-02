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
    this.preloaded = [];
    //don't render immediately, wait for the model to update itself with converted prices
    this.listenTo(this.model, 'change:priceSet', this.render);
  },

  render: function(){
    var self = this;
    __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(imageHash, i){
      "use strict";
      var imageExtension = self.model.get('imageExtension') || "";
      var preLoadImg = $('<img>').on('load', function(){
        self.preloaded[i] = true;
        //if view renders after image is loaded
        self.$el.find('.itemImg').eq(i).addClass('imageLoaded');
      });
      preLoadImg.attr('src', self.model.get('server_url') + "get_image?hash=" + imageHash + imageExtension);
    });
    //el must be passed in from the parent view
    loadTemplate('./js/templates/item.html', function(loadedTemplate) {
        self.$el.html(loadedTemplate(self.model.toJSON()));
          __.each(self.model.get('vendor_offer').listing.item.image_hashes, function(imageHash, i){
            "use strict";
            if(self.preloaded[i] === true){
              //if view renders after image is loaded
              self.$el.find('.itemImg').eq(i).addClass('imageLoaded');
            }
          });
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
    "use strict";
    this.remove();
  }
});