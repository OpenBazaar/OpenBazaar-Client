var __ = require('underscore'),
  Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  buyWizardVw = require('./buyWizardVw');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'click .js-descriptionTab': 'descriptionClick',
    'click .js-reviewsTab': 'reviewsClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-buyButton': 'buyClick'
  },

  initialize: function(options){
    this.options = options || {};
    /* expected options are:
    userModel: this is set by app.js, then by a call to the settings API.
    socketView: reference to the socketView
     */
    this.socketView = options.socketView;
    //don't render immediately, wait for the model to update itself with converted prices
    this.listenTo(this.model, 'change:priceSet', this.render);
    this.subViews = [];
    this.subModels = [];
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
    "use strict";
    var self = this,
        buyModel = new Backbone.Model();
    buyModel.set(this.model.attributes);
    this.buyWizardView = new buyWizardVw({model:buyModel, parentEl: '#modalHolder', userModel: this.options.userModel, socketView: this.socketView});
    this.subViews.push(this.buyWizardView);
    this.subModels.push(buyModel);
  },

  close: function(){
    "use strict";
    __.each(this.subModels, function(subModel) {
      subModel.off();
    });
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });

    this.model.off();
    this.off();
    this.remove();
  }
});