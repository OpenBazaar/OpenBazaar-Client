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
    this.listenTo(this.model, 'change:priceSet', this.render);
    //this.userID = this.model.get('guid');
    //if price has already been set, render
    if(this.model.get('priceSet') != 0){
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
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/item/'+$(e.target).data('id'), {trigger: true});
  },

  avatarClick: function(){
    console.log("avatarClick");
  }

});