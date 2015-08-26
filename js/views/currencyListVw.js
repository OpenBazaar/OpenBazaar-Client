var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    chooseCurrenciesCollection = require('../collections/chooseCurrencyCl'),
    chooseCurrencyView = require('../views/chooseCurrencyVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options;
    this.countries = new countriesModel();
    //create a list of currencies from the country list, so we can maintain a single set of data
    var uniqueCurrencies = _.uniq(this.countries.get('countries'), function(item){return item.code});
    var orderedCurrencies = uniqueCurrencies.sort(function(a,b){
      var cA = a.currency.toLowerCase(), cB = b.currency.toLowerCase();
      if (cA < cB)
        return -1
      if (cA > cB)
        return 1
      return 0
    });
    this.chooseCurrencies = new chooseCurrenciesCollection(orderedCurrencies);
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    _.each(this.chooseCurrencies.models, function(item){
      self.renderItem(item);
    },this);
  },

  renderItem: function(item){
    var chooseCurrency = new chooseCurrencyView({
      model: item,
      selected: this.options.selected
    });
    this.subViews.push(chooseCurrency);
    //$el must be passed in by the constructor
    this.$el.append(chooseCurrency.render().el);
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

