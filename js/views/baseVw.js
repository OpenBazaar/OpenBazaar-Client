var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    Polyglot = require('node-polyglot'),
    loadTemplate = require('../utils/loadTemplate'),
    userModel = require('../models/userMd'),
    languagesModel = require('../models/languagesMd'),
    pageNavView = require('./pageNavVw');

module.exports = Backbone.View.extend({

  el: "body",

  className: "baseView",

  initialize: function(){
    this.subViews = [];

    this.user = new userModel();

    this.languages = new languagesModel();
    this.lang = this.user.get("language");
    //put polyglot in the window so all templates can reach it
    window.polyglot = new Polyglot({locale: this.lang});
    polyglot.extend(this.languages.get(this.lang));

    this.render();
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/base.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      self.subRender();
    });
    return this;
  },

  subRender: function(){
    var pageNav = new pageNavView({model: this.user, language: this.lang});
    this.subViews.push(pageNav);
  },

  close: function(){
    _.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }

});