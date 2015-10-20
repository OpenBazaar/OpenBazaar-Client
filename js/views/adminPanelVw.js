var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    userSettingsModel = require('../models/userMd'),
    userProfileModel = require('../models/userProfileMd');

module.exports = Backbone.View.extend({

  el: '#adminPanel',

  events: {
    'click .js-closeModal': 'closeModal',
    'click .js-adminMakeModerator': 'makeModerator',
    'click .js-adminUnmakeModerator': 'unMakeModerator',
    'change .js-adminAvatarImage': 'uploadAvatar',
    'click .js-adminServer': 'setServer',
    'click .js-adminUpdateProfile': 'updateProfile',
    'click .js-adminUpdateSettings': 'updateSettings',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function (options) {
    "use strict";
    this.avatarHash = "";
    this.server_url = this.model.get('server_url');
    this.userSettings = new userSettingsModel();
    this.userProfile = new userProfileModel();

    this.render();
  },

  render: function () {
    "use strict";
    var self = this;
    loadTemplate('./js/templates/adminPanel.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.updatePage();
    });
    return this;
  },

  updatePage: function() {
    "use strict";
    var self = this;
    this.userProfile.urlRoot = this.model.get('server_url')+ "profile";
    this.userSettings.urlRoot = this.model.get('server_url') + "settings";
    this.userProfile.fetch({
      success: function(model){
        var modelJSON = model.toJSON();
        if(model.get('profile').moderator == true){
          self.$el.find('.js-adminMakeModerator').hide();
          self.$el.find('.js-adminUnmakeModerator').show();
        } else {
          self.$el.find('.js-adminMakeModerator').show();
          self.$el.find('.js-adminUnmakeModerator').hide();
        }
        __.each(self.$el.find('#adminPanelProfile input'), function(inputTarget){
          __.each(modelJSON.profile, function(modelValue, modelName) {
            if(inputTarget.name == modelName && inputTarget.type != "radio"){
              $(inputTarget).val(modelValue);
            }
          })
        });
        self.$el.find('#vendorTrue').prop('checked', modelJSON.profile.vendor);
        self.$el.find('#vendorFalse').prop('checked', !modelJSON.profile.vendor);
      },
      error: function(model, response){
        console.log("User Profile fetch failed: " + response.statusText);
      }
    });
    this.userSettings.fetch({
      success: function(model){
        var modelJSON = model.toJSON();
        self.$el.find('#adminServerInput').val(modelJSON.server_url);
        self.$el.find('#adminCurrencyInput').val(modelJSON.currency_code);
      },
      error: function(model, response){
        console.log("User Settings fetch failed: " + response.statusText);
      }
    });
  },

  closeModal: function(e){
    $(e.target).closest('.js-adminModal').fadeTo(0,0).removeAttr('style');
    Backbone.history.loadUrl();
  },

  makeModerator: function() {
    "use strict";
    var self = this;
    this.postData("", "make_moderator",
      function(){
        self.$el.find('.js-adminModeratorMsg').html("You are a moderator");
      },
      function(data){
        alert("Failed. "+ data.reason);
      }
    )
  },

  unMakeModerator: function() {
    "use strict";
    var self = this;
    this.postData("", "unmake_moderator",
      function(){
        self.$el.find('.js-adminModeratorMsg').html("You are not a moderator");
      },
      function(data){
        alert("Failed. "+ data.reason);
      }
    )
  },

  uploadAvatar: function() {
    "use strict";
    var self = this;
    this.postData(new FormData(this.$el.find('#adminPanelAvatar')[0]), "upload_image",
      function(data){
        var imageHash = data.image_hashes[0];
        if (imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
          self.$el.find('.js-avatarHolder').css('background-image', 'url(' + self.model.get('server_url') + "get_image?hash=" + imageHash + ')');
          self.$el.find('.js-adminAvatarMsg').html("Avatar has been set");
        }else {
          alert("image hash is blank");
        }
      },
      function(data){
        alert("Failed. "+ data.reason);
      }
    );
  },

  setServer: function() {
    "use strict";
    var self = this,
        targetForm = this.$el.find('#adminPanelServer'),
        formData = new FormData(targetForm[0]),
        newServer = this.$el.find('#adminServerInput').val(),
        existingKeys = {'server_url': newServer};

    //change model so everything else points at new server before REST call
    this.model.set({server_url: newServer});
    //set local storage to the new server
    localStorage.setItem("server_url", newServer);

    //TODO: when API is updated to remove server_url from settings, remove this code
    formData = this.modelToFormData(this.userSettings.toJSON(), formData, existingKeys);

    if(targetForm[0].checkValidity()){
      this.postData(formData, "settings",
          function (data) {
            self.updatePage();
          },
          function (data) {
            alert("Failed. " + data.reason);
          }
      );
    }
  },

  updateProfile: function() {
    "use strict";
    var self = this,
        targetForm = this.$el.find('#adminPanelProfile'),
        formData = new FormData(targetForm[0]);
        //existingKeys = {};

    //targetForm.find('input').each(function(){
      //existingKeys[$(this).attr('name')] = $(this).val();
    //});

    //formData = this.modelToFormData(this.userProfile.get("profile"), formData, existingKeys);

    //add location data in case this is a new profile
    formData.append("location", this.userProfile.get("profile").location);

    if(targetForm[0].checkValidity()){
      this.postData(formData, "profile",
          function (data) {
            self.updatePage();
          },
          function (data) {
            alert("Failed. " + data.reason);
          }
      );
    }
  },

  updateSettings: function() {
    "use strict";
    var self = this,
        targetForm = this.$el.find('#adminPanelSettings'),
        formData = new FormData(targetForm[0]),
        existingKeys = {};

    targetForm.find('input').each(function(){
      existingKeys[$(this).attr('name')] = $(this).val();
    });

    formData = this.modelToFormData(this.userSettings.toJSON(), formData, existingKeys);

    if(targetForm[0].checkValidity()){
      this.postData(formData, "settings",
          function (data) {
            self.updatePage();
          },
          function (data) {
            alert("Failed. " + data.reason);
          }
      );
    }
  },

  modelToFormData: function(modelJSON, formData, existingKeys) {
    "use strict";
    //only works with flat JSON objects. Use toJSON on models before passing them in
    var newFormData = formData || new FormData();
    __.each(modelJSON, function(value, key) {
      if(!__.has(existingKeys, key)) {
        newFormData.append(key, value);
      }
    });
    return newFormData;
  },

  postData: function(formData, endPoint, onSucceed, onFail) {
    "use strict";
    var self = this,
        errorModal = $('.js-messageModal');
    $.ajax({
      type: "POST",
      url: self.model.get('server_url') + endPoint,
      contentType: false,
      processData: false,
      data: formData,
      dataType: "json",
      success: function(data) {
        if (data.success === true){
          onSucceed(data);
        }else if (data.success === false){
          onFail(data)
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  close: function () {
    "use strict";
    __.each(this.subViews, function (subView) {
      if (subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }
});