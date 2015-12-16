var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4 custCol-border",

  events: {
  },

  initialize: function(){
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/orderShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  close: function(){
    this.unbind();
    this.remove();
  }

});