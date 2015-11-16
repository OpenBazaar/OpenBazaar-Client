var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    userProfileModel = require('../models/userProfileMd'),
    loadTemplate = require('../utils/loadTemplate'),
    timezonesModel = require('../models/timezonesMd'),
    languagesModel = require('../models/languagesMd.js'),
    personListView = require('./userListVw'),
    countriesModel = require('../models/countriesMd'),
    cropit = require('../utils/jquery.cropit');

module.exports = Backbone.View.extend({

  className: "settingsPage",

  events: {
    'click .js-generalTab': 'generalClick',
    'click .js-shippingTab': 'shippingClick',
    'click .js-storeTab': 'storeClick',
    'click .js-blockedTab': 'blockedClick',
    'click .js-advancedTab': 'advancedClick',
    'click .js-cancelSettings': 'cancelClick',
    'click .js-saveSettings': 'saveClick',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    this.userProfile = new userProfileModel();
    this.userProfile.urlRoot = options.userModel.get('serverUrl') + "profile";
    this.model = new Backbone.Model();
    this.subViews = [];
    this.subModels = [];
    this.userProfile.fetch({
      success: function(model){
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
        self.render();
      },
      error: function(model, response){
        alert("Information for the current user cannot be loaded.");
        self.model.set({user: self.options.userModel.toJSON(), page: {profile: ""}});
      }
    });
    this.subModels.push(this.userProfile);
  },

  render: function(){
    var self = this;
    $('#content').html(self.$el);
    this.errorModal = $('.js-messageModal');
    loadTemplate('./js/templates/settings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setFormValues();
      self.renderBlocked(self.model.get("user").blocked);
      $(".chosen").chosen({ width: '100%' });
      self.$el.find('#avatar-cropit').cropit();
    });
    return this;
  },

  renderBlocked: function (model) {
    "use strict";
    this.blockedList = new personListView({model: model,
                                           el: '.js-list1',
                                           title: "No one blocked Yet",
                                           message: ""});
    this.subViews.push(this.blockedList);
  },

  showErrorModal: function(errorTitle, errorMessage) {
    "use strict";
    this.errorModal.removeClass('fadeOut');
    this.errorModal.find('.js-messageModal-title').text(errorTitle);
    this.errorModal.find('.js-messageModal-message').html(errorMessage);
  },

  setFormValues: function(){
    var countries = new countriesModel();
    var timezones = new timezonesModel();
    var languages = new languagesModel();
    var countryList = countries.get('countries');
    var timezoneList = timezones.get('timezones');
    var languageList = languages.get('languages');
    var country = this.$el.find('#country');
    var ship_country = this.$el.find('#settingsShipToCountry');
    var currency = this.$el.find('#currency_code');
    var timezone = this.$el.find('#time_zone');
    var language = this.$el.find('#language');
    var user = this.model.get('user');
    var avatar = user.avatar_hash;

    var ship_country_str = "";
    var country_str = "";
    var currency_str = "";
    var timezone_str = "";
    var language_str = "";

    __.each(countryList, function(c, i){
      var country_option = $('<option value="'+c.dataName+'">'+c.name+'</option>');
      var ship_country_option = $('<option value="'+c.dataName+'">'+c.name+'</option>');
      var currency_option = $('<option value="'+c.code+'">'+c.currency+'</option>');
      currency_option.attr("selected",user.currency_code== c.code);
      country_option.attr("selected",user.country == c.dataName);
      //if user has a country in their profile, preselect it in the new address section
      ship_country_option.attr("selected",user.country== c.dataName);

      ship_country_str += ship_country_option[0].outerHTML;
      currency_str += currency_option[0].outerHTML;
      country_str += country_option[0].outerHTML;
    });

    __.each(timezoneList, function(t, i){
      var timezone_option = $('<option value="'+t.offset+'">'+t.name+'</option>');
      timezone_option.attr("selected",user.time_zone == t.offset);
      timezone_str += timezone_option[0].outerHTML;
    });

    __.each(languageList, function(l, i){
        var language_option = $('<option value="'+l.langCode+'">'+l.langName+'</option>');
        language_option.attr("selected",user.language == l.langCode);
        language_str += language_option[0].outerHTML;
    });

    ship_country.html(ship_country_str);
    currency.html(currency_str);
    country.html(country_str);
    timezone.html(timezone_str);
    language.html(language_str);
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  tabClick: function(activeTab, showContent){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  generalClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-general'));
  },

  shippingClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-shipping'));
  },

  storeClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-store'));
  },

  blockedClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-blocked'));
  },

  advancedClick: function(e){
    this.tabClick($(e.target).closest('.js-tab'), this.$el.find('.js-advanced'));
  },

  cancelClick: function(e){
      Backbone.history.loadUrl();
  },

  saveClick: function(e){
        var self = this,
            server = self.options.userModel.get('serverUrl'),
            settings_form = this.$el.find("#settingsForm"),
            //As there are 3 different API urls we need to call,
            //we need to split up our form data into 3 parts,
            //depending on which API call each value belongs to
            profileFormData = new FormData(),
            settingsFormData = new FormData(),
            uploadImageFormData = new FormData(),
            newAddress = {},
            newAddresses = [];

        settings_form.addClass('formChecked');
        if(!settings_form[0].checkValidity()) {
            self.showErrorModal("Errors in form", "Please fix all errors in the form attempting to save again");
            return;
        }

        newAddress.name = this.$el.find('#settingsShipToName').val();
        newAddress.street = this.$el.find('#settingsShipToStreet').val();
        newAddress.city = this.$el.find('#settingsShipToCity').val();
        newAddress.state = this.$el.find('#settingsShipToState').val();
        newAddress.postal_code = this.$el.find('#settingsShipToPostalCode').val();
        newAddress.country = this.$el.find('#settingsShipToCountry').val();

        if(newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.postal_code && newAddress.country) {
          newAddresses.push(newAddress);
        }

        this.$el.find('.js-settingsAddress:not(:checked)').each(function(){
          newAddresses.push(self.model.get('user').shipping_addresses[$(this).val()]);
        });

        if(newAddresses){
          settingsFormData.append('shipping_addresses', JSON.stringify(newAddresses));
        }

        $.each(settings_form.find("input,select,textarea").not(".settingsAddressInput"),
            function(i,el) {
                var id = $(el).attr("id");
                if(id == "country") {
                    profileFormData.append("location",$(el).val());
                }
                if(id == "name" || id == "handle") {
                    profileFormData.append(id,$(el).val());
                } else if(id == "avatar") {
                    var imageURI = self.$el.find('#avatar-cropit').cropit('export', {
                        type: 'image/jpeg',
                        quality: 0.75,
                        originalSize: false
                    });
                    if(imageURI) {
                        imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
                        uploadImageFormData.append('image', imageURI);
                    }
                } else if($(el).attr("type") == "checkbox") {
                    settingsFormData.append(id,$(el).is(":checked"));
                } else {
                    settingsFormData.append(id,$(el).val());
                }
            }
        );
        //Remove this line when multiple shipping addresses has been implemented
        //settingsFormData.append("shipping_addresses","");

        var submit = function(img_hash) {

            if(img_hash) {
                profileFormData.append("avatar",img_hash);
            }

            $.ajax({
                type: "POST",
                url: server + "settings",
                contentType: false,
                processData: false,
                data: settingsFormData,
                dataType: "json",
                success: function(data) {
                    if(data.success === true) {
                        $.ajax({
                            type: "POST",
                            url: server + "profile",
                            contentType: false,
                            processData: false,
                            data: profileFormData,
                            dataType: "json",
                            success: function(data) {
                                if(data.success === true) {
                                  window.location.reload();
                                }
                            },
                            error: function(jqXHR, status, errorThrown){
                                console.log(jqXHR);
                                console.log(status);
                                console.log(errorThrown);
                                self.showErrorModal("Server error", "Profile API endpoint return an error");
                            }
                        });
                    }
                },
                error: function(jqXHR, status, errorThrown){
                    console.log(jqXHR);
                    console.log(status);
                    console.log(errorThrown);
                    self.showErrorModal("Server error", "Settings API endpoint return an error");
                }
            });

        };

        //Lets upload the image first, if there is one
        //to get the hash
        if($("#avatar").val()) {

            $.ajax({
                type: "POST",
                url: server + "upload_image",
                contentType: false,
                processData: false,
                data: uploadImageFormData,
                dataType: "json",
                success: function(data) {
                    var img_hash = data.image_hashes[0];
                    if(data.success === true &&
                       img_hash !== "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb") {
                        submit(img_hash);
                    }
                },
                error: function(jqXHR, status, errorThrown){
                    console.log(jqXHR);
                    console.log(status);
                    console.log(errorThrown);
                    self.showErrorModal("Server error", "Failed to upload image");
                }
            });

        } else { //Otherwise lets just submit right away
            submit();
        }

  },

  close: function(){
    "use strict";
    __.each(this.subModels, function(subModel) {
      subModel.off();
    });
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });

    this.model.off();
    this.off();
    this.remove();
    delete this.$el;
    delete this.el;
  }

});
