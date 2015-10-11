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
    'click .js-adminServer': 'setServer'
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
        console.log(model.profile);
        if(model.get('profile').moderator == true){
          self.$el.find('.js-adminMakeModerator').hide();
          self.$el.find('.js-adminUnmakeModerator').show();
        } else {
          self.$el.find('.js-adminMakeModerator').show();
          self.$el.find('.js-adminUnmakeModerator').hide();
        }
      },
      error: function(model, response){
        console.log("User fetch failed: " + response.statusText);
      }
    });
    this.userSettings.fetch({
      success: function(model){
        console.log(model);
        self.$el.find('.js-adminCurrentServer').text(model.server_url);
      },
      error: function(model, response){
        console.log("User fetch failed: " + response.statusText);
      }
    });
  },

  closeModal: function(e){
    $(e.target).closest('.modal').addClass('hide');
    this.close();
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
    var self = this;
    this.postData(new FormData(this.$el.find('#adminPanelServer')[0]), "settings",
        function(data){
          self.updatePage();
        },
        function(data){
          alert("Failed. "+ data.reason);
        }
    );
  },

  postData: function(formData, endPoint, onSucceed, onFail) {
    "use strict";
    console.log("postData " + endPoint);
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