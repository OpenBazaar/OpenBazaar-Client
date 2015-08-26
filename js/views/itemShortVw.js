/* shows a single item in a list */

var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexCol-4",

  events: {
  },

  initialize: function(options){
    this.options = options;
    this.model.set('currency_code', options.currencyCode);
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  }

});