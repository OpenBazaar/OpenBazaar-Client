var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    Taggle = require('taggle'),
    MediumEditor = require('medium-editor'),
    Sortable = require('sortablejs'),
    messageModal = require('../utils/messageModal'),
    chosen = require('../utils/chosen.jquery.min.js'),
    validateMediumEditor = require('../utils/validateMediumEditor'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  events: {
    'click #shippingFreeTrue': 'disableShippingPrice',
    'click #shippingFreeFalse': 'enableShippingPrice',
    'change .js-itemImageUpload': 'onImageFileChange',
    'dragover .js-photosModule': 'onPhotoDragOver',
    'dragleave .js-photosModule': 'onPhotoDragLeave',    
    'drop .js-photosModule': 'onPhotoDrop',
    'change #inputType': 'changeType',
    'click .js-editItemDeleteImage': 'deleteImage',
    'blur input': 'validateInput',
    'blur textarea': 'validateInput',
    'focus #inputExpirationDate': 'addDefaultTime',
    'click .js-itemEditClearDate': 'clearDate'
  },

  MAX_PHOTOS: 10,

  initialize: function(){
    var self=this,
        hashArray = this.model.get('vendor_offer').listing.item.image_hashes,
        nowDate = new Date(),
        nowMonth = nowDate.getMonth()+ 1;

    function padTime(val){
      "use strict";
      if(val >= 10){
        return val;
      } else {
        return "0" + val;
      }
    }

    this.defaultDate = nowDate.getFullYear() + "-" + padTime(nowMonth) + "-" + padTime(nowDate.getDate()) + "T" + padTime(nowDate.getHours()) + ":" + padTime(nowDate.getMinutes());
    this.combinedImagesArray = [];
    __.each(hashArray, function(hash){
      self.combinedImagesArray.push(self.model.get('serverUrl')+"get_image?hash="+hash);
    });
    //add images urls to the combinedImagesArray for rendering
    this.model.set('combinedImagesArray', this.combinedImagesArray);
    this.inputKeyword;

    //add existing hashes to the list to be uploaded on save
    var anotherHashArray = __.clone(self.model.get("vendor_offer").listing.item.image_hashes);
    self.model.set("imageHashesToUpload", anotherHashArray);
    self.model.set('expTime', self.model.get('vendor_offer').listing.metadata.expiry.replace(" UTC", ""));
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      var context = __.extend({}, self.model.toJSON(), { MAX_PHOTOS: self.MAX_PHOTOS });

      self.$el.html(loadedTemplate(context));
      self.setFormValues();

      self.$photosModule = self.$('.js-photosModule');

      this.sortableImages && this.sortableImages.destroy();
      this.sortableImages = Sortable.create(self.$('.js-subImageWrap')[0], {
        onUpdate: function(e) {
          var imagesArr = self.model.get('imageHashesToUpload');

          imagesArr.splice(e.newIndex, 0, imagesArr.splice(e.oldIndex, 1)[0]);
          self.model.set('imageHashesToUpload', imagesArr);
        }
      });

      setTimeout(() => {
        var editor = new MediumEditor('#inputDescription', {
          placeholder: {
            text: window.polyglot.t('DescriptionPlaceholder')
          },
          toolbar: {
            imageDragging: false,
            sticky: true
          },
          paste: {
            cleanPastedHTML: true,
            cleanReplacements: [
              [new RegExp(/<div>/gi), '<p>'],
              [new RegExp(/<\/div>/gi), '</p>'],
              [new RegExp(/<font>/gi), ""],
              [new RegExp(/<\/font>/gi), ""],
              [new RegExp(/<code>/gi), '<pre>'],
              [new RegExp(/<\/code>/gi), '</pre>']
            ],
            cleanAttrs: ['class', 'style', 'dir', 'color', 'face', 'size', 'align', 'border', 'background', 'opacity'],
            cleanTags: ['meta', 'style', 'script', 'center', 'basefont', 'frame', 'iframe', 'frameset' ]
          }
        });

        editor.subscribe('blur', self.validateDescription);

        //set chosen inputs
        this.$('.chosen').chosen({width: '100%'});
      }, 0);
    });

    return this;
  },

  setFormValues: function(){ //TODO: Refactor to a generic enumeration pattern
    var typeValue = String(this.model.get('vendor_offer').listing.metadata.category) || "physical good",
        self = this;
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

    var keywordTags = this.model.get('vendor_offer').listing.item.keywords;
    keywordTags = keywordTags ? keywordTags.filter(Boolean) : [];
    //activate tags plugin
    window.setTimeout(function(){
      self.inputKeyword = new Taggle('inputKeyword', {
        tags: keywordTags,
        preserveCase: true,
        saveOnBlur: true
      });
    },0);

    //focus main input
    this.$el.find('input[name=title]').focus();
    $('#obContainer').animate({ scrollTop: "460px" });
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

  addDefaultTime: function(e){
    "use strict";
    var timeInput = this.$el.find('#inputExpirationDate'),
        currentValue = timeInput.val();
    if(!currentValue){
      timeInput.val(this.defaultDate);
    }
    this.$el.find('.js-itemEditClearDateWrapper').removeClass('hide');
  },

  clearDate: function(){
    "use strict";
    this.$el.find('#inputExpirationDate').val('');
  },

  onPhotoDragOver: function(e) {
    if (!event.dataTransfer.files.length) return;

    this.$photosModule.addClass('dragOver');
    e.preventDefault();
  },

  onPhotoDragLeave: function(e) {
    this.$photosModule.removeClass('dragOver');
    e.preventDefault();
  },  

  onPhotoDrop: function(e) {
    this.$photosModule.removeClass('dragOver');
    this.resizeImage(event.dataTransfer.files);
    e.preventDefault();
  },

  onImageFileChange: function(e) {
    this.resizeImage();
  },

  resizeImage: function(imageFiles){
    var self = this,
        $imageInput = this.$el.find('.js-itemImageUpload'),
        curImages = this.model.get('combinedImagesArray'),
        maxH = 800,
        maxW = 800,
        imageList = [],
        loaded = 0,
        imageCount;

    imageFiles = Array.prototype.slice.call(imageFiles || $imageInput[0].files, 0);

    // prune out any non-image files
    imageFiles = imageFiles.filter((file) => {
      return file.type.startsWith('image');
    });

    $imageInput.val('');

    if (curImages.length + imageFiles.length > this.MAX_PHOTOS) {
      imageFiles = imageFiles.slice(0, this.MAX_PHOTOS - curImages.length);
      messageModal.show(window.polyglot.t('errorMessages.tooManyPhotosTitle'), window.polyglot.t('errorMessages.tooManyPhotosBody'));      
    }

    if (!imageFiles.length) return;

    imageCount = imageFiles.length

    __.each(imageFiles, function(imageFile, i){
      var newImage = document.createElement("img"),
          ctx;

      newImage.src = imageFile.path;

      newImage.onload = function() {
        var imgH = newImage.height,
            imgW = newImage.width,
            dataURI,
            canvas = document.createElement("canvas");

        loaded += 1;
        self.$el.find('.js-itemEditImageLoading').removeClass("fadeOut");

        if (imgW < imgH){
          //if image width is smaller than height, set width to max
          imgH *= maxW/imgW;
          imgW = maxW;
        }else{
          imgW *= maxH/imgH;
          imgH = maxH;
        }

        canvas.width = imgW;
        canvas.height = imgH;
        ctx = canvas.getContext('2d');
        ctx.drawImage(newImage, 0, 0, imgW, imgH);
        dataURI = canvas.toDataURL('image/jpeg', 0.45);
        dataURI = dataURI.replace(/^data:image\/(png|jpeg);base64,/, "");
        imageList.push(dataURI);

        if(loaded === imageCount) {
          self.uploadImage(imageList);
        }
      };

      newImage.onerror = function() {
        loaded += 1;

        if(loaded === imageCount) {
          self.uploadImage(imageList);
        }        
      };
    });
  },

  uploadImage: function(imageList){
    var self = this,
        formData = new FormData();
    
    __.each(imageList, function(dataURL){
      "use strict";
      formData.append('image', dataURL);
    });

    if (!imageList.length) {
      self.$el.find('.js-itemEditImageLoading').addClass("fadeOut");
      return;
    }

    $.ajax({
      type: "POST",
      url: self.model.get('serverUrl') + "upload_image",
      contentType: false,
      processData: false,
      dataType: "json",
      data: formData,
      success: function(data) {
        var hashArray,
            imageArray;

        if (data.success === true){
          imageArray = __.clone(self.model.get("combinedImagesArray"));
          hashArray = __.clone(self.model.get("imageHashesToUpload"));
          __.each(data.image_hashes, function (hash) {
            if(hash != "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && hash.length === 40){
              imageArray.push(self.model.get('serverUrl') + "get_image?hash=" + hash);
              hashArray.push(hash);
            }
          });
          self.model.set("combinedImagesArray", imageArray);
          self.model.set("imageHashesToUpload", hashArray);
          self.$el.find('.js-itemEditImageLoading').addClass("fadeOut");
          self.updateImages();
        }else if (data.success === false){
          messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
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
          $('<div class="itemImg itemImg-small js-editItemSubImage floatLeft" style="background-image: url(' + imageURL + ');"><div class="btn btn-corner btn-cornerTR btn-cornerTRSmall btn-flushTop btn-c1 fade btn-shadow1 js-editItemDeleteImage"><i class="ion-close-round icon-centered icon-small"></i></div></div>')
              .appendTo(self.$('.js-subImageWrap'));
        }
      });
      uploadMsg.addClass('hide');
    } else {
      uploadMsg.removeClass('hide');
    }

    if (imageArray.length >= this.MAX_PHOTOS) {
      this.$('.js-itemImageUpload').prop('disabled', true)
        .siblings('.btn')
        .addClass('disabled');
    } else {
      this.$('.js-itemImageUpload').prop('disabled', false)
        .siblings('.btn')
        .removeClass('disabled');
    }
  },

  deleteImage: function(e) {
    var imageUploadArray,
        imgIndex = $(e.target).closest('.itemImg').index('.js-editItemSubImage'),
        imageArray = __.clone(this.model.get("combinedImagesArray"));

    imageArray.splice(imgIndex, 1);
    this.model.set("combinedImagesArray", imageArray);
    imageUploadArray = __.clone(this.model.get("imageHashesToUpload"));
    imageUploadArray.splice(imgIndex, 1);
    this.model.set("imageHashesToUpload", imageUploadArray);
    this.updateImages();
  },

  validateInput: function(e) {
    var targ = $(e.target),
        trimVal = targ.val().trim();
    targ.val(trimVal);
    e.target.checkValidity();
    targ.closest('.flexRow').addClass('formChecked');
  },

  validateDescription: function(e) {
    validateMediumEditor.checkVal(this.$('#inputDescription'));
  },  

  saveChanges: function(){
    var self = this,
        formData,
        //deleteThisItem,
        cCode = this.model.get('userCurrencyCode'),
        submitForm = this.$el.find('#contractForm')[0],
        keywordsArray = this.inputKeyword.getTagValues();

    keywordsArray = keywordsArray.map(function(tag){
      var re = /#/g;
      var newTag = tag.replace(re, '');
      return newTag;
    });

    this.$el.find('#inputCurrencyCode').val(cCode);
    this.$el.find('#inputShippingCurrencyCode').val(cCode);
    this.$el.find('#inputShippingOrigin').val(this.model.get('userCountry'));
    //convert number field to string field
    this.$el.find('#inputPrice').val(this.$el.find('#priceLocal').val());
    this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalLocal').val());
    this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalLocal').val());

    formData = new FormData(submitForm);

    //add old and new image hashes
    __.each(this.model.get('imageHashesToUpload'), function(imHash){
      //make sure all hashes are valid
      if(imHash != "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && imHash.length === 40){
        formData.append('images', imHash);
      }
    });

    if(keywordsArray.length > 0){
      __.each(keywordsArray, function(keyword){
        "use strict";
        formData.append('keywords', keyword);
      });
    } else {
      formData.append('keywords', "");
    }

    //if this is an existing product, do not delete the images
    if (self.model.get('id')) {
      formData.append('delete_images', false);
      formData.append('contract_id', self.model.get('id'));
    }

    //if condition is disabled, insert default value
    if($('#inputCondition:disabled').length > 0){
      formData.append('condition', 'New');
    }

    //add moderator list from profile
    __.each(this.model.get('moderators'), function(moderator){
      formData.append('moderators', moderator.guid);
    });

    //add formChecked class to form so invalid fields are styled as invalid
    this.$el.find('#contractForm').addClass('formChecked');

    if(this.checkFormValidity()){
      $.ajax({
        type: "POST",
        url: self.model.get('serverUrl') + "contracts",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          //var returnedId = self.model.get('id');
          data = JSON.parse(data);
          /*
          //if the itemEdit model has an id, it was cloned from an existing item
          //if the id returned is the same, an edit was made with no changes, don't delete it
          if (returnedId && data.success === true && returnedId != data.id){
            deleteThisItem(data.id);
          }else if (data.success === false){
            messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
          }else{
            //item is new or unchanged
            */
            //self.trigger('saveNewDone', data.id);
          //}
          if (data.success === true) {
            self.trigger('saveNewDone', data.id);
          } else {
            messageModal.show(window.polyglot.t('errorMessages.saveError'), "<i>" + data.reason + "</i>");
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
      $(submitForm).find('input, textarea').each(function() {
        if($(this).is(":invalid")){
          invalidInputList += "<br/>"+$(this).attr('id');
        }
      });
      messageModal.show(window.polyglot.t('errorMessages.saveError'), window.polyglot.t('errorMessages.missingError') + "<br><i>"+ invalidInputList+"</i>");
    }
  },

  checkFormValidity: function() {
    this.validateDescription();

    return this.$('#contractForm')[0].checkValidity();
  }
});