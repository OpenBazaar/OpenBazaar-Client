'use strict';

var Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App').getApp(),
    saveToAPI = require('../utils/saveToAPI');

module.exports = Backbone.View.extend({

  className: "moderatorSettings",

  events: {
    'click .js-moderatorModal': 'blockClicks',
    'click .js-closeModeratorModal': 'closeModeratorSettings',
    'click .js-moderatorSettingsSave': 'saveModeratorSettings',
    'click #moderatorSettingsModYes': 'showModeratorFeeHolder',
    'click #moderatorSettingsModNo': 'hideModeratorFeeHolder',
    'keyup #moderatorSettingsModalFeeInput': 'keypressFeeInput',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    this.parentEl = $(options.parentEl);
    this.moderatorFeeInput;
    this.moderatorStatus = true;
    this.oldFeeValue = 0;
    if (this.model.get('page').profile.header_hash){
      this.model.set('headerURL', this.model.get('user').serverUrl+"get_image?hash="+this.model.get('page').profile.header_hash);
    }

    this.render();
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/moderatorSettings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      //append the view to the passed in parent
      self.parentEl.append(self.$el).fadeIn(300);
      self.moderatorFeeInput = self.$('#moderatorSettingsModalFeeInput');
    });
    return this;
  },

  keypressFeeInput: function(){
    var fee = this.moderatorFeeInput.val();

    if (fee.indexOf('.') > 0 && fee.split('.')[1].length > 2) {
      fee = fee.substr(0, fee.length-1);
      this.moderatorFeeInput.val(fee);
    }
  },

  saveModeratorSettings: function(){
    var self = this,
        targetForm = this.$el.find('#moderatorSettingsForm'),
        moderatorFee = this.moderatorFeeInput.val(),
        moderatorData = {},
        makeModeratorUrl = this.moderatorStatus ? this.model.get('user').serverUrl + "make_moderator" : this.model.get('user').serverUrl + "unmake_moderator";

    moderatorData.name = self.model.get('page').profile.name;
    moderatorData.location = self.model.get('page').profile.location;
    this.model.set('moderation_fee', moderatorFee);
    this.model.set('moderator', this.moderatorStatus);

    saveToAPI(targetForm, '', self.model.get('user').serverUrl + "profile", function(){
      window.obEventBus.trigger("moderatorStatus", {'status': self.moderatorStatus, 'fee': moderatorFee});
      self.closeModeratorSettings();
    }, "", moderatorData);

    $.ajax({
      type: "POST",
      url: makeModeratorUrl,
      processData: false,
      dataType: "json",
      error: function(){
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.serverError'),
          message: '<i>' + window.polyglot.t('errorMessaes.serverError') + '</i>'
        });       
      }
    });
  },

  showModeratorFeeHolder: function(){
    this.$('.js-moderatorSettingsFeeHolder').removeClass('hide');
    this.moderatorFeeInput.val(this.oldFeeValue);
    this.moderatorStatus = true;
  },

  hideModeratorFeeHolder: function(){
    this.$('.js-moderatorSettingsFeeHolder').addClass('hide');
    this.oldFeeValue = this.moderatorFeeInput.val();
    this.moderatorFeeInput.val(0);
    this.moderatorStatus = false;
  },

  blockClicks: function(e) {
    if (!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  validateInput: function(e) {
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  closeModeratorSettings: function() {
    $('#obContainer').removeClass('modalOpen');
    this.close();
  },

  close: function(){
    this.remove();
  }

});