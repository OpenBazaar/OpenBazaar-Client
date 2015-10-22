var Backbone = require('backbone');

var ShortItemModel = module.exports = Backbone.Model.extend({
  defaults: {
    name: "",
    guid: "",
    handle: 0,
    avatar_hash: "",
    nsfw: false,
    short_description: ""
  }
});
