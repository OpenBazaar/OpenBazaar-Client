var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    blockedUserVw =  require('./blockedUserVw');

module.exports = Backbone.View.extend({

  className: "flexCol-12 flex-border js-tabTarg js-blocked",

  events: {
  },

  initialize: function(options) {
    this.options = options || {};
    this.subViews = [];

    this.listenTo(window.obEventBus, 'unblockingUser', function(e){
      var self = this,
          view;

      if (view = __.find(this.subViews, function(subView) {
        return subView.model.get('guid') === e.guid;
      })) {
        self.removeSubView(view);
      }
    });        
  },

  render: function(){
    var self = this;

    this.clearSubViews();
    this.$el.empty();

    this.collection.each(function(user) {
      var view = new blockedUserVw({
          model: user
        });

      self.listenTo(view, 'unblockUserClick', self.unblockUserClick);
      self.subViews.push(view);
      self.$el.append(view.render().el);
    });

    return this;
  },

  unblockUserClick: function(e) {
    this.model.unblockUser(e.view.model.get('guid'), this.model, this.options.serverUrl);
  },

  clearSubViews: function() {

  },

  removeSubView: function(view) {
    var self = this,
        index;

    if (!view) return;

    __.every(this.subViews, function(subView, i) {
      if (view === subView) {
        index = i;

        if(subView.close){
          subView.close();
        }else{
          subView.unbind();
          subView.remove();
        }

        self.subViews.splice(index, 1);

        return false;        
      }

      return true;
    });
  },  

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }
});