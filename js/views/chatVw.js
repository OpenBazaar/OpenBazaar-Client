var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({
  className: "chat flexRow",

  events: {
    'click .js-avatar': 'avatarClick',
    'click .js-username': 'avatarClick',
    'click .js-chatHead': 'chatHeadClick'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/chat.html', function(loadedTemplate) {
      var chat = self.model.toJSON();
      self.$el.html(loadedTemplate(chat));
    });
    return this;
  },

  avatarClick: function(){
    var targ = $('.js-navNotificationsMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
    Backbone.history.navigate('#userPage/'+this.model.get('guid')+'/store', {trigger: true});

  },

  chatHeadClick: function() {
    var guid = this.model.get('guid');
    var key = this.model.get('encryption_key');
    window.obEventBus.trigger("openChat", guid, key);
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
    delete this.$el;
    delete this.el;
  }

});