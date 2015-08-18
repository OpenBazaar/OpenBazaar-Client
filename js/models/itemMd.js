var Backbone = require('backbone');

module.exports = ItemModel = Backbone.Model.extend({
  defaults: {
    name: "NewItem",
    GUID: 0,
    price: 0,
    img: "",
    thb: "",
    condition: 0, /*0=new, 1=used, 2=?*/
    description: "An item",
    reviews: {
      review: {
        reviewer: "Name",
        content: "Content"
      }
    }
  }
});