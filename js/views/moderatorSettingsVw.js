var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    messageModal = require('../utils/messageModal.js'),
    saveToAPI = require('../utils/saveToAPI');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "moderatorSettings",

  events: {
    'click .js-moderatorModal': 'blockClicks',
    'click .js-closeModeratorModal': 'closeModeratorSettings',
    'click .js-moderatorSettingsSave': 'saveModeratorSettings',
    'click #moderatorSettingsModYes': 'showModeratorFeeHolder',
    'click #moderatorSettingsModNo': 'hideModeratorFeeHolder',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this;
    this.parentEl = $(options.parentEl);
    this.moderatorFeeInput;
    this.moderatorStatus = true;
    this.oldFeeValue = 0;
    if(this.model.get('page').profile.header_hash){
      this.model.set('headerURL', this.model.get('user').serverUrl+"get_image?hash="+this.model.get('page').profile.header_hash);
    }

    this.render();
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/moderatorSettings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.moderatorFeeInput = self.$('#moderatorSettingsFeeInput');
    });
    return this;
  },

  saveModeratorSettings: function(){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#moderatorSettingsForm'),
        formData = new FormData(),
        moderatorFee = this.moderatorFeeInput.val(),
        moderatorData = {},
        makeModeratorUrl = this.moderatorStatus ? this.model.get('user').serverUrl + "make_moderator" : this.model.get('user').serverUrl + "unmake_moderator";

    moderatorData.name = self.model.get('page').profile.name;
    moderatorData.location = self.model.get('page').profile.location;

    saveToAPI(targetForm, '', self.model.get('user').serverUrl + "profile", function(){
      self.closeModeratorSettings();
      window.obEventBus.trigger("moderatorStatus", {'status': self.moderatorStatus, 'fee': moderatorFee});
    }, "", moderatorData);

    $.ajax({
      type: "POST",
      url: makeModeratorUrl,
      processData: false,
      dataType: "json",
      error: function(){
        messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + window.polyglot.t('errorMessaes.serverError') + "</i>");
      }
    });
  },

  showModeratorFeeHolder: function(){
    "use strict";
    this.$('.js-moderatorSettingsFeeHolder').removeClass('hide');
    this.moderatorFeeInput.val(this.oldFeeValue);
    this.moderatorStatus = true;
  },

  hideModeratorFeeHolder: function(){
    "use strict";
    this.$('.js-moderatorSettingsFeeHolder').addClass('hide');
    this.oldFeeValue = this.moderatorFeeInput.val();
    this.moderatorFeeInput.val(0);
    this.moderatorStatus = false;
  },

  blockClicks: function(e) {
    "use strict";
    if(!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  closeModeratorSettings: function() {
    "use strict";
    this.close();
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
  },

  close: function(){
    this.unbind();
    this.remove();
  }

});