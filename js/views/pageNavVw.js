var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    Polyglot = require('node-polyglot'),
    languagesModel = require('../models/languagesMd'),
    countryListView = require('../views/countryListVw'),
    currencyListView = require('../views/currencyListVw'),
    languageListView = require('../views/languageListVw'),
    adminPanelView = require('../views/adminPanelVw'),
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
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
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
      //refresh the current page
      Backbone.history.loadUrl();
    });

    this.render();
  },

  initAccordion: function(targ){
    var acc = $(targ);
    var accWidth = acc.width();
    var accHeight = acc.height();
    var accChildren = acc.find('.accordion-child');
    var accNum = accChildren.length;
    var accWin = acc.find('.accordion-window');

    accWin.css({'left':0, 'width': function(){return accWidth * accNum;}});
    accChildren.css({'width':accWidth, 'height':accHeight});
    acc.find('.js-accordionNext').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos > (accWidth * accNum * -1 + accWidth)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) - accWidth;
        });
      }
      // focus search input
      $(this).closest('.accordion-child').next('.accordion-child').find('.search').focus();
    });
    acc.find('.js-accordionPrev').on('click', function(){
      var oldPos = accWin.css('left').replace("px","");
      if(oldPos < (0)){
        accWin.css('left', function(){
          return parseInt(accWin.css('left').replace("px","")) + accWidth;
        });
      }
    });
    //set up filterable lists.
    //TODO: this is terrible, change to run when an event is emmitted from the subviews marking them as done rendering
    setTimeout(function(){
      var List = window.List;
      var countryList = new List('homeModal-countryList', {valueNames: ['homeModal-country']});
      var currencyList = new List('homeModal-currencyList', {valueNames: ['homeModal-currency']});
      var timeList = new List('homeModal-timeList', {valueNames: ['homeModal-time']});
      var languageList = new List('homeModal-languageList', {valueNames: ['homeModal-language']});
    }, 1000);
  },

  closeNav: function(){
    var targ = this.$el.find('.js-navProfileMenu');
    targ.addClass('hide');
    $('#overlay').fadeTo(0, 0).hide();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.countryList = new countryListView({el: '.js-homeModal-countryList', selected: self.model.get('country')});
      self.currencyList = new currencyListView({el: '.js-homeModal-currencyList', selected: self.model.get('currency_code')});
      self.languageList = new languageListView({el: '.js-homeModal-languageList', selected: self.model.get('language')});
      self.subViews.push(this.countryList);
      self.subViews.push(this.currencyList);
      self.subViews.push(this.languageList);
      self.initAccordion('.js-profileAccordion');
      if(self.model.get('beenSet')){
        self.$el.find('.js-homeModal').hide();
      }
      //add the admin panel
      self.adminPanel = new adminPanelView({model: self.model});
      self.subViews.push(self.adminPanel);
    });
    return this;
  },

  navProfileClick: function(e){
    e.stopPropagation();
    var targ = this.$el.find('.js-navProfileMenu');
    if(targ.hasClass('hide')){
      targ.removeClass('hide');
      $('#overlay').fadeTo(0, 1);
      $('html').on('click.closeNav', function(e){
        if($(e.target).closest(targ).length === 0){
          targ.addClass('hide');
          $('#overlay').fadeTo(0, 0).hide();
          $(this).off('.closeNav');
        }
      });
    }else{
      targ.addClass('hide');
      $('#overlay').fadeTo(0, 0).hide();
    }
  },

  navCloseClick: function(){
    var win = remote.getCurrentWindow();
    var process = remote.process;
    if (process.platform != 'darwin') {
      win.close();
    } else {
      win.hide();
    }
  },

  navMinClick: function(){
    var win = remote.getCurrentWindow();
    win.minimize();
  },

  navMaxClick: function(){
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
    //var crcy = targ.attr('data-name');
    var ccode = targ.attr('data-code');
    $('.js-homeModal-currencyList').find('input[type=radio]').prop("checked", false);
    targ.find('input[type=radio]').prop("checked", true);
    //this.model.set('currency', crcy);
    this.model.set('currency_code', ccode);
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
    this.model.set('time_zone', tz);
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
      //self.model.set('tempAvatar', e.target.result);
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
  },

  navAdminPanel: function(){
    this.$el.find('.js-adminModal').removeClass('hide');
    this.adminPanel.updatePage();
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

