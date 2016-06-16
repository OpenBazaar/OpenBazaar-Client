'use strict';

var __ = require('underscore'),
    app = require('../App.js').getApp(),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  className: 'border0 custCol-border-secondary flexRow marginLeft1 marginTop1 js-chatHeadWrapper',

  events: {
    'click': 'chatHeadClick'
  },

  initialize: function(options) {
    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  chatHeadClick: function() {
    this.trigger('click', this);
  },

  render: function() {
    loadTemplate('./js/templates/chatHead.html', (tmpl) => {
      this.$el.html(
        tmpl(
          __.extend(this.model.toJSON(), {
            serverUrl: app.serverConfigs.getActive().getServerBaseUrl()
          })
        )
      );
    });

    return this;
  }
});