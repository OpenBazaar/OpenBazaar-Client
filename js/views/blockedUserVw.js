var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow borderBottom",

  events: {
    'click .js-unblockUser': 'unblockUser'
  },

  initialize: function(){
    var self = this;

    this.listenTo(this.model, 'change', function() {
      self.render();
    });
  },

  unblockUser: function(e) {
    this.trigger('unblockUserClick', { originalEvent: e, view: this });
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/blockedUser.html', function(loadedTemplate) {
      self.$el.html(
        loadedTemplate(self.model.toJSON())
      );
    });

    return this;
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
  }
});