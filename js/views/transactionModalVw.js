'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    orderModel = require('../models/orderMd'),
    baseModal = require('./baseModal'),
    chatMessageView = require('./chatMessageVw'),
    qr = require('qr-encode'),
    app = require('../App.js').getApp(),
    discussionCl = require('../collections/discussionCl'),
    clipboard = require('clipboard');

module.exports = baseModal.extend({

  className: "js-transactionModal insideApp",

  events: {
    'click .js-transactionModal': 'blockClicks',
    'click .js-summaryTab': 'clickSummaryTab',
    'click .js-shippingTab': 'clickShippingTab',
    'click .js-fundsTab': 'clickFundsTab',
    'click .js-discussionTab': 'clickDiscussionTab',
    'click .js-showConfirmForm': 'showConfirmForm',
    'click .js-hideConfirmForm': 'hideConfirmForm',
    'click .js-showFeedbackRating': 'showFeedbackRating',
    'click .js-hideFeedbackRating': 'hideFeedbackRating',
    'click .js-showCompleteForm': 'showCompleteForm',
    'click .js-completeOrderResend': 'clickCompleteOrderResend',
    'click .js-completeOrderHide': 'completeOrderHide',
    'click .js-confirmOrder': 'clickConfirmOrder',
    'click .js-confirmOrderResend': 'clickConfirmOrderResend',
    'click .js-completeOrder': 'clickCompleteOrder',
    'click .js-copyIncommingTx': 'copyTx',
    'click .js-copyOutgoingTx': 'copyTx',
    'click .js-closeOrderForm': 'closeOrderForm',
    'click .js-showFundOrder': 'showFundOrder',
    'click .js-transactionPayCopy': 'copyTransactionPay',
    'click .js-transactionPayCheck': 'checkPayment',
    'click .js-startDispute': 'startDispute',
    'click .js-startDisputeResend': 'confirmDisputeResend',
    'click .js-sendDiscussionMessage': 'sendDiscussionMessageClick',
    'click #transactionsCloseDisputeCheckbox': 'showCloseDispute',
    'click .js-closeDisputeResend': 'closeDisputeResend',
    'change #transactionsBuyerPayoutPercent': 'updateBuyerBTC',
    'change #transactionsSellerPayoutPercent': 'updateSellerBTC',
    'click .js-transactionShowContract': 'showContract',
    'click .js-transactionHideContract': 'hideContract',
    'click .js-acceptResolution': 'acceptResolution',
    'click .js-refundTransaction': 'refundOrder',
    'focus .js-transactionDiscussionSendText': 'highlightInput',
    'blur .js-transactionDiscussionSendText': 'blurInput',
    'blur input': 'validateInput',
    //'blur textarea': 'validateInput',
    'click #BuyWizardQRDetailsInput': 'toggleQRDetails',
    'keydown #transactionDiscussionSendText': 'onKeydownDiscussion',
    'keyup #transactionDiscussionSendText': 'onKeyupDiscussion'
  },

  initialize: function (options) {
    this.orderID = options.orderID;
    this.status = options.status;
    this.transactionType = options.transactionType;
    this.unread = options.unread;
    this.parentEl = options.parentEl;
    this.countriesArray = options.countriesArray;
    this.cCode = options.cCode;
    this.btAve = options.btAve; //average price in bitcoin for one unit of the user's currency
    this.tabState = options.tabState ;//active tab
    this.socketView = options.socketView;
    this.userModel = options.userModel;
    this.serverUrl = this.userModel.get('serverUrl');
    this.userProfile = options.userProfile;
    this.lastTab = "summary";
    this.discussionCount = 0;
    this.discussionCol = new discussionCl();
    this.discussionCol.url = this.serverUrl + "order_messages";
    this.resendComplete = false; //don't show the resend complete order button again if the call is successful

    if (this.userProfile.get('avatar_hash')){
      this.avatarURL = this.userModel.get('serverUrl') + "get_image?hash=" + this.userProfile.get('avatar_hash');
    }

    this.avatar_hash = this.userProfile.get('avatar_hash');

    this.listenTo(window.obEventBus, "socketMessageReceived", this.handleSocketMessage);

    this.listenTo(this.discussionCol, "add", this.addDiscussionMessage);

    this.model = new orderModel({
      cCode: this.cCode,
      btAve: this.btAve,
      avatar_hash: this.avatar_hash
      //serverUrl: this.serverUrl,
      //transactionType: this.transactionType,
      //avatarURL: this.avatarURL,
      //orderID: this.orderID,
      //userGuid: this.userModel.get('guid')
    });
    this.model.urlRoot = options.serverUrl + "get_order";
    this.listenTo(this.model, 'change:priceSet', () => this.trigger('loaded'));
    this.getData();
  },

  getData: function(){
    var self = this;
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      dataType: 'json',
      success: function (model, response) {
        self.model.set('displayJSON', JSON.stringify(model.toJSON(), null, 2));
        self.model.set('resendComplete', self.resendComplete);
        self.model.set('status', self.status);
        if (!response.invalidData && response.vendor_offer.listing){
          self.model.updateAttributes();
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError')
          });
        }
      },
      error: function (jqXHR, status, errorThrown) {
        if (status.status == 500){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.getError'),
            message: '<i>' + window.polyglot.t('errorMessages.serverError') + '</i>'
          });
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.getError'),
            message: '<i>' + errorThrown.textStatus + '</i>'
          });
        }
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      },
      complete: function(xhr, textStatus) {
        if (textStatus == 'parsererror'){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.badJSON')
          });
        }
      }
    });
  },

  render: function () {
    var self = this,
        orderPrice = 0,
        orderPaid = 0,
        orderDue = 0;

    //make sure data is valid
    if (this.model.get('invalidData')){
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.serverError'),
        message: self.model.get('error')
      });
      return;
    }

    //calculate how much has been paid
    orderPrice = this.model.get("buyer_order").order.payment.amount;
    __.each(this.model.get("bitcoin_txs"), function(payment){
      orderPaid += payment.value;
    });
    orderDue = orderPrice - orderPaid;

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(
        __.extend({}, self.model.toJSON(), {
          unread: self.unread,
          serverUrl: self.serverUrl,
          bitcoinValidationRegex: window.config.bitcoinValidationRegex,
          transactionType: self.transactionType,
          userGuid: self.userModel.get('guid'),
          status: self.status,
          avatarURL: self.avatarURL,
          avatar_hash: self.avatar_hash,
          orderID: self.orderID,
          orderPrice: orderPrice,
          orderPaid: orderPaid,
          orderDue: orderDue
        })
      ));

      baseModal.prototype.render.apply(self);

      if (self.status == 0){
        self.showPayment();
      }
      self.getDiscussion();
      self.discussionScroller = self.$('.js-discussionScroller');
      self.moderatorPercentage = self.model.get('displayModerator').feeDecimal;
      self.discussionInput = self.$('#transactionDiscussionSendText');
      self.discussionForm = self.$('#transactionDiscussionForm');
      //set the QR details checkbox
      var QRtoggleVal = localStorage.getItem('AdditionalPaymentData') != "false";
      self.$('#BuyWizardQRDetailsInput').prop('checked', QRtoggleVal);

      self.setState(self.tabState); //this should always be last
    });

    return this;
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if (data.notification && data.notification.order_id == this.orderID){
      switch (data.notification.type){
      case "payment received":
        this.status = 1;
        this.tabState = "summary";
        break;
      case "order confirmation":
        this.status = 2;
        this.tabState = "summary";
        break;
      case "partial payment":
        this.status = 0;
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
    } else if (data.message && data.message.subject == this.orderID){
      var messageModel = new Backbone.Model(data.message);
      this.discussionCol.add(messageModel);
      if (data.message.message_type == "DISPUTE_OPEN"){
        this.status = 4;
        this.tabState = "discussion";
        this.getData();
      }
      if (data.message.message_type == "DISPUTE_CLOSE"){
        this.status = 5;
        this.tabState = "discussion";
        this.getData();
      }
    }
  },

  toggleQRDetails: function(){
    var toggleInput = this.$('#BuyWizardQRDetailsInput'),
        toggleVal = toggleInput.prop('checked');
    localStorage.setItem('AdditionalPaymentData', toggleVal);
    this.showPayment();
  },

  showPayment: function(){
    var payHREF,
        dataURI;
    if (this.model.get('buyer_order')){
      payHREF = "bitcoin:" + this.model.get('buyer_order').order.payment.address + "?amount=" + this.model.get('buyer_order').order.payment.amount;

      if (localStorage.getItem('AdditionalPaymentData') != "false") {
        payHREF += "&message=" + this.model.get('vendor_offer').listing.item.title.substring(0, 20) + " " + this.orderID;
      }

      dataURI = qr(payHREF, {type: 10, size: 10, level: 'M'});
      this.$el.find('.js-transactionPayQRCode').attr('src', dataURI);
    } else {
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.getError'),
        message: window.polyglot.t('errorMessages.serverError')
      });
    }
  },

  showContract: function(){
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
    if (!state){
      switch (this.status){
      case 2:
        state = "shipping";
        break;
      case 3:
        state = "funds";
        break;
      case 4:
        state = "discussion";
        break;
      case 5:
        state = "discussion";
        break;
      default:
        state = "summary";
      }
    }
    this.$el.find('.js-main').addClass('hide');
    this.$el.find('.js-tab').removeClass('active');
    this.$el.find('.js-' + state).removeClass('hide');
    this.$el.find('.js-' + state + 'Tab').addClass('active').removeClass('hide');
    this.discussionForm.removeClass('formChecked');

    if (state == "discussion"){
      $.post(app.serverConfigs.getActive().getServerBaseUrl() + '/mark_discussion_as_read', {id: this.orderID});
      this.$('.js-unreadBadge').addClass('hide');
    }

    if (state == "discussion" && this.discussionScroller){
      this.discussionScroller[0].scrollTop = this.discussionScroller[0].scrollHeight;
    }

    this.lastTab = this.state;
    this.state = state;
  },

  highlightInput: function() {
    this.$('.js-discussionForm').addClass('custCol-border').removeClass('custCol-border-secondary');
  },

  blurInput: function() {
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

  /*
  showRefundOrder: function(){
    this.setState("refund");
  },
   */

  showCompleteForm: function(){
    this.$('.js-transactionShowContract').addClass('hide');
    this.$('.js-complete').addClass('bottom0');
  },

  completeOrderHide: function(){
    this.$('.js-transactionShowContract').removeClass('hide');
    this.$('.js-complete').removeClass('bottom0');
    this.sendCompleteOrder && this.sendCompleteOrder.abort();
  },

  clickConfirmOrder: function(e){
    this.confirmOrder(this.$el.find('#transactionConfirmForm'), $(e.target));
  },

  clickConfirmOrderResend: function(e){
    this.confirmOrder('', $(e.target));
  },

  confirmOrder: function(targForm, targBtn){
    var self = this,
        confirmData = {};

    confirmData.id = this.orderID;
    this.confirmStatus = app.statusBar.pushMessage({
      type: 'pending',
      msg: '<i>' + window.polyglot.t('transactions.UpdatingOrder') + '</i>',
      duration: false
    });

    targBtn.addClass("loading");

    saveToAPI(targForm, '', this.serverUrl + "confirm_order",
        function(){
          self.close();
          self.confirmStatus.updateMessage({
            type: 'confirmed',
            msg: '<i>' + window.polyglot.t('transactions.UpdateComplete') + '</i>'
          });
          setTimeout(function(){
            self.confirmStatus && self.confirmStatus.remove();
          }, 3000);
        }, '',
        confirmData, '', '')
        .always(function(){
          targBtn.removeClass("loading");
        });
  },

  clickCompleteOrder: function(e){
    this.completeOrder(this.$el.find('#transactionCompleteForm'), $(e.target));
  },

  clickCompleteOrderResend: function(e){
    this.completeOrder('', $(e.target));
  },

  completeOrder: function(targForm, targBtn){
    var self = this,
        completeData = {};

    targBtn.addClass('loading');
    completeData.id = this.orderID;

    this.sendCompleteOrder = saveToAPI(targForm, '', this.serverUrl + "complete_order",
        function(){
          self.status = 3;
          self.tabState = "summary";
          self.resendComplete = "true";
          self.getData();
        },
        function(data){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.getError'),
            message: '<i>' + data.reason + '</i>'
          });
        },
        completeData).always(() => {
          targBtn.removeClass('loading');
        });
  },

  copyTransactionPay: function(e){
    clipboard.writeText($(e.target).data('url'));
  },

  checkPayment: function(){
    var formData = new FormData();

    formData.append("order_id", this.orderID);
    $.ajax({ //this only triggers the server to send a new socket message
      type: "POST",
      url: app.serverConfigs.getActive().getServerBaseUrl() + "/check_for_payment",
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
      success: function () {
        self.addAllDiscussionMessages();
      },
      error: function (jqXHR, status, errorThrown) {
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.getError'),
          message: '<i>' + errorThrown + '</i>'
        });

        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  addDiscussionMessage: function(message){
    var newAttributes = {},
        wrapper = this.$('.js-discussionWrapper');

    newAttributes.moderatorGuid = this.model.get('displayModerator') ? this.model.get('displayModerator').guid : "";
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
    this.discussionCol.each(function(model){
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

    if (this.transactionType == "purchases"){
      guid = vendorGuid;
      rKey = vendorKey;
      guid2 = modGuid;
      rKey2 = modKey;
    } else if (this.transactionType == "sales"){
      guid = buyerGuid;
      rKey = buyerKey;
      guid2 = modGuid;
      rKey2 = modKey;
    } else if (this.transactionType == "cases"){
      guid = vendorGuid;
      rKey = vendorKey;
      guid2 = buyerGuid;
      rKey2 = buyerKey;
    }

    //is this a dispute?
    if (this.$('#transactionStartDisputeCheckbox').prop("checked")) {
      this.confirmDispute();
    } else if (this.$('#transactionsCloseDisputeCheckbox').prop("checked")){
      this.closeDispute();
    } else if (this.status == 4 || this.transactionType == "cases"){
      this.sendDiscussionMessage([{"guid": guid, "rKey": rKey}, {"guid": guid2, "rKey": rKey2}]);
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
        avatar_hash = this.avatar_hash;

    this.discussionForm.removeClass('formChecked');

    if (!this.discussionInput.val()){
      this.discussionForm.addClass('formChecked');
      return;
    }

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
    var closeDisputeForm = this.$('#transactionCloseDispute');
    if ($(e.target).prop('checked')){
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
        discussionData = {};

    discussionData.order_id = this.orderID;

    this.discussionForm.removeClass('formChecked');

    if (this.discussionInput.val()) {
      saveToAPI(this.discussionForm, '', this.serverUrl + "dispute_contract", function () {
        self.status   = 4;
        self.tabState = "discussion";
        self.$('.js-startDisputeFlag').addClass('hide');
        self.getData();
      }, '', discussionData);
    } else {
      this.discussionForm.addClass('formChecked');
    }
  },

  confirmDisputeResend: function(){
    this.confirmDispute();
  },

  closeDispute: function(){
    var self = this,
        targetForm = this.$('#transactionCloseDispute'),
        discussionData = {};

    this.discussionForm.removeClass('formChecked');
    discussionData.order_id = this.orderID;
    discussionData.resolution = this.discussionInput.val();
    discussionData.moderator_percentage = this.moderatorPercentage;
    if (this.model.get('vendor_order_confirmation')){
      discussionData.buyer_percentage = this.$('#transactionsBuyerPayoutPercent').val() * 0.01;
      discussionData.vendor_percentage = this.$('#transactionsSellerPayoutPercent').val() * 0.01;
    } else {
      discussionData.buyer_percentage = 1;
      discussionData.vendor_percentage = 0;
    }


    if (discussionData.resolution != ""){
      saveToAPI(targetForm, '', this.serverUrl + "close_dispute", function(){
        self.status = 5;
        self.tabState = "summary";
        self.getData();
      }, '', discussionData);
    } else {
      this.discussionForm.addClass("formChecked");
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.saveError'),
        message: window.polyglot.t('errorMessages.missingError')
      });
    }
  },

  closeDisputeResend: function(){
    var self = this,
        discussionData = {};

    discussionData.order_id = this.orderID;

    saveToAPI('', '', this.serverUrl + "close_dispute", function(){
      self.status = 5;
      self.tabState = "summary";
      self.getData();
    }, '', discussionData);
  },

  acceptResolution: function(e){
    var self = this,
        resData = {};

    $(e.target).addClass('loading');
    resData.order_id = this.orderID;

    saveToAPI(null, null, this.serverUrl + "release_funds", function(){
      self.status = 6;
      self.tabState = "summary";
      self.getData();
    }, '', resData).always(() => {
      $(e.target).removeClass('loading');
    });
  },

  refundOrder: function(e){
    //var targetForm = this.$('#transactionRefundForm'),
    var self = this,
        $targ = $(e.target).closest(".js-refundTransaction"),
        refData = {};

    if (!$targ.hasClass('confirm')){
      $targ.addClass('confirm');
    } else {

      $targ.addClass('loading');
      refData.order_id = this.orderID;

      saveToAPI(null, null, this.serverUrl + "refund", function () {
        self.status   = 7;
        self.tabState = "summary";
        self.getData();
      }, function (data) {
        if (data.reason == "Refund already processed for this order") {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.refundAlreadySent')
          });
          $(e.target).addClass('hide'); //hide the button so it can't be pressed again
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError')
          });
        }
      }, refData).always(() => {
        $(e.target).removeClass('loading');
      });
    }
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

    if (updatedVal > 1){
      updatedVal = 1;
      targ1.val(100);
    }
    targ2.text(app.intlNumFormat(updatedVal * adjustedTotal), 8);
    targ3.val(100 - updatedVal * 100);
    targ4.text(app.intlNumFormat(adjustedTotal - updatedVal * adjustedTotal, 8));
  },

  closeOrderForm: function(){
    this.setState(this.lastTab);
  },

  blockClicks: function(e) {
    if (!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  close: function() {
    this.confirmStatus && this.confirmStatus.remove();

    baseModal.prototype.close.apply(this, arguments);
  }
});
