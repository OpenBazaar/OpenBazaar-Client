'use strict';

var $ = require('jquery'),
    $el = $('.js-messageModal');

function showModal(errorTitle, errorMessage) {
  $el.removeClass('hide');
  $el.find('.js-messageModal-title').html(errorTitle);
  $el.find('.js-messageModal-message').html(errorMessage);
}

function hideModal() {
  $el.addClass('hide');
}

module.exports = {
  show: showModal,
  hide: hideModal,
  $el: $el
};
