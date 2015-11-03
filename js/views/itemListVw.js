var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    //the model must be passed in by the constructor
    this.itemsShort = new itemsShortCollection(this.model);
    //this.listenTo(this.options.userModel, 'change', function(){
    //  self.render();
    //});
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    //clear the list
    this.$el.empty();
    __.each(this.itemsShort.models, function(item){
      self.renderContract(item);
    },this);
  },

  renderContract: function(item){
    var itemShort = new itemShortView({
      model: item,
      el: this.$el
    });
    this.subViews.push(itemShort);
    //this.$el.append(itemShort.render().el);
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

