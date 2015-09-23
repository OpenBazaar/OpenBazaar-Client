var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow",

  tagName: "li",

  initialize: function(options){
    this.options = options || {};
    this.model.set('selected', this.options.selected);
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/chooseCurrency.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  }

});