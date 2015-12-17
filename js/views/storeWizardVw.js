var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfileMd'),
    colpicker = require('../utils/colpick.js'),
    countriesModel = require('../models/countriesMd'),
    showErrorModal = require('../utils/showErrorModal.js'),
    saveToAPI = require('../utils/saveToAPI'),
    Taggle = require('taggle');

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
    console.log(this.model);
    if(this.model.get('page').profile.header_hash){

      this.model.set('headerURL', this.model.get('user').serverUrl+"get_image?hash="+this.model.get('page').profile.header_hash);
    }

    this.listenTo(window.obEventBus, "socketMessageRecived", function(response){
      this.handleSocketMessage(response);
    });
    this.socketModeratorID = Math.random().toString(36).slice(2);
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
        $(this).closest('.accordion-child').next('.accordion-child').find('input:visible:first').focus();
      }
    });
    acc.find('.js-accordionPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
        // focus search input
        $(this).closest('.accordion-child').prev('.accordion-child').find('input:visible:first').focus();
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
      self.socketView.getModerators(self.socketModeratorID);
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
    var moderatorAvatarURL = this.model.get('user').serverUrl+"get_image?hash=" + data.moderator.avatar_hash;
    var moderatorDescription = (data.moderator.short_description) ? data.moderator.short_description : window.polyglot.t('NoDescriptionAdded');
    var moderatorHandle = (data.moderator.handle) ? data.moderator.handle : data.moderator.guid;
    var newModerator = $(
        '<div class="pad10 flexRow custCol-border-secondary">' +
          '<input type="checkbox" id="inputModerator' + this.moderatorCount + '" class="fieldItem" data-guid="' + data.moderator.guid + '">' +
          '<label for="inputModerator' + this.moderatorCount + '" class="row10 rowTop10 width100">' +
            '<div class="thumbnail thumbnail-large-slim pull-left box-border" style="background-image: url('+moderatorAvatarURL+'), url(imgs/defaultUser.png);"></div>' +
              '<div class="pull-left marginLeft6">' +
              '<div class="clearfix"><div class="capitalize marginBottom2 marginRight5 floatLeft marginRight5 textOpacity1">' + data.moderator.name + '</div> <div class="floatLeft txt-fade">' + moderatorHandle + '</div></div>' +
              '<div class="fontSize14 txt-fade textWeightNormal">' + moderatorDescription + '</div>' +
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
        moderatorsChecked = $('.js-storeWizardModeratorList input:checked'),
        userProfile = this.model.get('page').profile,
        modList = [],
        wizData = {};

    //convert taggle tags to data in the form
    this.$el.find('#realCategoriesInput').val(this.categoriesInput.getTagValues().join(","));

    wizData.vendor = true;

    moderatorsChecked.each(function() {
      modList.push($(this).data('guid'));
    });

    wizData.moderator_list = modList.length > 0 ? modList : "";

    wizData.primary_color = parseInt(userProfile.primary_color.slice(1), 16);
    wizData.secondary_color = parseInt(userProfile.secondary_color.slice(1), 16);
    wizData.background_color = parseInt(userProfile.background_color.slice(1), 16);
    wizData.text_color = parseInt(userProfile.text_color.slice(1), 16);

    saveToAPI(profileForm, this.model.get('page').profile, self.model.get('user').serverUrl + "profile", function(){
      self.trigger('storeCreated');
      window.obEventBus.trigger("updateProfile");
    }, "", wizData);
  },

  close: function(){
    this.unbind();
    this.remove();
  }

});