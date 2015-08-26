var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    title: "NewItem",
    contract_hash: 0,
    thumbnail_hash: "imgs/defaultItem.png",
    category: "",
    price: 0,
    displayPrice: 0,
    btcPrice: 0,
    currency_code: "USD",
    nsfw: false,
    origin: "",
    ships_to: "",
    GUID: "",
    handle: 0,
    avatar_hash: "imgs/defaultUser.png"
  },

  initialize: function(){
    this.updateAttributes();
    this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    this.set("btcPrice", (this.get("price") / window.currentBitcoin).toFixed(4));
    this.set("displayPrice", new Intl.NumberFormat(window.lang, {style: 'currency', currency: this.get("currency_code")}).format(this.get("price")));
  }
});