var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate');


module.exports = Backbone.View.extend({

  events: {
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  }
});