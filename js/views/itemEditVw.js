var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    taggle = require('taggle');


module.exports = Backbone.View.extend({

  events: {
    'click .js-priceBtn-local': 'priceToLocal',
    'click .js-priceBtn-btc': 'priceToBTC',
    'click #shippingFreeTrue': 'setFreeShipping',
    'click #shippingFreeFalse': 'unsetFreeShipping',
    'change .js-itemImageUpload': 'uploadImage',
    'dragenter .js-dropImage': 'dropImageEnter',
    'dragover .js-dropImage': 'dropImageOver',
    'dragend .js-dropImage': 'dropImageEnd',
    'dragleave .js-dropImage': 'dropImageEnd',
    'drop .js-dropImage': 'dropImageDrop',
    'change #inputType': 'changeType'
  },

  initialize: function(){
    var self=this;
    var hashArray = this.model.get('vendor_offer__listing__item__image_hashes');
    this.combinedImagesArray = [];
    __.each(hashArray, function(hash){
      self.combinedImagesArray.push(self.model.get('server')+"get_image?hash="+hash);
    });
    //add images hashes to the images model
    this.model.set('combinedImagesArray', this.combinedImagesArray);
    //add empty images array for new imges
    this.model.set({'uploadedImages': []});
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

  setFormValues: function(){
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
      inputParent.find('.js-priceBtc').val(inputParent.find('.js-priceLocal').val() / window.currentBitcoin);
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
    if(typeValue === "physical good") {
      this.enableShipping();
    } else {
      this.disableShipping();
    }
  },

  uploadImage: function(e){
    var self = this;
    var newFiles = $(e.target)[0].files;
    var imageArray = __.clone(this.model.get("combinedImagesArray"));
    __.each(newFiles, function(newFile){
      var fileURL = URL.createObjectURL(newFile);
      imageArray.push(fileURL);
    });
    this.model.set("combinedImagesArray", imageArray);
    this.updateImages();
  },

  dropImageEnter: function(e){
    e.stopPropagation();
    e.preventDefault();
  },

  dropImageOver: function(e){
    e.stopPropagation();
    e.preventDefault();
    $(e.target).closest('.js-dropImage').find('.itemImg').addClass('box-Dashed');
  },

  dropImageEnd: function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.js-dropImage').find('.itemImg').removeClass('box-Dashed');
  },

  dropImageDrop: function(e){
    var self = this;
    e.stopPropagation();
    e.preventDefault();
    var dt = e.originalEvent.dataTransfer;
    var newFiles = dt.files;
    var imageArray = __.clone(this.model.get("combinedImagesArray"));
    __.each(newFiles, function(newFile){
      var fileURL = URL.createObjectURL(newFile);
      imageArray.push(fileURL);
    });
    this.model.set("combinedImagesArray", imageArray);
    this.updateImages();
    $('.js-dropImage').find('.itemImg').removeClass('box-Dashed');
  },

  updateImages: function(){
    var self = this;
    var subImageDivs = this.$el.find('.js-editItemSubImage');
    var imageArray = this.model.get("combinedImagesArray");
    __.each(imageArray, function(imageURL, i){
      if(i === 0){
        self.$el.find('.js-editItemMainImage').css('background-image', 'url(' + imageURL + ')');
      }else{
        if(i <= subImageDivs.length) {
          $(subImageDivs[i-1]).css('background-image', 'url(' + imageURL + ')');
        }else{
          $('<div class="itemImg itemImg-small js-dropImage js-editItemSubImage" style="background-image: url('+imageURL+');"></div>')
              .insertBefore(self.$el.find('.js-editItemSubImagesWrapper .js-editItemEmptyImage'));
        }
      }
    });
  },

  saveChanges: function(){
    var self = this;
    var cCode = this.model.get('userCurrencyCode');
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

    $.ajax({
      type: "POST",
      url: self.model.get('server') + "contracts",
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        data = JSON.parse(data);
        if(self.model.get('id') && data.success === true){
          deleteThisItem();
          self.trigger('saveDone');
          console.log('saveDone');
        } else if(data.success === false){
            var errorModal = $('.js-messageModal');
            errorModal.removeClass('hide');
            errorModal.find('.js-messageModal-title').text("Changes Could Not Be Saved");
            errorModal.find('.js-messageModal-message').html("Saving has failed due to the following error: <br/><br/><i>" + data.reason + "</i>");
        } else {
          self.trigger('saveDone');
          console.log('saveDone');
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });

    var deleteThisItem = function(){
      $.ajax({
        type: "DELETE",
        url: self.model.get('server') + "contracts",
        data: {"id": self.model.get('id')},
        success: function() {
          alert("deleted old item");
        },
        error: function(jqXHR, status, errorThrown){
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        }
      });
    };

  }
});