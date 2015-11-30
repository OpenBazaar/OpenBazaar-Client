var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    userProfileModel = require('../models/userProfileMd'),
    loadTemplate = require('../utils/loadTemplate'),
    timezonesModel = require('../models/timezonesMd'),
    languagesModel = require('../models/languagesMd.js'),
    personListView = require('./userListVw'),
    countriesModel = require('../models/countriesMd'),
    showErrorModal = require('../utils/showErrorModal.js'),
    cropit = require('../utils/jquery.cropit'),
    setTheme = require('../utils/setTheme.js'),
    getBTPrice = require('../utils/getBitcoinPrice');

module.exports = Backbone.View.extend({

  className: "settingsPage",

  events: {
    'click .js-generalTab': 'generalClick',
    'click .js-addressesTab': 'addressesClick',
    'click .js-pageTab': 'pageClick',
    'click .js-storeTab': 'storeClick',
    'click .js-blockedTab': 'blockedClick',
    'click .js-advancedTab': 'advancedClick',
    'click .js-cancelGeneral': 'cancelView',
    'click .js-saveGeneral': 'saveGeneral',
    'click .js-cancelProfile': 'cancelView',
    'click .js-saveProfile': 'saveProfile',
    'click .js-cancelAddress': 'cancelView',
    'click .js-saveAddress': 'saveAddress',
    'click .js-cancelStore': 'cancelView',
    'click .js-saveStore': 'saveStore',
    'click .js-cancelAdvanced': 'cancelView',
    'click .js-saveAdvanced': 'saveAdvanced',
    'change .js-settingsThemeSelection' : 'themeClick',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(options){
    var self = this;
    this.options = options || {};
    /* expected options:
       userModel
       state
     */
    this.userProfile = new userProfileModel();
    this.userProfile.urlRoot = options.userModel.get('serverUrl') + "profile";
    this.model = new Backbone.Model();
    this.subViews = [];
    this.subModels = [];
    this.userProfile.fetch({
      success: function(model){
        self.model.set({user: self.options.userModel.toJSON(), page: model.toJSON()});
        //use default currency to return list of supported currencies
        getBTPrice("USD", function (btAve, currencyList) {
          "use strict";
          self.availableCurrenciesList = currencyList;
          self.render();
          $('.js-loadingModal').removeClass('show');
        });
      },
      error: function(model, response){
        showErrorModal(window.polyglot.t('errorMessages.getError'), window.polyglot.t('errorMessages.userError'));
      }
    });
    this.subModels.push(this.userProfile);
  },

  render: function(){
    var self = this;
    $('#content').html(self.$el);
    loadTemplate('./js/templates/settings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setFormValues();
      self.setState(self.options.state);
      self.renderBlocked(self.model.get("user").blocked);
      $(".chosen").chosen({ width: '100%' });
      $('#settings-image-cropper').cropit({
        $preview: $('.js-settingsAvatarPreview'),
        $fileInput: $('#settingsAvatarInput'),
        smallImage: "stretch",
        onFileReaderError: function(data){console.log(data);},
        onFileChange: function(){
          self.$el.find('.js-avatarLoading').removeClass('fadeOut');
        },
        onImageLoaded: function(){self.$el.find('.js-avatarLoading').addClass('fadeOut');},
        onImageError: function(errorObject, errorCode, errorMessage){
          console.log(errorObject);
          console.log(errorCode);
          console.log(errorMessage);
        }
      });
    });
    return this;
  },

  renderBlocked: function (model) {
    "use strict";
    this.blockedList = new personListView({model: model,
                                           el: '.js-list1',
                                           title: "No one blocked",
                                           message: ""});
    this.subViews.push(this.blockedList);
  },

  setFormValues: function(){
    var self = this,
        countries = new countriesModel(),
        timezones = new timezonesModel(),
        languages = new languagesModel(),
        countryList = countries.get('countries'),
        currecyList = countries.get('countries'),
        timezoneList = timezones.get('timezones'),
        languageList = languages.get('languages'),
        country = this.$el.find('#country'),
        ship_country = this.$el.find('#settingsShipToCountry'),
        currency = this.$el.find('#currency_code'),
        timezone = this.$el.find('#time_zone'),
        language = this.$el.find('#language'),
        user = this.model.get('user'),
        avatar = user.avatar_hash,
        ship_country_str = "",
        country_str = "",
        currency_str = "",
        timezone_str = "",
        language_str = "";

    currecyList = __.uniq(currecyList, function(item){return item.code;});
    currecyList = currecyList.sort(function(a,b){
      var cA = a.currency.toLowerCase(),
          cB = b.currency.toLowerCase();
      if (cA < cB){
        return -1;
      }
      if (cA > cB){
        return 1;
      }
      return 0;
    });
    //add BTC
    currecyList.unshift({code: "BTC", currency:"Bitcoin", currencyUnits: "4"});

    __.each(countryList, function(c, i){
      var country_option = $('<option value="'+c.dataName+'">'+c.name+'</option>');
      var ship_country_option = $('<option value="'+c.dataName+'">'+c.name+'</option>');
      country_option.attr("selected",user.country == c.dataName);
      //if user has a country in their profile, preselect it in the new address section
      ship_country_option.attr("selected",user.country== c.dataName);
      ship_country_str += ship_country_option[0].outerHTML;
      country_str += country_option[0].outerHTML;
    });

    __.each(currecyList, function(c, i){
      //only show currently available currencies
      if(self.availableCurrenciesList.indexOf(c.code) > -1 || c.code === "BTC"){
        var currency_option = $('<option value="'+c.code+'">'+c.currency+'</option>');
        currency_option.attr("selected",user.currency_code == c.code);
        currency_str += currency_option[0].outerHTML;
      }
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

  addTabToHistory: function(state){
    "use strict";
    //add action to history
    Backbone.history.navigate("#settings/" + state);
  },

  setTab: function(activeTab, showContent, state){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state){
    "use strict";
    if(state){
      this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    } else {
      this.setTab(this.$el.find('.js-generalTab'), this.$el.find('.js-general'));
    }
    $('#content').find('input:visible:first').focus();
  },

  generalClick: function(){
    "use strict";
    this.setState("general");
    this.addTabToHistory("general");
  },

  addressesClick: function(){
    "use strict";
    this.setState("general");
    this.addTabToHistory("general");
  },

  pageClick: function(){
    "use strict";
    this.setState("page");
    this.addTabToHistory("page");
  },

  storeClick: function(){
    "use strict";
    this.setState("store");
    this.addTabToHistory("store");
  },

  blockedClick: function(){
    "use strict";
    this.setState("blocked");
    this.addTabToHistory("blocked");
  },

  advancedClick: function(){
    "use strict";
    this.setState("advanced");
    this.addTabToHistory("advanced");
  },

  cancelView: function(e){
    "use strict";
    Backbone.history.loadUrl();
  },

  themeClick: function(e){
    var theme = $(e.currentTarget).data();

    // Populate the color inputs on theme change
    $('#primary_color').val(theme["primaryColor"]);
    $('#secondary_color').val(theme["secondaryColor"]);
    $('#background_color').val(theme["backgroundColor"]);
    $('#text_color').val(theme["textColor"]);
    $('.js-settingsCoverPhoto').css('background', 'url(' + theme["coverPhoto"] + ') 50% 50% / cover no-repeat');
  },

  saveData: function(form, modelJSON, endPoint, onSucceed, onFail) {
    "use strict";
    var self = this,
        formData = new FormData(form[0]),
        formKeys = [];

    form.addClass('formChecked');
    if(!form[0].checkValidity()) {
      showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
      return;
    }

    __.each(form.serializeArray(), function(value){
      formKeys.push(value.name);
    });

    __.each(modelJSON, function(value, key){
      if(formKeys.indexOf(key) == -1){
        formData.append(key, value);
      }
    });

    $.ajax({
      type: "POST",
      url: self.options.userModel.get('serverUrl') + endPoint,
      contentType: false,
      processData: false,
      data: formData,
      dataType: "json",
      success: function(data) {
        if (data.success === true){
          onSucceed(data);
        }else if (data.success === false){
          if(onFail){
            onFail(data);
          } else{
            showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
          }
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  saveGeneral: function() {
    var self = this,
        settings_form = this.$el.find("#settingsForm");

    this.saveData(settings_form, this.model.get('user'), "settings", function(){
      "use strict";
      showErrorModal(window.polyglot.t('saveMessages.Saved'), "<i>" + window.polyglot.t('saveMessages.SaveSuccess') + "</i>");
    });
  },

  savePage: function(){
    "use strict";

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
            newAddresses = [],
            imageURI;

        settings_form.addClass('formChecked');
        if(!settings_form[0].checkValidity()) {
            showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
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
                } else if($(el).attr("type") == "checkbox") {
                    settingsFormData.append(id,$(el).is(":checked"));
                } else {
                    settingsFormData.append(id,$(el).val());
                }
            }
        );

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
                                } else {
                                  showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
                                }
                            },
                            error: function(jqXHR, status, errorThrown){
                                console.log(jqXHR);
                                console.log(status);
                                console.log(errorThrown);
                                self.showErrorModal("Server error", "Profile API endpoint return an error");
                            }
                        });
                    } else {
                      showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
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
        if($("#settingsAvatarInput").val()) {

          imageURI = self.$el.find('#settings-image-cropper').cropit('export', {
            type: 'image/jpeg',
            quality: 0.75,
            originalSize: false
          });
          imageURI = imageURI.replace(/^data:image\/(png|jpeg);base64,/, "");
          uploadImageFormData.append('image', imageURI);

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
                    } else {
                      showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
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
