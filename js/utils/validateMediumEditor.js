'use strict';

var sanitizeHTML = require('sanitize-html');

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function checkVal($field) {
  var fVal = $field.val().trim();
  if (!fVal.length || fVal == "<p>&nbsp;</p>" || fVal == "&nbsp;" || fVal == "<p><br /></p>") {
    $field.val('');
  }

  // replace double quotes with single quotes to avoid invalid json
  //fVal = fVal.replace(/\\([\s\S])|(")/g, "'");

  //decode text the medium editor encodes, or  the medium editor will remove it the second time
  fVal = decodeHtml(fVal);

  fVal = sanitizeHTML(fVal, {
    allowedTags: [ 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'u', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote', 'span' ],
    allowedAttributes: {
      'a': [ 'href', 'title', 'alt' ],
      'img': [ 'src', 'style']
    },
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'ob' ]
  });
  
  $field.val(fVal);

  if (!$field[0].checkValidity()) {
    $field.parent().addClass('invalid');
  } else {
    $field.parent().removeClass('invalid');
  }
}

module.exports = {
  checkVal: checkVal
};
