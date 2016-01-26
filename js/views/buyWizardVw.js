var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    buyDetailsVw = require('./buyDetailsVw'),
    buyAddressesVw = require('./buyAddressesVw'),
    messageModal = require('../utils/messageModal.js'),
    saveToAPI = require('../utils/saveToAPI'),
    chosen = require('../utils/chosen.jquery.min.js'),
    qr = require('qr-encode'),
    clipboard = require('clipboard');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "buyView",

  events: {
    'click .js-buyWizardModal': 'blockClicks',
    'click .js-closeBuyWizardModal': 'closeWizard',
    'click .js-buyWizardNewAddressBtn': 'createNewAddress',
    'click .js-buyWizardModeratorRadio': 'modSelected',
    'click .js-buyWizardModNext': 'accNext',
    'click .js-buyWizardReturnNext': 'returnNext',
    'click .js-buyWizardAddressBack': 'addressPrev',
    'click .js-buyWizardAddressNext': 'addressNext',
    'click .js-buyWizardNewAddressCancel': 'hideNewAddress',
    'click .js-buyWizardNewAddressSave': 'saveNewAddress',
    'click .js-buyWizardSendPurchase': 'sendPurchase',
    'click .js-buyWizardPurchaseBack': 'backPurchase',
    'click .js-buyWizardPayCopy': 'copyPayAddress',
    'click .js-accordionNext': 'accNext',
    'click .js-accordionPrev': 'accPrev',
    'click .js-buyWizardCountryWrapper': 'openCountrySelect',
    'click .js-buyWizardPayCheck': 'checkPayment',
    'click .js-buyWizardCloseSummary': 'closeWizard',
    'blur .js-buyWizardPostalInput': 'updateMap',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this,
        countries = new countriesModel();

    this.options = options || {};
    /* expected options are:
    userModel: this is set by app.js, then by a call to the settings API.
    parentEl: this is set by itemVw, and is the element this view is rendered into
    socketView: this is a reference to the socketView
     */
    this.userModel = this.options.userModel;
    this.parentEl = $(options.parentEl);
    this.hideMap = true;
    this.orderID = "";
    this.model.set('selectedModerator', "");
    this.subViews = [];
    this.subModels = [];

    //create the country select list
    this.countryList = countries.get('countries');
    this.countriesSelect = $('<select class="chosen custCol-text" id="buyWizardCountryInput" required></select>');
    __.each(this.countryList, function(countryFromList, i){
      var countryOption = $('<option value="'+countryFromList.dataName+'" data-name="'+countryFromList.name +'">'+countryFromList.name+'</option>');
      countryOption.attr("selected",self.options.userModel.get('country') == countryFromList.dataName);
      self.countriesSelect.append(countryOption);
    });
    this.listenTo(this.model, 'change:totalPrice', this.setTotalPrice);
    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });

    this.render();
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.notification && data.notification.order_id == this.orderID && data.notification.type == "payment received"){
      this.showSummary();
    }
  },

  initAccordion: function(targ){
    "use strict";
    this.acc = $(targ);
    this.accWidth = this.acc.width();
    this.accHeight = this.acc.height();
    this.accChildren = this.acc.find('.accordion-child');
    this.accNum = this.accChildren.length;
    this.accWin = this.acc.find('.accordion-window');
    this.accWin.css({'left':0, 'width': function(){return this.accWidth * this.accNum;}});
    this.accChildren.css({'width':this.accWidth, 'height':this.accHeight});
  },

  accNext: function(advanceBy){
    "use strict";
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(advanceBy) ? this.accWidth * advanceBy : this.accWidth;

    if(oldPos > (this.accWidth * (this.accNum -1) * -1)){
      this.accWin.css('left', function(){
        return oldPos - moveBy;
      });
      // focus search input
      $(this).closest('.accordion-child').next('.accordion-child').find('.search').focus();
    }
  },

  accPrev: function(rewindBy){
    "use strict";
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = parseInt(rewindBy) ? this.accWidth * rewindBy : this.accWidth;

    if(oldPos < (0)){
      this.accWin.css('left', function(){
        return oldPos + moveBy;
      });
      // focus search input
      $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
    }
  },

  accGoToID: function(ID){
    "use strict";
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        currIndex = oldPos % this.accNum * -1,
        newIndex = this.accWin.find(ID).index(),
        moveBy = this.accWidth * (currIndex - newIndex);

    this.accWin.css('left', function(){
      return oldPos + moveBy;
    });
    // focus search input
    $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/buyWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      //append the view to the passed in parent
      self.parentEl.append(self.$el);

      //add subviews
      self.buyDetailsView = new buyDetailsVw({model: self.model});
      self.buyAddressesView = new buyAddressesVw({model: self.model, userModel: self.userModel});
      self.listenTo(self.buyAddressesView, 'setAddress', self.addressSelected);
      self.subViews.push(self.buyDetailsView, self.buyAddressesView);

      //init the accordion
      self.initAccordion('.js-buyWizardAccordion');

      // fade the modal in after it loads and focus the input
      self.$el.find('.js-buyWizardModal').removeClass('fadeOut');

      //add all countries to the Ships To select list
      self.$el.find('.js-buyWizardCountryWrapper').append(self.countriesSelect);

      //add address view
      self.buyAddressesView.render(0);
      self.$el.find('.js-buyWizardAddresses').append(self.buyAddressesView.el);
      //add details view
      self.$el.find('.js-buyWizardInsertDetails').append(self.buyDetailsView.el);
    });
    return this;
  },

  modSelected: function(e){
    "use strict";
    var modIndex = $(e.target).val();
    //this.$el.find('.js-buyWizardModNext').removeClass('disabled');
    if(modIndex != "direct"){
      this.model.set('selectedModerator', this.model.get('vendor_offer').listing.moderators[modIndex]);
    } else {
      this.model.set('selectedModerator', "");
    }
    this.accNext();
  },

  showMaps: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').removeClass('hide');
    this.$el.find('.js-buyWizardMapPlaceHolder').removeClass('hide');
    this.hideMap = false;
  },

  hideMaps: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').addClass('hide');
    this.$el.find('.js-buyWizardMapPlaceHolder').addClass('hide');
    this.hideMap = true;
  },

  createNewAddress: function(){
    "use strict";
    var self = this;
    this.$el.find('.js-buyWizardAddress').addClass('hide');
    this.$el.find('.js-buyWizardNewAddress').removeClass('hide');
    this.$el.find('#buyWizardNameInput').focus();
    //set chosen inputs
    $('.chosen').chosen();
  },

  hideNewAddress: function(){
    "use strict";
    this.$el.find('.js-buyWizardAddress').removeClass('hide');
    this.$el.find('.js-buyWizardNewAddress').addClass('hide');
  },

  addressSelected: function(selectedAddress){
    "use strict";
    this.model.set('selectedAddress', selectedAddress);
    this.displayMap(selectedAddress);
    this.$el.find('.js-buyWizardAddressNext').removeClass('disabled');
  },

  modelToFormData: function(modelJSON, formData, existingKeys) {
    "use strict";
    var newFormData = formData || new FormData();
    __.each(modelJSON, function(value, key) {
      if(!__.has(existingKeys, key)) {
        newFormData.append(key, value);
      }
    });
    return newFormData;
  },

  saveNewAddress: function(){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#buyWizardNewAddressForm'),
        formData = new FormData(),
        newAddress = {},
        newAddresses = [],
        addressData = {};

    __.each(this.userModel.get('shipping_addresses'), function(address, i){
      newAddresses.push(JSON.stringify(address));
    });

    newAddress.name = this.$el.find('#buyWizardNameInput').val();
    newAddress.street = this.$el.find('#buyWizardStreetInput').val();
    newAddress.city = this.$el.find('#buyWizardCityInput').val();
    newAddress.state = this.$el.find('#buyWizardStateInput').val();
    newAddress.postal_code = this.$el.find('#buyWizardPostalInput').val();
    newAddress.country = this.$el.find('#buyWizardCountryInput').val();
    newAddress.displayCountry = this.$el.find('#buyWizardCountryInput option:selected').data('name');

    if(newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.postal_code && newAddress.country) {
      newAddresses.push(JSON.stringify(newAddress));
    }

    addressData.shipping_addresses = newAddresses;

    saveToAPI(targetForm, this.userModel.toJSON(), self.model.get('serverUrl') + "settings", function(){
      self.$el.find('#buyWizardNameInput').val("");
      self.$el.find('#buyWizardStreetInput').val("");
      self.$el.find('#buyWizardCityInput').val("");
      self.$el.find('#buyWizardStateInput').val("");
      self.$el.find('#buyWizardPostalInput').val("");
      self.$el.find('#buyWizardCountryInput').val(self.userModel.get('country'));
      self.$el.find('.chosen').trigger('chosen:updated');
      targetForm.removeClass('formChecked').find('.formChecked').removeClass('formChecked');
      self.hideNewAddress();
      self.addNewAddress();
    }, "", addressData);
  },

  addNewAddress: function(){
    "use strict";
    var self = this;
    this.userModel.fetch({
      success: function(data){
        var selected = data.attributes.shipping_addresses.length -1;
        //this will refresh the userModel, buyAddressView has a reference to it
        self.buyAddressesView.render(selected);
      }
    });
  },

  displayMap: function(address){
    "use strict";
    var addressString = "";
    //only create new map if address is valid
    if(address && address.street && address.city && address.state && address.postal_code) {
      addressString = address.street + ", " + address.city + ", " + address.state + " " + address.postal_code + " " + address.displayCountry;
      addressString = encodeURIComponent(addressString);
      var hideClass = this.hideMap ? "hide" : "";
      var newMap = '<div class="overflowHidden"><iframe class="' + hideClass + ' js-buyWizardMap"' +
          'width="525" height="350" frameborder="0" style="border:0; margin-top: -100px"' +
          'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBoWGMeVZpy9qc7H418Jk2Sq2NWedJgp_4&q=' + addressString + '"></iframe></div>';
      this.$el.find('.js-buyWizardMap').html(newMap);
    }
  },

  updateMap: function(){
    var address = [];
    address.street = $('#buyWizardStreetInput').val();
    address.city = $('#buyWizardCityInput').val();
    address.state = $('#buyWizardStateInput').val();
    address.postal_code = $('#buyWizardPostalInput').val();

    this.displayMap(address);
  },

  returnNext: function(){
    "use strict";
    var self = this,
        bitCoinReturnAddr = this.$el.find('#buyWizardBitcoinAddressInput').val(),
        modForm = this.$el.find('#buyWizardBitcoinReturnForm');

    modForm.addClass('formChecked');

    if(modForm[0].checkValidity()) {
      if (bitCoinReturnAddr != this.userModel.get('refund_address')) {
        saveToAPI(modForm, this.userModel.toJSON(), this.model.get('serverUrl') + "settings", function () {
              self.skipAddressCheck();
            },
            function () {
              messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError') + ": " + window.polyglot.t('BitcoinReturnAddress'));
            });
      } else {
        this.skipAddressCheck();
      }
    }
  },

  skipAddressCheck: function(){
    "use strict";

    if(this.model.get('vendor_offer').listing.metadata.category == "physical good"){
      this.accGoToID('#BuyWizardShipTo');
      this.showMaps();
      if(this.userModel.get('shipping_addresses').length === 0){
        this.createNewAddress();
        $('.js-buyWizardAddressBack').show();
        $('.js-buyWizardNewAddressCancel').hide();
      }
    } else {
      this.accGoToID('#BuyWizardDetails');
    }
  },

  addressPrev: function(){
    "use strict";
    this.accGoToID("#BuyWizardBTCReturnAddress");
    this.hideMaps();
  },

  addressNext: function(){
    "use strict";
    this.accNext();
    this.hideMaps();
  },

  sendPurchase: function(){
    "use strict";
    var self = this,
        formData = new FormData(),
        moderatorID = this.model.get('selectedModerator').guid || "",
        selectedAddress = this.model.get('selectedAddress'),
        btcReturnAddress = "";

    if (!this.$el.find('#buyWizardQuantity')[0].checkValidity()){
      messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
      return;
    }

    formData.append("id", this.model.get('id'));

    formData.append("quantity", this.$el.find('.js-buyWizardQuantity').val());
    if(selectedAddress){
      formData.append("ship_to", selectedAddress.name);
      formData.append("address", selectedAddress.street);
      formData.append("city", selectedAddress.city);
      formData.append("state", selectedAddress.state);
      formData.append("postal_code", selectedAddress.postal_code);
      formData.append("country", selectedAddress.country);
    }

    if(moderatorID){
      formData.append("moderator", moderatorID);
    }

    this.$el.find('.js-buyWizardSpinner').removeClass('hide');

    this.userModel.fetch({
      success: function(data){
        formData.append("refund_address", data.attributes.refund_address);
        $.ajax({
          type: "POST",
          url: self.model.get('serverUrl') + "purchase_contract",
          contentType: false,
          processData: false,
          data: formData,
          dataType: 'json',
          success: function(data){
            if(data.success == true){
              self.showPayAddress(data);
            } else {
              messageModal.show(window.polyglot.t('errorMessages.contractError'), window.polyglot.t('errorMessages.sellerError') +" " + window.polyglot.t('errorMessages.checkPurchaseData'));
              self.$el.find('.js-buyWizardSpinner').addClass('hide');
            }
          },
          error: function (jqXHR, status, errorThrown) {
            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
          }
        });
      },
      error: function(){
        messageModal.show(window.polyglot.t('errorMessages.getError'));
      }
    });
  },

  showPayAddress: function(data){
    "use strict";
    var totalBTCPrice = 0,
        storeName = encodeURI(this.model.get('page').profile.name),
        message = encodeURI(this.model.get('vendor_offer').listing.item.title + " "+data.order_id),
        payHREF = "",
        dataURI;
    this.$el.find('.js-buyWizardSpinner').addClass('hide');
    this.orderID = data.order_id;
    totalBTCPrice = data.amount;
    this.$el.find('.js-buyWizardDetailsTotalBTC').text(totalBTCPrice);
    this.payURL = data.payment_address;
    payHREF = "bitcoin:"+ data.payment_address+"?amount="+totalBTCPrice+"&label="+storeName+"&message="+message;
    this.hideMaps();
    this.$el.find('.js-buyWizardPay').removeClass('hide');
    this.$el.find('.js-buyWizardSendPurchase').addClass('hide');
    this.$el.find('.js-buyWizardPendingMsg').removeClass('hide');
    dataURI = qr(payHREF, {type: 10, size: 10, level: 'M'});
    this.$el.find('.js-buyWizardPayQRCode').attr('src', dataURI);
    this.$el.find('.js-buyWizardPayPrice').text();
    this.$el.find('.js-buyWizardPayURL').text(data.payment_address);
    this.$el.find('.js-buyWizardPayLink').attr('href', payHREF).on('click', function(e){
      e.preventDefault();
      var extUrl = payHREF;
      require("shell").openExternal(extUrl);
    });
    this.buyDetailsView.lockForm();
  },

  hidePayAddress: function(){
    "use strict";
    this.$el.find('.js-buyWizardPay').addClass('hide');
  },

  setTotalPrice: function(){
    "use strict";
    var totalPrice = this.model.get('totalPrice'),
        totalBTCPrice = this.model.get('totalBTCDisplayPrice'),
        userCurrency = this.model.get('userCurrencyCode'),
        totalDisplayPrice = (userCurrency == "BTC") ? totalPrice.toFixed(6) + " BTC" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalPrice);
    this.$el.find('.js-buyWizardDetailsTotal').text(totalDisplayPrice);
    this.$el.find('.js-buyWizardDetailsBTCTotal').text(totalBTCPrice.toFixed(4));
  },

  copyPayAddress: function(){
    "use strict";
    clipboard.writeText(this.payURL);
  },

  backPurchase: function(){
    "use strict";
    this.hidePayAddress();
    if(this.model.get('vendor_offer').listing.metadata.category == "physical good"){
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

  showSummary: function(){
    "use strict";
    this.$el.find('.js-buyWizardPay, .js-buyWizardOrderDetails, .js-buyWizardPendingMsg, .js-buyWizardPurchaseBack').addClass('hide');
    this.$el.find('.js-buyWizardOrderSummary, .js-buyWizardCloseSummary').removeClass('hide');

    // alert the user in case they're not in the active window
    new Notification(window.polyglot.t('buyFlow.paymentSent'));
    
    // play notification sound
    var notifcationSound = document.createElement('audio');
    notifcationSound.setAttribute('src', './audio/notification.mp3');
    notifcationSound.play();
  },

  openCountrySelect: function(){
    "use strict";
    //scroll to bottom
    var scrollParent = $('.js-buyWizardAddressScroller');
    scrollParent.scrollTop(scrollParent[0].scrollHeight);
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();

  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  closeWizard: function() {
    "use strict";
    this.close();
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }

});