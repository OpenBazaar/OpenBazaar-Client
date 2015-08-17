var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userModel = require('../models/userMd')

module.exports = Backbone.View.extend({

  el: '#pageNav',

  events: {
    'click .btn': 'btnClick',
    'click .js-navProfile': 'navProfileClick'
  },

  initialize: function(){
    var self = this;
    this.model = new userModel();
    this.render();
  },

  initAccordian: function(targ){
    var acc = $(targ);
    acc.css('border', 'solid 2px red');
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.initAccordian('.js-profileAccordian');
    });
    return this;
  },

  btnClick: function(e){
    console.log("nav button clicked");
  },

  navProfileClick: function(e){
    $('.js-navProileMenu').toggleClass('hide');
  }

});

