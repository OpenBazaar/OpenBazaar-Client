'use strict';

var $ = require('jquery');

module.exports = function(view) {
    /* number spinners must be in the same container as the number input they affect */

  var setNumber = function(targetInput, step, min, max, curVal){
    if (curVal + step >= min && curVal + step <= max && !targetInput.prop('disabled')) {
      targetInput.val(curVal + step).trigger('change');
    }
  };

  view.off('click.numSpinnerUp').on('click.numSpinnerUp', ".numberSpinnerUp", function(){
    var targetInput = $(this).siblings('input');
    var step = Number(targetInput.attr("step"));
    var min = Number(targetInput.attr("min"));
    var max = Number(targetInput.attr("max"));
    var curVal = Number(targetInput.val());

    setNumber(targetInput, step, min, max, curVal);
  });

  view.off('click.numSpinnerDown').on('click.numSpinnerDown', ".numberSpinnerDown", function(){
    var targetInput = $(this).siblings('input');
    var step = Number(targetInput.attr("step")) * -1;
    var min = Number(targetInput.attr("min"));
    var max = Number(targetInput.attr("max"));
    var curVal = Number(targetInput.val());

    setNumber(targetInput, step, min, max, curVal);
  });
};

