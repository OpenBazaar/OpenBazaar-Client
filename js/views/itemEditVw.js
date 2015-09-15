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
    'click #shippingFreeTrue': 'disableShipping',
    'click #shippingFreeFalse': 'enableShipping',
    'change .js-itemImageUpload': 'uploadImage',
    'dragenter .js-dropImage': 'dropImageEnter',
    'dragover .js-dropImage': 'dropImageOver',
    'dragend .js-dropImage': 'dropImageEnd',
    'dragleave .js-dropImage': 'dropImageEnd',
    'drop .js-dropImage': 'dropImageDrop'
  },

  initialize: function(){
    var self=this;
    var hashArray = this.model.get('vendor_offer').listing.item.image_hashes;
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
      //activate tags plugin
      self.inputKeyword = new Taggle('inputKeyword');
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
    this.$el.find('#selectCondition').val(this.model.get('vendor_offer').listing.item.condition);
    this.$el.find('input[name=nsfw]').val(String(this.model.get('vendor_offer').listing.item.nsfw));
    this.$el.find('input[name=free_shipping]').val(String(this.model.get('vendor_offer').listing.shipping.free));
    //add all countries to the Ships To select list
    var countries = new countriesModel();
    var countryList = countries.get('countries');
    var shipsTo = this.$el.find('#shipsTo');
    __.each(countryList, function(country){
      shipsTo.append('<option value="'+country.dataName+'">'+country.name+'</option>');
    });
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

  disableShipping: function(){
    this.$el.find('.js-shippingPriceRow').addClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc').prop('disabled', true);
  },

  enableShipping: function(){
    this.$el.find('.js-shippingPriceRow').removeClass('hide');
    this.$el.find('#shippingPriceLocalLocal, #shippingPriceLocalBtc, #shippingPriceInternationalLocal, #shippingPriceInternationalBtc').prop('disabled', false);
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
    var cCode = this.model.get('user').currencyCode;
    this.$el.find('#inputCurrencyCode').val(cCode);
    this.$el.find('#inputShippingCurrencyCode').val(cCode);
    this.$el.find('#inputShippingOrigin').val(this.model.get('user').country);
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
    this.$el.find('#realInputKeywords').val(this.inputKeyword.getTagValues().join(","));

    this.$el.find('#contractForm').submit();
    //trigger the store tab in the parent view
    $('.js-cancelItem').trigger();
  }
});