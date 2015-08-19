/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    itemsShortlection = require('../collections/itemsShortCL'),
    itemShortView = require('./itemShortVw')

module.exports = Backbone.View.extend({

  initialize: function(){
    var self = this;
    //the model must be passed in by the constructor
    this.itemsShort = new itemsShortlection(this.model);
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    _.each(this.itemsShort.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var itemShort = new itemShortView({
      model: item
    });
    this.subViews.push(itemShort);
    //$el must be passed in by the constructor
    this.$el.append(itemShort.render().el);
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

