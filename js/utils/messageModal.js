'use strict';

var $ = require('jquery'),
    $el;

function showModal(errorTitle, errorMessage) {
  var errorModal = $el || $('.js-messageModal');
  errorModal.removeClass('hide');
  errorModal.find('.js-messageModal-title').html(errorTitle);
  errorModal.find('.js-messageModal-message').html(errorMessage);
}

function hideModal() {
  var errorModal = $el || $('.js-messageModal');
  errorModal.addClass('hide');
}

module.exports = {
  showModal: showModal,
  hideModal: hideModal,
  $el
};
