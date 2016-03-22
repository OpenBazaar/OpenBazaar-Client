var sanitizeHTML = require('sanitize-html');

function checkVal($field) {
  var fVal = $field.val().trim();
  if (!fVal.length || fVal == "<p>&nbsp;</p>" || fVal == "&nbsp;" || fVal == "<p><br /></p>") {
    $field.val('');
  }

  //replace double quotes with single quotes to avoid invalid json
  console.log(fVal)
  fVal = fVal.replace(/\\([\s\S])|(")/g, "'");
  console.log(fVal)

  fVal = sanitizeHTML(fVal, {
    allowedTags: [ 'h2','h3', 'h4', 'h5', 'h6', 'p', 'a','u','ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'img', 'blockquote' ],
    exclusiveFilter: function(frame) {
      return frame.tag === 'p' && !frame.text.trim();
    }
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
