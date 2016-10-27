'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'suggestionsList js-addressBarSuggestions',
  
  $input: null,
  $newSuggestion: null,
  $selected: null,

  lastQuery: '',
  list: [],
  //selectedOnEnter: false,
  type: '',
  visible: false,
  
  events: {
    'click.local .js-suggestion': 'itemClick',
  },

  initialize: function(options){
    var self = this;
    
    this.options = options || {};
    this.$input = this.options.$input;
    
    this.$input.on('focus.local', function(){
      // Trigger suggestions box
      if (!self.isVisible()) {
        $(this).trigger('keyup');
      }
    });
    
    this.$input.on('keyup.local', function(e){
      var keyCode = e.keyCode || e.which;

      if (keyCode == 13) {
        self.selectItemOnEnter();
      } else {
        self.showBox(e, $(this).val());
      }
    });
  },

  render: function(){
    return this;
  },
  
  showBox: function(e, query) {
    var self = this,
        keyCode = e.keyCode || e.which,
        suggestions = [];
        
    query = query.replace('ob://', '');
    
    this.setType(query);
    this.setList(query);
    
    if (this.list.length) {
      // On query text change
      if (query !== '' && this.lastQuery !== query) {
        __.each(this.list, function(item){
          loadTemplate('./js/templates/pageNavSuggestionItem.html', function(loadedTemplate) {
            suggestions.push(loadedTemplate({
              itemTitle: self.itemTitle(item),
              itemUrl: self.itemUrl(item),
            }));
          });
        });
        
        this.$el.html(suggestions);
        app.showOverlay();
        this.showSuggestions();
        
        this.lastQuery = query;
      }
      
      // Up and down keys
      if (keyCode == 38 || keyCode == 40) {
        this.$selected = this.$('a.selected');
        this.$newSuggestion = null;

        if (keyCode == 40) {
          this.itemMoveDown();
        } else {
          this.itemMoveUp();
        }
      }
      
    } else {
      if (this.lastQuery !== query) {
        app.hideOverlay();
        this.hideSuggestions();
      }
    }
  },
  
  itemClick: function() {
    this.hideSuggestions();
  },
  
  showSuggestions: function() {
    this.$el.show();

    this.visible = true;
  },
  
  hideSuggestions: function() {
    this.$el.hide();
    
    this.visible = false;
    this.lastQuery = '';
  },
  
  selectItemOnEnter: function() {
    var $selected = this.$('a.selected');
    
    //this.selectedOnEnter = true;
    
    app.hideOverlay();
    this.hideSuggestions();
    
    if (typeof $selected !== 'undefined' && $selected.length) {
      Backbone.history.navigate($selected.attr('href'), {
        trigger: true
      });
    }
  },
  
  selectNewItem: function() {
    if (this.$newSuggestion !== null) {
      this.$selected.removeClass('selected');
      this.$newSuggestion.addClass('selected');
      
      var itemPos = this.$newSuggestion.position().top;
      
      // Show current item if not visible          
      if (this.$el.outerHeight() <= itemPos || itemPos < 0) {
        this.$el.scrollTop(itemPos);
      }
    }
  },
  
  itemMoveUp: function() {
    if (this.$selected.length) {
      this.$newSuggestion = this.$selected.prev();
      
      // Return back to address bar
      if (!this.$newSuggestion.length) {
        this.$selected.removeClass('selected');
        this.$input.focus();
        
        this.$newSuggestion = null;
      }
    }
    
    this.selectNewItem();
  },
  
  itemMoveDown: function() {
    if (this.$selected.length) {
      this.$newSuggestion = this.$selected.next();
      
      // Last item
      if (!this.$newSuggestion.length) {
        this.$newSuggestion = this.$selected;
      }
    } else {
      this.$newSuggestion = this.$('a').first();
    }
    
    this.selectNewItem();
  },
  
  findInHandlesList: function(query) {
    var re = new RegExp(query, 'i');

    return __.filter(JSON.parse(localStorage.getItem('handlesHistory')), function(item){
      return query && re.exec(item.handle) !== null;
    });
  },
  
  findInTagsList: function(query) {
    var re = new RegExp(query, 'i');
    
    return __.filter(JSON.parse(localStorage.getItem('tagsHistory')), function(item){
      return query && re.exec(item) !== null;
    });
  },
  
  setList: function(query) {
    this.list = [];
    
    switch (this.type) {
    case 'handles':
      this.list = this.findInHandlesList(query);
      break;
    case 'tags':
      this.list = this.findInTagsList(query);
      break;
    }

    return this.list;
  },
  
  setType: function(query) {
    if (query.startsWith('@')) {
      this.type = 'handles';
    } else if (query.startsWith('#') || !query.startsWith('ob://')) {
      this.type = 'tags';
    }
    
    return this.type;
  },
  
  itemTitle: function(item) {
    switch (this.type) {
    case 'handles':
      return item.handle + ' &ndash; ' + item.name;
    case 'tags':
      return item.startsWith('#') ? item : '#' + item;
    }
  },
  
  itemUrl: function(item) {
    switch (this.type) {
    case 'handles':
      return '#userPage/' + item.guid + '/store';
    case 'tags':
      return '#home/products/' + (item.startsWith('#') ? item.substr(1, item.length) : item);
    }
  },
  
  isVisible: function() {
    return this.visible;
  },
  
  wasSelectedOnEnter: function() {
    /*
    if (this.selectedOnEnter) {
      this.selectedOnEnter = false;
      
      return true;
    }
    
    return false;
    */
    return this.$('a.selected').length;
  },

  remove: function() {
    baseVw.prototype.remove.apply(this, arguments);
  }
});
