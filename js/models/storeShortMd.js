var Backbone = require('backbone');

module.exports = ShortItemModel = Backbone.Model.extend({
  defaults: {
    name: "A Store",
    handle: 0,
    avatar_hash: "/imgs/defaultUser.png",
    nsfw: false
  }
});