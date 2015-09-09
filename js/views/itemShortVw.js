var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4",

  events: {
    'click .js-item': 'itemClick',
    'click .js-avatar': 'avatarClick'
  },

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    console.log("item guid: "+this.model.get('userID'));
    this.userID = this.model.get('userID');
  },

  render: function(){
    console.log("itemShortVw render");
    var self = this;
    loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  itemClick: function(e){
    console.log("itemclick #userPage/"+this.userID+'/item/'+$(e.target).data('id'));
    Backbone.history.navigate('#userPage/'+this.userID+'/item/'+$(e.target).data('id'), {trigger: true});
  },

  avatarClick: function(){
    console.log("avatarClick");
  }

});