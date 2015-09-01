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
  }
});