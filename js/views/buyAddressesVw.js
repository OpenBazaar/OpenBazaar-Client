'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  events: {
    'click .js-buyWizardAddressRadio': 'selectAddressClick',
    'click .js-buyWizardAddressSelected': 'selectAddressAndAdvance'
  },

  className: "flexRow",

  initialize: function(options) {
    this.userModel = options.userModel;
    this.worldwide = options.worldwide;
    this.shippingRegions = options.shippingRegions || [];
    //don't render on init, let parent trigger the render
  },

  render: function(selected){
    this.model.set('user', this.userModel.toJSON());
    var self = this;
    loadTemplate('./js/templates/buyAddresses.html', function(loadedTemplate) {
      self.$el.html(
          loadedTemplate(
              __.extend({}, self.model.toJSON(), {
                worldwide: self.worldwide,
                selected: selected
              })
          )
      );
      //this does not add it to the DOM, that is done by the parent view
      self.$('.js-buyWizardAddressRadio').eq(selected).prop('checked', true);
      self.selectAddress(selected);
      //self.setAddress(selected);
    });
    return this;
  },

  selectAddressAndAdvance: function(){
    $(".js-buyWizardAddressNext").trigger( "click" );
  },

  selectAddressClick: function(e) {
    this.selectAddress($(e.target).val());
  },

  selectAddress: function(index){
    this.setAddress(index);
  },

  setAddress: function(index){
    var selectedAddress = this.model.get('user').shipping_addresses[index];
    if (selectedAddress){
      this.trigger("setAddress", selectedAddress);
    }
  }

});
