var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
  },

  parse: function(response) {
    var attrs = response.tx_summary;

    attrs.delivery_time = parseInt(attrs.delivery_time);
    attrs.feedback = parseInt(attrs.feedback);
    attrs.quality = parseInt(attrs.quality);
    attrs.description = parseInt(attrs.description);
    attrs.customer_service = parseInt(attrs.customer_service);

    // todo: update sync to convert the above back to strings
    // for saves. That will be necessary, should we want to use
    // this model to save (which we probably should).

    return attrs;
  }
  // },

  // getAverageRating: function() {
  //   var delivery = parseInt(this.get('delivery_time')),
  //       feedback = parseInt(this.get('feedback')),
  //       quality = parseInt(this.get('quality')),
  //       description = parseInt(this.get('description'));

  //   return (delivery + feedback + quality + description) / 4;
  // }
});