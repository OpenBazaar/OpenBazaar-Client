'use strict';

var sanitizeHTML = require('sanitize-html');

function sanitize(rawHTML) {
  var processedHTML = rawHTML;

  var decodeHtml = function(html) { //turn encoded html into regular html
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  processedHTML = sanitizeHTML(decodeHtml(processedHTML), {
    allowedTags: [ 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'u', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote', 'span' ],
    allowedAttributes: {
      'a': [ 'href', 'title', 'alt' ],
      'img': [ 'src', 'style']
    },
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'ob' ]
  });

  return processedHTML;
}

module.exports = function(modelObject) {

  function sanitizeModelData (obj) {
    Object.keys(obj).forEach(function (key) {
      if (typeof obj[key] === 'object') {
        return sanitizeModelData(obj[key]);
      }
      if (typeof obj[key] === 'string') {
        obj[key] = sanitize(obj[key]);
      }
    });
  }
  sanitizeModelData(modelObject);

  return modelObject;
};
