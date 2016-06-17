'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    app = require('../App').getApp();


module.exports = function(form, modelJSON, endPoint, onSucceed, onFail, addData, skipKeys, onInvalid) {
  // TODO: obtain optional arguments via an options object with it being the last argument. This would
  // prevent the user having to put a bunch of nulls if they only want to pass in one of the last
  // optional args.
  
  /* form[optional]: the form to pull data from, as a jQuery object
     modelJSON[optional]: model data in JSON format, any data not overwritten by the form will be added to the formData
     endPoint: the API endpoint, in string format, such as "settings"
     onSucceed[optional]: a function to run on success
     onFail[optional]: a function to run on failure
     addData[optional]: insert this data into the formData object, must be an object
     skipKeys[optional]: keys to skip, and not send to the server
   */
  var formData,
      formKeys = [],
      tempDisabledFields = [];

  skipKeys = skipKeys || [];

  if (form){
    form.addClass('formChecked');
    if (!form[0].checkValidity()){
      if (typeof onInvalid === 'function'){
        onInvalid();
      } else {
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.saveError'),
          message: window.polyglot.t('errorMessages.missingError')
        });
      }
      return $.Deferred().reject('failed form validation').promise();
    }

    /*
    //temporarily disable any blank fields so they aren't picked up by the serializeArray
    form.find(":input:not(:disabled)").each(function(){
      if($(this).val() == "") {
        $(this).attr('disabled', true);
        tempDisabledFields.push($(this).attr('name'));
      }
    });
    */

    //temporarily disable any form fields overriden by manual data so they aren't double submitted
    __.each(addData, function(value, key) {
      var disInp = form.find('input[name="'+key+'"]');
      disInp.attr('disabled', true);
      tempDisabledFields.push(disInp.attr('name'));
    });

    __.each(form.serializeArray(), function (value) {
      formKeys.push(value.name);
    });
  }

  //after disabling blank fields, populate the formData
  formData = new FormData((form && form[0]) || "");

  //add manual data not in the form
  __.each(addData, function(value, key){
    formKeys.push(key);
    if (value.constructor === Array){
      __.each(value, function(val){
        formData.append(key, val);
      });
      if (value.length == 0){
        formData.append(key, "");
      }
    } else {
      formData.append(key, value);
    }
  });

  //if key is not in formKeys, get value from the model
  if (modelJSON){
    __.each(modelJSON, function (value, key) {
      if (formKeys.indexOf(key) == -1 && skipKeys.indexOf(key) == -1){
        if (value && value.constructor === Array && key != "shipping_addresses" && key != "moderators"){
          __.each(value, function (val) {
            formData.append(key, val);
          });
          if (value.length == 0){
            formData.append(key, "");
          }
        } else if (key == "shipping_addresses") {
          __.each(value, function(val) {
            formData.append(key, JSON.stringify(val));
          });
          if (value.length == 0) {
            formData.append(key, "");
          }
        } else if (key == "moderators") {
          __.each(value, function(val){
            formData.append(key, val.guid);
          });
          //insert blank if there are no moderators
          if (value.length == 0){
            formData.append(key, "");
          }
        } else {
          formData.append(key, value);
        }
      }
    });
  }

  return $.ajax({
    type: "POST",
    url: endPoint,
    contentType: false,
    processData: false,
    data: formData,
    dataType: "json",
    success: function(data) {
      if (data.success === true){
        typeof onSucceed === 'function' && onSucceed(data);
      } else if (data.success === false){
        if (onFail){
          onFail(data);
        } else {
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.saveError'),
            message: "<i>" + data.reason + "</i>"
          });
        }
      } else {
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.saveError'),
          message: "<i>" + window.polyglot.t('errorMessages.serverError') + "</i>"
        });
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
        form.find('input[name="'+element+'"]').attr('disabled', false);
      });
    }
  });
};