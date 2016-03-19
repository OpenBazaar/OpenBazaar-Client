var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */
/* language MUST be added to the model below otherwise it won't be recognized */

module.exports = Backbone.Model.extend({
  defaults: {
    languages: [
      {
        langName: "English",
        langCode: "en-US"
      },
      {
        langName: "Dansk",
        langCode: "da"
      },
      {
        langName: "Deutsch",
        langCode: "de"
      },
      {
        langName: "Dutch",
        langCode: "nl-NL"
      },
      {
        langName: "Espa&ntilde;ol",
        langCode: "sp"
      },
      {
        langName: "Italiano",
        langCode: "it"
      },
      {
        langName: "Français",
        langCode: "fr-FR"
      },
      {
        langName: "Polski",
        langCode: "pl"
      },
      {
        langName: "Português (Brasil)",
        langCode: "pt-BR"
      },
      {
        langName: "Română",
        langCode: "ro"
      },
      {
        langName: "Russian",
        langCode: "ru"
      },
      {
        langName: "Slovenský jazyk",
        langCode: "sk"
      },
      {
        langName: "Turkish",
        langCode: "tr"
      },
      {
        langName: "中文",
        langCode: "zh-CN"
      },
      {
        langName: "한국어 (Korean)",
        langCode: "ko"
      },
      {
        langName: "日本語 (Japanese)",
        langCode: "ja-JP"
      },
      {
        langName: "Українська (Ukrainian)",
        langCode: "uk",
      },
      {
        langName: "Klingon",
        langCode: "tlh"
      }
    ]
  }
});
