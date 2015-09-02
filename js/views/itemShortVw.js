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
    this.options = options || {};
    console.log(options.showAvatar);
    this.model.set('currency_code', options.currencyCode);
    this.model.set('server', options.server);
    this.model.set('showAvatar', options.showAvatar);
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  itemClick: function(){
    console.log("itemClick");
  },

  avatarClick: function(){
    console.log("avatarClick");
  }

});