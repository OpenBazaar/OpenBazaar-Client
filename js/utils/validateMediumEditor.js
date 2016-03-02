function checkVal($field) {
  var fVal = $($field.val()).text().trim();
    $field.val('');
  }

  if (!$field[0].checkValidity()) {
    $field.parent().addClass('invalid');
  } else {
    $field.parent().removeClass('invalid');
  }
}

module.exports = {
  checkVal: checkVal
};
