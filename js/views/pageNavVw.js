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
    'click .js-navClose': 'navCloseClick',
    'click .js-navMin': 'navMinClick',
    'click .js-navMax': 'navMaxClick',
    'click .js-navBack': 'navBackClick',
    'click .js-navFwd': 'navFwdClick',
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
        this.$el.find('.js-homeModal').hide();
      }
    });
    return this;
  },

  navProfileClick: function(e){
    e.stopPropagation();
    var targ = this.$el.find('.js-navProfileMenu');
    if(targ.hasClass('hide')){
      targ.removeClass('hide');
      $('html').on('click.closeNav', function(e){
        if($(e.target).closest(targ).length === 0){
          targ.addClass('hide');
          $(this).off('.closeNav');
        }
      });
    }else{
      targ.addClass('hide');
    }
  },

  navCloseClick: function(){
    console.log("Nav Close Clicked");
  },

  navMinClick: function(){
    console.log("Nav Min Clicked");
  },

  navMaxClick: function(){
    console.log("Nav Max Clicked");
  },

  navBackClick: function(){
    console.log("Nav Back Clicked");
  },

  navFwdClick: function(){
    console.log("Nav Fwd Clicked");
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
    this.$el.find('.js-homeModal-handleInput').closest('.flexRow').removeClass('hide');
    this.$el.find('.js-homeModal-existingHandle').parent().addClass('hide');
    this.$el.find('.js-homeModal-cancelHandle').parent().removeClass('hide');
  },

  existingHandle: function(e){
    //TODO: add code to connect handle here
  },

  cancelHandle: function(e){
    this.$el.find('.js-homeModal-handleInput').closest('.flexRow').addClass('hide');
    this.$el.find('.js-homeModal-existingHandle').parent().removeClass('hide');
    this.$el.find('.js-homeModal-cancelHandle').parent().addClass('hide');
  },

  uploadAvatar: function(e){
    var self = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      self.$el.find('.js-avatarPreview').css('background', 'url(' + e.target.result + ') 50% 50% / cover no-repeat');
      self.model.set('tempAvatar', e.target.result);
      //TODO: add canvas resizing here
    }
    reader.readAsDataURL($(e.target)[0].files[0]);
  },

  settingsDone: function(e){
    this.model.set('beenSet',true);
    this.$el.find('.js-homeModal').hide();
  }

});

