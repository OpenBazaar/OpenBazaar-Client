'use strict';

var $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App').getApp(),
    saveToAPI = require('../utils/saveToAPI'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: "moderatorSettings insideApp",

  events: {
    'click .js-closeModeratorModal': 'onCloseClick',
    'click .js-moderatorModal': 'blockClicks',
    'click .js-moderatorSettingsSave': 'saveModeratorSettings',
    'click #moderatorSettingsModYes': 'showModeratorFeeHolder',
    'click #moderatorSettingsModNo': 'hideModeratorFeeHolder',
    'keyup #moderatorSettingsModalFeeInput': 'keypressFeeInput',
    'blur input': 'validateInput'
  },

  initialize: function(){
    this.moderatorStatus = true;
    this.oldFeeValue = 0;
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/moderatorSettingsModal.html', function(loadedTemplate) {
      var context = self.model.toJSON();

      if (self.model.get('page').profile.header_hash) {
        context['headerURL'] = self.model.get('user').serverUrl + 'get_image?hash=' + self.model.get('page').profile.header_hash;
      }

      self.$el.html(loadedTemplate(context));
      baseModal.prototype.render.apply(self, arguments);

      //append the view to the passed in parent
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
        makeModeratorUrl = this.moderatorStatus ? this.model.get('user').serverUrl + "make_moderator" : this.model.get('user').serverUrl + "unmake_moderator";


    this.model.set('moderation_fee', moderatorFee);
    this.model.set('moderator', this.moderatorStatus);

    saveToAPI(targetForm, '', self.model.get('user').serverUrl + "profile", function(){
      window.obEventBus.trigger("moderatorStatus", {'status': self.moderatorStatus, 'fee': moderatorFee});
      self.close();
    }, "");

    $.ajax({
      type: "POST",
      url: makeModeratorUrl,
      processData: false,
      dataType: "json",
      error: function(){
        if (self.isRemoved()) {
          return;
        }

        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.serverError'),
          message: '<i>' + window.polyglot.t('errorMessages.serverError') + '</i>'
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

  onCloseClick: function() {
    this.close();
  }
});