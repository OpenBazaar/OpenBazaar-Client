var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    userModel = require('../models/userMd')

module.exports = Backbone.View.extend({

  el: '#pageNav',

  events: {
    'click .btn': 'btnClick',
    'click .js-navProfile': 'navProfileClick',
    'click .js-homeModal-countrySelect': 'countrySelect',
    'click .js-homeModal-timeSelect': 'timeSelect',
    'click .js-homeModal-newHandle': 'newHandle',
    'click .js-homeModal-existingHandle': 'existingHandle',
    'click .js-homeModal-cancelHandle': 'cancelHandle',
    'change .js-homeModalAvatarUpload': 'uploadAvatar',
    'click .js-homeModalDone': 'settingsDone'
  },

  initialize: function(){
    var self = this;
    this.model = new userModel();
    this.render();
  },

  initAccordian: function(targ){
    var acc = $(targ);
    var accWidth = acc.width();
    var accHeight = acc.height();
    var accChildren = acc.find('.accordian-child');
    var accNum = accChildren.length;
    var accWin = acc.find('.accordian-window');

    accWin.css({'left':0, 'width': function(){return accWidth * accNum;}});
    accChildren.css({'width':accWidth, 'height':accHeight});
    acc.find('.js-accordianNext').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos > (accWidth * accNum * -1 + accWidth)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) - accWidth;
        });
      };
    });
    acc.find('.js-accordianPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
      };
    });
    //set up filterable lists
    var countryList = new List('homeModal-countryList', {valueNames: [ 'homeModal-country' ]});
    var timeList = new List('homeModal-timeList', {valueNames: [ 'homeModal-time' ]});
  },

  render: function(){
    var self = this;
    var tmpl = loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.initAccordian('.js-profileAccordian');
      if(self.model.get('beenSet')){
        $('.js-homeModal').hide();
      }
    });
    return this;
  },

  btnClick: function(e){
    console.log("nav button clicked");
  },

  navProfileClick: function(e){
    $('.js-navProfileMenu').toggleClass('hide');
  },

  countrySelect: function(e){
    var inpt = $(e.target).find('input[type=radio]');
    var ctry = inpt.attr('id');
    inpt.prop("checked", true);
    this.model.set('country', ctry);
  },

  timeSelect: function(e){
    var inpt = $(e.target).find('input[type=radio]');
    var tz = inpt.attr('id');
    inpt.prop("checked", true);
    this.model.set('timeZone', tz);
  },
  
  newHandle: function(e){
    $('.js-homeModal-handleInput').closest('.flexRow').removeClass('hide');
    $('.js-homeModal-existingHandle').parent().addClass('hide');
    $('.js-homeModal-cancelHandle').parent().removeClass('hide');
  },
  
  existingHandle: function(e){
    //TODO: add code to connect handle here
  },

  cancelHandle: function(e){
    $('.js-homeModal-handleInput').closest('.flexRow').addClass('hide');
    $('.js-homeModal-existingHandle').parent().removeClass('hide');
    $('.js-homeModal-cancelHandle').parent().addClass('hide');
  },

  uploadAvatar: function(e){
    var self = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.js-avatarPreview').css('background', 'url(' + e.target.result + ') 50% 50% / cover no-repeat');
      self.model.set('tempAvatar', e.target.result);
      //TODO: add canvas resizing here
    }
    reader.readAsDataURL($(e.target)[0].files[0]);
  },

  settingsDone: function(e){
    console.log("done");
    this.model.set('beenSet',true);
    $('.js-homeModal').hide();
  }

});

