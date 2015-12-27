var $ = require('jquery');

module.exports = function(view) {
  "use strict";
    /* number spinners must be in the same container as the number input they affect */
  console.log("set spinner");

  var setNumber = function(targetInput, step, min, curVal){
    console.log(curVal + step);
    if(curVal + step >= min) {
      targetInput.val(curVal + step);
    }
  }

  view.off('click.numSpinnerUp').on('click.numSpinnerUp', ".numberSpinnerUp", function(){
    var targetInput = $(this).siblings('input');
    var step = Number(targetInput.attr("step"));
    var min = Number(targetInput.attr("min"));
    var curVal = Number(targetInput.val());

    setNumber(targetInput, step, min, curVal);
  });

  view.off('click.numSpinnerDown').on('click.numSpinnerDown', ".numberSpinnerDown", function(){
    var targetInput = $(this).siblings('input');
    var step = Number(targetInput.attr("step")) * -1;
    var min = Number(targetInput.attr("min"));
    var curVal = Number(targetInput.val());

    console.log("down "+step);

    setNumber(targetInput, step, min, curVal);
  });
};

