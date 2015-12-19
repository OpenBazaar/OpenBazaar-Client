var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    showErrorModal = require('../utils/showErrorModal.js');


module.exports = function(form, modelJSON, endPoint, onSucceed, onFail, addData, skipKeys) {
  "use strict";
  var self = this,
      formData = new FormData(form[0] || ""),
      formKeys = [],
      tempDisabledFields = [];

  skipKeys = skipKeys || [];

  if(form){
    form.addClass('formChecked');
    if (!form[0].checkValidity()){
      showErrorModal(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError'));
      return;
    }

    //temporarily disable any blank fields so they aren't picked up by the serializeArray
    form.find(":input:not(:disabled)").each(function(){
      if($(this).val() == "") {
        $(this).attr('disabled', true);
        tempDisabledFields.push($(this).attr('id'));
      }
    });

    __.each(form.serializeArray(), function (value) {
      formKeys.push(value.name);
    });
  }

  //add manual data not in the form
  __.each(addData, function(value, key){
    formKeys.push(key);
    if(value.constructor === Array){
      __.each(value, function(val){
        formData.append(key, val);
      });
      if(value.length == 0){
        formData.append(key, "");
      }
    }else{
      formData.append(key, value);
    }
  });

  //if key is not in formKeys, get value from the model
  if(modelJSON){
    __.each(modelJSON, function (value, key) {
      if (formKeys.indexOf(key) == -1 && skipKeys.indexOf(key) == -1){
        if(value.constructor === Array && key != "shipping_addresses"){
          __.each(value, function (val) {
            formData.append(key, val);
          });
          if (value.length == 0){
            formData.append(key, "");
          }
        } else if(key == "shipping_addresses"){
          __.each(value, function(val){
            formData.append(key, JSON.stringify(val));
          });
          if(value.length == 0){
            formData.append(key, "");
          }
        } else{
          formData.append(key, value);
        }
      }
    });
  }

  $.ajax({
    type: "POST",
    url: endPoint,
    contentType: false,
    processData: false,
    data: formData,
    dataType: "json",
    success: function(data) {
      if (data.success === true){
        onSucceed(data);
      }else if (data.success === false){
        if(onFail){
          onFail(data);
        } else{
          showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
        }
      } else {
        showErrorModal(window.polyglot.t('errorMessages.saveError'), "<i>" + window.polyglot.t('errorMessages.serverError') + "</i>");
      }
    },
    error: function(jqXHR, status, errorThrown){
      console.log(jqXHR);
      console.log(status);
      console.log(errorThrown);
    },
    complete: function(){
      //re-enable any disabled fields
      __.each(tempDisabledFields, function(element){
        form.find('#'+element).attr('disabled', false);
      });
    }
  });
};