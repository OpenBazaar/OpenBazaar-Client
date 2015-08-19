/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    storesShortCollection = require('../collections/storesShortCL'),
    storeShortView = require('./userShortVw')

module.exports = Backbone.View.extend({

  initialize: function(){
    var self = this;
    //the model must be passed in by the constructor
    this.storesShort = new storesShortCollection(this.model);
    this.subViews = [];
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
    this.subViews.push(storeShort);
    //$el must be passed in by the constructor
    this.$el.append(storeShort.render().el);
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

