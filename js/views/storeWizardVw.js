var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfileMd'),
    colpicker = require('../utils/colpick.js'),
    countriesModel = require('../models/countriesMd'),
    showErrorModal = require('../utils/showErrorModal.js'),
    Taggle = require('taggle'),
    chosen = require('../utils/chosen.jquery.min.js');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {
    'click .js-storeWizardModal': 'blockClicks',
    'click .js-closeStoreWizardModal': 'closeWizard',
    'click .js-storeWizardSave': 'saveWizard',
    'blur input': 'validateInput'
  },

  initialize: function(options) {
    "use strict";
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.socketView = options.socketView;
    this.model.set('headerURL', this.model.get('user').server_url+"get_image?hash="+this.model.get('page').profile.header_hash);

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketModeratorID = Math.random().toString(36).slice(2);
    this.socketView.getModerators(this.socketModeratorID);
    this.moderatorCount = 0;
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

  render: function() {
    "use strict";
    var self = this;

    loadTemplate('./js/templates/storeWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.initAccordion('.js-storeWizardAccordion');
      self.setValues();
      // fade the modal in after it loads and focus the input
      self.$el.find('.js-storeWizardModal').removeClass('fadeOut');
      self.$el.find('#storeNameInput').focus();
      $('#obContainer').addClass('blur');
    });
  },

  setValues: function() {
    "use strict";
    var self = this;
    this.$el.find('#locationSelect').val(this.model.get('user').country);
    //activate tags plugin
    this.categoriesInput = new Taggle('categoriesInput', {
      saveOnBlur: true
    });
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketModeratorID){
      this.addModerator(data);
    }
  },

  addModerator: function(data){
    "use strict";
    var moderatorAvatarURL = this.model.get('user').server_url+"get_image?hash=" + data.moderator.avatar_hash;
    var newModerator = $(
        '<div class="pad10 flexRow">' +
          '<input type="checkbox" id="inputModerator' + this.moderatorCount + '" class="fieldItem" data-guid="' + data.moderator.guid + '">' +
          '<label for="inputModerator' + this.moderatorCount + '" class="row10 rowTop10 width100">' +
            '<div class="thumbnail thumbnail-large-slim pull-left box-border" style="background-image: url('+moderatorAvatarURL+'), url(imgs/defaultUser.png);"></div>' +
              '<div class="pull-left">' +
              '<div class="row10"><strong>' + data.moderator.name + '</strong></div>' +
              '<div>' + data.moderator.short_description + '</div>' +
            '</div>' +
          '</label>' +
        '</div>'
    );
    this.moderatorCount++;
    this.$el.find('.js-storeWizardModeratorList').append(newModerator);
  },
  
  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();

  },

  closeWizard: function() {
    "use strict";
    console.log("close wizard");
    this.close();
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  saveWizard: function() {
    "use strict";
    var self = this,
        profileForm = this.$el.find('#storeWizardForm'),
        formData = new FormData(profileForm[0]),
        moderatorsChecked = $('.js-storeWizardModeratorList input:checked');

    //add formChecked class to form so invalid fields are styled as invalid
    profileForm.addClass('formChecked');

    //convert taggle tags to data in the form
    this.$el.find('#realCategoriesInput').val(this.categoriesInput.getTagValues().join(","));

    if(profileForm[0].checkValidity()){

      //add data not in the form
      formData.append('vendor', true);
      if(moderatorsChecked.length > 0){
        moderatorsChecked.each(function () {
          formData.append('moderator_list', $(this).data('guid'));
        });
      } else {
        formData.append('moderator_list', "");
      }

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
          }else if (data.success === false){
            showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
          }else{
            showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + window.polyglot.t('errorMessages.serverError') + "</i>");
          }
        },
        error: function (jqXHR, status, errorThrown) {
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    }else{
      showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
    }

  },

  close: function(){
    console.log("close function")
    this.unbind();
    console.log(this);
    this.remove();
    delete this.$el;
    delete this.el;
  }

});