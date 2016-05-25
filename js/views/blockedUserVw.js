'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  className: "flexRow borderBottom",

  events: {
    'click .js-unblockUser': 'unblockUser'
  },

  initialize: function(){
    var self = this;

    this.listenTo(this.model, 'change', function() {
      self.render();
    });
  },

  unblockUser: function(e) {
    this.trigger('unblockUserClick', { originalEvent: e, view: this });
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/blockedUser.html', function(loadedTemplate) {
      self.$el.html(
        loadedTemplate(self.model.toJSON())
      );
    });

    return this;
  }
});