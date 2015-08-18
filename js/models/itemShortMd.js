var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "NewItem",
    contract_hash: 0,
    thumbnail_hash: "imgs/defaultItem.png",
    category: "",
    price: 0,
    currency_code: 0,
    nsfw: false,
    origin: "",
    ships_to: "",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png"
  }
});