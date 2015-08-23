var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    chooseCountriesCollection = require('../collections/chooseCountryCl'),
    chooseCountryView = require('../views/chooseCountryVw');

module.exports = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.countries = new countriesModel();
    this.chooseCountries = new chooseCountriesCollection(this.countries.get('countries'));
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    _.each(this.chooseCountries.models, function(item){

      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var chooseCountry = new chooseCountryView({
      model: item
    });
    this.subViews.push(chooseCountry);
    //$el must be passed in by the constructor
    this.$el.append(chooseCountry.render().el);
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

