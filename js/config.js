// App specific configuration
var testnet = false, //change to false to use main net
    bitcoinValidationRegexMainnet = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    bitcoinValidationRegexTestnet = "^[2mn][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    bitcoinValidationRegex = testnet ? bitcoinValidationRegexTestnet : bitcoinValidationRegexMainnet;

module.exports = {
  
  testnet: testnet,

  bitcoinValidationRegex: bitcoinValidationRegex,
  
  keyShortcuts: {
    discover:        'd',
    myPage:          'h',
    customizePage:   'e',
    create:          'n',
    purchases:       'r',
    sales:           't',
    cases:           'y',
    settings:        'g',
    addressBar:      'l'
  }
}