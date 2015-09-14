var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    getBTPrice = require('../utils/getBitcoinPrice'),
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
    'drop .js-dropImage': 'dropImageDrop'
  },

  initialize: function(){
    var self=this;
    var hashArray = this.model.get('vendor_offer').listing.item.image_hashes;
    this.combinedImagesArray = [];
    __.each(hashArray, function(hash){
      self.combinedImagesArray.push(self.model.get('server')+"get_image?hash="+hash);
    });
    console.log(this.combinedImagesArray);
    //add images hashes to the images model
    this.model.set('combinedImagesArray', this.combinedImagesArray);
    //add empty images array for new imges
    this.model.set({'uploadedImages': []});
    this.render();
    this.listenTo('this.model:displayPrice', 'change', this.updatePrice);
    this.listenTo('this.model:venderBTCPrice', 'change', this.updatePrice);
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setFormValues();
      //activate tags plugin
      self.inputKeyword = new Taggle('inputKeyword');
    });
    return this;
  },

  setFormValues: function(){
    this.$el.find('#selectCondition').val(this.model.get('vendor_offer').listing.item.condition);
    this.$el.find('#selectNSFW').val(String(this.model.get('vendor_offer').listing.item.nsfw));
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
    console.log(imageArray);
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
  },

  dropImageDrop: function(e){
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    //handleFiles(files);
  },

  updateImages: function(){
    var self = this;
    var subImageDivs = this.$el.find('.js-editItemSubImage');
    console.log("subImageDivs "+ subImageDivs);
    var imageArray = this.model.get("combinedImagesArray");
    __.each(imageArray, function(imageURL, i){
      if(i === 0){
        self.$el.find('.js-editItemMainImage').css('background-image', 'url(' + imageURL + ')');
      }else{
        if(i < subImageDivs.length) {
          $(subImageDivs[i]).css('background-image', 'url(' + imageURL + ')');
        }else{
          $('<div class="itemImg itemImg-small js-dropImage js-editItemSubImage" style="background-image: url('+imageURL+');"></div>')
              .insertBefore(self.$el.find('.js-editItemSubImagesWrapper .js-editItemEmptyImage'));
        }
      }
    });
  },

  saveChanges: function(){
    console.log("save changes");
    console.log(this.inputKeyword.getTags());
    //just use normal ajax here
  }
});