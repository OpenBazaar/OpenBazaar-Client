var Backbone = require('backbone'),
  $ = require('jquery'),
  moment = require('moment'),
  app = require('../App.js').getApp(),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  chatHeadVw = require('./chatHeadVw');

module.exports = baseVw.extend({
  className: 'chatConversation c12345hatConversationHidden',

  events: {
    'click .js-closeConversation': 'onClickClose'
  },

  initialize: function(options) {
    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    // if (!options.user) {
    //   throw new Error('Please provide the model of the logged-in user.');
    // }

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    this.fetching = true;
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', () => {
      // this.fetching = false;
      // this.render();
    });    
  },

  onClickClose: function() {
    this.trigger('close-click');
  },

  render: function() {
    loadTemplate('./js/templates/chatConversation.html', (tmpl) => {
      this.$el.html(
        tmpl(__.extend(this.model.toJSON(), {
          serverUrl: app.serverConfig.getServerBaseUrl(),
          moment: moment,
          fetching: this.fetching
        }))
      );

      this.$('.chatConversationMessage textarea').focus()
    });

    return this;
  }
});