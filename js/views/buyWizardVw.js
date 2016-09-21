'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    baseModal = require('./baseModal'),
    buyDetailsVw = require('./buyDetailsVw'),
    buyAddressesVw = require('./buyAddressesVw'),
    saveToAPI = require('../utils/saveToAPI'),
    chosen = require('../utils/chosen.jquery.min.js'),
    qr = require('qr-encode'),
    app = require('../App').getApp(),
    clipboard = require('clipboard'),
    templateHelpers = require('../utils/templateHelpers');

module.exports = baseModal.extend({

  className: "buyView custCol-text insideApp",

  events: {
    'click .js-buyWizardModal': 'blockClicks',
    'click .js-closeBuyWizardModal': 'closeWizard',
    'click .js-buyWizardNewAddressBtn': 'createNewAddress',
    'click .js-buyWizardModeratorRadio': 'modSelected',
    'click .js-buyWizardModNext': 'modNext',
    'click .js-buyWizardModBack': 'modBack',
    'click .js-buyWizardReturnNext': 'returnNext',
    'click .js-buyWizardAddressBack': 'addressPrev',
    'click .js-buyWizardAddressNext': 'addressNext',
    'click .js-buyWizardWalletNext': 'walletNowClick',
    'click .js-buyWizardHasWallet': 'hasWalletClick',
    'click .js-buyWizardDoesntHaveWallet': 'doesntHaveWallet',
    'click .js-buyWizardNewAddressCancel': 'onAddressCancel',
    'click .js-buyWizardNewAddressSave': 'saveNewAddress',
    'click .js-buyWizardSendPurchase': 'sendPurchase',
    'click .js-buyWizardPurchaseBack': 'backPurchase',
    'click .js-buyWizardPayCopy': 'copyPayAddress',
    'click .js-accordionNext': 'accNext',
    'click .js-accordionPrev': 'accPrev',
    'click .js-buyWizardCountryWrapper': 'openCountrySelect',
    'click .js-buyWizardPayCheck': 'checkPayment',
    'click .js-buyWizardCloseSummary': 'closeWizard',
    'click input[name="radioPaymentType"]': 'changePaymentType',
    'click #BuyWizardQRDetailsInput': 'toggleQRDetails',
    'click .js-partialPaymentClose': 'hidePartialPaymentMsg',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this,
        countries = new countriesModel();

    this.options = options || {};
    /* expected options are:
    userModel: this is set by main.js, then by a call to the settings API.
    socketView: this is a reference to the socketView
    worldwide: does this ship worldwide
    shippingRegions: countries this item ships to
     */
    this.userModel = this.options.userModel;
    this.worldwide = this.options.worldwide;
    this.shippingRegions = this.options.shippingRegions;
    //this.hideMap = true;
    this.orderID = "";
    this.model.set('selectedModerator', "");
    this.model.updateAttributes();
    this.cachePayData = "";
    this.partialPaymentAmount = 0;

    //create the country select list
    this.countryList = countries.get('countries');
    this.countriesSelect = $('<select class="chosen custCol-text" id="buyWizardCountryInput" required></select>');
    __.each(this.countryList, function(countryFromList){
      var countryOption = $('<option value="'+countryFromList.dataName+'" data-name="'+countryFromList.name +'">'+window.polyglot.t(`countries.${countryFromList.dataName}`)+'</option>');
      countryOption.attr("selected", self.options.userModel.get('country') == countryFromList.dataName);
      self.countriesSelect.append(countryOption);
    });
    this.listenTo(this.model, 'change:totalPrice', this.setTotalPrice);
    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });
    this.listenTo(window.obEventBus, "closeBuyWizard", this.closeWizard);

    //make sure the model has a fresh copy of the user
    this.model.set('user', this.userModel.attributes);
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if (data.notification && data.notification.order_id == this.orderID){
      if (data.notification.type == "payment received") {
        this.showSummary();
        this.hidePartialPaymentMsg();
      } else if (data.notification.type == "partial payment"){
        this.showPartialPaymentMsg(data.notification);
      }
    }
  },

  showPartialPaymentMsg: function(data){
    var payMsg = "";
    this.partialPaymentAmount = data.amount_funded;
    payMsg = window.polyglot.t('transactions.BuyerPaidMessage', {
      paidAmount: templateHelpers.intlNumFormat(this.partialPaymentAmount, 8),
      totalAmount: templateHelpers.intlNumFormat(this.model.get('totalBTCDisplayPrice'), 8)
    });

    this.$('.js-partialPaymentMsg')
        .addClass('fadeIn')
        .find('.js-partialPaymentTxt').text(payMsg);

    this.showPayAddress();
  },

  hidePartialPaymentMsg: function(){
    this.$('.js-partialPaymentMsg').removeClass('fadeIn');
  },

  initAccordion: function(targ){
    this.acc = $(targ);
    this.accWidth = this.acc.width();
    this.accHeight = this.acc.height();
    this.accChildren = this.acc.find('.accordion-child');
    this.accNum = this.accChildren.length;
    this.accWin = this.acc.find('.accordion-window');
    this.accWinWidth = this.accWidth * this.accNum;
    this.accWin.css({'left': '0px', 'width': this.accWinWidth});
    this.accChildren.css({'width': this.accWidth, 'height': this.accHeight});
  },

  accNext: function(advanceBy){
    var oldPos = parseInt(this.accWin.css('left').replace("px", "")),
        moveBy = parseInt(advanceBy) ? this.accWidth * advanceBy : this.accWidth;

    if (oldPos > (this.accWidth * (this.accNum -1) * -1)){
      this.accWin.css('left', function(){
        return oldPos - moveBy;
      });
    }
  },

  accPrev: function(rewindBy){
    var oldPos = parseInt(this.accWin.css('left').replace("px", "")),
        moveBy = parseInt(rewindBy) ? this.accWidth * rewindBy : this.accWidth;

    if (oldPos < (0)){
      this.accWin.css('left', function(){
        return oldPos + moveBy;
      });
    }
  },

  accGoToID: function(ID, focusOn){
    var targID = this.accWin.find(ID),
        oldPos = parseInt(this.accWin.css('left').replace("px", "")),
        currIndex = oldPos / this.accWidth * -1,
        newIndex = targID.index(),
        moveBy = this.accWidth * (currIndex - newIndex);

    this.accWin.css('left', function(){
      return oldPos + moveBy;
    });
    // focus
    if (focusOn){
      targID.find(focusOn).focus();
    }
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/buyWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      baseModal.prototype.render.apply(self, arguments);

      //add subviews
      self.buyDetailsView && self.buyDetailsView.remove();
      self.buyDetailsView = new buyDetailsVw({model: self.model});
      self.registerChild(self.buyDetailsView);

      self.buyAddressesView && self.buyAddressesView.remove();
      self.buyAddressesView = new buyAddressesVw({model: self.model, userModel: self.userModel, worldwide: self.worldwide, shippingRegions: self.shippingRegions});
      self.registerChild(self.buyAddressesView);

      self.listenTo(self.buyAddressesView, 'setAddress', self.addressSelected);

      self.$buyWizardMap = self.$('.js-buyWizardMap');

      //init the accordion
      setTimeout(() => self.initAccordion('.js-buyWizardAccordion'));

      // fade the modal in after it loads and focus the input
      self.$el.find('.js-buyWizardModal').removeClass('fadeOut');

      //add all countries to the Ships To select list
      self.$el.find('.js-buyWizardCountryWrapper').append(self.countriesSelect);

      //add address view
      self.buyAddressesView.render(0);
      self.$el.find('.js-buyWizardAddresses').append(self.buyAddressesView.el);
      //add details view
      self.$el.find('.js-buyWizardInsertDetails').append(self.buyDetailsView.el);

      //auto select first payment type
      self.$el.find("input:radio[name=radioPaymentType]:first").attr('checked', true).trigger('click');

      //randomize the bitcoin wallet providers

      let $allWallets = self.$(".js-BuyWizardWallets");
      let wallets = $allWallets.children('.js-bitcoinWalletProvider');

      while (wallets.length){
        $allWallets.append(wallets.splice(Math.floor(Math.random() * wallets.length), 1)[0]);
      }

      //set the QR details checkbox
      var QRtoggleVal = localStorage.getItem('AdditionalPaymentData') != "false";
      self.$('#BuyWizardQRDetailsInput').prop('checked', QRtoggleVal);
    });
    return this;
  },

  modSelected: function(e){
    var modIndex = $(e.target).val();
    //this.$el.find('.js-buyWizardModNext').removeClass('disabled');
    if (modIndex != "direct"){
      this.model.set('selectedModerator', this.model.get('vendor_offer').listing.moderators[modIndex]);
    } else {
      this.model.set('selectedModerator', "");
    }

    this.$el.find('#BuyWizardPaymentType .js-buyWizardModNext').removeClass('disabled');

  },

  showMaps: function(){
    this.$el.find('.js-buyWizardMap').removeClass('hide');
  },

  hideMaps: function(){
    this.$el.find('.js-buyWizardMap').addClass('hide');
  },

  createNewAddress: function(){
    this.$el.find('.js-buyWizardAddress').addClass('hide');
    this.$el.find('.js-buyWizardNewAddress').removeClass('hide');
    this.$el.find('#buyWizardNameInput').focus();
    this.$el.addClass('addressFormOpened');
    this.$buyWizardMap.find('iframe').addClass('blurMore');

    //set chosen inputs
    $('.chosen').chosen({
      search_contains: true,
      no_results_text: window.polyglot.t('chosenJS.noResultsText'),
      placeholder_text_single: window.polyglot.t('chosenJS.placeHolderTextSingle'),
      placeholder_text_multiple: window.polyglot.t('chosenJS.placeHolderTextMultiple')
    });
  },

  onAddressCancel: function() {
    this.$buyWizardMap.find('iframe').removeClass('blurMore');
    this.hideNewAddress();
  },

  hideNewAddress: function(){
    this.$el.find('.js-buyWizardAddress').removeClass('hide');
    this.$el.find('.js-buyWizardNewAddress').addClass('hide');
    this.$el.removeClass('addressFormOpened');
  },

  addressSelected: function(selectedAddress){
    this.model.set('selectedAddress', selectedAddress);
    this.displayMap(selectedAddress);
    this.$el.find('.js-buyWizardAddressNext').removeClass('disabled');
  },

  hasWalletClick: function(){
    this.accGoToID('#BuyWizardPaymentType');
  },

  walletNowClick: function(){
    this.accGoToID("#BuyWizardPaymentType");
  },

  modNext: function(){
    this.accNext();
    this.setTotalPrice(); //in case it isn't set yet
  },

  modBack: function(){
    this.accGoToID('#BuyWizardBitcoinWallet');
  },

  doesntHaveWallet: function(){
    //this.hasWallet = false;
    this.accNext();
  },

  modelToFormData: function(modelJSON, formData, existingKeys) {
    var newFormData = formData || new FormData();
    __.each(modelJSON, function(value, key) {
      if (!__.has(existingKeys, key)) {
        newFormData.append(key, value);
      }
    });
    return newFormData;
  },

  changePaymentType: function(e) {
    var checked = $(e.target);

    // uncheck prior selections
    $('.js-buyWizardModeratorRadio').prop('checked', false);

    if (checked.attr('id') === "buyWizardPaymentTypeDirect") {
      this.$el.find('.js-buyWizardModeratorList').addClass('hide');
      this.$el.find('#buyWizardNoModerator').prop('checked', true).trigger( "click" );
      this.$el.find('#BuyWizardPaymentType .js-buyWizardModNext').removeClass('disabled');
    } else {
      this.$el.find('.js-buyWizardModeratorList').removeClass('hide');
      this.$el.find('#BuyWizardPaymentType .js-buyWizardModNext').addClass('disabled');
    }
  },

  saveNewAddress: function(){
    var self = this,
        targetForm = this.$el.find('#buyWizardNewAddressForm'),
        newAddress = {},
        newAddresses = [],
        addressData = {};

    __.each(this.userModel.get('shipping_addresses'), function(address){
      newAddresses.push(JSON.stringify(address));
    });

    newAddress.name = this.$el.find('#buyWizardNameInput').val();
    newAddress.street = this.$el.find('#buyWizardStreetInput').val();
    newAddress.city = this.$el.find('#buyWizardCityInput').val();
    newAddress.state = this.$el.find('#buyWizardStateInput').val();
    newAddress.postal_code = this.$el.find('#buyWizardPostalInput').val();
    newAddress.alternate_contact = this.$el.find('#buyWizardOther').val();
    newAddress.country = this.$el.find('#buyWizardCountryInput').val();
    newAddress.displayCountry = this.$el.find('#buyWizardCountryInput option:selected').data('name');

    if (newAddress.name && newAddress.country) {
      newAddresses.push(JSON.stringify(newAddress));
    }

    addressData.shipping_addresses = newAddresses;

    saveToAPI(targetForm, this.userModel.toJSON(), app.serverConfigs.getActive().getServerBaseUrl() + "/settings", function(){
      self.$el.find('#buyWizardNameInput').val("");
      self.$el.find('#buyWizardStreetInput').val("");
      self.$el.find('#buyWizardCityInput').val("");
      self.$el.find('#buyWizardStateInput').val("");
      self.$el.find('#buyWizardPostalInput').val("");
      self.$el.find('#buyWizardOther').val("");
      self.$el.find('#buyWizardCountryInput').val(self.userModel.get('country'));
      self.$el.find('.chosen').trigger('chosen:updated');
      targetForm.removeClass('formChecked').find('.formChecked').removeClass('formChecked');
      self.hideNewAddress();
      self.addNewAddress();
    }, "", addressData);
  },

  addNewAddress: function(){
    var self = this;
    this.userModel.fetch({
      success: function(data){
        var selected = data.attributes.shipping_addresses.length -1;
        //this will refresh the userModel, buyAddressView has a reference to it
        self.buyAddressesView.render(selected);
      },
      error: function(){
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.serverError')
        });
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

  displayMap: function(address){
    var addressString = "",
        $currentIframe;

    this.$buyWizardMap.find('.js-iframe-pending, .js-iframe-leaving')
      .remove();
    $currentIframe = this.$buyWizardMap.find('iframe');
    $currentIframe.addClass('blurMore');

    if (address && address.street && address.city && address.state && address.postal_code) {
      addressString = address.street + ", " + address.city + ", " + address.state + " " + address.postal_code + " " + address.displayCountry;
    } else {
      // if address is invalid, we'll create a dummy address for which google maps will show a map of the world
      addressString = "123 Street, City, State 12345 Country";
    }

    addressString = encodeURIComponent(addressString);
    var $iFrame = $('<iframe class="js-iframe-pending positionTop" width="525" height="250" frameborder="0" style="border:0; margin-top: 0; height: 250px; clip: rect(0,0,0,0)" />');

    if ($currentIframe.length) {
      this.$buyWizardMap.find('.js-mapSpinner').removeClass('hide');
      $iFrame.insertBefore($currentIframe);
    } else {
      this.$buyWizardMap.find('.mapWrap')
        .prepend($iFrame);
    }

    $iFrame.on('load', () => {
      this.$buyWizardMap.find('.js-mapSpinner').addClass('hide');

      $currentIframe.addClass('js-iframe-leaving')
        .fadeOut({
          duration: 'slow',
          complete: () => {
            $currentIframe.remove();
          }
        });
      $iFrame.removeClass('js-iframe-pending');
    });

    $iFrame.attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBoWGMeVZpy9qc7H418Jk2Sq2NWedJgp_4&q=' + addressString);
  },

  returnNext: function(){
    var self = this,
        bitCoinReturnAddr = this.$el.find('#buyWizardBitcoinAddressInput').val(),
        modForm = this.$el.find('#buyWizardBitcoinReturnForm');

    modForm.addClass('formChecked');

    if (modForm[0].checkValidity()) {
      if (bitCoinReturnAddr != this.userModel.get('refund_address')) {
        saveToAPI(modForm, this.userModel.toJSON(), app.serverConfigs.getActive().getServerBaseUrl() + "/settings", function () {
          window.obEventBus.trigger("updateUserModel");
          self.skipAddressCheck();
        },
        function () {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.serverError'),
            message: window.polyglot.t('errorMessages.missingError') + '<br>' + window.polyglot.t('BitcoinReturnAddress')
          });
        });
      } else {
        this.skipAddressCheck();
      }
    }
  },

  skipAddressCheck: function(){
    if (this.model.get('vendor_offer').listing.metadata.category == "physical good"){
      this.accGoToID('#BuyWizardShipTo');
      this.showMaps();
      if (this.userModel.get('shipping_addresses').length === 0){
        this.createNewAddress();
        $('.js-buyWizardAddressBack').show();
        $('.js-buyWizardNewAddressCancel').hide();
      }
    } else {
      this.accGoToID('#BuyWizardDetails');
    }
  },

  addressPrev: function(){
    this.accGoToID("#BuyWizardBTCReturnAddress");
    this.hideMaps();
  },

  addressNext: function(){
    this.accNext();
    this.hideMaps();
  },

  sendPurchase: function(){
    var self = this,
        formData = new FormData(),
        moderatorID = this.model.get('selectedModerator').guid || "",
        selectedAddress = this.model.get('selectedAddress'),
        bitCoinReturnAddr = this.$('#buyWizardBitcoinAddressInput').val();

    if (!this.$('#buyWizardQuantity')[0].checkValidity()){
      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.serverError'),
        message: window.polyglot.t('errorMessages.missingError')
      });
      return;
    }

    this.$('.js-buyWizardSendPurchase').addClass('hide');
    this.$('.js-buyWizardPendingMsg').removeClass('hide');
    this.$('.js-buyWizardPurchaseBack').addClass('disabled');

    formData.append("id", this.model.get('id'));

    formData.append("quantity", this.$el.find('.js-buyWizardQuantity').val());
    if (selectedAddress){
      formData.append("ship_to", selectedAddress.name);
      formData.append("address", selectedAddress.street);
      formData.append("city", selectedAddress.city);
      formData.append("state", selectedAddress.state);
      formData.append("postal_code", selectedAddress.postal_code);
      formData.append("alternate_contact", selectedAddress.alternate_contact);
      formData.append("country", selectedAddress.country);
    }

    if (moderatorID){
      formData.append("moderator", moderatorID);
    }

    this.$('.js-buyWizardSpinner').removeClass('hide');

    formData.append("refund_address", bitCoinReturnAddr);

    if (this.buyRequest){
      this.buyRequest.abort();
    }

    this.buyRequest = $.ajax({
      type: "POST",
      url: app.serverConfigs.getActive().getServerBaseUrl() + "/purchase_contract",
      contentType: false,
      processData: false,
      data: formData,
      dataType: 'json',
      success: function(data){
        if (data.success == true){
          self.showPayAddress(data);
          self.cachePayData = data; //cache the data for the QR Details toggle
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.contractError'),
            message: window.polyglot.t('errorMessages.sellerError') + ' ' +
              window.polyglot.t('errorMessages.checkPurchaseData') + '\n\n Reason: ' + data.reason
          });

          self.$('.js-buyWizardSpinner').addClass('hide');
          //re-enable form so they can try again
          self.$('.js-buyWizardSendPurchase').removeClass('hide');
          self.$('.js-buyWizardPendingMsg').addClass('hide');
          self.$('.js-buyWizardPurchaseBack').removeClass('disabled');
        }
      },
      error: function (jqXHR, status, errorThrown) {
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  toggleQRDetails: function(){
    var toggleInput = this.$('#BuyWizardQRDetailsInput'),
        toggleVal = toggleInput.prop('checked');
    localStorage.setItem('AdditionalPaymentData', toggleVal);
    this.showPayAddress();
  },

  showPayAddress: function(data){
    data = data || this.cachePayData;

    if (!data) {
      throw new Error('Data must be provided to the showPayAddress function');
    }

    var totalBTCPrice = 0,
        storeName = encodeURI(this.model.get('page').profile.name),
        message = encodeURI(this.model.get('vendor_offer').listing.item.title.substring(0, 20) + " "+data.order_id),
        payHREF = "",
        dataURI;
    this.$el.find('.js-buyWizardSpinner').addClass('hide');
    this.orderID = data.order_id;
    totalBTCPrice = data.amount - this.partialPaymentAmount;
    this.$el.find('.js-buyWizardDetailsTotalBTC').text(templateHelpers.intlNumFormat(totalBTCPrice, 8));
    this.payURL = data.payment_address;

    payHREF = "bitcoin:"+ data.payment_address+"?amount="+totalBTCPrice;
    if (localStorage.getItem('AdditionalPaymentData') != "false") {
      payHREF += "&label="+storeName+"&message="+message;
    }

    this.hideMaps();
    this.$el.find('.js-buyWizardPay').removeClass('hide');
    dataURI = qr(payHREF, {type: 10, size: 10, level: 'M'});
    this.$el.find('.js-buyWizardPayQRCode').attr('src', dataURI);
    this.$el.find('.js-buyWizardPayPrice').text();
    this.$el.find('.js-buyWizardPayURL').text(data.payment_address);
    this.$el.find('.js-buyWizardPayLink').attr('href', payHREF);
    this.buyDetailsView.lockForm();
  },

  hidePayAddress: function(){
    this.$el.find('.js-buyWizardPay').addClass('hide');
  },

  setTotalPrice: function(){
    var totalPrice = this.model.get('totalPrice'),
        totalBTCPrice = this.model.get('totalBTCDisplayPrice'),
        userCurrency = this.model.get('userCurrencyCode'),
        totalDisplayPrice = userCurrency == "BTC" ? app.intlNumFormat(totalPrice, 8) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalPrice);
    this.$('.js-buyWizardDetailsTotal').text(totalDisplayPrice);
    this.$('.js-buyWizardDetailsBTCTotal').text(app.intlNumFormat(totalBTCPrice, 8));
  },

  copyPayAddress: function(){
    clipboard.writeText(this.payURL);
  },

  backPurchase: function(){
    this.hidePayAddress();
    if (this.model.get('vendor_offer').listing.metadata.category == "physical good"){
      this.accGoToID('#BuyWizardShipTo');
      this.showMaps();
    } else {
      this.accGoToID('#BuyWizardBTCReturnAddress');
    }
    this.buyDetailsView.render();
    this.$el.find('.js-buyWizardSendPurchase').removeClass('hide');
    this.$el.find('.js-buyWizardPendingMsg').addClass('hide');
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

  showSummary: function(){
    this.$el.find('.js-buyWizardPay, .js-buyWizardOrderDetails, .js-buyWizardPendingMsg, .js-buyWizardPurchaseBack').addClass('hide');
    this.$el.find('.js-buyWizardOrderSummary, .js-buyWizardCloseSummary').removeClass('hide');

    // alert the user in case they're not in the active window
    new Notification(window.polyglot.t('buyFlow.paymentSent'), {
      silent: true
    });

    // play notification sound
    var notificationSound = document.createElement('audio');
    notificationSound.setAttribute('src', './audio/notification.mp3');
    notificationSound.play();
  },

  openCountrySelect: function(){
    //scroll to bottom
    var scrollParent = $('.js-buyWizardAddressScroller');
    scrollParent.scrollTop(scrollParent[0].scrollHeight);
  },

  blockClicks: function(e) {
    if (!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  validateInput: function(e) {
    var $input = $(e.target);

    if ($input.is('#buyWizardBitcoinAddressInput')) {
      $input.val($input.val().trim());
    }

    e.target.checkValidity();
    $input.closest('.flexRow').addClass('formChecked');
  },

  closeWizard: function() {
    if (this.buyRequest){
      this.buyRequest.abort();
    }

    this.close();
  }
});
