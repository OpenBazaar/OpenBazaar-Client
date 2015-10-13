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
    'click .js-adminUpdateProfile': 'updateProfile'
  },

  initialize: function (options) {
    "use strict";
    this.render();
    this.avatarHash = "";
    this.server_url = this.model.get('server_url');
    this.userSettings = new userSettingsModel();
    this.userSettings.urlRoot = this.server_url + "settings";
    this.userProfile = new userProfileModel();
    this.userProfile.urlRoot = this.server_url + "profile";
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
            console.log(inputTarget.type);
            if(inputTarget.name == modelName && inputTarget.type != "radio"){
              $(inputTarget).val(modelValue);
            }
          })
        });
        console.log(modelJSON.profile.vendor);
        console.log(!modelJSON.profile.vendor);
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
        __.each(self.$el.find('#adminPanelServer input'), function(inputTarget){
          __.each(modelJSON, function(modelValue, modelName) {
            if(inputTarget.name == modelName){
              $(inputTarget).val(modelValue);
            }
          })
        });
      },
      error: function(model, response){
        console.log("User Settings fetch failed: " + response.statusText);
      }
    });
  },

  closeModal: function(e){
    $(e.target).closest('.js-adminModal').addClass('hide');
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
          self.$el.find('.js-avatarHolder').css('background-image', 'url(' + self.server_url + "get_image?hash=" + imageHash + ')');
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
        existingKeys = {};

    targetForm.find('input').each(function(){
      existingKeys[$(this).attr('name')] = $(this).val();
    });

    formData = this.modelToFormData(this.userSettings, formData, existingKeys);
    this.postData(formData, "settings",
        function(data){
          self.updatePage();
        },
        function(data){
          alert("Failed. "+ data.reason);
        }
    );
  },

  updateProfile: function() {
    "use strict";
    var self = this,
        targetForm = this.$el.find('#adminPanelProfile'),
        formData = new FormData(targetForm[0]),
        existingKeys = {};

    targetForm.find('input').each(function(){
      existingKeys[$(this).attr('name')] = $(this).val();
    });

    formData = this.modelToFormData(this.userProfile, formData, existingKeys);

    this.postData(formData, "profile",
        function(data){
          self.updatePage();
        },
        function(data){
          alert("Failed. "+ data.reason);
        }
    );
  },

  modelToFormData: function(model, formData, existingKeys) {
    "use strict";
    //only works with flat models
    var newFormData = formData || new FormData();
    __.each(model.toJSON(), function(value, key) {
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
      url: self.server_url + endPoint,
      contentType: false,
      processData: false,
      data: formData,
      dataType: "json",
      success: function(data) {
        if (data.success === true){
          onSucceed(data);
          self.updatePage();
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