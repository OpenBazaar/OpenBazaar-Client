'use strict';

module.exports = window.Backbone.Model.extend({
  defaults: {
    handle: "", 
    title: "", 
    order_id: "",
    timestamp: "", 
    image_hash: "",
    guid: "", 
    type: "", 
    id: ""
  }
});