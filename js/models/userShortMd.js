var Backbone = require('backbone');

var ShortItemModel = module.exports = Backbone.Model.extend({
  defaults: {
    name: "A Store",
    GUID: "",
    handle: 0,
    avatar_hash: "",
    nsfw: false
  }
});
