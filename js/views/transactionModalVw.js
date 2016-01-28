var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    orderModel = require('../models/orderMd'),
    qr = require('qr-encode'),
    messageModal = require('../utils/messageModal'),
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
    'click .js-showCompleteForm': 'showCompleteForm',
    'click .js-confirmOrder': 'confirmOrder',
    'click .js-completeOrder': 'completeOrder',
    'click .js-copyIncommingTx': 'copyTx',
    'click .js-copyOutgoingTx': 'copyTx',
    'click .js-closeOrderForm': 'closeOrderForm',
    'click .js-showFundOrder': 'showFundOrder',
    'click .js-transactionPayCheck':'checkPayment',
    'blur input': 'validateInput'
  },

  initialize: function (options) {
    "use strict";
    var self = this;

    this.orderID = options.orderID;
    this.status = options.status;
    this.transactionType = options.transactionType;
    this.serverUrl = options.serverUrl;
    this.parentEl = options.parentEl;
    this.countriesArray = options.countriesArray;
    this.cCode = options.cCode;
    this.btAve = options.btAve; //average price in bitcoin for one unit of the user's currency
    this.bitcoinValidationRegex = options.bitcoinValidationRegex;
    this.pageState = options.state //state of the parent view
    this.tabState = options.tabState //active tab
    this.lastTab = "summary";

    this.model = new orderModel({
      cCode: this.cCode,
      btAve: this.btAve,
      serverUrl: this.serverUrl,
      status: this.status,
      transactionType: this.transactionType,
      bitcoinValidationRegex: this.bitcoinValidationRegex
    });
    this.model.urlRoot = options.serverUrl + "get_order";
    this.getData();
  },

  getData: function(){
    var self = this;
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      timeout: 4000,
      dataType: 'json',
      success: function (model, response, options) {
        self.render(response);
      },
      error: function (jqXHR, status, errorThrown) {
        messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
        $('.js-loadingModal').addClass("hide");
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  render: function (response) {
    "use strict";
    var self = this;
    response.status = this.status;
    //console.log(response);
    $('.js-loadingModal').addClass("hide");

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      //hide the modal when it first loads
      self.parentEl.html(self.$el);
      self.$el.html(loadedTemplate(response));
      self.delegateEvents(); //reapply events if this is a second render
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
      if(self.status == 0){
        self.showPayment();
      }
      self.listenTo(window.obEventBus, "socketMessageRecived", function(response){
        self.handleSocketMessage(response);
      });
    });
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.notification && data.notification.order_id == this.orderID && data.notification.type == "payment received" && this.status == 0){
      this.model.set('status', 1);
      this.status = 1;
      this.getData();
    }
  },

  showPayment: function(){
    "use strict";
    console.log(this.model.attributes);
    var totalBTCPrice = 0,
        payHREF,
        dataURI;
    if(this.model.get('buyer_order')){
      payHREF = "bitcoin:" + this.model.get('buyer_order').order.payment.address + "?amount=" + this.model.get('buyer_order').order.payment.amount + "&message=" + this.model.get('vendor_offer').listing.item.title;
      dataURI = qr(payHREF, {type: 10, size: 10, level: 'M'});
      this.$el.find('.js-transactionPayQRCode').attr('src', dataURI);
    } else {
      messageModal.show(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.serverError'));
    }
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

    this.lastTab = this.state;
    this.state = state;
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
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

  showCompleteForm: function(){
    "use strict";
    this.setState("complete");
  },

  confirmOrder: function(e){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#transactionConfirmForm'),
        confirmData = {};

    confirmData.id = this.orderID;
    this.$el.find('.js-transactionSpinner').removeClass('hide');

    saveToAPI(targetForm, '', this.serverUrl + "confirm_order", function(data){
      self.status = 2;
      self.tabState = "summary";
      self.getData();
      }, '', confirmData);
  },

  completeOrder: function(e){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#transactionCompleteForm'),
        completeData = {};

    completeData.id = this.orderID;
    this.$el.find('.js-transactionSpinner').removeClass('hide');

    saveToAPI(targetForm, '', this.serverUrl + "complete_order", function(data){
      self.status = 3;
      self.tabState = "summary";
      self.getData();
    }, '', completeData);
  },

  checkPayment: function(){
    "use strict";
    var self = this,
        formData = new FormData();

    formData.append("order_id", this.orderID);
    $.ajax({ //this only triggers the server to send a new socket message
      type: "POST",
      url: self.model.get('serverUrl') + "check_for_payment",
      contentType: false,
      processData: false,
      data: formData,
      dataType: "json"
    });
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
    this.trigger("closed");
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