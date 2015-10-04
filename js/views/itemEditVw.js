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
    'click .js-priceBtn-local': 'priceToLocal',
    'click .js-priceBtn-btc': 'priceToBTC',
    'click #shippingFreeTrue': 'setFreeShipping',
    'click #shippingFreeFalse': 'unsetFreeShipping',
    'change .js-itemImageUpload': 'uploadImage',
    'change #inputType': 'changeType',
    'click .js-editItemDeleteImage': 'deleteImage'
  },

  initialize: function(){
    var self=this;
    var hashArray = this.model.get('vendor_offer__listing__item__image_hashes');
    this.combinedImagesArray = [];
    __.each(hashArray, function(hash){
      self.combinedImagesArray.push(self.model.get('server')+"get_image?hash="+hash);
    });
    //add images urls to the combinedImagesArray for rendering
    this.model.set('combinedImagesArray', this.combinedImagesArray);

    //add existing hashes to the list to be uploaded on save
    var anotherHashArray = __.clone(self.model.get("vendor_offer__listing__item__image_hashes"));
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
    var typeValue = String(this.model.get('vendor_offer__listing__metadata__category')) || "physical good";
    this.$el.find('input[name=nsfw]').val(String(this.model.get('vendor_offer__listing__item__nsfw')));
    this.$el.find('input[name=free_shipping]').val(String(this.model.get('vendor_offer__listing__shipping__free')));
    this.$el.find('#inputType').val(typeValue);
    //hide or unhide shipping based on product type
    if(typeValue === "physical good") {
      this.enableShipping();
    } else {
      this.disableShipping();
    }
    //add all countries to the Ships To select list
    var countries = new countriesModel();
    var countryList = countries.get('countries');
    var shipsTo = this.$el.find('#shipsTo');
    __.each(countryList, function(country, i){
      shipsTo.append('<option value="'+country.dataName+'">'+country.name+'</option>');
    });

    var shipsToValue = this.model.get('vendor_offer__listing__shipping__shipping_regions');
    //if shipsToValue is empty, set it to the user's country
    shipsToValue = shipsToValue.length > 0 ? shipsToValue : this.model.get('userCountry');
    shipsTo.val(shipsToValue);


    //activate tags plugin
    this.inputKeyword = new Taggle('inputKeyword');
    $('#inputType').chosen();
  },

  priceToLocal: function(e){
    var parentRow = $(e.target).closest('.js-inputParent');
    parentRow.find('.js-priceLocal').removeClass('hide');
    parentRow.find('.js-priceBtc').addClass('hide');
    $(e.target).removeClass('inactive');
    parentRow.find('.js-priceBtn-btc').addClass('inactive');
    this.updatePrice('local', parentRow);
  },

  priceToBTC: function(e){
    var parentRow = $(e.target).closest('.js-inputParent');
    parentRow.find('.js-priceLocal').addClass('hide');
    parentRow.find('.js-priceBtc').removeClass('hide');
    parentRow.find('.js-priceBtn-local').addClass('inactive');
    $(e.target).removeClass('inactive');
    this.updatePrice('btc', parentRow);
  },

  updatePrice: function(priceType, inputParent){
    if(priceType === "local"){
      inputParent.find('.js-priceLocal').val(inputParent.find('.js-priceBtc').val() * window.currentBitcoin);
    }else{
      inputParent.find('.js-priceBtc').val(inputParent.find('.js-priceLocal').val() / window.currentBitcoin);  //TOOD: Eliminate division because of floating point math
    }
  },

  setFreeShipping: function(){
    this.$el.find('.js-shippingPriceRow').addClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc')
        .prop({disabled: true, require: false});
  },

  unsetFreeShipping: function(){
    this.$el.find('.js-shippingPriceRow').removeClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc')
        .prop({disabled: false, require: true});
  },

  disableShipping: function(){
    this.$el.find('.js-shippingRow').addClass('hide');
    this.$el.find('.js-shippingRow input')
        .prop({disabled: true, require: false});
    this.setFreeShipping();
  },

  enableShipping: function() {
    this.$el.find('.js-shippingRow').removeClass('hide');
    this.$el.find('.js-shippingRow input')
        .prop({disabled: false, require: true});
    this.unsetFreeShipping();
  },

  changeType: function(e) {
    var typeValue = $(e.target).val();
    if(typeValue === "physical good") { //TODO: remove magic text, make constant or lookup
      this.enableShipping();
    } else {
      this.disableShipping();
    }
  },

  uploadImage: function(e){
    var self = this;

    var formData = new FormData(this.$el.find('#imageForm')[0]);
    $.ajax({
      type: "POST",
      url: self.model.get('server') + "upload_image",
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) { //TODO: Have JQuery parse the JSON directly in ajax call
        var errorModal,
            hashArray,
            imageArray;
        data = JSON.parse(data);

        if (data.success === true){
          imageArray = __.clone(self.model.get("combinedImagesArray"));
          hashArray = __.clone(self.model.get("imageHashesToUpload"));
          __.each(data.image_hashes, function (hash) {
            imageArray.push(self.model.get('server') + "get_image?hash=" + hash); //TODO: Change to more formal URL reference from config file
            hashArray.push(hash);
          });
          self.model.set("combinedImagesArray", imageArray);
          self.model.set("imageHashesToUpload", hashArray);

          self.updateImages();
        }else if (data.success === false){
          errorModal = $('.js-messageModal');
          errorModal.removeClass('hide');
          errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
          //TODO: Change from .html() to .text() for higher security to prevent content injection attacks
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
    var self = this;
    var subImageDivs = this.$el.find('.js-editItemSubImage');
    var imageArray = this.model.get("combinedImagesArray");
    //remove extra subImage divs
    subImageDivs.slice(imageArray.length-1).remove();

    if(imageArray.length > 0){
      __.each(imageArray, function (imageURL, i) {
        if (i === 0){
          self.$el.find('.js-editItemMainImage').css('background-image', 'url(' + imageURL + ')').removeClass('box-border').attr("data-index", "0")
          .find('.js-editItemDeleteImage').removeClass('hide');
        }else{
          if (i <= subImageDivs.length){
            $(subImageDivs[i - 1]).css('background-image', 'url(' + imageURL + ')');
          }else{
            $('<div class="itemImg itemImg-small js-editItemSubImage" style="background-image: url(' + imageURL + ');" data-index="' + i + '"><div class="btn btn-cornerTR btn-cornerTRSmall btn-flushTop btn-c1 fade btn-shadow1 js-editItemDeleteImage"><i class="ion-close-round icon-centered icon-small"></i></div></div>')
                .insertBefore(self.$el.find('.js-editItemSubImagesWrapper .js-editItemEmptyImage'));
          }
        }
      });
    } else {
      //if there are no images, reset the main image area
      self.$el.find('.js-editItemMainImage').css('background-image', 'none').addClass('box-border').find('.js-editItemDeleteImage').addClass('hide');
    }
  },

  deleteImage: function(e) {
    var imageUploadArray, imgIndex = $(e.target).closest('.itemImg').data('index');
    var imageArray = __.clone(this.model.get("combinedImagesArray"));

    imageArray.splice(imgIndex, 1);
    this.model.set("combinedImagesArray", imageArray);
    imageUploadArray = __.clone(this.model.get("imageHashesToUpload"));
    imageUploadArray.splice(imgIndex, 1);
    this.model.set("imageHashesToUpload", imageUploadArray);
    this.updateImages();
  },

  saveChanges: function(){
    var errorModal, self = this, cCode = this.model.get('userCurrencyCode');
    var deleteThisItem = function(newHash){
      $.ajax({
          type: "DELETE",
          url: self.model.get('server') + "contracts?id="+self.model.get('id'), //TODO: Change to send data in POST to be safe, http://restcookbook.com/HTTP%20Methods/idempotency/
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
    if(cCode === "BTC"){
      this.$el.find('#inputPrice').val(this.$el.find('.js-priceBtc').val());
      this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalBtc').val());
      this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalBtc').val());
    }else{
      this.$el.find('#inputPrice').val(this.$el.find('.js-priceLocal').val());
      this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalLocal').val());
      this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalLocal').val());
    }

    var formData = new FormData(this.$el.find('#contractForm')[0]);
    //formData.append('images', this.model.get('imageHashesToUpload'));
    __.each(this.model.get('imageHashesToUpload'), function(imHash){
      formData.append('images', imHash);
    });

    //if this is an existing product, do not delete the images
    if (self.model.get('id')) {
      formData.append('delete_images', false);
    }

    if(document.getElementById('contractForm').checkValidity()){
      $.ajax({
        type: "POST",
        url: self.model.get('server') + "contracts",
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
      errorModal = $('.js-messageModal');
      errorModal.removeClass('hide');
      errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
      errorModal.find('.js-messageModal-message').html("Saving has failed due to the following error: <br/><br/><i>Some required fields are missing or invalid.</i>");
    }
  }
});