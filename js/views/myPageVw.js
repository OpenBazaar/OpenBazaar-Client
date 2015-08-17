var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userModel = require('../models/userMd')

module.exports = Backbone.View.extend({

  tagname: "myPageView",

  events: {
    'click .btn': 'btnClick'
  },

  initialize: function(){
    var self = this;
    this.model = new userModel();
    this.render();
  },

  render: function(){
    console.log("rendering myPageView");
    var self = this;
    this.$el.appendTo('#content');
    var tmpl = loadTemplate('./js/templates/myPage.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  btnClick: function(e){
    console.log("click");
  }

});

