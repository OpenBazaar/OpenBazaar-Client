var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    "vendor_offer": {
      "signature": "",
          "listing": {
        "shipping": {
          "shipping_regions": [
            "UNITED_STATES"
          ],
              "est_delivery": {
            "international": "N/A",
                "domestic": "3-5 Business Days"
          },
          "shipping_origin": "UNITED_STATES",
              "free": true
        },
        "item": {
          "category": "",
              "sku": "",
              "description": "",
              "price_per_unit": {
            "fiat": {
              "price": "",
                  "currency_code": "usd"
            }
          },
          "title": "",
              "process_time": "",
              "image_hashes": [],
              "nsfw": false,
              "keywords": [],
              "condition": "New"
        },
        "moderators": [
          {
            "pubkeys": {
              "encryption": {
                "key": "",
                "signature": ""
              },
              "signing": {
                "key": "",
                "signature": ""
              },
              "bitcoin": {
                "key": "",
                "signature": ""
              }
            },
            "guid": "",
            "blockchain_id": ""
          }
        ],
            "policy": {
          "terms_conditions": "None",
              "returns": ""
        },
        "id": {
          "pubkeys": {
            "guid": "",
                "bitcoin": ""
          },
          "guid": "",
              "blockchain_id": ""
        },
        "metadata": {
          "category": "",
              "version": "",
              "category_sub": "",
              "expiry": ""
        }
      }
    }
  },

  initialize: function(){
    this.updateAttributes();
    this.on('change', this.updateAttributes, this);
  },

  updateAttributes: function(){
    this.set("btcPrice", (this.get("vendor_offer.listing.item.price_per_unit.fiat.price") / window.currentBitcoin).toFixed(4));
    this.set("displayPrice", new Intl.NumberFormat(window.lang, {style: 'currency', currency: this.get("currency_code")}).format(this.get("price")));
  }
});