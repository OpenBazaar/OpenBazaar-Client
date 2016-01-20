var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4 custCol-border",

  events: {
    'click .js-item': 'itemClick',
    'click .js-avatar': 'avatarClick',
    'click .js-editItem': 'editItem',
    'click .js-userShortFollow': 'followUser',
    'click .js-userShortUnfollow': 'unfollowUser'
  },

  initialize: function(){
    //pre-load image
    var self=this;
    this.listenTo(this.model, 'change:priceSet', this.render);
    //this.userID = this.model.get('guid');
    //if price has already been set, render
    if(this.model.get('priceSet') !== 0){
      this.render();
    }
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  itemClick: function(e){
    var self = this;
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/item/'+$(e.target).closest('.js-item').data('id'), {trigger: true});
  },

  avatarClick: function(){
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/store', {trigger: true});
  },

  followUser: function(e) {
    window.obEventBus.trigger('followUser', {'guid': this.model.get('guid'), 'target': $(e.target)});
    this.$el.find('.js-userShortUnfollow').removeClass('hide');
    this.$el.find('.js-userShortFollow').addClass('hide');
  },

  unfollowUser: function(e){
    window.obEventBus.trigger('unfollowUser', {'guid': this.model.get('guid'), 'target': $(e.target)});
    this.$el.find('.js-userShortUnfollow').addClass('hide');
    this.$el.find('.js-userShortFollow').removeClass('hide');
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