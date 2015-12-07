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
    this.listWrapper = $('<ul class="flexRow list homeModal-settings scrollOverflowY custCol-primary custCol-text"></ul>');
    __.each(this.chooseLanguages.models, function(item){
      self.renderItem(item);
    },this);
    this.$el.append(this.listWrapper);
    window.obEventBus.trigger("languageListRendered");
  },

  renderItem: function(item){
    var chooseLanguage = new chooseLanguageView({
      model: item,
      selected: this.options.selected
    });
    this.subViews.push(chooseLanguage);
    //$el must be passed in by the constructor
    this.listWrapper.append(chooseLanguage.render().el);
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
  }
});

