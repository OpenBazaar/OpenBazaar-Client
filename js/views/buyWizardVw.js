var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    buyDetailsVw = require('./buyDetailsVw'),
    buyAddressesVw = require('./buyAddressesVw'),
    showErrorModal = require('../utils/showErrorModal.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    qr = require('qr-encode');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "buyView",

  events: {
    'click .js-buyWizardModal': 'blockClicks',
    'click .js-closeBuyWizardModal': 'closeWizard',
    'click .js-buyWizardNewAddressBtn': 'createNewAddress',
    'click .js-buyWizardModeratorRadio': 'modSelected',
    'click .js-buyWizardModalModDone': 'hideMaps',
    'click .js-buyWizardAddressBack': 'showMaps',
    'click .js-buyWizardNewAddressCancel': 'hideNewAddress',
    'click .js-buyWizardNewAddressSave': 'saveNewAddress',
    'click .js-buyWizardAddressNext': 'addressDone',
    'click .js-buyWizardSendPurchase': 'sendPurchase',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this,
        countries = new countriesModel();

    this.options = options || {};
    /* expected options are:
    userModel: this is set by app.js, then by a call to the settings API.
    parentEl: this is set by itemVw, and is the element this view is rendered into
     */
    this.parentEl = $(options.parentEl);
    this.hideMap = true;

    //create the country select list
    this.countryList = countries.get('countries');
    this.countriesSelect = $('<select class="chosen custCol-text" id="buyWizardCountryInput"></select>');
    __.each(this.countryList, function(countryFromList, i){
      self.countriesSelect.append('<option value="'+countryFromList.dataName+'" data-name="'+countryFromList.name +'">'+countryFromList.name+'</option>');
    });
    console.log(this.model);
    this.render();
  },

  initAccordion: function(targ){
    "use strict";
    var acc = $(targ),
        accWidth = acc.width(),
        accHeight = acc.height(),
        accChildren = acc.find('.accordion-child'),
        accNum = accChildren.length,
        accWin = acc.find('.accordion-window');

    accWin.css({'left':0, 'width': function(){return accWidth * accNum;}});
    accChildren.css({'width':accWidth, 'height':accHeight});
    acc.find('.js-accordionNext').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos > (accWidth * accNum * -1 + accWidth)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) - accWidth;
        });
        // focus search input
        $(this).closest('.accordion-child').next('.accordion-child').find('.search').focus();
      }
    });
    acc.find('.js-accordionPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
        // focus search input
        $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
      }
    });
  },

  render: function(){
    var self = this;
    this.buyDetailsView = new buyDetailsVw({model: this.model});
    this.buyAddressesView = new buyAddressesVw({model: this.options.userModel});
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
      self.buyAddressesView.render(0);
      self.$el.find('.js-buyWizardAddresses').append(self.buyAddressesView.el);
      //add details view
      self.$el.find('.js-buyWizardDetails').append(self.buyDetailsView.el);
    });

    return this;
  },

  modSelected: function(e){
    "use strict";
    var modIndex = $(e.target).val();
    this.$el.find('.js-buyWizardModalModDone').removeClass('disabled');
    if(modIndex != "direct"){
      this.model.set('selectedModerator', this.model.get('vendor_offer').listing.moderators[modIndex]);
    } else {
      this.model.set('selectedModerator', "");
    }
  },

  hideMaps: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').removeClass('hide');
    this.$el.find('.js-buyWizardMapPlaceHolder').removeClass('hide');
    this.hideMap = false;
  },

  showMaps: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').addClass('hide');
    this.$el.find('.js-buyWizardMapPlaceHolder').addClass('hide');
    this.hideMap = true;
  },

  createNewAddress: function(){
    "use strict";
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
    console.log("save address");

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
    for(var addressKey in address) {
      if(address.hasOwnProperty(addressKey)){
        if(addressKey != 'name' && addressKey != 'country'){
          addressString +=  address[addressKey] + " ";
        }
      }
    }
    addressString = encodeURIComponent(addressString);
    var hideClass = this.hideMap ? "hide" : "";
    var newMap = '<iframe class="' + hideClass + ' js-buyWizardMap"' +
        'width="525" height="250" frameborder="0" style="border:0"' +
        'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBoWGMeVZpy9qc7H418Jk2Sq2NWedJgp_4&q=' + addressString + '"></iframe>';
    this.$el.find('.js-buyWizardMap').html(newMap);
  },

  addressDone: function(){
    "use strict";
    this.hideMaps();
  },

  sendPurchase: function(){
    "use strict";
    var self = this,
        formData = new formData();

    formData.append("id", this.model.get('id'));
    //formData.append("quantity", )
    $.post({
      url: this.options.userModel.get('serverUrl') + "/purchase_contract",
      data: formData,
      dataType: 'json',
      success: function(data){
        console.log(data);
      },
      error: function(data){
        console.log(data);
      }
    });

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