'use strict';

var __ = require('underscore'),
    baseVw = require('./baseVw'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = baseVw.extend({

  initialize: function(options){
    this.options = options || {};
    this.category = options.category || "all";
    //the model must be passed in by the constructor
    this.itemsShort = new itemsShortCollection(this.model);
    this.itemsShort.models.reverse();
    this.itemsShort.comparator = (model) => {
      return !model.get('pinned');
    };
    this.itemsShort.sort();

    this.showPerScroll = 18;
    this.nextToShow = 0;
    this.$container = $('#obContainer');

    //listen to scrolling on container
    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
    this.$container.on('scroll', this.scrollHandler);

    // as of now, our base view doesn't support registerChild happening
    // before the view is fully initialized, hence the timeout here:
    setTimeout(() => {
      this.render();
    });
  },

  render: function(){
    var self = this;
    //clear the list
    this.$el.empty();
    if (this.itemsShort.models.length > 0) {
      this.renderItemSet(this.nextToShow, this.showPerScroll);
    } else {
      self.renderNoneFound();
    }
    this.trigger("rendered");
  },

  renderItemSet: function(start, end){
    let renderSet = [];

    if (start >= this.itemsShort.models.length) return;

    renderSet = __.filter(this.itemsShort.models, function(value, index){
      return (index >= start) && (index < end);
    });

    __.each(renderSet, (item) => {
      if (item.toJSON().category == this.category || this.category == "all") {
        this.renderContract(item);
      }
    }, this);

    this.nextToShow = end;
  },

  renderContract: function(item){
    var itemShort = new itemShortView({
      model: item,
      parentEl: this.$el
    });
    this.registerChild(itemShort);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.registerChild(simpleMessage);
  },

  onScroll: function(){
    if (this.$el.is(":visible")){

      if (this.$container[0].scrollTop + this.$container[0].clientHeight + 200 > this.$container[0].scrollHeight &&
          this.$el[0].hasChildNodes()) {
        this.renderItemSet(this.nextToShow, this.nextToShow + this.showPerScroll);
      }
    }
  },

  remove: function(){
    this.$container.off('scroll', this.scrollHandler);
  }

});
