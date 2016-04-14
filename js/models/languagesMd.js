var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */
/* language MUST be added to the model below otherwise it won't be recognized */

module.exports = Backbone.Model.extend({
  defaults: {
    languages: [
      {
        langName: "English (English, America)",
        langCode: "en_US"
      },
      {
        langName: "Dansk (Danish)",
        langCode: "da"
      },
      {
        langName: "Deutsch (German)",
        langCode: "de"
      },
      {
        langName: "Deutsch (German, Germany)",
        langCode: "de_DE"
      },
      {
        langName: "Dutch (Dutch, Netherlands)",
        langCode: "nl_NL"
      },
      {
        langName: "Espa&ntilde;ol (Spanish)",
        langCode: "sp"
      },
      {
        langName: "Italiano (Italian)",
        langCode: "it"
      },
      {
        langName: "Français (French, Canada)",
        langCode: "fr_CA"
      },
      {
        langName: "Français (French, France)",
        langCode: "fr"
      },
      {
        langName: "Greek (Greek)",
        langCode: "el"
      },
      {
        langName: "Polski (Polish)",
        langCode: "pl"
      },
      {
        langName: "Português (Portuguese, Brazil)",
        langCode: "pt_BR"
      },
      {
        langName: "Română (Romanian)",
        langCode: "ro"
      },
      {
        langName: "Russian (Russian)",
        langCode: "ru"
      },
      {
        langName: "Slovenský jazyk (Slovak)",
        langCode: "sk"
      },
      {
        langName: "Turkish (Turkish)",
        langCode: "tr"
      },
      {
        langName: "Uzbek (Uzbek)",
        langCode: "uz"
      },
      {
        langName: "中文 (Chinese, S)",
        langCode: "zh_CN"
      },
      {
        langName: "한국어 (Korean)",
        langCode: "ko"
      },
      {
        langName: "日本語 (Japanese, Japan)",
        langCode: "ja_JP"
      },
      {
        langName: "Українська (Ukrainian)",
        langCode: "uk"
      },
      {
        langName: "Klingon (Klingon)",
        langCode: "tlh"
      }
    ]
  }
});
