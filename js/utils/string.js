'use strict';

// http://stackoverflow.com/a/2970667
// camel cases a string while also removing non-alpha numeric characters
function camelize(str) {
  return str.replace(/\W/g, '').replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports = {
  camelize: camelize
};