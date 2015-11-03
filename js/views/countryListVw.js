var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    chooseCountriesCollection = require('../collections/chooseCountryCl'),
    chooseCountryView = require('../views/chooseCountryVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options || {};
    this.countries = new countriesModel();
    this.chooseCountries = new chooseCountriesCollection(this.countries.get('countries'));
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    this.listWrapper = $('<div class="flexRow scrollOverflowY"></div>');
    __.each(this.chooseCountries.models, function(item){
      self.renderItem(item);
    },this);
    this.$el.append(this.listWrapper);
  },

  renderItem: function(item){
    var chooseCountry = new chooseCountryView({
      model: item,
      selected: this.options.selected
    });
    this.subViews.push(chooseCountry);
    //appending to the DOM one by one is too slow, and the last 1/3 of the items won't be added. Add to a holder element instead.
    this.listWrapper.append(chooseCountry.render().el);
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

