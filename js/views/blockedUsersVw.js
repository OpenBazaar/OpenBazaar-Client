var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    blockedUserVw =  require('./blockedUserVw');

module.exports = Backbone.View.extend({

  className: "flexCol-12 flex-border js-tabTarg js-blocked",

  events: {
  },

  initialize: function(){
    this.subViews = [];
  },

  render: function(){
    var self = this;

    this.$el.empty();

    this.collection.each(function(user) {
      var view = new blockedUserVw({
          model: user
        });

      self.subViews.push(view);
      self.$el.append(view.render().el);
    });

    return this;
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