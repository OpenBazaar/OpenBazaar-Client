'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    BaseVw = require('./baseVw'),
    ServerConfigRowVw = require('./serverConfigRowVw');

module.exports = BaseVw.extend({
  className: 'accordion-window',

  events: {
  },

  initialize: function(options) {
    this.options = options || {};
    this.configRowViews = [];

    if (!options.collection) {
      throw new Error('Please provide a ServerConfigs collection.');
    }

    this.connectionState = {};
    this.collection.forEach((md) => {
      this.connectionState[md.id] = { status: 'not-connected' };
    });

    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'remove', this.onRemoveConfig);
  },

  onRemoveConfig: function(md) {
    var index = -1;

    __.every(this.configRowViews, (vw) => {
      index++;
      return vw.model !== md;
    });

    if (index > -1) {
      this.configRowViews.splice(index, 1);
    }
  },

  setConnectionState: function(state) {
    // 'state' should be in the form:
    // { id: 31 (id of server config model), status: 'connecting' }

    var index = -1,
        updatedState;

    __.every(this.configRowViews, (vw, i) => {
      if (vw.model.id === state.id) {
        index = i;
        return false;
      }

      return true;
    });

    if (index > -1) {
      updatedState = __.omit(state, 'id');
      this.connectionState[state.id] = updatedState;
      this.configRowViews[index]
        .setState(updatedState);
    }
  },

  render: function() {
    var scrollTop;

    this.rendered = true;
    this.configRowViews.forEach((vw) => vw.remove());
    this.configRowViews = [];
    scrollTop = this.$rowsWrap ? this.$rowsWrap[0].scrollTop : 0;

    loadTemplate('./js/templates/serverConfigs.html', (t) => {
      var $rows = $('<div />');

      this.$el.html(t());

      this.collection.forEach((md) => {
        var vw = new ServerConfigRowVw({
          model: md,
          initialState: this.connectionState[md.id]
        });

        this.listenTo(vw, 'delete', (e) => {
          e.view.model.destroy();
        });

        this.listenTo(vw, 'edit', (e) => {
          this.trigger('edit-config', { model: e.view.model });
        });

        this.listenTo(vw, 'connect', (e) => {
          this.trigger('connect', { model: e.view.model });
        });        

        this.listenTo(vw, 'cancel', (e) => {
          this.trigger('cancel', { model: e.view.model });
        });

        this.registerChild(vw);
        $rows.append( vw.render().el );
        this.configRowViews.push(vw);
      });
      
      this.collection.length && this.$('.js-zero-configs').addClass('hide');
      this.$rowsWrap = this.$('.js-rows-wrap');
      this.$rowsWrap.append($rows);
      this.$rowsWrap[0].scrollTop = scrollTop;
    });

    return this;
  }
});
