'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    constructor: function (options) {
      Backbone.View.prototype.constructor.apply(this, arguments);
      this._childViews = [];
      this._unregisterFromParent = true;
      this._removed = false;
    },

    // If you are creating child views within your view, call this method
    // to register them. This will ensure that they will have their remove
    // method called if the parent is removed.
    registerChild: function (childView) {
      if (this._childViews.indexOf(childView) === -1) {
        this._childViews.push(childView);
        childView._parentView = this;
      }
    },

    // Opposite of registerChild. This method is automatically
    // called by remove. For all practical purposes, you probably
    // won't need to call this method directly (as long as you
    // are remembering to call this base class's remove when you
    // are overriding remove in your own views).
    unregisterChild: function (childView) {
      var name = '';
      if (childView.options && childView.options.name) {
        name = childView.options.name;
      }

      var index;

      if ((index = this._childViews.indexOf(childView)) !== -1) {
        this._childViews.splice(index, 1);
        childView._parentView = null;
      }
    },

    // Will call the remove method of any child views.
    remove: function () {
      for (var i=0; i < this._childViews.length; i++) {
        // no need to unregister child from parent,
        // since the parent is also being removed
        this._childViews[i]._unregisterFromParent = false;
        this._childViews[i].remove();
      }

      if (this._parentView && this._unregisterFromParent) {
        this._parentView.unregisterChild(this);
      }

      Backbone.View.prototype.remove.apply(this, arguments);

      this._removed = true;
    },

    isRemoved: function() {
      return this._removed;
    }
});
