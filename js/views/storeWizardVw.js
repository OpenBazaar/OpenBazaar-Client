var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    userProfileModel = require('../models/userProfile'),
    colpicker = require('../utils/colpick.js');

module.exports = Backbone.View.extend({

  classname: "storeWizard",

  events: {
    'click .js-customizeColorWrapper': 'openColorPicker'
  },

  initialize: function() {
    "use strict";
    console.log("init store wizard");
    console.log(this.model);
    this.render();
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
      self.$el.html(loadedTemplate(self.model));
      self.initAccordion('.js-storeWizardAccordion');
      self.$el.find('.js-customizeColorWrapper').colpick({
        layout: "rgbhex", //can also be full, or hex
        colorScheme: "dark", //can also be light
        submitText: "Change",
        //flat: true,
        onShow: function (el) {
          var colorKey = $(this).find('.js-customizeColorInput').attr('id');
          console.log(self.model.get('profile')[colorKey]);
          if(self.model.get('profile')[colorKey]){
            $(this).colpickSetColor(self.model.get('profile')[colorKey].slice(1), true);
          }
        },
        onSubmit: function (hsb, hex, rgb, el) {
          //self.setCustomColor(hex, $(el).attr('id'));
          $(el).closest('.js-customizeColorWrapper').find('.js-customizeColorLabel').css('background-color', '#' + hex);
          $(el).colpickHide();
        },
        onHide: function () {
        }
      });
    });
  },

  openColorPicker: function(e) {
    "use strict";
    console.log(e.target);
    //$('.js-customizeColorWrapper').colpickShow();
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