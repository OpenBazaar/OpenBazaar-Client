var Backbone = require('backbone');

module.exports = ShortItemModel = Backbone.Model.extend({
  defaults: {
    name: "A Store",
    GUID: "",
    handle: 0,
    avatar_hash: "",
    nsfw: false
  }
});