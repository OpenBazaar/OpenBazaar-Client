var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */

module.exports = Backbone.Model.extend({
  defaults: {
    en: {
      /* Use capitalized keys for widely reused text that must be capitalized */
      "Next": "Next",
      "Back": "Back",
      "Skip": "Skip",
      "Done": "Done",
      "Cancel": "Cancel",
      "Items": "Items",
      "Stores": "Stores",
      "Follow": "Follow",
      "About": "About",
      "Followers": "Followers",
      "Following": "Following",
      "Store": "Store",
      "Edit": "Edit",
      "Delete": "Delete",
      "nav": {
        "searchPlaceholder": "Enter a handle or a keyword",
        "myPage": "My Page",
        "customizePage":"Customize Page",
        "sellItem":"Sell Item",
        "purchases":"Purchases",
        "sales":"Sales",
        "cases":"Cases",
        "notifications":"Notifications",
        "settings":"Settings",
        "about":"About OpenBazaar",
        "support":"Support OpenBazaar"
      },
      "onboarding": {
        "intro": "OpenBazaar is an open source project created by hundreds of people with the primary goal of giving the world free trade",
        "contributors": "%{smart_count} Contributor |||| %{smart_count} Contributors",
        "configure": "Configure Your Experience",
        "disclaimer_title": "Disclaimer",
        "disclaimer_body": "disclaimer text",
        "yourCountry": "Your Country",
        "localCurrency": "Local Currency",
        "timeZone": "Time Zone",
        "handle": "Handle",
        "knownAs": "You're currently known as:",
        "wouldYou": "Would you like to register an easy to remember handle?",
        "registerNew": "Register New",
        "connectExisting": "Connect Existing",
        "avatar": "Avatar",
        "chooseAvatar": "Choose Avatar"
      },
      "userPage": {
        "about": "<p>OpenBazaar is a network of users who buy and sell goods and services directly with each other, using Bitcoin. This network is decentralized and isn't controlled by any organization.</p><p>The software is open source and MIT licensed. You can <a href='https://github.com/OpenBazaar/'>view the code on Github.</a></p><p>OpenBazaar is a community project, and we welcome participation in <a href='https://openbazaar-slackin-drwasho.herokuapp.com/'>our Slack channel</a> or on <a href='http://www.reddit.com/r/openbazaar'>our subreddit.</a></p><p>If you need help, read the OpenBazaar version 1.0 Tutorial [link]. If you still have questions, <a href='https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post'>open an issue at our support desk</a>.</p>"
      }
    },
    sp: {
      /* this is just for reference. It was created by Google translate, and is probably very inaccurate. */
      "Next": "en Siguiente",
      "Back": "Atrás",
      "Skip": "Omitir",
      "Done": "Hecho",
      "Cancel": "Cancelar",
      "Items": "Artículos",
      "Stores": "Tiendas",
      "Follow": "Seguir",
      "About": "Acerca de",
      "Followers": "Seguidores",
      "Following": "Después",
      "Store": "Tienda",
      "Edit": "Editar",
      "Delete": "Borrar",
      "nav": {
        "searchPlaceholder": "Introduzca un mango o una palabra clave",
        "myPage": "Mi página",
        "customizePage":"Personalizar Página",
        "sellItem":"Venta de artículos",
        "purchases":"Las compras",
        "sales":"Ventas",
        "cases":"Casos",
        "notifications":"Notificaciones",
        "settings":"Ajustes",
        "about":"Acerca OpenBazaar",
        "support":"Soporte OpenBazaar"
      },
      "onboarding": {
        "intro": "OpenBazaar es un proyecto de código abierto creado por cientos de personas con el objetivo principal de dar la libre comercio mundial",
        "contributors": "%{smart_count} Colaboradores |||| %{smart_count} Colaboradores",
        "configure": "Configure su Experiencia",
        "disclaimer_title": "Nota Legal",
        "disclaimer_body": "disclaimer text",
        "yourCountry": "Tu país",
        "localCurrency": "Moneda Local",
        "timeZone": "Zona Horaria",
        "handle": "Apodo",
        "knownAs": "Estás conocido como:",
        "wouldYou": "¿Quieres registrar una fácil de recordar manejar?",
        "registerNew": "Registrar Nuevo",
        "connectExisting": "Conecte Existente",
        "avatar": "Avatar",
        "chooseAvatar": "Elija Avatar"
      },
      "userPage": {
        "about": "<p>OpenBazaar es una red de usuarios que compran y venden bienes y servicios directamente entre sí, utilizando Bitcoin Esta red es descentralizada y no está controlada por ninguna organización</p><p> El. software es de código abierto y licencia MIT. puede <a href='https://github.com/OpenBazaar/'> ver el código en Github.</a></p><p> OpenBazaar es un proyecto comunitario, y damos la bienvenida a la participación en <a href='https://openbazaar-slackin-drwasho.herokuapp.com/'>nuestra</a> canal Slack o <a href='http://www.reddit.com/r/openbazaar> nuestra subreddit. </a> </ p> <p> Si usted necesita ayuda, leer la versión 1.0 Tutorial openBazaar [link]. Si usted todavía tiene preguntas, <a href='https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post'>open un problema en nuestra </a> servicio de soporte. </p>"
      }
    }
  }
});