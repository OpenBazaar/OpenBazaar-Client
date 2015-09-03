var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4",

  events: {
    'click .js-item': 'itemClick',
    'click .js-avatar': 'avatarClick'
  },

  initialize: function(options){
    /*this.options = options || {};
    var modelParams = {
      userCurrencyCode: options.userCurrencyCode,
      server: options.server,
      showAvatar: options.showAvatar
    };
    this.model.set(modelParams);*/
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  itemClick: function(e){
    Backbone.history.navigate('#userPage/item/'+$(e.target).data('id'), {trigger: true});
  },

  avatarClick: function(){
    console.log("avatarClick");
  }

});