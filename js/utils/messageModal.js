'use strict';

var $ = require('jquery'),
    $el = $('.js-messageModal');

function showModal(errorTitle, errorMessage, titleClass, msgClass, onBtn1, onBtn1Msg, onBtn1Class, onBtn2, onBtn2Msg, onBtn2Class) {
  $el.removeClass('hide');
  $el.find('.js-messageModal-title').html(errorTitle);
  $el.find('.js-messageModal-message').html(errorMessage);
  $el.find('.js-messageModalTitleWrapper').addClass(titleClass);
  $el.find('.js-messageModalMsgWrapper').addClass(msgClass);
  if(typeof onBtn1 === "function"){
    if(!onBtn1Msg){
      throw new Error("button text for button 1 must be provided");
      return;
    }
    $el.find('.js-messageModal-btnBar').removeClass('hide');
    $el.find('.js-messageModal-btn1').off().on('click', onBtn1).text(onBtn1Msg).addClass(onBtn1Class);

    //if onBtn2 has a value but onBtn1 doesn't, onBtn2 will be ignored
    if(typeof onBtn2 === "function"){
      if(!onBtn1Msg){
        throw new Error("button text for button 2 must be provided");
        return;
      }
      $el.find('.js-messageModal-btn2').off().on('click', onBtn2).text(onBtn2Msg).addClass(onBtn2Class);
    } else {
      //single button
      $el.find('.js-messageModal-btn1').removeClass('btn-half borderRight').addClass('btn-wide');
    }
  }
}

function hideModal() {
  $el.addClass('hide');
}

module.exports = {
  show: showModal,
  hide: hideModal,
  $el: $el
};
