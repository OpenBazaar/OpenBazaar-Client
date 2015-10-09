var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    Polyglot = require('node-polyglot'),
    languagesModel = require('../models/languagesMd'),
    countryListView = require('../views/countryListVw'),
    currencyListView = require('../views/currencyListVw'),
    languageListView = require('../views/languageListVw'),
    remote = require('remote');

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
    'click .js-homeModal-currencySelect': 'currencySelect',
    'click .js-homeModal-languageSelect': 'languageSelect',
    'click .js-homeModal-timeSelect': 'timeSelect',
    'click .js-homeModal-newHandle': 'newHandle',
    'click .js-homeModal-existingHandle': 'existingHandle',
    'click .js-homeModal-cancelHandle': 'cancelHandle',
    'change .js-homeModalAvatarUpload': 'uploadAvatar',
    'click .js-homeModalDone': 'settingsDone',
    'click .js-closeModal': 'closeModal'
  },

  initialize: function(){
    var self = this;
    this.subViews = [];
    this.languages = new languagesModel();

  //when language is changed, re-render
    this.listenTo(this.model, 'change:language', function(){
      var newLang = this.model.get("language");
      window.polyglot = new Polyglot({locale: newLang});
      window.polyglot.extend(__.where(this.languages.get('languages'), {langCode: newLang})[0]);
      this.render();
    });

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
      var oldPos = accWin.css('left').replace("px",""); //TODO: Fix implicit casting to Number
      if(oldPos > (accWidth * accNum * -1 + accWidth)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) - accWidth; //TODO: Change parseInt to Number to avoid radix
        });
      }
      // focus search input
      $(this).closest('.accordian-child').next('.accordian-child').find('.search').focus();
    });
    acc.find('.js-accordianPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");  //TODO: Fix implicit casting to Number
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth; //TODO: Change parseInt to Number to avoid radix
        });
      }
    });
    //set up filterable lists.
    //TODO: this is terrible, redo so it runs when all subviews are done rendering
    setTimeout(function(){
      var List = window.List;
      var countryList = new List('homeModal-countryList', {valueNames: ['homeModal-country']});
      var currencyList = new List('homeModal-currencyList', {valueNames: ['homeModal-currency']});
      var timeList = new List('homeModal-timeList', {valueNames: ['homeModal-time']});
      var languageList = new List('homeModal-languageList', {valueNames: ['homeModal-language']});
    }, 1000);
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      var countryList = new countryListView({el: '.js-homeModal-countryList', selected: self.model.get('country')});
      var currencyList = new currencyListView({el: '.js-homeModal-currencyList', selected: self.model.get('currencyCode')});
      var languageList = new languageListView({el: '.js-homeModal-languageList', selected: self.model.get('language')});
      self.initAccordian('.js-profileAccordian');
      if(self.model.get('beenSet')){
        self.$el.find('.js-homeModal').hide();
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
    var win = remote.getCurrentWindow();
    var process = remote.process;
    if (process.platform != 'darwin') {
      win.close();
    } else {
      win.hide();
    }
  },

  navMinClick: function(){
    console.log("Nav Min Clicked");
    var win = remote.getCurrentWindow();
    win.minimize();
  },

  navMaxClick: function(){
    console.log("Nav Max Clicked");
    var win = remote.getCurrentWindow();
    win.maximize();
  },

  navBackClick: function(){
    console.log("Nav Back Clicked");
  },

  navFwdClick: function(){
    console.log("Nav Fwd Clicked");
  },

  countrySelect: function(e){
    var targ = $(e.currentTarget);
    var ctry = targ.attr('data-code');
    $('.js-homeModal-countryList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('country', ctry);
  },

  currencySelect: function(e){
    var targ = $(e.currentTarget); //TODO: Rename variables to be more readable
    var crcy = targ.attr('data-name');
    var ccode = targ.attr('data-code');
    $('.js-homeModal-currencyList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    //this.model.set('currency', crcy);
    this.model.set('currencyCode', ccode);
  },

  languageSelect: function(e){
    var targ = $(e.currentTarget); //TODO: Rename variables to be more readable
    var lang = targ.attr('data-code');
    $('.js-homeModal-languageList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    this.model.set('language', lang);
  },

  timeSelect: function(e){
    var inpt = $(e.target).closest('input[type=radio]'); //TODO: Rename variables to be more readable
    var tz = inpt.attr('id');
    $('.js-homeModal-timezoneList').find('input[type=radio]').prop("checked", false);
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
    };
    reader.readAsDataURL($(e.target)[0].files[0]);
  },

  settingsDone: function(e){
    this.model.set('beenSet',true);
    this.$el.find('.js-homeModal').hide();
  },

  closeModal: function(e){
    $(e.target).closest('.modal').addClass('hide');
  }

});

