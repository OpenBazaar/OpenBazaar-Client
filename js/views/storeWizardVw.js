var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfile');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {},

  initialize: function() {
    console.log("init store wizard");
    this.render();
  },

  render: function() {
    var self = this;
    loadTemplate('./js/templates/storeWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model));
    });
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }

});