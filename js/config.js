// App specific configuration
var testnet = localStorage.getItem('testnet') == 'true' ? true : false, //change to false to use main net
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
    myPage:          'j',
    customizePage:   'k',
    create:          'l',
    purchases:       ',',
    sales:           '.',
    cases:           '/',
    settings:        ';',
    addressBar:      '[',
    save:            's',
    refresh:         't',
    restart:         'r'
  },
  
  // Can't use charCodeAt() from values above
  // because it returns different integers than keypress event
  keyCodes: {
    purchases:  188,
    sales:      190,
    cases:      191,
    settings:   186,
    addressBar: 219
  },
  
  setTestnet: function(testNetBoolean){
    localStorage.setItem('testnet', testNetBoolean);
  }
};