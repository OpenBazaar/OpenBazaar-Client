'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    moment = require('moment'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'chatMessage flexRow',

  events: {
    'click .js-chatMessageAvatar': 'avatarClick'
  },

  initialize: function(options){
    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    if (!options.user) {
      throw new Error('Please provide the model of the logged-in user.');
    }

    this.user = options.user;
  },

  render: function(){
    var sanitizedMsg,
        msgTxt = this.model.get('message'),
        $msg;

    // add js-externalLink class to any links in the message text
    $msg = $('<div>' + msgTxt + '</div>');
    $msg.find('a').addClass('js-externalLink');
    sanitizedMsg = $msg.html();

    loadTemplate('./js/templates/chatMessage.html', (tmpl) => {
      this.$el.html(
        tmpl(
          __.extend(this.model.toJSON(), {
            serverUrl: app.serverConfigs.getActive().getServerBaseUrl(),
            moment: moment,
            sanitizedMsg: sanitizedMsg,
            user: this.user.toJSON()
          })
        )
      );
    });

    return this;
  }
});
