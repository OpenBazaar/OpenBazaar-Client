var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    buyDetailsVw = require('./buyDetailsVw'),
    buyAddressesVw = require('./buyAddressesVw'),
    showErrorModal = require('../utils/showErrorModal.js'),
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
    'click .js-buyWizardModNext': 'modNext',
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
    this.parentEl = $(options.parentEl);
    this.hideMap = true;

    //create the country select list
    this.countryList = countries.get('countries');
    this.countriesSelect = $('<select class="chosen custCol-text" id="buyWizardCountryInput"></select>');
    __.each(this.countryList, function(countryFromList, i){
      self.countriesSelect.append('<option value="'+countryFromList.dataName+'" data-name="'+countryFromList.name +'">'+countryFromList.name+'</option>');
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
    console.log(data);
    //look for message type "payment received" and orderID
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
        moveBy = advanceBy ? this.accWidth * advanceBy : this.accWidth;

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
    console.log(rewindBy);
    var self = this,
        oldPos = parseInt(this.accWin.css('left').replace("px","")),
        moveBy = rewindBy ? this.accWidth * rewindBy : this.accWidth;

    if(oldPos < (0)){
      this.accWin.css('left', function(){
        return oldPos + moveBy;
      });
      // focus search input
      $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
    }
  },

  render: function(){
    var self = this;
    this.buyDetailsView = new buyDetailsVw({model: this.model});
    this.buyAddressesView = new buyAddressesVw({model: this.model});
    this.listenTo(this.buyAddressesView, 'setAddress', this.addressSelected);

    loadTemplate('./js/templates/buyWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.initAccordion('.js-buyWizardAccordion');
      // fade the modal in after it loads and focus the input
      self.$el.find('.js-buyWizardModal').removeClass('fadeOut');
      $('#obContainer').addClass('blur');
      //add all countries to the Ships To select list
      self.$el.find('.js-buyWizardCountryWrapper').append(self.countriesSelect);
      //add address view
      self.buyAddressesView.render();
      self.$el.find('.js-buyWizardAddresses').append(self.buyAddressesView.el);
      //add details view
      self.$el.find('.js-buyWizardInsertDetails').append(self.buyDetailsView.el);
      //set the initial total price
      self.setTotalPrice();
    });

    return this;
  },

  modSelected: function(e){
    "use strict";
    var modIndex = $(e.target).val();
    this.$el.find('.js-buyWizardModNext').removeClass('disabled');
    if(modIndex != "direct"){
      this.model.set('selectedModerator', this.model.get('vendor_offer').listing.moderators[modIndex]);
    } else {
      this.model.set('selectedModerator', "");
    }
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
        newAddresses = this.options.userModel.get('shipping_addresses');

    newAddress.name = this.$el.find('#buyWizardNameInput').val();
    newAddress.street = this.$el.find('#buyWizardStreetInput').val();
    newAddress.city = this.$el.find('#buyWizardCityInput').val();
    newAddress.state = this.$el.find('#buyWizardStateInput').val();
    newAddress.postal_code = this.$el.find('#buyWizardPostalInput').val();
    newAddress.country = this.$el.find('#buyWizardCountryInput').val();
    newAddress.displayCountry = this.$el.find('#buyWizardCountryInput option:selected').data('name');

    if(newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.postal_code && newAddress.country) {
      newAddresses.push(newAddress);
    }

    formData.append('shipping_addresses', JSON.stringify(newAddresses));

    formData = this.modelToFormData(this.model.get('user'), formData, {'shipping_addresses': newAddresses});

    targetForm.addClass('formChecked');

    if(targetForm[0].checkValidity()){
      $.ajax({
        type: "POST",
        url: self.model.get('serverUrl') + "settings",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: function(data) {
          if (data.success === true){
            //clear form
            self.$el.find('#buyWizardNameInput').val("");
            self.$el.find('#buyWizardStreetInput').val("");
            self.$el.find('#buyWizardCityInput').val("");
            self.$el.find('#buyWizardStateInput').val("");
            self.$el.find('#buyWizardPostalInput').val("");
            self.$el.find('#buyWizardCountryInput').val("");
            targetForm.removeClass('formChecked').find('.formChecked').removeClass('formChecked');
            self.hideNewAddress();
            self.addNewAddress();
          }else if (data.success === false){
            showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
          }
        },
        error: function(jqXHR, status, errorThrown){
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    } else {
      console.log("new address form invalid");
    }
  },

  addNewAddress: function(){
    "use strict";
    var self = this;
    this.options.userModel.fetch({
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
    if(address && address.street && address.city && address.state && address.postal_code && address.displayCountry) {
      addressString = address.street + ", " + address.city + ", " + address.state + " " + address.postal_code + " " + address.displayCountry;
      addressString = encodeURIComponent(addressString);
      var hideClass = this.hideMap ? "hide" : "";
      var newMap = '<iframe class="' + hideClass + ' js-buyWizardMap"' +
          'width="525" height="250" frameborder="0" style="border:0"' +
          'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBoWGMeVZpy9qc7H418Jk2Sq2NWedJgp_4&q=' + addressString + '"></iframe>';
      this.$el.find('.js-buyWizardMap').html(newMap);
    }
  },

  modNext: function(){
    "use strict";
    if(this.model.get('vendor_offer').listing.metadata.category == "physical good"){
      this.accNext();
      this.showMaps();
    } else {
      this.accNext(2);
    }
  },

  addressPrev: function(){
    "use strict";
    this.accPrev();
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
        moderatorID = this.model.get('selectedModerator').guid,
        selectedAddress = this.model.get('selectedAddress');

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
          showErrorModal(window.polyglot.t('errorMessages.contractError'), window.polyglot.t('errorMessages.sellerError'));
        }
      },
      error: function (jqXHR, status, errorThrown) {
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
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
        userCurrency = this.model.get('userCurrencyCode'),
        totalDisplayPrice = (userCurrency == "BTC") ? totalPrice.toFixed(6) + " btc" : new Intl.NumberFormat(window.lang, {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: userCurrency
        }).format(totalPrice);
    this.$el.find('.js-buyWizardDetailsTotal').text(totalDisplayPrice);
  },

  copyPayAddress: function(){
    "use strict";
    clipboard.writeText(this.payURL);
  },

  backPurchase: function(){
    "use strict";
    this.hidePayAddress();
    if(this.model.get('vendor_offer').listing.metadata.category == "physical good"){
      this.accPrev();
    } else {
      this.accPrev(2);
    }
    this.buyDetailsView.render();
    this.$el.find('.js-buyWizardSendPurchase').removeClass('hide');
    this.$el.find('.js-buyWizardPendingMsg').addClass('hide');
  },

  showSummary: function(){
    "use strict";
    this.$el.find('.js-buyWizardPay, .js-buyWizardOrderDetails').addClass('hide');
    this.$el.find('.js-buyWizardOrderSummary').removeClass('hide');
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