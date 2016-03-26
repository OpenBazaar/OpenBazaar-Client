// App specific configuration
module.exports = {
  testnet: true, //change to false to use main net
  
  bitcoinValidationRegex: "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$",
  //remove this when in production, this is for testNet addresses
  bitcoinValidationRegexTestnet: "^[2mn][a-km-zA-HJ-NP-Z1-9]{25,34}$",
  
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