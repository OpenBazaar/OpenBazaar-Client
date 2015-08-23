var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "NewItem",
    contract_hash: 0,
    thumbnail_hash: "imgs/defaultItem.png",
    category: "",
    price: 0,
    currency_code: "USD",
    nsfw: false,
    origin: "",
    ships_to: "",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png"
  },

  initialize: function(){
    this.updateAttributes();
    this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    this.set("price", new Intl.NumberFormat('en-EN', {style: 'currency', currency: this.get("currency_code")}).format(this.get("price")));
  }
});