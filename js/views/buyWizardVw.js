var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    showErrorModal = require('../utils/showErrorModal.js'),
    chosen = require('../utils/chosen.jquery.min.js');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "buyView",

  events: {
    'click .js-buyWizardModal': 'blockClicks',
    'click .js-closeBuyWizardModal': 'closeWizard',
    'click .js-buyWizardNewAddressBtn': 'createNewAddress',
    'click .js-buyWizardModalModDone': 'modSelected',
    'click .js-buyWizardAddressBack': 'addressBack',
    'click .js-buyWizardNewAddressCancel': 'hideNewAddress',
    'click .js-buyWizardNewAddressSave': 'saveNewAddress',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this,
        initialStreetAddress = this.model.get('user').ship_to_street + " " +
            this.model.get('user').ship_to_city + " " +
            this.model.get('user').ship_to_state + " " +
            this.model.get('user').ship_to_postal_code + " " +
            this.model.get('user').ship_to_country,
        countries = new countriesModel();
    initialStreetAddress = encodeURIComponent(initialStreetAddress);
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    //create the country select list
    this.countryList = countries.get('countries');
    this.countriesSelect = $('<select class="chosen custCol-text" id="buyWizardCountryInput"></select>');
    __.each(this.countryList, function(countryFromList, i){
      self.countriesSelect.append('<option value="'+countryFromList.dataName+'">'+countryFromList.name+'</option>');
    });
    console.log(this.countriesSelect);
    this.model.set("initialStreetAddress", initialStreetAddress);
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
    loadTemplate('./js/templates/buyWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.initAccordion('.js-buyWizardAccordion');
      self.errorModal = $('.js-messageModal');
      // fade the modal in after it loads and focus the input
      self.$el.find('.js-buyWizardModal').removeClass('fadeOut');
      $('#obContainer').addClass('blur');
      //add all countries to the Ships To select list
      self.$el.find('.js-buyWizardCountryWrapper').append(self.countriesSelect);
    });
    return this;
  },

  modSelected: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').removeClass('hide');
  },

  addressBack: function(){
    "use strict";
    this.$el.find('.js-buyWizardMap').addClass('hide');
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

  saveNewAddress: function(){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#buyWizardNewAddressForm'),
        formData = new FormData(targetForm[0]);

    if(targetForm[0].checkValidity()){
      $.ajax({
        type: "POST",
        url: self.model.get('server_url') + "settings",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: function(data) {
          if (data.success === true){
            self.hideNewAddress();
            self.addNewAddress(data);
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
    }
  },

  addNewAddress: function(data){
    "use strict";
    console.log(data);
    //render addresses as a sub view?
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