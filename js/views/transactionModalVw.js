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
    'click .js-hideConfirmForm': 'hideConfirmForm',
    'click .js-showFeedbackRating': 'showFeedbackRating',
    'click .js-hideFeedbackRating': 'hideFeedbackRating',
    'click .js-showCompleteForm': 'showCompleteForm',
    'click .js-completeOrderHide': 'completeOrderHide',
    'click .js-confirmOrder': 'confirmOrder',
    'click .js-completeOrder': 'completeOrder',
    'click .js-copyIncommingTx': 'copyTx',
    'click .js-copyOutgoingTx': 'copyTx',
    'click .js-closeOrderForm': 'closeOrderForm',
    'click .js-showFundOrder': 'showFundOrder',
    'click .js-transactionPayCheck':'checkPayment',
    'click .js-startDispute': 'startDispute',
    'click .js-sendDiscussionMessage': 'sendDiscussionMessageClick',
    'click #transactionsCloseDisputeCheckbox': 'showCloseDispute',
    'change #transactionsBuyerPayoutPercent': 'updateBuyerBTC',
    'change #transactionsSellerPayoutPercent': 'updateSellerBTC',
    'click .js-transactionShowContract': 'showContract',
    'click .js-transactionHideContract': 'hideContract',
    'click .js-acceptResolution': 'acceptResolution',
    //'click .js-refundTransaction': 'showRefundOrder',
    //'click .js-refundOrder': 'refundOrder',
    'click .js-refundTransaction': 'refundOrder',
    'focus .js-transactionDiscussionSendText': 'highlightInput',
    'blur .js-transactionDiscussionSendText': 'blurInput',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'keydown #transactionDiscussionSendText': 'onKeydownDiscussion',
    'keyup #transactionDiscussionSendText': 'onKeyupDiscussion'
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
    this.discussionCol = new discussionCl();
    this.discussionCol.url = this.serverUrl + "order_messages";

    if(this.userProfile.get('avatar_hash')){
      this.avatarURL = this.userModel.get('serverUrl') + "get_image?hash=" + this.userProfile.get('avatar_hash');
    }

    this.listenTo(window.obEventBus, "socketMessageReceived", this.handleSocketMessage);

    this.listenTo(this.discussionCol, "add", this.addDiscussionMessage);

    this.model = new orderModel({
      cCode: this.cCode,
      btAve: this.btAve,
      serverUrl: this.serverUrl,
      status: this.status,
      transactionType: this.transactionType,
      bitcoinValidationRegex: this.bitcoinValidationRegex,
      avatarURL: this.avatarURL,
      avatar_hash: this.userProfile.get('avatar_hash'),
      orderID: this.orderID
    });
    this.model.urlRoot = options.serverUrl + "get_order";
    this.listenTo(this.model, 'change:priceSet', this.render);
    this.getData();
  },

  getData: function(){
    var self = this;
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      dataType: 'json',
      success: function (model, response, options) {
        self.model.set('displayJSON', JSON.stringify(model.toJSON(), null, 2));
        //TODO set 'payout' here if the user has a payout from a dispute
        if(!response.invalidData){
          self.model.updateAttributes();
        } else {
          messageModal.show(window.polyglot.t('errorMessages.serverError'));
        }
      },
      error: function (jqXHR, status, errorThrown) {
        messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
        $('.js-loadingModal').addClass("hide");
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      },
      complete: function(xhr, textStatus) {
        if(textStatus == 'parsererror'){
          messageModal.show(window.polyglot.t('errorMessages.serverError'), window.polyglot.t('errorMessages.badJSON'));
        }
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
      // add blur to container
      $('#obContainer').addClass('blur');
      self.delegateEvents(); //reapply events if this is a second render
      self.$el.parent().fadeIn(300);
      self.setState(self.tabState);
      if(self.status == 0){
        self.showPayment();
      }
      self.getDiscussion();
      self.discussionScroller = self.$('.js-discussionScroller');
      self.moderatorPercentage = self.model.get('displayModerator').feeDecimal;
    });
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if(data.notification && data.notification.order_id == this.orderID){
      switch(data.notification.type){
        case "payment received":
          this.status = 1;
          this.tabState = "summary";
          break;
        case "order confirmation":
          this.status = 2;
          this.tabState = "summary";
          break;
        /* //this notification is not sent yet by the server
        case "payment released":
          this.status = 3;
          this.tabState = "summary";
          break;
          */
      }
      this.getData();
    } else if(data.message && data.message.subject == this.orderID){
      var messageModel = new Backbone.Model(data.message);
      this.discussionCol.add(messageModel);
      if(data.message.message_type == "DISPUTE_OPEN"){
        this.status = 4;
        this.tabState = "discussion";
        this.getData();
      }
      if(data.message.message_type == "DISPUTE_CLOSE"){
        this.status = 5;
        this.tabState = "discussion";
        this.getData();
      }
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

  showContract: function(){
    console.log("show contract")
    this.$('.js-transactionsContractHolder').addClass('bottom0');
    this.$('.js-transactionShowContract').addClass('hide');
    this.$('.js-transactionHideContract').removeClass('hide');
  },

  hideContract: function(){
    this.$('.js-transactionsContractHolder').removeClass('bottom0');
    this.$('.js-transactionShowContract').removeClass('hide');
    this.$('.js-transactionHideContract').addClass('hide');
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

  highlightInput: function(e) {
    this.$('.js-discussionForm').addClass('custCol-border').removeClass('custCol-border-secondary');
  },

  blurInput: function(e) {
    this.$('.js-discussionForm').removeClass('custCol-border').addClass('custCol-border-secondary');
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
    this.$('.js-transactionDiscussionSendText').focus();
  },

  hideConfirmForm: function(){
    this.$('.js-transactionShowContract').removeClass('hide');
    this.$('.js-transactionsConfirmOrderHolder').removeClass('bottom0');
  },
  
  showConfirmForm: function(){
    this.$('.js-transactionShowContract').addClass('hide');
    this.$('.js-transactionsConfirmOrderHolder').addClass('bottom0');
    this.$("#transactionConfirmForm input:text").first().focus();
  },

  showFeedbackRating: function(){
    this.$('.js-transactionShowContract').addClass('hide');
    this.$('.js-transactionFeedback').addClass('bottom0');
  },

  hideFeedbackRating: function(){
    this.$('.js-transactionShowContract').removeClass('hide');
    this.$('.js-transactionFeedback').removeClass('bottom0');
  },

  showRefundOrder: function(){
    this.setState("refund");
  },

  showCompleteForm: function(){
    this.$('.js-transactionShowContract').addClass('hide');
    this.$('.js-complete').addClass('bottom0');
  },

  completeOrderHide: function(){
    this.$('.js-transactionShowContract').removeClass('hide');
    this.$('.js-complete').removeClass('bottom0');
  },

  confirmOrder: function(e){
    var self = this,
        targetForm = this.$el.find('#transactionConfirmForm'),
        confirmData = {};

    confirmData.id = this.orderID;
    this.$('.js-transactionSpinner').removeClass('hide');

    saveToAPI(targetForm, '', this.serverUrl + "confirm_order", function(data){
      self.status = 2;
      self.tabState = "summary";
      self.getData();
      }, '', confirmData, '', function(){
      self.$('.js-transactionSpinner').addClass('hide');
    });
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
          self.$el.find('.js-transactionSpinner').addClass('hide');
          messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + data.reason + "</i>");
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

    this.discussionCol.fetch({
      data: $.param({'order_id': self.orderID}),
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
    var newAttributes = {},
        wrapper = this.$('.js-discussionWrapper');

    newAttributes.moderatorGuid = this.model.get('displayModerator').guid;
    newAttributes.transactionType = this.transactionType;
    newAttributes.vendorGuid = this.model.get('vendor_offer').listing.id.guid;
    newAttributes.buyerGuid = this.model.get('buyer_order').order.id.guid;

    message.set(newAttributes);

    var discussionMessage = new chatMessageView({
      model: message,
      user: this.model
    });
    wrapper.append(discussionMessage.render().el);
    this.discussionCount++;
    this.$('.js-discussionCount').text(this.discussionCount);
    this.discussionScroller[0].scrollTop = this.discussionScroller[0].scrollHeight;
    this.$('.js-discussionWrapperEmpty').addClass('hide');
  },

  addAllDiscussionMessages: function(){
    var self = this;
    //clear existing messages
    this.$('.js-discussionWrapper').html('');
    this.discussionCol.each(function(model, i){
      self.addDiscussionMessage(model);
    });
    if (this.discussionCol.length > 0 ){
      this.$('.js-discussionWrapperEmpty').addClass('hide');
    }
  },

  sendDiscussionMessageClick: function(){
    var guid,
        guid2,
        rKey,
        rKey2,
        buyerGuid = this.model.get('buyer_order').order.id.guid,
        buyerKey = this.model.get('buyer_order').order.id.pubkeys.guid,
        vendorGuid = this.model.get('vendor_offer').listing.id.guid,
        vendorKey = this.model.get('vendor_offer').listing.id.pubkeys.guid,
        modGuid = this.model.get('displayModerator')? this.model.get('displayModerator').guid : "",
        modKey = this.model.get('displayModerator') ? this.model.get('displayModerator').pubkeys.guid : "";

    if(this.transactionType == "purchases"){
      guid = vendorGuid;
      rKey = vendorKey;
      guid2 = modGuid;
      rKey2 = modKey;
    } else if(this.transactionType == "sales"){
      guid = buyerGuid;
      rKey = buyerKey;
      guid2 = modGuid;
      rKey2 = modKey;
    } else if(this.transactionType == "cases"){
      guid = vendorGuid;
      rKey = vendorKey;
      guid2 = buyerGuid;
      rKey2 = buyerKey;
    }

    //is this a dispute?
    if(this.$('#transactionStartDisputeCheckbox').prop("checked")) {
      this.confirmDispute();
    } else if(this.$('#transactionsCloseDisputeCheckbox').prop("checked")){
      this.closeDispute();
    } else if(this.status == 4 || this.transactionType == "cases"){
      this.sendDiscussionMessage([{"guid": guid, "rKey": rKey},{"guid": guid2, "rKey": rKey2}]);
    } else {
      this.sendDiscussionMessage([{"guid": guid, "rKey": rKey}]);
    }
  },

  sendDiscussionMessage: function(messages){
    //messages should be an array of message objects with guid and rKey [{"guid": "", "rKey": ""}]
    var messageInput = this.$('#transactionDiscussionSendText'),
        messageText = messageInput.val(),
        self = this,
        socketMessageId = Math.random().toString(36).slice(2),
        avatar_hash = this.model.get('avatar_hash');

    __.each(messages, function(msg){
      if (messageText) {
        var chatMessage = {
          "request": {
            "api": "v1",
            "id": socketMessageId,
            "command": "send_message",
            "guid": msg.guid,
            "handle": "",
            "message": messageText,
            "subject": self.orderID,
            "message_type": "ORDER",
            "public_key": msg.rKey,
            "avatar_hash": avatar_hash
          }
        };
        self.socketView.sendMessage(JSON.stringify(chatMessage));
      }
    });

    messageInput.val('');
    messageInput.closest('.flexRow').removeClass('formChecked');
    this.getDiscussion();
    messageInput.focus();
  },

  onKeydownDiscussion: function(e) {
    var code = e.keyCode || e.which;

    if (code === 13 && !this.shiftDown) {
      e.preventDefault();
    }

    if (code === 16) {
      this.shiftDown = true;
    }
  },

  onKeyupDiscussion: function(e) {
    var code = e.keyCode || e.which;

    if (code === 13 && !this.shiftDown) {
      this.sendDiscussionMessageClick();
    }

    if (code === 16) this.shiftDown = false;
  },

  showCloseDispute: function(e){
    var closeDisputeForm = this.$('#transationCloseDispute');
    if($(e.target).prop('checked')){
      closeDisputeForm.removeClass('hide');
      this.percentToBTC(
          this.$('#transactionsBuyerPayoutPercent'),
          this.$('#transactionsBuyerPayoutBTC'),
          this.$('#transactionsSellerPayoutPercent'),
          this.$('#transactionsSellerPayoutBTC')
      );
    } else {
      closeDisputeForm.addClass('hide');
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
      self.$('.js-startDisputeFlag').addClass('hide');
      self.getData();
    }, '', discussionData);
  },

  closeDispute: function(){
    var self = this,
        targetForm = this.$('#transationCloseDispute'),
        discussionData = {};

    discussionData.order_id = this.orderID;
    discussionData.resolution = this.$('#transactionDiscussionSendText').val();
    discussionData.moderator_percentage = this.moderatorPercentage;
    if(this.model.get('vendor_order_confirmation')){
      discussionData.buyer_percentage = this.$('#transactionsBuyerPayoutPercent').val() * 0.01;
      discussionData.vendor_percentage = this.$('#transactionsSellerPayoutPercent').val() * 0.01;
    } else {
      discussionData.buyer_percentage = 1
      discussionData.vendor_percentage = 0;
    }


    if(discussionData.resolution != ""){
      saveToAPI(targetForm, '', this.serverUrl + "close_dispute", function(data){
        self.status = 5;
        self.tabState = "summary";
        self.getData();
      }, '', discussionData);
    } else {
      messageModal.show(window.polyglot.t('errorMessages.missingError'));
    }
  },

  acceptResolution: function(){
    var self = this,
        resData = {};
    resData.order_id = this.orderID;
    saveToAPI(null, null, this.serverUrl + "release_funds", function(data){
      self.status = 6;
      self.tabState = "summary";
      self.getData();
    },'', resData);
  },

  refundOrder: function(){
    //var targetForm = this.$('#transactionRefundForm'),
      var self = this,
          refData = {};
    refData.order_id = this.orderID;
    saveToAPI(null, null, this.serverUrl + "refund", function(data){
      self.status = 7;
      self.tabState = "summary";
      self.getData();
    },'', refData);
  },

  updateBuyerBTC: function(e) {
    this.percentToBTC(this.$(e.target),
        this.$('#transactionsBuyerPayoutBTC'),
        this.$('#transactionsSellerPayoutPercent'),
        this.$('#transactionsSellerPayoutBTC')
    );
  },

  updateSellerBTC: function(e) {
    this.percentToBTC(this.$(e.target),
        this.$('#transactionsSellerPayoutBTC'),
        this.$('#transactionsBuyerPayoutPercent'),
        this.$('#transactionsBuyerPayoutBTC')
    );
  },

  percentToBTC: function(targ1, targ2, targ3, targ4){
    var updatedVal = targ1.val() * 0.01,
        total = this.model.get('buyer_order').order.payment.amount,
        adjustedTotal = total - total * this.moderatorPercentage;

    if(updatedVal > 1){
      updatedVal = 1;
      targ1.val(100);
    }
    targ2.text(updatedVal * adjustedTotal);
    targ3.val(100 - updatedVal * 100);
    targ4.text(adjustedTotal - updatedVal * adjustedTotal);
  },

  closeOrderForm: function(e){
    this.setState(this.lastTab);
  },

  blockClicks: function(e) {
    "use strict";
    if(!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  closeModal: function(){
    window.obEventBus.trigger("orderModalClosed");
    this.$el.parent().fadeOut(300);
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
    this.remove();
  }
});