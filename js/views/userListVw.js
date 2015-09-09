/* shows grid of items */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    usersShortCollection = require('../collections/usersShortCl'),
    userShortView = require('./userShortVw'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    /*expected options:
      options.title: title for no users found
      options.message: message for no users found
    */
    //the model must be passed in by the constructor
    this.usersShort = new usersShortCollection(this.model);
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    if(this.usersShort.models.length > 0)
    {
      _.each(this.usersShort.models, function (item)
      {
        self.renderItem(item);
      }, this);
    }else{
      self.renderNoneFound();
    }
  },

  renderItem: function(item){
    var storeShort = new userShortView({
      model: item
    });
    this.subViews.push(storeShort);
    //$el must be passed in by the constructor
    this.$el.append(storeShort.render().el);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
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

