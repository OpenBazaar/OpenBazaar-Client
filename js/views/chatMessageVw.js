var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    sanitizeHTML = require('sanitize-html'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "chatMessage flexRow",

  events: {
    'click .js-chatMessageAvatar': 'avatarClick'
  },

  initialize: function(){
    var timestamp = this.model.get('timestamp');
    var formatted_timestamp = moment(new Date(timestamp*1000)).format('MMM D, h:mm A');
    this.model.set('formattedTimestamp', formatted_timestamp);

    // Handle line breaks
    var msg = sanitizeHTML(this.model.get('message').replace(/\n$/, "").split(/[\r\n]/g).join("<br/><br/>"), {
      allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img' ]
    });
    this.model.set('formattedMessage', msg);
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/chatMessage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.$el.find('a').on('click', function(e){
        e.preventDefault();
        var extUrl = $(this).attr('href');
        if (!/^https?:\/\//i.test(extUrl)) {
          extUrl = 'http://' + extUrl;
        }
        require("shell").openExternal(extUrl);
      });
    });
    return this;
  },

  avatarClick: function(){
    if(this.model.get('outgoing') == false) {
      var targ = $('.js-navNotificationsMenu');
      targ.addClass('hide');
      $('#overlay').addClass('hide');
      Backbone.history.navigate('#userPage/' + this.model.get('guid') + '/store', {trigger: true});
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