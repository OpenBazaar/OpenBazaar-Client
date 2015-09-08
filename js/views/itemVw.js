var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');


module.exports = Backbone.View.extend({

    events: {
        'click .js-descriptionTab': 'descriptionClick',
        'click .js-reviewsTab': 'reviewsClick',
        'click .js-shippingTab': 'shippingClick',
        'click .js-buyButton': 'buyClick'
    },

    initialize: function(){
        //don't render immediately, wait for the model to update itself with converted prices
        this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
        var self = this;
        var tmpl = loadTemplate('./js/templates/item.html', function(loadedTemplate) {
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
    }
});