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

  fVal = sanitizeHTML(fVal, {
    allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u','ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote' ],
    //allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p','u','ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'blockquote' ],
    allowedAttributes: [],
    exclusiveFilter: function(frame) {
      return frame.tag === 'p' && !frame.text.trim();
    }
  });

  console.log(fVal)

  //decode text the medium editor encodes, or  the medium editor will remove it the second time
  fVal = decodeHtml(fVal);

  console.log(fVal)

  
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
