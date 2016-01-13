var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    orderModel = require('../models/orderMd'),
    clipboard = require('clipboard');

module.exports = Backbone.View.extend({

  className: "modal modal-opaque js-transactionModal",

  events: {
    'click .js-transactionModal': 'blockClicks',
    'click .js-closeModal': 'closeModal',
    'click .js-summaryTab': 'clickSummaryTab',
    'click .js-shippingTab': 'clickShippingTab',
    'click .js-fundsTab': 'clickFundsTab',
    'click .js-discussionTab': 'clickDiscussionTab',
    'click .js-showConfirmForm': 'showConfirmForm',
    'click .js-confirmOrder': 'confirmOrder',
    'click .js-copyIncommingTx': 'copyTx',
    'click .js-copyOutgoingTx': 'copyTx',
    'click .js-closeOrderForm': 'closeOrderForm'
  },

  initialize: function (options) {
    "use strict";
    var self = this;

    this.orderID = options.orderID;
    this.status = options.status;
    this.serverUrl = options.serverUrl;
    this.parentEl = options.parentEl;
    this.countriesArray = options.countriesArray;
    this.cCode = options.cCode;
    this.btAve = options.btAve; //average price in bitcoin for one unit of the user's currency
    this.pageState = options.state //state of the parent view
    this.tabState = options.modalTab //active tab
    this.lastTab = "summary";

    this.model = new orderModel({cCode: this.cCode, btAve: this.btAve, serverUrl: this.serverUrl, status: this.status});
    this.model.urlRoot = options.serverUrl + "get_order";
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      success: function (model, response, options) {
        self.render(response);
      }
    });
  },

  render: function (model) {
    "use strict";
    var self = this;
    console.log(self.model.toJSON());

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      //hide the modal when it first loads
      self.parentEl.html(self.$el);
      self.$el.html(loadedTemplate(model));
      self.$el.parent().fadeIn(300);
      self.setState(self.tabState);
      self.$el.find('.js-externalLink').on('click', function(e){
        e.preventDefault();
        var extUrl = $(this).attr('href');
        if (!/^https?:\/\//i.test(extUrl)) {
          extUrl = 'http://' + extUrl;
        }
        require("shell").openExternal(extUrl);
      });
    });
  },

  setState: function(state){
    "use strict";
    if(!state){
      state = "summary";
    }
    this.$el.find('.js-main').addClass('hide');
    this.$el.find('.js-tab').removeClass('active');
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active');

    //add action to history
    Backbone.history.navigate("#transactions/" + this.pageState + "/" + state);

    this.lastTab = this.state;
    this.state = state;
  },

  clickSummaryTab: function(){
    "use strict";
    this.setState("summary");
  },

  clickShippingTab: function(){
    "use strict";
    this.setState("shipping");
  },

  clickFundsTab: function(){
    "use strict";
    this.setState("funds");
  },

  clickDiscussionTab: function(){
    "use strict";
    this.setState("discussion");
  },

  showConfirmForm: function(){
    "use strict";
    this.setState("confirm");
  },

  confirmOrder: function(e){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#transactionConfirmForm'),
        confirmData = {};

    confirmData.id = this.orderID;

    saveToAPI(targetForm, '', this.serverUrl + "confirm_order", function(data){
      console.log(data);
    }, '', confirmData);

    },

  copyTx: function(e){
    "use strict";
    var tx = $(e.target).data('tx');
    clipboard.writeText(tx);
  },

  closeOrderForm: function(e){
    "use strict";
    this.setState(this.lastTab);
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