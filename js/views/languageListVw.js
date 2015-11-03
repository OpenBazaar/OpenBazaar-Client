var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    languagesModel = require('../models/languagesMd'),
    chooseLanguagesCollection = require('../collections/chooseLanguageCl'),
    chooseLanguageView = require('../views/chooseLanguageVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options || {};
    this.languages = new languagesModel();
    this.chooseLanguages = new chooseLanguagesCollection(this.languages.get('languages'));
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    __.each(this.chooseLanguages.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var chooseLanguage = new chooseLanguageView({
      model: item,
      selected: this.options.selected
    });
    this.subViews.push(chooseLanguage);
    //$el must be passed in by the constructor
    this.$el.append(chooseLanguage.render().el);
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
    delete this.$el;
    delete this.el;
  }
});

