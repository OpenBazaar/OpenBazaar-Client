var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfile'),
    colpicker = require('../utils/colpick.js'),
    countriesModel = require('../models/countriesMd'),
    taggle = require('taggle'),
    uuid = require('node-uuid'),
    chosen = require('../utils/chosen.jquery.min.js');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {
    'click .js-storeWizardModal': 'blockClicks',
    'click .js-closeStoreWizardModal': 'closeWizard'
  },

  getModerators: function() {
    "use strict";
    var id = uuid.v4();
    var connection = new WebSocket('ws://seed.openbazaar.org:18466');
    connection.onopen = function(){
      console.log("connection open");
      connection.send({"request": {"api": "v1", "id": id, "command": "get_moderators" }});
    };
    connection.onerror = function(error){
      console.log("connection error "+ error);
    };
    connection.onmessage = function(e){
      console.log("connection message "+ e.data);
    };
  },

  initialize: function(options) {
    "use strict";
    this.options = options || {};
    this.parentEl = $(options.parentEl);
    this.getModerators();
    this.render();
    console.log(this.model);
  },

  initAccordion: function(targ){
    "use strict";
    var acc = $(targ),
        accWidth = acc.width(),
        accHeight = acc.height(),
        accChildren = acc.find('.accordion-child'),
        accNum = accChildren.length,
        accWin = acc.find('.accordion-window');

    accWin.css({'left':0, 'width': function(){return accWidth * accNum;}});
    accChildren.css({'width':accWidth, 'height':accHeight});
    acc.find('.js-accordionNext').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos > (accWidth * accNum * -1 + accWidth)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) - accWidth;
        });
        // focus search input
        $(this).closest('.accordion-child').next('.accordion-child').find('.search').focus();
      }
    });
    acc.find('.js-accordionPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
        // focus search input
        $(this).closest('.accordion-child').prev('.accordion-child').find('.search').focus();
      }
    });
  },

  render: function() {
    "use strict";
    var self = this;

    loadTemplate('./js/templates/storeWizard.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      //append the view to the passed in parent
      self.parentEl.append(self.$el);
      self.initAccordion('.js-storeWizardAccordion');
      self.setValues();
      self.setCustomStyles();
      self.$el.find('.js-customizeColorInput').colpick({
        layout: "rgbhex", //can also be full, or hex
        colorScheme: "dark", //can also be light
        submitText: "Change",
        //flat: true,
        onShow: function (el) {
          console.log("show");
          var colorKey = $(this).attr('id');
          if(self.model.get('page').profile[colorKey]){
            $(this).colpickSetColor(self.model.get('page').profile[colorKey].slice(1), true);
          }
        },
        onSubmit: function (hsb, hex, rgb, el) {
          self.setCustomColor(hex, $(el).attr('id'));
          $(el).closest('.js-customizeColorWrapper').find('.js-customizeColorLabel').css('background-color', '#' + hex);
          $(el).colpickHide();
        },
        onHide: function () {
        }
      });
    });
  },

  setValues: function() {
    "use strict";
    var self = this;
    //add all countries to the Ships To select list
    var countries = new countriesModel(),
        countryList = countries.get('countries'),
        locationSelect = this.$el.find('#locationSelect');
    
    __.each(countryList, function(country, i){
      locationSelect.append('<option value="'+country.dataName+'">'+country.name+'</option>');
    });

    locationSelect.val(this.model.get('user').country);
    locationSelect.chosen();
    //activate tags plugin
    this.categoriesInput = new Taggle('categoriesInput');
  },

  setCustomStyles: function() {
    "use strict";
    var self = this;
    //set custom color input values
    $('.js-customizeColorInput').each(function(){
      var newColor = self.model.get('page').profile[$(this).attr('id')];
      $(this).val(newColor);
      $(this).closest('.js-customizeColorWrapper').find('.js-customizeColorLabel').css('background-color', newColor);
    });
  },

  setCustomColor: function(newColor, colorKey) {
    "use strict";
    var tempPage  =  __.clone(this.model.get('page'));
    tempPage.profile[colorKey] = '#'+newColor;
    this.model.set('page', tempPage);
    this.setCustomStyles();
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();
  },

  closeWizard: function() {
    "use strict";
    this.close();
  },

  saveProfile: function() {
    "use strict";
    //remember to use is to check hex color in color fields
  },

  close: function(){
    "use strict";
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }

});