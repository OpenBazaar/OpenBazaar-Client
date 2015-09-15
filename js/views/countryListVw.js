var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    chooseCountriesCollection = require('../collections/chooseCountryCl'),
    chooseCountryView = require('../views/chooseCountryVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.countries = new countriesModel();
    this.chooseCountries = new chooseCountriesCollection(this.countries.get('countries'));
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    __.each(this.chooseCountries.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var chooseCountry = new chooseCountryView({
      model: item,
      selected: this.options.selected
    });
    this.subViews.push(chooseCountry);
    //$el must be passed in by the constructor
    this.$el.append(chooseCountry.render().el);
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

