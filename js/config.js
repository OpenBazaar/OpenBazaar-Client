// App specific configuration
var testnet = true, //change to false to use main net
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
    purchases:       '1',
    sales:           '2',
    cases:           '3',
    settings:        'g',
    addressBar:      'l'
  }
}