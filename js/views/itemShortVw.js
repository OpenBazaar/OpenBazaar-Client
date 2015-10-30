var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4 custCol-border-secondary",

  events: {
    'click .js-item': 'itemClick',
    'click .js-avatar': 'avatarClick'
  },

  initialize: function(){
    //pre-load image
    var self=this;
    this.preloaded = false;
    this.preLoadImg = $('<img>').attr('src', this.model.get('imageURL')).on('load', function(){
      self.preloaded = true;
      //if view renders after image is loaded
      self.$el.find('.js-item').addClass('imageLoaded');
    });
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
      if(self.preloaded === true){
        //if image loaded before view was rendered
        self.$el.find('.js-item').addClass('imageLoaded');
      }
    });
    return this;
  },

  itemClick: function(e){
    var self = this;
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/item/'+$(e.target).data('id'), {trigger: true});
  },

  avatarClick: function(){
    console.log("avatarClick");
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/store', {trigger: true});
  }

});