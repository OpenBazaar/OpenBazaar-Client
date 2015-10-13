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
    this.listenTo(this.model, 'change', this.render);
    this.userID = this.model.get('userID');
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  itemClick: function(e){
    Backbone.history.navigate('#userPage/'+this.userID+'/item/'+$(e.target).data('id'), {trigger: true});
  },

  avatarClick: function(){
    console.log("avatarClick");
  }

});