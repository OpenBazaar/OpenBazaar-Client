var $ = require('jquery');

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function shadeColor2(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

module.exports = function(primaryColor, secondaryColor, backgroundColor, textColor) {
  "use strict";
  var opaque = hexToRgb(backgroundColor);
  var customStyleTag = document.getElementById('customStyle') || document.createElement('style');
  customStyleTag.setAttribute('id', 'customStyle');

  // if text is white the highlight color needs to darken instead of lighten
  if (textColor == 'undefined' || textColor == "#ffffff"){
    customStyleTag.innerHTML = "#ov1 #userPage .txtField:focus, " +
        "#ov1 #userPage .fieldItem:focus, " +
        "#ov1 #userPage .fieldItem-textarea:focus { outline: 1px solid " + shadeColor2("#ffffff", -0.5) + " ;}";
  }else{
    customStyleTag.innerHTML = "#ov1 #userPage .txtField:focus, " +
        "#ov1 #userPage .fieldItem:focus, " +
        "#ov1 #userPage .fieldItem-textarea:focus { outline: 1px solid " + shadeColor2(textColor, 0.5) + " ;}";
  }

  customStyleTag.innerHTML +=
      "#ov1 #userPage .custCol-background { background-color: " + backgroundColor + ";}" +
      "#ov1 #userPage .custCol-primary-light { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1);  background-color: " + shadeColor2(primaryColor, 0.05) + ";}" +
      "#ov1 #userPage .custCol-primary, #ov1 #userPage .chosen-drop, #ov1 #userPage .no-results { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + primaryColor + ";}" +
      "#ov1 #userPage .btn-tab.active { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + primaryColor + ";}" +
      "#ov1 #userPage .btn:active { -webkit-box-shadow: inset 0px 0px 6px 0px " + shadeColor2(primaryColor, -0.35) +  ";}" +
      "#ov1 #userPage .btn-tab:active { -webkit-box-shadow: none;}" +
      "#ov1 #userPage .custCol-secondary { transition: background-color .3s cubic-bezier(0, 0, 0.0, 1); background-color: " + secondaryColor + ";}" +
      "#ov1 #userPage .custCol-border { border-color: " + shadeColor2(primaryColor, 0.1) + ";}" +
      "#ov1 #userPage .custCol-border-secondary { border-color: " + secondaryColor + ";}" +
      "#ov1 #userPage .custCol-border-primary { border-color: " + primaryColor + ";}" +
      "#ov1 #userPage .radioLabel:before { border-color: " + textColor + ";}" +
      "#ov1 #userPage .checkboxLabel:before { border-color: " + textColor + "; opacity: .75;}" +
      "#ov1 #userPage .user-page-header-slim { background: " + shadeColor2(primaryColor, -0.15) + ";}" +
      "#ov1 #userPage .mainSearchWrapper .txtField:focus { box-shadow: 0 0 0 2px " + shadeColor2(primaryColor, -0.35) + ";}" +
      "#ov1 #userPage .fieldItem { color: " + textColor + ";}" +
      "#ov1 #userPage .fieldItem-textarea { color: " + textColor + ";}" +
      "#ov1 #userPage input[type='radio'].fieldItem:checked + label:before { background: " + textColor + "; box-shadow: inset 0 0 0 4px " + primaryColor + ";}" +
      "#ov1 #userPage input[type='checkbox'].fieldItem:checked + label:before { background: " + textColor + "; box-shadow: inset 0 0 0 3px " + primaryColor + ";}" +
      "#ov1 #userPage input[type='number'].fieldItem { color: " + textColor + ";}" +
      "#ov1 #userPage input[type='number'].spinButtons::-webkit-inner-spin-button:before { color: " + textColor + ";}" +
      "#ov1 #userPage input[type='number'].spinButtons::-webkit-inner-spin-button:after { color: " + textColor + ";}" +
      "#ov1 #userPage input::-webkit-input-placeholder { color: " + textColor + ";}" +
      "#ov1 #userPage textarea::-webkit-input-placeholder { color: " + textColor + ";}" +
      "#ov1 #userPage .txtFieldWrapper-bar:before { color: " + textColor + ";}" +
      "#ov1 #userPage .container .txtField { color: " + textColor + ";}" +
      "#ov1 #userPage .custCol-font-secondary { color: " + secondaryColor + ";}" +
      "#ov1 #userPage .custCol-text::-webkit-input-placeholder { color: " + textColor + ";}" +
      "#ov1 #userPage .chosen-choices { background-color: " + shadeColor2(primaryColor, 0.04) + "; border: 0; background-image: none; box-shadow: none; padding: 5px 7px}" +
      "#ov1 #userPage .search-choice { background-color: " + secondaryColor + "; background-image: none; border: none; padding: 10px; color: " + textColor + " ; font-size: 13px; box-shadow: none; border-radius: 3px;}" +
      "#ov1 #userPage .custCol-border-background { border-color: " + backgroundColor + " }" +
      "#ov1 #userPage .chosen-results li { border-bottom: solid 1px " + secondaryColor + "}" +
      "#ov1 #userPage .fieldItem .fieldItem-selectWrapper .chosen-single, #ov1 #userPage .fieldItem .fieldItem-selectWrapper .chosen-drop .chosen-results li { color:" + textColor + " }" +
      "#ov1 #userPage .fieldItem .fieldItem-selectWrapper .chosen-drop .chosen-results li.highlighted { background:" + secondaryColor + " }" +
      "#ov1 #userPage .custCol-primary-darken { background: " + shadeColor2(primaryColor, -0.35) + ";}" +
      "#ov1 #userPage .custCol-text, #ov1 #userPage .search-field input { color: " + textColor + ";}" +
      "#ov1 #userPage .modal-opaque { background-color: rgba(" + opaque.r + ", " + opaque.g + ", " + opaque.b + ", 0.85);}" +
      "#ov1 #userPage .fieldItem:focus , #ov1 #userPage .fieldItem-textarea:focus { border: 2px solid " + shadeColor2(primaryColor, 0.15) + ";}" +
      "#ov1 #userPage #obContainer::-webkit-scrollbar-thumb { background: " + shadeColor2(backgroundColor, 0.25) + ";}" +
      "#ov1 #userPage #overlay { background-color: rgba(" + opaque.r + ", " + opaque.g + ", " + opaque.b + ", 0.65);}";
      
    // colorbox stuffs
    customStyleTag.innerHTML +=
      "#ov1 #userPage #cboxContent { background-color: " + primaryColor + "; color: " + textColor + ";}" +
      "#ov1 #userPage #cboxCurrent { color: " + textColor + ";}" +
      "#ov1 #userPage #cboxClose { background-color: " + secondaryColor + "; color: " + textColor + "}" +
      "#ov1 #userPage #cboxOverlay { background-color: rgba(" + opaque.r + ", " + opaque.g + ", " + opaque.b + ", 1);}";

  document.body.appendChild(customStyleTag);
};
