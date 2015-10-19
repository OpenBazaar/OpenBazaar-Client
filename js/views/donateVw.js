var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    donateModel = require('../models/donateMd'),    
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "donateView",

  initialize: function(){
    this.model = new donateModel();
    this.render();
    console.log("Donate view created.");     // Test statement to verify creation
  },

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/donate.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  }

});