var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw');
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.category = options.category || "all";
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
    if(this.itemsShort.models.length > 0)
    {
      __.each(this.itemsShort.models, function(item){
        if (item.toJSON().category == self.category || self.category == "all") {
          self.renderContract(item);
        }
      },this);
    }else{
      self.renderNoneFound();
    }
  },

  renderContract: function(item){
    var itemShort = new itemShortView({
      model: item,
      parentEl: this.$el
    });
    this.subViews.push(itemShort);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
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
  }
});
