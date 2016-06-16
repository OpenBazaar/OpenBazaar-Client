'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow custCol-border",

  tagName: "li",

  initialize: function(options){
    this.options = options || {};
    this.model.set('selected', this.options.selected);
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/chooseLanguage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if (subView.close){
        subView.close();
      } else {
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }

});