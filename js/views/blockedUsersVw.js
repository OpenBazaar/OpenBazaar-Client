var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    blockedUserVw =  require('./blockedUserVw');

module.exports = Backbone.View.extend({

  className: "flexCol-12 flex-border js-tabTarg js-blocked hide",

  events: {
  },

  initialize: function(options) {
    var self = this;

    this.options = options || {};
    this.subViews = [];

    this.listenTo(this.collection, 'update', function(collection, options) {
      var self = this;

      if (options.add) {
        __.each(collection.models.slice(self.subViews.length), function(user) {
          self.renderNewUserView(user);
        });
      }
    });

    this.listenTo(this.collection, 'remove', function(md, cl, options) {
      var self = this,
          view;

      if (view = __.find(this.subViews, function(subView) {
        return subView.model.get('guid') === md.get('guid');
      })) {
        self.removeSubView(view);
      }      
    });
  },

  renderNewUserView: function(model) {
    var view;

    if (!model) return;

    view = new blockedUserVw({
      model: model
    });

    this.listenTo(view, 'unblockUserClick', this.unblockUserClick);
    this.subViews.push(view);
    this.$el.append(view.render().el);
  },

  render: function(){
    var self = this;

    this.clearSubViews();
    this.$el.empty();

    this.collection.each(function(user) {
      self.renderNewUserView(user);
    });

    return this;
  },

  unblockUserClick: function(e) {
    this.model.unblockUser(e.view.model.get('guid'), this.model, this.options.serverUrl);
  },

  clearSubViews: function() {
    __.each(this.subViews, function(view) {
      view.close();
    });

    this.subViews = [];
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