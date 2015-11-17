var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "chat flexRow",

  events: {
    'click .js-avatar': 'avatarClick',
    'click .js-username': 'avatarClick'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/notification.html', function(loadedTemplate) {
      var timestamp = self.model.get('timestamp');
      var formatted_timestamp = moment(new Date(timestamp*1000)).format('MMMM Do YYYY, h:mm a');
      self.model.set('formattedTimestamp', formatted_timestamp);
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  avatarClick: function(){
    var targ = $('.js-navNotificationsMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
    Backbone.history.navigate('#userPage/'+this.model.get('guid')+'/store', {trigger: true});

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