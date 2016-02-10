var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    remote = require('remote'),
    userSettingsModel = require('../models/userMd'),
    userProfileModel = require('../models/userProfileMd');

module.exports = Backbone.View.extend({

  el: '#adminPanel',

  events: {
    'click .js-adminModal': 'blockClicks',
    'click .js-closeModal': 'closeModal',
    'click .js-adminServer': 'setServer',
    'click .js-adminUpdateProfile': 'updateProfile',
    'click .js-adminUpdateSettings': 'updateSettings',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-adminShutdown': 'shutdown',
    'click .js-adminCloseApp': 'closeApp',
    'click .js-adminClearLocalStorage': 'clearStorage'
  },

  initialize: function (options) {
    "use strict";
    this.avatarHash = "";
    this.serverUrl = this.model.get('serverUrl');
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

  blockClicks: function(e) {
    "use strict";
    if(!$(e.target).hasClass('js-externalLink')){
      e.stopPropagation();
    }
  },

  updatePage: function() {
    "use strict";
    var self = this;
    this.userProfile.urlRoot = this.model.get('serverUrl')+ "profile";
    this.userSettings.urlRoot = this.model.get('serverUrl') + "settings";
    this.userProfile.fetch({
      success: function(model){
        var modelJSON = model.toJSON();
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
    /*
    this.userSettings.fetch({
      success: function(model){
        var modelJSON = model.toJSON();
        self.$el.find('#adminServerInput').val(modelJSON.serverUrl);
      },
      error: function(model, response){
        console.log("User Settings fetch failed: " + response.statusText);
      }
    });
    */
    $.ajax({
      url: self.model.get('serverUrl')+ "connected_peers",
      success: function(data){
        self.$el.find('.js-adminPeers').text(data);
      },
      error: function(){
        self.$el.find('.js-adminPeers').text("Call to peers API failed.");
      }
    });
    $.ajax({
      url: self.model.get('serverUrl')+ "routing_table",
      success: function(data){
        var routingString = '';
        __.each(data, function(tableEntry){
          routingString += "<table class='basicTable row20'>";
          routingString += "<tr><td>NAT Type</td><td>"+tableEntry.nat_type+"</td><tr>";
          routingString += "<tr><td>IP</td><td>"+tableEntry.ip+"</td><tr>";
          routingString += "<tr><td>GUID</td><td>"+tableEntry.guid+"</td><tr>";
          routingString += "<tr><td>Vendor</td><td>"+tableEntry.vendor+"</td><tr>";
          routingString += "<tr><td>Port</td><td>"+tableEntry.port+"</td><tr>";
          routingString += "</table>";
        });

        self.$el.find('.js-adminRoutingTable').html(routingString);
      },
      error: function(){
        self.$el.find('.js-adminRoutingTable').text("Call to routing table API failed.");
      }
    });
  },

  closeModal: function(e){
    $(e.target).closest('.js-adminModal').fadeOut(300, function(){
      window.location.reload();
    });
  },

  setServer: function() {
    "use strict";
    var self = this,
        newServer = this.$el.find('#adminServerInput').val();

    //change model so everything else points at new server before REST call
    this.model.set({serverUrl: newServer});
    //set local storage to the new server
    localStorage.setItem("serverUrl", newServer);
  },

  updateProfile: function() {
    "use strict";
    var self = this,
        targetForm = this.$el.find('#adminPanelProfile'),
        formData = new FormData(targetForm[0]);

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
      url: self.model.get('serverUrl') + endPoint,
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
      url: self.model.get('serverUrl') + "shutdown",
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

  clearStorage: function(){
    "use strict";
    this.$el.find('.js-adminClearLocalMsg').text("Local Storage Cleared");
    localStorage.clear();
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
  }
});