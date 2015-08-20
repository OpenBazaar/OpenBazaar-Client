var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    en: {
      "onboarding": {
        "intro": "OpenBazaar is an open source project created by hundreds of people with the primary goal of giving the world free trade",
        "contributors": "%{smart_count} Contributor |||| %{smart_count} Contributors",
        "configure": "Configure Your Experience",
        "disclaimer_title": "Disclaimer"
      }
    },
    sp: {
      "onboarding": {
        "intro": "OpenBazaar es un proyecto de código abierto creado por cientos de personas con el objetivo principal de dar la libre comercio mundial",
        "contributors": "%{smart_count} Colaboradores |||| %{smart_count} Colaboradores",
        "configure": "Configure su Experiencia",
        "disclaimer_title": "Nota Legal"
      }
    }
  }
});