var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "notification flexRow",

  events: {
    'click .js-actionLink': 'actionClick',
    'click .js-username': 'actionClick'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/notification.html', function(loadedTemplate) {
      var timestamp = self.model.get('timestamp');
      var formatted_timestamp = moment(new Date(timestamp*1000)).format('MMM D, h:mm A');
      self.model.set('formattedTimestamp', formatted_timestamp);
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  actionClick: function(){
    var targ = $('.js-navNotificationsMenu');
    targ.addClass('hide');
    $('#overlay').addClass('hide');
    switch(this.model.get('type')){
      case "follow":
        Backbone.history.navigate('#userPage/'+this.model.get('guid')+'/store', {trigger: true});
        break;
      case "new order":
        Backbone.history.navigate('#transactions', {trigger: true});
        break;
      case "dispute_open":
        Backbone.history.navigate('#transactions', {trigger: true});
        break;
      case "payment received":
        Backbone.history.navigate('#transactions', {trigger: true});
        break;
      case "order confirmation":
        Backbone.history.navigate('#transactions', {trigger: true});
        break;
    }
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