var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    taggle = require('taggle'),
    chosen = require('../utils/chosen.jquery.min.js');

module.exports = Backbone.View.extend({

  events: {
    //'click .js-priceBtn-local': 'priceToLocal',
    //'click .js-priceBtn-btc': 'priceToBTC',
    'click #shippingFreeTrue': 'disableShippingPrice',
    'click #shippingFreeFalse': 'enableShippingPrice',
    'change .js-itemImageUpload': 'uploadImage',
    'change #inputType': 'changeType',
    'click .js-editItemDeleteImage': 'deleteImage',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput'
  },

  initialize: function(){
    var self=this;
    var hashArray = this.model.get('vendor_offer').listing.item.image_hashes;
    this.combinedImagesArray = [];
    __.each(hashArray, function(hash){
      self.combinedImagesArray.push(self.model.get('server_url')+"get_image?hash="+hash);
    });
    //add images urls to the combinedImagesArray for rendering
    this.model.set('combinedImagesArray', this.combinedImagesArray);

    //add existing hashes to the list to be uploaded on save
    var anotherHashArray = __.clone(self.model.get("vendor_offer").listing.item.image_hashes);
    self.model.set("imageHashesToUpload", anotherHashArray);

    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setFormValues();

      // prevent the body from picking up drag actions
      //TODO: make these nice backbone events
      $(document.body).bind("dragover", function(e) {
        e.preventDefault();
        return false;
      });

      $(document.body).bind("drop", function(e){
        e.preventDefault();
        return false;
      });
    });
    return this;
  },

  setFormValues: function(){ //TODO: Refactor to a generic enumeration pattern
    var typeValue = String(this.model.get('vendor_offer').listing.metadata.category) || "physical good";
    this.$el.find('input[name=nsfw]').val([String(this.model.get('vendor_offer').listing.item.nsfw)]);
    this.$el.find('input[name=free_shipping]').val([String(this.model.get('vendor_offer').listing.shipping.free)]);
    this.$el.find('#inputType').val(typeValue);
    //hide or unhide shipping based on product type
    if(typeValue === "physical good") {
      this.enableShipping();
    } else {
      this.disableShipping();
    }
    //hide or unhide shipping based on free shipping
    if(this.model.get('vendor_offer').listing.shipping.free == true){
      this.disableShippingPrice();
    } else {
      this.enableShippingPrice();
    }
    //if item has a condition, set it
    if(this.model.get('vendor_offer').listing.item.condition){
      this.$el.find('#inputCondition').val(String(this.model.get('vendor_offer').listing.item.condition));
    }
    //add all countries to the Ships To select list
    var countries = new countriesModel();
    var countryList = countries.get('countries');
    var shipsTo = this.$el.find('#shipsTo');
    __.each(countryList, function(countryFromList, i){
      shipsTo.append('<option value="'+countryFromList.dataName+'">'+countryFromList.name+'</option>');
    });

    var shipsToValue = this.model.get('vendor_offer').listing.shipping.shipping_regions;
    //if shipsToValue is empty, set it to the user's country
    shipsToValue = shipsToValue.length > 0 ? shipsToValue : this.model.get('userCountry');
    shipsTo.val(shipsToValue);

    //activate tags plugin
    this.inputKeyword = new Taggle('inputKeyword');

    //set chosen inputs
    $('.chosen').chosen();

    //focus main input
    this.$el.find('input[name=title]').focus();
    $('#obContainer').animate({ scrollTop: "375px" });
  },

  disableShippingPrice: function(){
    this.$el.find('.js-shippingPriceRow').addClass('visuallyHidden');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceInternationalLocal')
        .prop({disabled: true, require: false});
    //if prices are disabled, force free_shipping to be free
    this.$el.find('input[name=free_shipping]').val(["true"]);
  },

  enableShippingPrice: function(){
    this.$el.find('.js-shippingPriceRow').removeClass('visuallyHidden');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceInternationalLocal')
        .prop({disabled: false, require: true});
  },

  disableShipping: function(){
    this.$el.find('.js-shippingRow, .js-shippingRowFree').addClass('visuallyHidden');
    this.$el.find('.js-shippingRow input')
        .prop({disabled: true, require: false});
  },

  enableShipping: function() {
    this.$el.find('.js-shippingRow, .js-shippingRowFree').removeClass('visuallyHidden');
    this.$el.find('.js-shippingRow input')
        .prop({disabled: false, require: true});
    //if chosen selector started hidden, it will be too narrow
    $('.js-shippingRow .chosen-container').css({width: '100%'});
  },

  changeType: function(e) {
    var newTyleValue = $(e.target).val();
    if(newTyleValue === "physical good") {
      this.enableShipping();
      //only show shipping prices if free shipping is not true
      if(this.$el.find('input[name=free_shipping]').val() == "false") {
        this.enableShippingPrice();
      }
    } else {
      this.disableShipping();
      this.disableShippingPrice();
    }
  },

  uploadImage: function(e){
    var self = this;

    var formData = new FormData(this.$el.find('#imageForm')[0]);
    $.ajax({
      type: "POST",
      url: self.model.get('server_url') + "upload_image",
      contentType: false,
      processData: false,
      dataType: "json",
      data: formData,
      success: function(data) {
        var errorModal,
            hashArray,
            imageArray;

        if (data.success === true){
          imageArray = __.clone(self.model.get("combinedImagesArray"));
          hashArray = __.clone(self.model.get("imageHashesToUpload"));
          __.each(data.image_hashes, function (hash) {
            imageArray.push(self.model.get('server_url') + "get_image?hash=" + hash);
            hashArray.push(hash);
          });
          self.model.set("combinedImagesArray", imageArray);
          self.model.set("imageHashesToUpload", hashArray);

          self.updateImages();
        }else if (data.success === false){
          errorModal = $('.js-messageModal');
          errorModal.removeClass('hide');
          errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
          errorModal.find('.js-messageModal-message').html("Uploading image(s) has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  updateImages: function(){
    //TODO: this would be better as a sub-view with it's own render
    var self = this,
        subImageDivs = this.$el.find('.js-editItemSubImage'),
        imageArray = this.model.get("combinedImagesArray"),
        uploadMsg = this.$el.find('.js-itemEditLoadPhotoMessage');

    //remove extra subImage divs
    subImageDivs.slice(imageArray.length).remove();

    if(imageArray.length > 0){
      __.each(imageArray, function (imageURL, i) {
        if (i < subImageDivs.length){
          $(subImageDivs[i]).css('background-image', 'url(' + imageURL + ')');
        }else{
          $('<div class="itemImg itemImg-small js-editItemSubImage" style="background-image: url(' + imageURL + ');" data-index="' + i + '"><div class="btn btn-cornerTR btn-cornerTRSmall btn-flushTop btn-c1 fade btn-shadow1 js-editItemDeleteImage"><i class="ion-close-round icon-centered icon-small"></i></div></div>')
              .appendTo(self.$el.find('.js-editItemSubImagesWrapper'));
        }
      });
      uploadMsg.addClass('hide');
    } else {
      uploadMsg.removeClass('hide');
    }
  },

  deleteImage: function(e) {
    var imageUploadArray,
        imgIndex = $(e.target).closest('.itemImg').data('index'),
        imageArray = __.clone(this.model.get("combinedImagesArray"));

    imageArray.splice(imgIndex, 1);
    this.model.set("combinedImagesArray", imageArray);
    imageUploadArray = __.clone(this.model.get("imageHashesToUpload"));
    imageUploadArray.splice(imgIndex, 1);
    this.model.set("imageHashesToUpload", imageUploadArray);
    this.updateImages();
  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  saveChanges: function(){
    var errorModal,
        self = this,
        formData,
        deleteThisItem,
        cCode = this.model.get('userCurrencyCode'),
        submitForm = this.$el.find('#contractForm')[0];

    deleteThisItem = function(newHash){
      $.ajax({
          type: "DELETE",
          url: self.model.get('server_url') + "contracts?id="+self.model.get('id'), //TODO: Change to send data in POST to be safe, http://restcookbook.com/HTTP%20Methods/idempotency/
          success: function() {
              self.trigger('deleteOldDone', newHash);
          },
          error: function(jqXHR, status, errorThrown){
              console.log(jqXHR);
              console.log(status);
              console.log(errorThrown);
          }
      });
    };
    this.$el.find('#inputCurrencyCode').val(cCode);
    this.$el.find('#inputShippingCurrencyCode').val(cCode);
    this.$el.find('#inputShippingOrigin').val(this.model.get('userCountry'));
    this.$el.find('#realInputKeywords').val(this.inputKeyword.getTagValues().join(","));
    //convert number field to string field
    this.$el.find('#inputPrice').val(this.$el.find('#priceLocal').val());
    this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalLocal').val());
    this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalLocal').val());
    /*
    if(cCode === "BTC"){
      this.$el.find('#inputPrice').val(this.$el.find('.js-priceBtc').val());
      this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalBtc').val());
      this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalBtc').val());
    }else{
      this.$el.find('#inputPrice').val(this.$el.find('.js-priceLocal').val());
      this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalLocal').val());
      this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalLocal').val());
    }
    */

    formData = new FormData(submitForm);
    __.each(this.model.get('imageHashesToUpload'), function(imHash){
      formData.append('images', imHash);
    });

    //if this is an existing product, do not delete the images
    if (self.model.get('id')) {
      formData.append('delete_images', false);
    }

    //if condition is disabled, insert default value
    if($('#inputCondition:disabled').length > 0){
      formData.append('condition', 'New');
    }

    //add formChecked class to form so invalid fields are styled as invalid
    this.$el.find('#contractForm').addClass('formChecked');

    if(submitForm.checkValidity()){
      $.ajax({
        type: "POST",
        url: self.model.get('server_url') + "contracts",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          var returnedId = self.model.get('id');
          data = JSON.parse(data);
          //if the itemEdit model has an id, it was cloned from an existing item
          //if the id returned is the same, an edit was made with no changes, don't delete it
          if (returnedId && data.success === true && returnedId != data.id){
            deleteThisItem(data.id);
          }else if (data.success === false){
            var errorModal = $('.js-messageModal');
            errorModal.removeClass('hide');
            errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
            errorModal.find('.js-messageModal-message').html("Saving has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
          }else{
            //item is new or unchanged
            self.trigger('saveNewDone');
          }
        },
        error: function (jqXHR, status, errorThrown) {
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    }else{
      var invalidInputList = "";
      $(submitForm).find('input').each(function() {
        if($(this).is(":invalid")){
          invalidInputList += "<br/>"+$(this).attr('id');
        }
      });
      errorModal = $('.js-messageModal');
      errorModal.removeClass('hide');
      errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
      errorModal.find('.js-messageModal-message').html("Saving has failed due to the following error: <br/><br/><i>Some required fields are missing or invalid.<br/><br/>"+invalidInputList+"</i>");
    }
  }
});