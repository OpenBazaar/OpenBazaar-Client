'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    orderModel = require('../models/orderMd'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    baseVw = require('./baseVw'),
    chatMessageView = require('./chatMessageVw'),
    qr = require('qr-encode'),
    messageModal = require('../utils/messageModal'),
    discussionCl = require('../collections/discussionCl'),
    clipboard = require('clipboard');

module.exports = baseVw.extend({

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
    'click .js-startDispute': 'startDispute',
    'click .js-confirmDispute': 'confirmDispute',
    'click .js-sendDiscussionMessage': 'sendDiscussionMessageClick',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function (options) {
    
    var self = this;

    this.orderID = options.orderID;
    this.status = options.status;
    this.transactionType = options.transactionType;
    this.parentEl = options.parentEl;
    this.countriesArray = options.countriesArray;
    this.cCode = options.cCode;
    this.btAve = options.btAve; //average price in bitcoin for one unit of the user's currency
    this.bitcoinValidationRegex = options.bitcoinValidationRegex;
    this.pageState = options.state; //state of the parent view
    this.tabState = options.tabState ;//active tab
    this.socketView = options.socketView;
    this.userModel = options.userModel;
    this.serverUrl = this.userModel.get('serverUrl');
    this.userProfile = options.userProfile;
    this.lastTab = "summary";
    this.discussionCount = 0;

    if(this.userProfile.get('avatar_hash')){
      this.avatarURL = this.userModel.get('serverUrl') + "get_image?hash=" + this.userProfile.get('avatar_hash');
    }

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });

    this.model = new orderModel({
      cCode: this.cCode,
      btAve: this.btAve,
      serverUrl: this.serverUrl,
      status: this.status,
      transactionType: this.transactionType,
      bitcoinValidationRegex: this.bitcoinValidationRegex,
      avatarURL: this.avatarURL
    });
    this.model.urlRoot = options.serverUrl + "get_order";
    this.listenTo(this.model, 'change:priceSet', this.render);
    this.getData();
  },

  getData: function(){
    var self = this;
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      timeout: 4000,
      dataType: 'json',
      success: function (model, response, options) {
        self.model.updateAttributes();
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

  render: function () {
    var self = this;
    $('.js-loadingModal').addClass("hide");
    this.model.set('status', this.status);

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      //hide the modal when it first loads
      self.parentEl.html(self.$el);
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.delegateEvents(); //reapply events if this is a second render
      self.$el.parent().fadeIn(300);
      self.setState(self.tabState);
      if(self.status == 0){
        self.showPayment();
      }
      self.getDiscussion();
      self.discussionScroller = self.$('.js-discussionScroller');
    });
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if(data.notification && data.notification.order_id == this.orderID && data.notification.type == "payment received" && this.status == 0){
      this.status = 1;
      this.getData();
    } else if(data.message && data.message.subject == this.orderID){
      var messageModel = new Backbone.Model(data.message);
      this.addDiscussionMessage(messageModel);
    }
  },

  showPayment: function(){
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
    if(!state){
      state = "summary";
    }
    this.$el.find('.js-main').addClass('hide');
    this.$el.find('.js-tab').removeClass('active');
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active').removeClass('hide');

    if(state == "discussion"){
      this.discussionScroller[0].scrollTop = this.discussionScroller[0].scrollHeight;
    }

    this.lastTab = this.state;
    this.state = state;
  },

  validateInput: function(e) {
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  clickSummaryTab: function(){
    this.setState("summary");
  },

  clickShippingTab: function(){
    this.setState("shipping");
  },

  clickFundsTab: function(){
    this.setState("funds");
  },

  clickDiscussionTab: function(){
    this.setState("discussion");
  },

  showConfirmForm: function(){
    this.setState("confirm");
  },

  showCompleteForm: function(){
    this.setState("complete");
  },

  confirmOrder: function(e){
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
    var self = this,
        targetForm = this.$el.find('#transactionCompleteForm'),
        completeData = {};

    completeData.id = this.orderID;
    this.$el.find('.js-transactionSpinner').removeClass('hide');

    saveToAPI(targetForm, '', this.serverUrl + "complete_order",
        function(data){
          self.status = 3;
          self.tabState = "summary";
          self.getData();
        },
        function(data){
          messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
        },
        completeData);
  },

  checkPayment: function(){
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
  
  getDiscussion: function(){
    var self = this;
    this.discussionCount = 0;
    this.discussionCol = new discussionCl();
    this.discussionCol.url = this.serverUrl + "get_dispute_messages";

    this.discussionCol.fetch({
      data: $.param({'order_id': self.orderID}),
      timeout: 4000,
      dataType: 'json',
      reset: true,
      success: function (collection, response, options) {
        self.addAllDiscussionMessages();
      },
      error: function (jqXHR, status, errorThrown) {
        messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  addDiscussionMessage: function(message){
    var avatarURL = message.outgoing ? this.serverUrl + "get_image?hash=" + message.avatar_hash + "&guid=" + message.guid : this.avatarURL,
        wrapper = this.$('.js-discussionWrapper');

    message.set('avatarURL', avatarURL);
    var discussionMessage = new chatMessageView({
      model: message
    });
    wrapper.append(discussionMessage.el);
    this.discussionCount++;
    this.$('.js-discussionCount').text(this.discussionCount);
    this.discussionScroller[0].scrollTop = this.discussionScroller[0].scrollHeight;
    this.$('.js-discussionForm').removeClass('disabled');
  },

  addAllDiscussionMessages: function(){
    var self = this;
    if(this.discussionCol.length > 0){
      this.$('.js-discussionWrapper').html('');
      this.$('.js-discussionNotStarted').addClass('hide');
      this.$('.js-discussionStarted').removeClass('hide');
    }
    this.discussionCol.each(function(model, i){
      self.addDiscussionMessage(model);
    });
  },

  sendDiscussionMessageClick: function(){
    var guid;
    if(this.transactionType == "purchase"){
      guid = this.model.get('vendor_offer').listing.id.guid;
    } else if(this.transactionType == "sale"){
      guid = this.model.get('buyer_order').order.id.guid;
    }
    this.sendDiscussionMessage(guid);
    this.sendDiscussionMessage(this.model.get('displayModerator').guid);
  },

  sendDiscussionMessage: function(guid){
    var messageInput = this.$('#transactionDiscussionSendText');
    var messageText = messageInput.val();
    if (messageText) {
      var socketMessageId = Math.random().toString(36).slice(2);

      var chatMessage = {
        "request": {
          "api": "v1",
          "id": socketMessageId,
          "command": "send_message",
          "guid": guid,
          "handle": "",
          "message": messageText,
          "subject": this.orderID,
          "message_type": "DISPUTE",
          "recipient_key": this.model.get('vendor_offer').listing.id.pubkeys.encryption
        }
      };
      this.socketView.sendMessage(JSON.stringify(chatMessage));
      messageInput.val('');
      messageInput.closest('.flexRow').removeClass('formChecked');
      this.getDiscussion();
    }
  },

  copyTx: function(e){
    
    var tx = $(e.target).data('tx');
    clipboard.writeText(tx);
  },

  startDispute: function(){
    this.setState("discussion");
  },

  confirmDispute: function(){
    var self = this,
        targetForm = this.$('#transactionDiscussionForm'),
        discussionData = {};

    discussionData.order_id = this.orderID;

    saveToAPI(targetForm, '', this.serverUrl + "dispute_contract", function(data){
      self.status = 4;
      self.tabState = "discussion";
      self.getData();
    }, '', discussionData);
  },

  closeOrderForm: function(e){
    this.setState(this.lastTab);
  },

  blockClicks: function(e) {
    e.stopPropagation();
  },

  closeModal: function(){
    this.trigger("closed");
    this.$el.parent().fadeOut(300);
  }
});