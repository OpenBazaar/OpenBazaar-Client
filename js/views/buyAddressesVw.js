var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    localize = require('../utils/localize');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'click .js-buyWizardAddressRadio': 'selectAddress',
    'click .js-buyWizardAddressSelected': 'selectAddressAndAdvance'
  },

  className: "flexRow",

  initialize: function(options) {
    "use strict";
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
                selected: selected,
                shipsToList: localize.localizeShippingRegions(self.shippingRegions),
              })
          )
      );
      //this does not add it to the DOM, that is done by the parent view
      self.$('.js-buyWizardAddressRadio').eq(selected).prop('checked', true).trigger('click');
      //self.setAddress(selected);
    });
    return this;
  },

  selectAddressAndAdvance: function(){
    "use strict";
    $(".js-buyWizardAddressNext").trigger( "click" );
  },

  selectAddress: function(){
    "use strict";
    var index = this.$el.find('.js-buyWizardAddressRadio:checked').val();
    this.setAddress(index);
  },

  setAddress: function(index){
    "use strict";
    var selectedAddress = this.model.get('user').shipping_addresses[index];
    if(selectedAddress){
      this.trigger("setAddress", selectedAddress);
    }
  }

});
