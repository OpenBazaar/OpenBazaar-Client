var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment'),
    sanitizeHTML = require('sanitize-html'),
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
        $msg;

    sanitizedMsg = sanitizeHTML(this.model.get('message').replace(/\n$/, '').split(/[\r\n]/g).join('<br/><br/>'), {
      allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img' ]
    });

    // add js-externalLink class to any links in the message text
    $msg = $('<div>' + sanitizedMsg + '</div>');
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