var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "notification",

  events: {
    //'click .js-item': 'itemClick'
  },

  initialize: function(){
    var self=this;
    this.render();
    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/notification.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.hasOwnProperty('notification')) {
      console.log('Got Notification from Websocket:', data.notification);
    }
    //if(data.id == this.socketItemID){
    //  this.renderItem(data);
    //} else if(data.id == this.socketVendorID) {
    //  this.renderUser(data.vendor);
    //}
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