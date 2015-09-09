var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw')

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    //the model must be passed in by the constructor
    this.itemsShort = new itemsShortCollection(this.model);
    this.listenTo(this.options.userModel, 'change', function(){
      self.render();
    });
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    //clear the list
    this.$el.empty();
    _.each(this.itemsShort.models, function(item){
      self.renderContract(item);
    },this);
  },

  renderContract: function(item){
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

