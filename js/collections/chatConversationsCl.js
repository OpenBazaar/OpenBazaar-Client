var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    ChatConversationMd = require('../models/chatConversationMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfigs.getActive().getServerBaseUrl() + '/get_chat_conversations';
  },

  model: ChatConversationMd,

  initialize: function() {
      this.on('change:unread', function(model){
          // Only re-sort collection if unread count was incremented
          if (model.hasChanged('unread') && model.get('unread') > 0) {
            this.sort();
          }
      });
  },

  comparator: function(a, b) {
    // Sort by unread messages first
    if (a.get('unread') > 0 && b.get('unread') == 0) {
      return -1;
    }
    
    if (a.get('unread') == 0 && b.get('unread') > 0) {
      return 1;
    }
    
    // then sort by timestamp
    if (a.get('timestamp') > b.get('timestamp')) {
      return -1;
    }
    
    if (a.get('timestamp') < b.get('timestamp')) {
      return 1;
    }
    
    return 0;
  }
});