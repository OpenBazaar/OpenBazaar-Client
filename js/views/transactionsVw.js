var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js'),
    setTheme = require('../utils/setTheme.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    purchasesCl = require('../collections/purchasesCl'),
    orderShortVw = require('./orderShortVw'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    transactionModalVw = require('./transactionModalVw'),
    countriesMd = require('../models/countriesMd');

module.exports = Backbone.View.extend({

  className: "transactionsView",

  events: {
    'click .js-purchasesTab': 'tabHandler',
    'click .js-salesTab': 'tabHandler',
    'click .js-casesTab': 'tabHandler',
    'change .js-transactionFilter': 'transactionFilter'
  },

  initialize: function(options){
    "use strict";
    /* expected options:
       userModel
       userProfile
       state (from router)
     */
    var self = this,
        profile = options.userProfile.get('profile'),
        wrapper = "<div class='flexRow'></div>";

    this.options = options;
    this.state = options.state || "purchases";
    this.userModel = this.options.userModel;
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", profile);
    setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    this.serverUrl = options.userModel.get('serverUrl');
    this.cCode = options.userModel.get('currency_code');
    this.listenTo(window.obEventBus, "openOrderModal", function(orderID){
      self.openOrderModal(orderID);
    });
    this.subViews = [];
    this.subModels = [];

    this.countries = new countriesMd();
    this.countriesArray = this.countries.get('countries');

    this.subModels.push(this.countries);

    getBTPrice(this.cCode, function(btAve){
      self.btAve = btAve;
      self.purchasesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.purchasesCol.url = self.serverUrl + "get_purchases";
      self.purchasesWrapper = $(wrapper);

      self.salesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.salesCol.url = self.serverUrl + "get_sales";
      self.salesWrapper = $(wrapper);

      self.casesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.casesCol.url = self.serverUrl + "get_cases";
      self.casesWrapper = $(wrapper);

      self.render();
    });
  },

  getData: function(){
    "use strict";
    var self = this;

    this.purchasesCol.fetch({
      success: function(models){
        console.log(models);
        self.renderPurchases();
      }
    });
    if(this.model.get('page').vendor){
      this.salesCol.fetch({
        success: function(models){
          console.log(models);
          self.renderSales();
        }
      });
    }
    if(this.model.get('page').moderator){
      //this.casesCol.fetch(); //not ready yet
    }
  },

  render: function(){
    "use strict";
    var self = this;
    $('#content').html(self.$el);
    loadTemplate('./js/templates/transactions.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setState(self.state);
      self.getData();
    });
  },

  addTabToHistory: function(state){
    "use strict";
    //add action to history
    Backbone.history.navigate("#transactions/" + state);
    this.options.state = state;
  },

  setTab: function(activeTab, showContent){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state){
    console.log(state);
    "use strict";
    this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    $('#content').find('input:visible:first').focus();
  },

  tabHandler: function(e){
    "use strict";
    var tab = $(e.target),
        tabID = tab.data("tab"),
        showContent = this.$el.find('.js-'+tabID);

    this.addTabToHistory(tabID);
    this.setTab(tab, showContent);
    this.setState(tabID);
  },

  transactionFilter: function(){
    "use strict";
    var filterBy = this.$el.find(".js-transactionFilter").val();
    console.log("filter by "+filterBy);
  },

  renderPurchases: function(){
    "use strict";
    var self = this;
    this.purchasesCol.each(function(model, i){
      model.set('imageUrl', self.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
      var orderShort = new orderShortVw({
        model: model
      });
      self.subViews.push(orderShort);
      self.purchasesWrapper.append(orderShort.render().el);
    });
    this.$el.find(".js-purchases").append(this.purchasesWrapper);
  },

  renderSales: function(models){
    "use strict";
    var self = this;
    this.salesCol.each(function(model, i){
      model.set('imageUrl', self.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
      var orderShort = new orderShortVw({
        model: model
      });
      self.subViews.push(orderShort);
      self.salesWrapper.append(orderShort.render().el);
    });
    this.$el.find(".js-sales").append(this.salesWrapper);
  },

  renderCases: function(models){
    "use strict";

  },

  openOrderModal: function(orderID){
    "use strict";
    var orderModalView = new transactionModalVw({
      orderID: orderID,
      serverUrl: this.serverUrl,
      parentEl: this.$el.find('.js-transactionModalHolder'),
      countriesArray: this.countriesArray,
      cCode: this.userModel.get('currency_code'),
      btAve: this.btAve
    });
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
  }
});