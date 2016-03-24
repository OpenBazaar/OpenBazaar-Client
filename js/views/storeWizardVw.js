var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI'),
    MediumEditor = require('medium-editor'),
    validateMediumEditor = require('../utils/validateMediumEditor'),
    Taggle = require('taggle'),
    userShortView = require('./userShortVw'),
    userShortModel = require('../models/userShortMd');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {
    'click .js-storeWizardModal': 'blockClicks',
    'click .js-closeStoreWizardModal': 'closeWizard',
    'click .js-storeWizardSave': 'saveWizard',
    'click .js-accordionNext': 'validateDescription',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(options) {
    "use strict";
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.socketView = options.socketView;
    if(this.model.get('page').profile.header_hash){
      this.model.set('headerURL', this.model.get('user').serverUrl+"get_image?hash="+this.model.get('page').profile.header_hash);
    }

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
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

      if($('#storeWizardForm')[0].checkValidity()) {
        if (oldPos > (accWidth * accNum * -1 + accWidth)) {
          accWin.css('left', function () {
            return parseInt(accWin.css('left').replace("px", "")) - accWidth;
          });
          // switch active tab
          var curActive = acc.find('.accordion-active');
          curActive.addClass('accordion-inactive').removeClass('accordion-active');
          var newActive = curActive.next('.accordion-child');
          newActive.addClass('accordion-active').removeClass('accordion-inactive');
          // focus search input
          newActive.find('input:visible:first').focus();
        }
      }
    });

    acc.find('.js-accordionPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
        // switch active tab
        var curActive = acc.find('.accordion-active');
        curActive.addClass('accordion-inactive').removeClass('accordion-active');
        var newActive = curActive.prev('.accordion-child');
        newActive.addClass('accordion-active').removeClass('accordion-inactive');
        // focus search input
        newActive.find('input:visible:first').focus();
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
      // add blur to container
      $('#obContainer').addClass('blur');
      // fade the modal in after it loads and focus the input
      self.$el.find('.js-storeWizardModal').removeClass('fadeOut');
      self.$el.find('#storeNameInput').focus();
      self.socketView.getModerators(self.socketModeratorID);
      var editor = new MediumEditor('#aboutInput', {
        placeholder: {
          text: ''
        },
        toolbar: {
          imageDragging: false,
          buttons: ['bold', 'italic', 'underline', 'h2', 'h3']
        },
        paste: {
          cleanPastedHTML: true,
          cleanReplacements: [
            [new RegExp(/<div>/gi), '<p>'],
            [new RegExp(/<\/div>/gi), '</p>'],
            [new RegExp(/<font>/gi), ""],
            [new RegExp(/<\/font>/gi), ""],
            [new RegExp(/<code>/gi), '<pre>'],
            [new RegExp(/<\/code>/gi), '</pre>']
          ],
          cleanAttrs: ['class', 'style', 'dir', 'color', 'face', 'size', 'align', 'border', 'background', 'opacity'],
          cleanTags: ['meta', 'style', 'script', 'center', 'basefont', 'frame', 'iframe', 'frameset' ]
        }
      });
      editor.subscribe('blur', self.validateDescription);
    });
  },

  validateDescription: function(e) {
    validateMediumEditor.checkVal($('#aboutInput'));
  },

  setValues: function() {
    "use strict";
    var self = this;
    this.$el.find('#locationSelect').val(this.model.get('user').country);
    //activate tags plugin
    this.categoriesInput = new Taggle('categoriesInput', {
      submitKeys: [188, 9, 13, 32],
      preserveCase: true,
      saveOnBlur: true
    });
  },

  handleSocketMessage: function(response) {
    "use strict";
    var data = JSON.parse(response.data);
    if(data.id == this.socketModeratorID && data.moderator.guid != this.model.get('user').guid && this.model.get('user').blocked_guids.indexOf(data.moderator.guid) == -1){
      this.renderModerator(data.moderator);
    }
  },

  renderModerator: function(moderator){
    "use strict";
    var self = this;

    moderator.serverUrl = this.model.get('user').serverUrl;
    moderator.userID = moderator.guid;
    moderator.avatarURL = this.model.get('user').serverUrl + "get_image?hash=" + moderator.avatar_hash + "&guid=" + moderator.guid;
    moderator.isModerator = true; //flag for template
    moderator.micro = true; //flag for template
    moderator.userCount = this.moderatorCount;
    var newModModel = new userShortModel(moderator);
    var modShort = new userShortView({model: newModModel});

    this.$el.find('.js-storeWizardModeratorList').append(modShort.el);
    this.moderatorCount++;
  },
  
  blockClicks: function(e) {
    "use strict";
    if(!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
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
        wizData = {},
        modData = {};

    //convert taggle tags to data in the form
    this.$el.find('#realCategoriesInput').val(this.categoriesInput.getTagValues().join(","));

    wizData.vendor = true;

    moderatorsChecked.each(function() {
      modList.push($(this).data('guid'));
    });

    modData.moderators = modList.length > 0 ? modList : "";
    modData.name = this.model.get('page').profile.name;
    modData.location = this.model.get('page').profile.location;

    wizData.primary_color = parseInt(userProfile.primary_color.slice(1), 16);
    wizData.secondary_color = parseInt(userProfile.secondary_color.slice(1), 16);
    wizData.background_color = parseInt(userProfile.background_color.slice(1), 16);
    wizData.text_color = parseInt(userProfile.text_color.slice(1), 16);

    saveToAPI(profileForm, '', self.model.get('user').serverUrl + "profile", function(){
      saveToAPI('', self.model.get('user'), self.model.get('user').serverUrl + "settings", function(){
        window.obEventBus.trigger("updateProfile");
        window.obEventBus.trigger("updateUserModel");
        self.trigger('storeCreated');
      }, '', modData);
    }, '', wizData);
  },

  close: function(){
    this.unbind();
    this.remove();
    $('#obContainer').removeClass('blur');
  }

});