// App specific configuration
var testnet = localStorage.getItem('testnet') == 'true',
    bitcoinValidationRegexMainnet = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    bitcoinValidationRegexTestnet = "^[2mn][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    bitcoinValidationRegex = testnet ? bitcoinValidationRegexTestnet : bitcoinValidationRegexMainnet;

module.exports = {
  
  testnet: testnet,

  bitcoinValidationRegex: bitcoinValidationRegex,
  
  keyShortcutPrefix: window.navigator.platform === 'MacIntel' ? '&#8984;' : 'Ctrl+',
  
  keyShortcuts: {
    undo:            'z',
    discover:        'd',
    myPage:          't',
    customizePage:   'e',
    create:          'n',
    purchases:       'k',
    sales:           'm',
    cases:           'j',
    settings:        'g',
    addressBar:      'l',
    save:            's',
    refresh:         'r',
    restart:         'f'
  },
  
  setTestnet: function(testNetBoolean){
    localStorage.setItem('testnet', testNetBoolean);
  }
};