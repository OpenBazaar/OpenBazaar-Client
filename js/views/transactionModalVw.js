var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    orderModel = require('../models/orderMd');

module.exports = Backbone.View.extend({

  className: "modal modal-opaque js-transactionModal",

  events: {
    'click .js-transactionModal': 'blockClicks',
    'click .js-closeModal': 'closeModal'
  },

  initialize: function (options) {
    "use strict";
    var self = this;

    this.orderID = options.orderID;
    this.serverUrl = options.serverUrl;
    this.parentEl = options.parentEl;
    this.countriesArray = options.countriesArray;
    this.cCode = options.cCode;
    this.btAve = options.btAve; //average price in bitcoin for one unit of the user's currency
    console.log(options);

    this.model = new orderModel({cCode: this.cCode, btAve: this.btAve, serverUrl: this.serverUrl});
    this.model.urlRoot = options.serverUrl + "get_order"; //replace with real API call when ready
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      success: function(model){
        var cCode = self.cCode,
            displayUnitPrice = "" ,
            displayShippingPrice = "test2",//fiat and btc, or just btc
            displayCountry = self.countriesArray.filter(function(value){
              return value.dataName == model.get('buyer_order').order.shipping ? model.get('buyer_order').order.shipping.country : "";
            }),
            arrayOfModerators = model.get('vendor_offer').listing.moderators,
            orderModerator = model.get('buyer_order').order.moderator,
            displayModerator = arrayOfModerators ? arrayOfModerators.filter(function(moderator){
              return moderator.guid == orderModerator;
            }) : "";

        //model.set('displayPrice', displayPrice);
        //model.set('displayShippingPrice', displayShippingPrice);
       // model.set('displayCountry', displayCountry);
       // model.set('displayModerator', displayModerator[0]);
       // model.set('serverUrl', self.serverUrl);
       // console.log(model.attributes);
        self.render();
      }
    });
  },

  render: function () {
    "use strict";
    var self = this;

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      //hide the modal when it first loads
      self.parentEl.html(self.$el);
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.$el.parent().fadeIn(300);
    });
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();
  },

  closeModal: function(){
    this.$el.parent().fadeOut(300);
  },

  close: function(){
    "use strict";
    __.each(this.subModels, function(subModel) {
      subModel.off();
    });
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });

    this.model.off();
    this.off();
    this.remove();
  }
});