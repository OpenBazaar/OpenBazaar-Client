'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    baseVw = require('./baseVw'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = baseVw.extend({

  initialize: function(options){
    this.options = options || {};
    this.category = options.category || "all";
    //the model must be passed in by the constructor
    this.itemsShort = new itemsShortCollection(this.model);
    //this.listenTo(this.options.userModel, 'change', function(){
    //  self.render();
    //});
    
    // as of now, our base view doesn't support registerChild happening
    // before the view is fully initialized, hence the timeout here:
    setTimeout(() => {
      this.render();
    });
  },

  render: function(){
    var self = this;
    //clear the list
    this.$el.empty();
    if (this.itemsShort.models.length > 0) {
      __.each(this.itemsShort.models, function(item){
        if (item.toJSON().category == self.category || self.category == "all") {
          self.renderContract(item);
        }
      }, this);
    } else {
      self.renderNoneFound();
    }
  },

  renderContract: function(item){
    var itemShort = new itemShortView({
      model: item,
      parentEl: this.$el
    });
    // this.$el.append(itemShort.render().$el);
    this.registerChild(itemShort);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.registerChild(simpleMessage);
  }
});
