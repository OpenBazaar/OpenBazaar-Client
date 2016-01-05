var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    languagesModel = require('../models/languagesMd'),
    chooseLanguagesCollection = require('../collections/chooseLanguageCl');
module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options || {};
    this.languages = new languagesModel();
    this.chooseLanguages = new chooseLanguagesCollection(this.languages.get('languages'));
    this.render();
  },

  render: function(){
    var self = this;
    this.listContents = [];

    __.each(this.chooseLanguages.models, function(item){
      self.renderItem(item);
    },this);

    this.$el.append('<ul class="flexRow list homeModal-settings scrollOverflowY custCol-primary custCol-text customThemeScrollbar">'+ this.listContents.join('') +'</ul>');

    window.obEventBus.trigger("languageListRendered");
  },

  renderItem: function(item){
    var itemJSON = item.toJSON();
    itemJSON.selected = this.options.selected;
    this.listContents.push('<li class="flexRow custCol-border">');
    this.listContents.push('<div class="rowItem js-homeModal-languageSelect paddingLeft6" data-code="'+ itemJSON.langCode +'">');
    this.listContents.push('<input type="radio" class="fieldItem" id="'+ itemJSON.langCode +'" name="'+ itemJSON.langCode +'"');
    if(itemJSON.selected == itemJSON.langCode){
      this.listContents.push('checked="checked"');
    }
    this.listContents.push('>');
    this.listContents.push('<label class="homeModal-language radioLabel" for="'+ itemJSON.langCode +'">'+ itemJSON.langName +'</label>');
    this.listContents.push('</div></li>');
  },

  close: function(){
    this.unbind();
    this.remove();
  }
});

