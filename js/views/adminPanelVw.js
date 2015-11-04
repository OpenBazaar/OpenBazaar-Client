var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    remote = require('remote'),
    cropit = require('../utils/jquery.cropit'),
    userSettingsModel = require('../models/userMd'),
    userProfileModel = require('../models/userProfileMd');

module.exports = Backbone.View.extend({

  el: '#adminPanel',

  events: {
    'click .js-closeModal': 'closeModal',
    'click .js-adminMakeModerator': 'makeModerator',
    'click .js-adminUnmakeModerator': 'unMakeModerator',
    'click .js-avatarSubmit': 'uploadAvatar',
    'click .js-adminServer': 'setServer',
    'click .js-adminUpdateProfile': 'updateProfile',
    'click .js-adminUpdateSettings': 'updateSettings',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-adminShutdown': 'shutdown',
    'click .js-adminCloseApp': 'closeApp'
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
        if(model.get('profile').moderator === true){
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
          });
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
    $.ajax({
      url: self.model.get('server_url')+ "connected_peers",
      success: function(data){
        self.$el.find('.js-adminPeers').text(data);
      },
      error: function(){
        self.$el.find('.js-adminPeers').text("Call to peers API failed.");
      }
    });
    $.ajax({
      url: self.model.get('server_url')+ "routing_table",
      success: function(data){
        self.$el.find('.js-adminRoutingTable').text(data);
      },
      error: function(){
        self.$el.find('.js-adminRoutingTable').text("Call to routing table API failed.");
      }
    });

    this.$el.find('#image-cropper').cropit({
      smallImage: "stretch",
      onFileReaderError: function(data){console.log(data);},
      onFileChange: function(){
        self.$el.find('.js-avatarLoading').removeClass('fadeOut');
        self.$el.find('.js-avatarSubmit').removeClass('fadeOut');
      },
      onImageLoaded: function(){self.$el.find('.js-avatarLoading').addClass('fadeOut');},
      onImageError: function(errorObject, errorCode, errorMessage){
        console.log(errorObject);
        console.log(errorCode);
        console.log(errorMessage);
      }
    });
  },

  closeModal: function(e){
    $(e.target).closest('.js-adminModal').fadeTo(0,0).removeAttr('style');
    window.location.reload();
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
    );
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
    );
  },

  showAvatarUploadBtn: function(){
    "use strict";
    this.$el.find('.js-avatarSubmit').removeClass('fadeOut');
  },

  uploadAvatar: function() {
    "use strict";
    var self = this;
    var imageURI = self.$el.find('#image-cropper').cropit('export', {
      type: 'image/jpeg',
      quality: 0.75,
      originalSize: false
    });
    imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
    var formData = new FormData();
    formData.append('image', imageURI);
    this.postData(formData, "upload_image",
      function(data){
        var imageHash = data.image_hashes[0],
            formData = new FormData();
        if (imageHash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb"){
          formData.append("avatar", imageHash);
          self.postData(formData, "profile",
              function (data) {
                self.$el.find('.js-avatarHolder').css('background-image', 'url(' + self.model.get('server_url') + "get_image?hash=" + imageHash + ')');
                self.userProfile.set('avatar', imageHash);
                self.$el.find('.js-adminAvatarMsg').html("Avatar has been set");
              },
              function (data) {
                alert("Failed. " + data.reason);
              }
          );
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
          onFail(data);
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

  shutdown: function(e){
    "use strict";
    var self = this,
        targetButton = $(e.target);
    $.ajax({
      type: "GET",
      url: self.model.get('server_url') + "shutdown",
      complete: function () {
        targetButton.parent().find('.adminMsg').text("Server has been shut down");
      }
    });
  },

  closeApp: function(){
    "use strict";
    var win = remote.getCurrentWindow();
    var process = remote.process;
    if (process.platform != 'darwin') {
      win.close();
    } else {
      win.hide();
    }
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
    delete this.$el;
    delete this.el;
  }
});