var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfileMd'),
    colpicker = require('../utils/colpick.js'),
    countriesModel = require('../models/countriesMd'),
    taggle = require('taggle'),
    chosen = require('../utils/chosen.jquery.min.js');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {
    'click .js-storeWizardModal': 'blockClicks',
    'click .js-customizeColorInput': 'showColorPicker',
    'change .js-storeWizardImageUpload': 'uploadImage',
    'click .js-closeStoreWizardModal': 'closeWizard',
    'click .js-storeWizardSave': 'saveWizard',
    'blur input': 'validateInput'
  },

  getModerators: function() {
    "use strict";
    var id = Math.random().toString(36).slice(2)
    var connection = new WebSocket('ws://seed.openbazaar.org:18466');
    connection.onopen = function(){
      console.log("connection open");
      connection.send({"request": {"api": "v1", "id": id, "command": "get_moderators" }});
    };
    connection.onerror = function(error){
      console.log("connection error "+ error);
    };
    connection.onmessage = function(e){
      console.log("connection message "+ e.data);
    };
  },

  initialize: function(options) {
    "use strict";
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.getModerators();
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

  showColorPicker: function(e){
    "use strict";
    $(e.target).colpickShow();
  },

  render: function() {
    "use strict";
    var self = this;

    loadTemplate('./js/templates/storeWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.initAccordion('.js-storeWizardAccordion');
      self.setValues();
      self.setCustomStyles();
      self.$el.find('.js-customizeColorInput').colpick({
        layout: "rgbhex", //can also be full, or hex
        colorScheme: "dark", //can also be light
        submitText: "Change",
        flat: true,
        onShow: function (el) {
          var colorKey = $(this).attr('id');
          if(self.model.get('page').profile[colorKey]){
            $(this).colpickSetColor(self.model.get('page').profile[colorKey].slice(1), true);
          }
          //override annoying placement function TODO: fix in source code
          $(el).css({left: 0, top: 0});
        },
        onSubmit: function (hsb, hex, rgb, el) {
          self.setCustomColor(hex, $(el).attr('id'));
          $(el).closest('.js-customizeColorWrapper').find('.js-customizeColorLabel').css('background-color', '#' + hex);
          $(el).colpickHide();
        },
        onHide: function () {
        }
      }).colpickHide();
      self.errorModal = $('.js-messageModal');
      $('#storeNameInput').focus();
    });
  },

  uploadImage: function(e){
    var self = this;

    var formData = new FormData(this.$el.find('#storeWizardImageForm')[0]);
    $.ajax({
      type: "POST",
      url: self.model.get('user').server_url + "upload_image",
      contentType: false,
      processData: false,
      dataType: "json",
      data: formData,
      success: function(data) {
        var errorModal,
            imageHash = data.image_hashes[0];

        if (data.success === true && imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
          self.$el.find('.js-storeWizardHero').css("background-image", "url("+self.model.get('user').server_url+"get_image?hash="+imageHash+")");
          self.$el.find('#headerInput').val(imageHash);
        }else if (imageHash == "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb") {
          self.showErrorModal("Changes Could Not Be Saved", "Uploading the image has failed due to the following error: <br/><br/><i>Image hash returned is blank.</i>");
        }else if (data.success === false){
          self.showErrorModal("Changes Could Not Be Saved", "Uploading image(s) has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  setValues: function() {
    "use strict";
    var self = this;
    //add all countries to the Ships To select list
    var countries = new countriesModel(),
        countryList = countries.get('countries'),
        locationSelect = this.$el.find('#locationSelect');
    
    __.each(countryList, function(country, i){
      locationSelect.append('<option value="'+country.dataName+'">'+country.name+'</option>');
    });

    locationSelect.val(this.model.get('user').country);
    locationSelect.chosen();
    //activate tags plugin
    this.categoriesInput = new Taggle('categoriesInput');
  },

  setCustomStyles: function() {
    "use strict";
    var self = this;
    //set custom color input values
    $('.js-customizeColorInput').each(function(){
      var newColor = self.model.get('page').profile[$(this).attr('id')];
      $(this).val(newColor);
      $(this).closest('.js-customizeColorWrapper').find('.js-customizeColorLabel').css('background-color', newColor);
    });
  },

  setCustomColor: function(newColor, colorKey) {
    "use strict";
    var tempPage  =  __.clone(this.model.get('page'));
    tempPage.profile[colorKey] = '#'+newColor;
    this.model.set('page', tempPage);
    this.setCustomStyles();
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();
  },

  closeWizard: function() {
    "use strict";
    this.close();
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  showErrorModal: function(errorTitle, errorMessage) {
    "use strict";
    this.errorModal.removeClass('hide');
    this.errorModal.find('.js-messageModal-title').text(errorTitle);
    this.errorModal.find('.js-messageModal-message').html(errorMessage);
  },

  saveWizard: function() {
    "use strict";
    var self = this,
        formData = new FormData(),
        errorModal,
        profileForm = this.$el.find('#storeWizardForm'),
        formArray = profileForm.serializeArray(),
        dataModerator = this.model.get('page').profile.moderator;

    //add formChecked class to form so invalid fields are styled as invalid
    profileForm.addClass('formChecked');

    //convert taggle tags to data in the form
    this.$el.find('#realCategoriesInput').val(this.categoriesInput.getTagValues().join(","));

    if(profileForm[0].checkValidity()){
      //because Chrome can't manipulate formData, first put everything into an array, and manipulate it before adding to formData
      __.each(formArray, function (formInputData) {
        if (formInputData.name == 'background_color' || formInputData.name == 'primary_color' || formInputData.name == 'text_color' || formInputData.name == 'secondary_color'){
          //convert hex to decimal. This value is validated as hex in the form
          var profileColor = parseInt(formInputData.value.slice(1), 16);
          formData.append(formInputData.name, profileColor);
        }else{
          formData.append(formInputData.name, formInputData.value);
        }
      });

      //add data not in the form
      formData.append('vendor', true);
      formData.append('moderator', dataModerator);

      $.ajax({
        type: "POST",
        url: self.model.get('user').server_url + "profile",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: function (data) {
          if (data.success === true){
            self.trigger('storeCreated');
            new Notification('You\'ve added a store to your page!'); //TO DO: We need to localize this
          }else if (data.success === false){
            self.showErrorModal("Changes Could Not Be Saved", "Saving has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
          }else{
            self.showErrorModal("Changes Could Not Be Saved", "Saving has failed due to the following error: <br/><br/><i>Incorrect reply from server.</i>");
          }
        },
        error: function (jqXHR, status, errorThrown) {
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    }else{
      self.showErrorModal("Changes Could Not Be Saved", "Saving has failed due to the following error: <br/><br/><i>Some required fields are missing or invalid.</i>");
    }

  },

  close: function(){
    "use strict";
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }

});