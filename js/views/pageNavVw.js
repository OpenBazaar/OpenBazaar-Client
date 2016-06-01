'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    NotificationsCl = require('../collections/notificationsCl.js'),
    languagesModel = require('../models/languagesMd'),
    baseVw = require('./baseVw'),
    //adminPanelView = require('../views/adminPanelVw'),
    NotificationsVw = require('../views/notificationsVw'),
    PageNavServersVw = require('../views/pageNavServersVw'),
    pjson = require('../../package.json');

var ipcRenderer = require('ipc-renderer');  // Allows to talk Electon main process

module.exports = baseVw.extend({

  el: '#pageNav',

  events: {
    'click .js-navBack': 'navBackClick',
    'click .js-navFwd': 'navFwdClick',
    'click .js-showAboutModal': 'showAboutModal',
    'click .js-hideAboutModal': 'hideAboutModal',
    'click .js-showSupportModal': 'showSupportModal',
    'click .js-aboutModal .js-tab': 'aboutModalTabClick',
    'click .js-navRefresh': 'navRefreshClick',
    'click .js-navRestart': 'navRestartClick',
    'click .js-navAdminPanel': 'navAdminPanel',
    'click .js-navProfileMenu a': 'closeNav',
    'focus .js-navAddressBar': 'addressBarFocus',
    'keyup .js-navAddressBar': 'addressBarKeyup',
    'blur .js-navAddressBar': 'addressBarBlur',
    'click .js-suggestion': 'suggestionClick',
    'click .js-closeStatus': 'closeStatusBar',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'click .js-navInstallUpdate': 'sendInstallUpdate',
    'click .js-navDismisslUpdate': 'dismissUpdate',
    'click [data-popmenu]': 'onPopMenuNavClick',
    'click .js-OnboardingIntroDiscover': 'hideDiscoverIntro',
    'mouseenter .js-serverSubmenuTrigger': 'mouseenterServerSubmenuTrigger',
    'mouseleave .js-serverSubmenuTrigger': 'mouseleaveServerSubmenuTrigger',
    'mouseenter .js-serverSubmenu': 'mouseenterServerSubmenu',
    'mouseleave .js-serverSubmenu': 'mouseleaveServerSubmenu'
  },

  initialize: function(options){
    this.options = options || {};
    /* recieves socketView and userProfile from main.js */
    this.socketView = options.socketView;
    this.userProfile = options.userProfile;
    this.model.set('vendor', this.userProfile.get('profile').vendor);
    this.model.set('moderator', this.userProfile.get('profile').moderator);
    this.languages = new languagesModel();
    this.showDiscIntro = options.showDiscIntro;
    this.notificationsRecord = {}; //store notification timestamps to prevent too many from the same user

    this.listenTo(window.obEventBus, "updateProfile", function(){
      this.refreshProfile();
    });
    this.listenTo(window.obEventBus, "updateUserModel", function(){
      this.model.fetch();
    });

    /*
    // pre-select lauguage.
    var localLanguage = window.navigator.language;
    var localLanguageFound = false;
    var languageList = this.languages.get('languages');
    for (var i in languageList) {
      if (languageList[i].langCode == localLanguage) {
        localLanguageFound = true;
        break;
      }
    }
    */

    this.notificationsCl = new NotificationsCl();
    this.notificationsCl.comparator = function(notif) {
      return -notif.get('timestamp');
    };
    this.notificationsFetch = this.notificationsCl.fetch({
      data: {
        limit: 6
      },
      reset: true
    });

    this.unreadNotifsViaSocket = 0;
    this.fetchNotifsMarkedAsRead = 0;

    this.listenTo(this.notificationsCl, 'reset update', function(cl, options) {
      if (options.xhr) {
        this.fetchNotifsMarkedAsRead = 0;
        this.unreadNotifsViaSocket = 0;
      }

      this.setNotificationCount(this.getUnreadNotifCount());
    });

    this.listenTo(this.userProfile, 'change:avatar_hash', function(){
      this.model.set('vendor', this.userProfile.get('profile').vendor);
      this.render();
    });

    this.listenTo(window.obEventBus, "socketMessageReceived", function(response){
      this.handleSocketMessage(response);
    });

    this.listenTo(window.obEventBus, "cleanNav", function(){
      this.cleanNav();
    });
    
    this.listenTo(window.obEventBus, "searchingText", function(text){
      this.saveVisitedTag(text);
    });
    
    this.listenTo(window.obEventBus, "handleObtained", function(profile){
      this.saveVisitedHandle(profile);
    });

    //when language is changed, re-render
    this.listenTo(this.model, 'change:language', function(){
      this.render();
    });

    $(document).on('click', this.onDocumentClick.bind(this));
  },

  showDiscoverIntro: function(){
    this.$('.js-OnboardingIntroDiscoverHolder').removeClass('hide');
    this.showDiscIntro = false;
  },

  hideDiscoverIntro: function(){
    this.$('.js-OnboardingIntroDiscoverHolder').addClass('hide');
  },

  sendInstallUpdate: function() {
    ipcRenderer.send('installUpdate');
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  dismissUpdate: function() {
    $('.js-softwareUpdate').addClass('softwareUpdateHidden');
  },

  cleanNav: function(){
    this.hideAboutModal();
    this.closeNav();
    this.closeStatusBar();
    window.obEventBus.trigger('closeBuyWizard');
  },
  
  saveVisitedTag: function(tag){
    var tagsList = JSON.parse(localStorage.getItem('tagsHistory')) || [],
        tagsListLength = tagsList.length,
        index = tagsList.indexOf(tag);

    // Do nothing if there's just one tag and new one isn't added
    if (tagsListLength !== 1 || index === -1) {
      // List is empty, just add the tag   
      if (tagsListLength === 0) {
        tagsList.push(tag);
      } else {
        // Tag exists, pull it out of the list
        if (index !== -1) {
          tagsList.splice(index, 1);
        }
        
         // Tag goes to the beginning of the list
        tagsList.splice(0, 0, tag);
      }
      
      // History needs to be pruned
      if (tagsListLength > window.config.maxTagHistory) {
        tagsList = tagsList.slice(0, window.config.maxTagHistory);
      }

      // Update the history
      localStorage.setItem('tagsHistory', JSON.stringify(tagsList));
    }
  },
  
  saveVisitedHandle: function(profile){
    var handlesList = JSON.parse(localStorage.getItem('handlesHistory')) || [],
        handlesListLength = handlesList.length,
        index = __.findIndex(handlesList, {handle: profile.handle});
        
    // Do nothing if there's just one tag and new one isn't added
    if (handlesListLength !== 1 || index === -1) {
      let handleObj = {
        guid: profile.guid,
        handle: profile.handle,
        name: profile.name
      };

      // List is empty, just add the tag   
      if (handlesListLength === 0) {
        handlesList.push(handleObj);
      } else {
        // Tag exists, pull it out of the list
        if (index !== -1) {
          handlesList.splice(index, 1);
        }
        
        // Tag goes to the beginning of the list
        handlesList.splice(0, 0, handleObj);
      }
      
      // History needs to be pruned
      if (handlesListLength > window.config.maxHandleHistory) {
        handlesList = handlesList.slice(0, window.config.maxHandleHistory);
      }

      // Update the history
      localStorage.setItem('handlesHistory', JSON.stringify(handlesList));
    }
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data),
        username,
        avatar,
        avatarHash,
        notif,
        notifStamp;

    if (data.hasOwnProperty('notification') || data.hasOwnProperty('message') && data.message.subject) {
      notif = data.notification || data.message;
      username = notif.handle ? notif.handle : notif.guid;
      username = notif.sender ? notif.sender : username;
      avatarHash = notif.image_hash || notif.avatar_hash;
      avatar = avatarHash ? app.serverConfigs.getActive().getServerBaseUrl + '/get_image?hash=' +
        avatarHash + '&guid=' + notif.guid : 'imgs/defaultUser.png';
      notif.type = notif.type || notif.message_type;
      notifStamp = Date.now();
      notif.guid = notif.guid || notif.sender;
      
      this.unreadNotifsViaSocket++;

      this.notificationsCl.add(
          __.extend({}, notif, { 
            read: false,
            username: username,
            image_hash: avatarHash,
            notifStamp: notifStamp,
          })
      );

      //prevent message spamming from one user
      if (!this.notificationsRecord[username]){
        this.notificationsRecord[username] = {};
      }
      if (this.notificationsRecord[username].notifStamp && notifStamp - this.notificationsRecord[username].notifStamp < 30000){
        return;
      }
      this.notificationsRecord[username].notifStamp = notifStamp;

      switch (notif.type) {
      case "follow":
        new Notification(window.polyglot.t('NotificationFollow', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "dispute_open":
        new Notification(window.polyglot.t('NotificationDispute', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "dispute_close":
        new Notification(window.polyglot.t('NotificationDisputeClosed', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "new order":
        new Notification(window.polyglot.t('NotificationNewOrder', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "payment received":
        new Notification(window.polyglot.t('NotificationPaymentReceived', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "order confirmation":
        new Notification(window.polyglot.t('NotificationOrderConfirmed', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "rating received":
        new Notification(window.polyglot.t('NotificationRatingRecieved', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      case "ORDER":
        new Notification(window.polyglot.t('NotificationNewTransactionMessage', {name: username}), {
          icon: avatar,
          silent: true
        });
        break;
      }

      app.playNotificationSound();
    }
  },  

  refreshProfile: function() {
    var self = this;

    this.userProfile.fetch({
      success: function(model){
        self.model.set('vendor', model.get('profile').vendor);
        self.model.set('moderator', model.get('profile').moderator);
        self.render();
      }
    });
  },

  notificationClick: function() {
    this.closeNotificationsMenu();
  },

  render: function(){
    var self = this;
    //reset tests for applying lists or List.js will fail on a re-render
    this.countryReady = false;
    this.currencyReady = false;
    this.languageReady = false;

    //load userProfile data into model
    this.model.set('guid', this.userProfile.get('profile').guid);
    this.model.set('avatar_hash', this.userProfile.get('profile').avatar_hash);
    this.model.set('version', pjson.version);
    loadTemplate('./js/templates/pageNav.html', function(loadedTemplate) {
      var connectedServer = app.serverConnectModal.getConnectedServer();

      self.$el.html(loadedTemplate(
        __.extend(self.model.toJSON(), { connectedServer: connectedServer && connectedServer.toJSON() })
      ));

      self.$notifMenu = self.$('.js-navNotificationsMenu');
      self.$navNotif = self.$('.js-navNotifications');

      if (!self.notificationsVw) {
        self.notificationsVw = new NotificationsVw({
          collection: self.notificationsCl,
          initialFetch: self.notificationsFetch,
          notifPerFetch: 10
        });
        self.registerChild(self.notificationsVw);

        self.listenTo(self.notificationsVw, 'notification-click', self.notificationClick);
      }

      self.$notifMenu.find('#notificationsPanel')
          .html(self.notificationsVw.render().el);

      self.setNotificationCount(self.getUnreadNotifCount());

      self.pageNavServersVw && self.pageNavServersVw.remove();
      self.pageNavServersVw = new PageNavServersVw({
        collection: app.serverConfigs
      });
      self.$('.js-serverSubmenu').html(
        self.pageNavServersVw.render().el
      );

      //add the admin panel
      /*
      self.adminPanel && self.adminPanel.remove();
      self.adminPanel = new adminPanelView({model: self.model});
      self.registerChild(self.adminPanel);
      */

      self.$addressInput = self.$el.find('.js-navAddressBar');
      self.$statusBar = self.$el.find('.js-navStatusBar');
      self.$serverSubmenu = self.$('.js-serverSubmenu');
      self.$serverSubmenuTrigger = self.$('.js-serverSubmenuTrigger');
      self.$suggestionsList = self.$('.js-addressBarSuggestions');

      //listen for address bar set events
      self.listenTo(window.obEventBus, 'setAddressBar', function(options){
        var text = options.handle || options.addressText;
        self._lastSetAddressBarText = text;
        self.$addressInput.val(text);
        self.closeStatusBar();
      });
      if (self.showDiscIntro){
        self.showDiscoverIntro();
      }
      self.$aboutModalHolder = $('.js-aboutModalHolder');
      self.$aboutModal = self.$aboutModalHolder.find('.js-aboutModal');
    });

    return this;
  },

  showAboutModal: function(){
    this.cleanNav();

    // display the modal
    this.$aboutModalHolder.fadeIn(300);

    // set the active tab
    this.$aboutModal.find('.navBar .btn.btn-bar').removeClass('active');
    $('.js-about-mainTab').addClass('active');

    // set the active section
    this.$aboutModal.find('.modal-section').addClass('hide');
    this.$aboutModal.find('.js-modalAboutMain').removeClass('hide');

    // blur the container for extra focus
    $('#obContainer').addClass('modalOpen').scrollTop(0);
  },

  hideAboutModal: function(){
    this.$aboutModalHolder.fadeOut(300);
    $('#obContainer').removeClass('modalOpen');
  },

  showSupportModal: function(){
    this.$aboutModalHolder.fadeIn(300);
    this.$aboutModal.find('.navbar .btn.btn-bar').removeClass('active');
    $('.js-about-donationsTab').addClass('active');
    this.$aboutModal.find('.modal-section').addClass('hide');
    this.$aboutModal.find('.js-modalAboutSupport').removeClass('hide');
    $('#obContainer').addClass('modalOpen').scrollTop(0);
  },

  aboutModalTabClick: function(e){
    var tab = $(e.currentTarget).data('tab'),
        $aboutSection = $('.modal-about-section');
    this.$aboutModal.find('.btn-tab').removeClass('active');
    $(e.currentTarget).addClass('active');

    switch (tab) {
    case "about":
      $aboutSection.addClass('hide');
      $('.js-modalAboutMain').removeClass('hide');
      break;
    case "support":
      $aboutSection.addClass('hide');
      $('.js-modalAboutSupport').removeClass('hide');
      break;
    case "contributors":
      $aboutSection.addClass('hide');
      $('.js-modalAboutContributors').removeClass('hide');
      break;
    case "licensing":
      $aboutSection.addClass('hide');
      $('.js-modalAboutLicensing').removeClass('hide');
      break;
    }
  },

  closeNotificationsMenu: function() {
    app.hideOverlay();
    this.$notifMenu.removeClass('popMenu-opened');
    this.onNotifMenuClose();
  },

  isNotifMenuOpen: function() {
    return this.$notifMenu.hasClass('popMenu-opened');
  },

  setNotificationCount: function(count){
    if (isNaN(parseInt(count))) return;

    app.setUnreadNotifCount(count);

    if (count > 99) {
      count = '..';
    }

    if (count == 0) {
      this.$navNotif.find('.badge')
          .removeAttr('data-count', count);
    } else {
      this.$navNotif.find('.badge')
          .attr('data-count', count);
    }
  },

  getUnreadNotifCount: function() {
    return this.unreadNotifsViaSocket + this.notificationsCl.getUnreadCount() -
      this.fetchNotifsMarkedAsRead || 0;
  },

  onNotifMenuOpen: function() {
    this.notificationsVw.resetScroll();
  },

  onNotifMenuClose: function() {
    var unread = [],
        formData = new FormData();

    this.notificationsCl.forEach((notif) => {
      if (!notif.get('read')) {
        notif.set('read', true);
        unread.push(notif.id);
      }
    });

    if (unread.length) {
      unread.forEach((id) => {
        formData.append('id', id);
      });

      $.ajax({
        url: app.serverConfigs.getActive().getServerBaseUrl() + '/mark_notification_as_read',
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        data: formData
      });
    }

    this.fetchNotifsMarkedAsRead += unread.length - this.unreadNotifsViaSocket;
    this.unreadNotifsViaSocket = 0;
    this.setNotificationCount(this.getUnreadNotifCount());
  },

  onPopMenuNavClick: function(e) {
    var $popMenu,
        openHandler,
        closeHandler;

    e.preventDefault();
    e.stopPropagation();

    $popMenu = self.$(
      $(e.target).data('popmenu')
    );

    if (!$popMenu.length) return;

    self.$('.popMenu').not($popMenu)
      .removeClass('popMenu-opened');
    
    $popMenu.toggleClass('popMenu-opened');

    if ($popMenu.hasClass('popMenu-opened')) {
      app.showOverlay();
      this.hideSuggestions();
      openHandler = $popMenu.data('onopen');
      openHandler && this[openHandler] && this[openHandler].call(this);
    } else {
      app.hideOverlay();
      closeHandler = $popMenu.data('onclose');
      closeHandler && this[closeHandler] && this[closeHandler].call(this);
    }
  },

  onDocumentClick: function(e) {
    var $target = $(e.target),
        $popMenu,
        closeHandler;
        
    if (!$target.hasClass('js-navAddressBar') && this.suggestionsVisible) {
      app.hideOverlay();
      this.hideSuggestions();
    } else if ($target.hasClass('js-navAddressBar') ||
      !(
        $target.hasClass('popMenu') ||
        $target.parents('.popMenu').length ||
        $target.is('[data-popmenu]') ||
        $target.parents('[data-popmenu]').length
      ))
    {
      if (!this.suggestionsVisible) {
        app.hideOverlay();
      }
      
      $popMenu = self.$('.popMenu.popMenu-opened').removeClass('popMenu-opened');
      $popMenu.each((index, el) => {
        closeHandler = $(el).data('onclose');
        closeHandler && this[closeHandler] && this[closeHandler].call(this);
      });
    }
  },

  closeNav: function(e) {
    if (
      e &&
      (
        e.target === this.$serverSubmenuTrigger[0] ||
        $(e.target).parents('.js-serverSubmenuTrigger').length
      )
    ) {
      return;
    }    

    app.hideOverlay();
    self.$('.js-navProfileMenu').removeClass('popMenu-opened');
    clearTimeout(this.ServerSubmenuTimeout);
    this.$serverSubmenu.removeClass('server-submenu-opened');    
  },

  navBackClick: function(){
    history.back();
  },

  navFwdClick: function(){
    history.forward();
  },

  navRefreshClick: function(){
    app.router.refresh();
  },
  
  navRestartClick: function(){
    location.reload();
  },

  trimAddressBar: function() {
    this.$addressInput.val(function (i, value) {
      return value.replace('ob://', '');
    });
  },

  untrimAddressBar: function(){
    this.$addressInput.val(function (i, value) {
      if (value) {
        value = value.startsWith('ob://') ? value : 'ob://' + value;
      }
      return value;
    });
  },

  addressBarFocus: function(e){

    // on mouseEnter of the address bar input display the ob:// prefix if it doesn't already exist
    this.untrimAddressBar();

    // on inital focus of input, select all text (this makes it easier to copy or delete the text)
    $(e.target).one('mouseup', function () {
      $('#addressBar').select();
    });
    
    // Trigger suggestions box
    if (!this.suggestionsVisible) {
      this.$addressInput.trigger('keyup');
    }
  },

  addressBarBlur: function(){
    this.trimAddressBar();
  },

  addressBarKeyup: function(e){
    var barText = this.$addressInput.val(),
        sliced;

    //detect enter key
    if (e.keyCode == 13){
      // Stop right here! Route was already changed
      if (this.selectSuggestionOnEnter()) {
        return;
      }
      
      if (barText.startsWith('ob://')) {
        sliced = barText.length > 5 ? barText.slice(5) : '';
        sliced && this.addressBarProcess(sliced);
      } else {
        this.addressBarProcess(barText);  
      }
    } else {
      this.showSuggestionsBox(e, barText);
      this.closeStatusBar();
    }
  },

  addressBarProcess: function(addressBarText){
    app.router.translateRoute(addressBarText).done((route) => {
      Backbone.history.navigate(route, {trigger: true});
    });
  },
  
  suggestionClick: function() {
    this.hideSuggestions();
  },
  
  showSuggestionsBox: function(e, query) {
    var self = this,
        keyCode = e.keyCode || e.which,
        type = null,
        list = [],
        suggestions = [];
        
    query = query.replace('ob://', '');
        
    if (query.startsWith('@')) {        
      type = 'handles';
      list = this.findInHandlesList(query);
    } else if (query.startsWith('#') || !query.startsWith('ob://')) {
      type = 'tags';
      list = this.findInTagsList(query);
    }
    
    if (list.length) {
      // On query text change
      if (query !== '' && this.lastQuery !== query) {
        __.each(list, function(item){
          var itemUrl = '',
              itemTitle = '';
          
          if (type == 'tags') {
            itemTitle = item.startsWith('#') ? item : '#' + item;
            itemUrl = '#home/products/' + (item.startsWith('#') ? item.substr(1, item.length) : item);
          } else if (type == 'handles') {
            itemTitle = item.handle + ' &ndash; ' + item.name;
            itemUrl = '#userPage/' + item.guid + '/store';
          }
          
          loadTemplate('./js/templates/pageNavSuggestionItem.html', function(loadedTemplate) {
            suggestions.push(loadedTemplate({
              itemTitle: itemTitle,
              itemUrl: itemUrl,
            }));
          });
        });
        
        self.$suggestionsList.html(suggestions);
        app.showOverlay();
        self.showSuggestions();
        
        self.lastQuery = query;
      }
      
      // Up and down keys
      if (keyCode == 38 || keyCode == 40) {
        this.$selectedSuggestion = this.$suggestionsList.find('a.selected');
        this.$newSuggestion = null;

        if (keyCode == 40) {
          this.suggestionMoveDown();
        } 
        else {
          this.suggestionMoveUp();
        }
      }
      
    } else {
      if (this.lastQuery !== query) {
        app.hideOverlay();
        this.hideSuggestions();
      }
    }
  },
  
  showSuggestions: function() {
    this.$suggestionsList.show();
    
    this.suggestionsVisible = true;
  },
  
  hideSuggestions: function() {
    this.$suggestionsList.hide();
    
    this.suggestionsVisible = false;
    this.lastQuery = '';
  },
  
  selectSuggestionOnEnter: function() {
    var $selected = this.$suggestionsList.find('a.selected');
    
    app.hideOverlay();
    this.hideSuggestions();
    
    if (typeof $selected !== 'undefined' && $selected.length) {
      Backbone.history.navigate($selected.attr('href'), {
        trigger: true 
      });
      
      return true;
    }
  },
  
  selectNewSuggestion: function() {
    if (this.$newSuggestion !== null) {
      this.$selectedSuggestion.removeClass('selected');
      this.$newSuggestion.addClass('selected');
      
      var itemPos = this.$newSuggestion.position().top;
      
      // Show current item if not visible          
      if (this.$suggestionsList.outerHeight() <= itemPos || itemPos < 0) {
        this.$suggestionsList.scrollTop(itemPos);
      }
    }
  },
  
  suggestionMoveUp: function() {
    if (this.$selectedSuggestion.length) {
      this.$newSuggestion = this.$selectedSuggestion.prev();
      
      // Return back to address bar
      if (!this.$newSuggestion.length) {
        this.$selectedSuggestion.removeClass('selected');
        this.$addressInput.focus();
        
        this.$newSuggestion = null;
      }
    }
    
    this.selectNewSuggestion();
  },
  
  suggestionMoveDown: function() {
    if (this.$selectedSuggestion.length) {
      this.$newSuggestion = this.$selectedSuggestion.next();
      
      // Last item
      if (!this.$newSuggestion.length) {
        this.$newSuggestion = this.$selectedSuggestion;
      }
    } else {
      this.$newSuggestion = this.$suggestionsList.find('a').first();
    }
    
    this.selectNewSuggestion();
  },
  
  findInTagsList: function(query) {
    var re = new RegExp(query, 'i');
    
    return __.filter(JSON.parse(localStorage.getItem('tagsHistory')), function(item){
      return query && re.exec(item) !== null;
    });
  },

  findInHandlesList: function(query) {
    var re = new RegExp(query, 'i');

    return __.filter(JSON.parse(localStorage.getItem('handlesHistory')), function(item){
      return query && re.exec(item.handle) !== null;
    });
  },

  showStatusBar: function(msgText){
    this.$statusBar.find('.js-statusBarMessage').text(msgText);
    this.$statusBar.removeClass('fadeOut');
  },

  closeStatusBar: function(){
    this.$statusBar.addClass('fadeOut');
  },

  navAdminPanel: function(){
    this.$el.find('.js-adminModal').fadeIn(300);
    this.adminPanel.updatePage();
  },

  shadeColor2: function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1), 16), t=percent<0?0:255, p=percent<0?percent*-1:percent, R=f>>16, G=f>>8&0x00FF, B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  validateInput: function(e) {
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  mouseenterServerSubmenuTrigger: function() {
    this.$serverSubmenu.css('right', this.$('.popMenu-navBarSubMenu-pageNav').outerWidth());

    this.ServerSubmenuTimeout = setTimeout(() => {
      this.$serverSubmenu.addClass('server-submenu-opened');
    }, 150);
  },

  mouseleaveServerSubmenuTrigger: function() {
    clearTimeout(this.ServerSubmenuTimeout);

    setTimeout(() => {
      if (!this.overServerSubmenu) {
        this.$serverSubmenu.removeClass('server-submenu-opened');
      }
    }, 100);
  },

  mouseenterServerSubmenu: function() {
    this.overServerSubmenu = true;
  },

  mouseleaveServerSubmenu: function() {
    this.overServerSubmenu = false;
    clearTimeout(this.ServerSubmenuTimeout);
    this.$serverSubmenu.removeClass('server-submenu-opened');
  },  

  remove: function() {
    $(document).off('click', this.onDocumentClick);

    baseVw.prototype.remove.apply(this, arguments);
  }
});
