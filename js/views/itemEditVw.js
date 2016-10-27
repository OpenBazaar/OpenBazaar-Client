'use strict';

var __ = require('underscore'),
    $ = require('jquery'),
    app = require('../App').getApp(),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    Taggle = require('taggle'),
    MediumEditor = require('medium-editor'),
    Sortable = require('sortablejs'),
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
    'click .js-itemEditClearDate': 'clearDate',
    'change #shipsToRegions': 'selectRegions',
    'click .js-clearShipsTo': 'clearShipsTo'
  },

  MAX_PHOTOS: 10,

  initialize: function(){
    var self=this,
        nowDate = new Date(),
        nowMonth = nowDate.getMonth()+ 1;

    function padTime(val){
      if (val >= 10){
        return val;
      }
      return "0" + val;
    }

    var countryList = new countriesModel().get('countries'), allRegions = [];
    countryList.forEach(function(country) {
      allRegions.push(country.dataName);
    });

    var europeanUnion = [
      'AUSTRIA', 'BELGIUM', 'BULGARIA', 'CROATIA', 'CYPRUS', 'CZECH_REPUBLIC', 'DENMARK', 'ESTONIA',
      'FINLAND', 'FRANCE', 'GERMANY', 'GREECE', 'HUNGARY', 'IRELAND', 'ITALY', 'LATVIA', 'LITHUANIA', 'LUXEMBOURG',
      'MALTA', 'NETHERLANDS', 'POLAND', 'PORTUGAL', 'ROMANIA', 'SLOVAKIA', 'SLOVENIA', 'SPAIN', 'SWEDEN', 'UNITED_KINGDOM'
    ];

    var europeanEconomicArea = europeanUnion.concat(['ICELAND', 'LIECHTENSTEIN', 'NORWAY']);

    this.regions = {
      'ALL': allRegions,
      'EUROPEAN_UNION': europeanUnion,
      'EUROPEAN_ECONOMIC_AREA': europeanEconomicArea
    };

    this.prevShipsToVal = [];
    this.defaultDate = nowDate.getFullYear() + "-" + padTime(nowMonth) + "-" + padTime(nowDate.getDate()) + "T" + padTime(nowDate.getHours()) + ":" + padTime(nowDate.getMinutes());
    this.imgHashes = this.model.get('vendor_offer').listing.item.image_hashes;
    __.bindAll(this, 'validateDescription');

    self.model.set('expTime', self.model.get('vendor_offer').listing.metadata.expiry.replace(" UTC", ""));

    this.maxTagChars = 40;

    this.listenTo(this.model, 'change:priceSet', this.render());
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/itemEdit.html', function(loadedTemplate) {
      var context = __.extend({}, self.model.toJSON(), {
        MAX_PHOTOS: self.MAX_PHOTOS,
        images: self.imgHashes.map((hash) => self.getImageUrl(hash)),
        maxTagChars: self.maxTagChars
      });

      self.$el.html(loadedTemplate(context));

      self.$photosModule = self.$('.js-photosModule');

      self.sortableImages && self.sortableImages.destroy();
      self.sortableImages = Sortable.create(self.$('.js-subImageWrap')[0], {
        onUpdate: function(e) {
          self.imgHashes.splice(e.newIndex, 0, self.imgHashes.splice(e.oldIndex, 1)[0]);
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
            cleanPastedHTML: false,
            forcePlainText: false
          }
        });

        editor.subscribe('blur', self.validateDescription);

        //set chosen inputs
        self.$('.chosen').chosen({
          width: '100%',
          search_contains: true,
          no_results_text: window.polyglot.t('chosenJS.noResultsText'),
          placeholder_text_single: window.polyglot.t('chosenJS.placeHolderTextSingle'),
          placeholder_text_multiple: window.polyglot.t('chosenJS.placeHolderTextMultiple')
        }).change(function(e){
          self.shipsToChange(e);
        });

        self.$('.chosenRegions').chosen({
          width: '100%',
          disable_search: true,
          search_contains: true,
          no_results_text: window.polyglot.t('chosenJS.noResultsText'),
          placeholder_text_single: window.polyglot.t('chosenJS.placeHolderTextSingle'),
          placeholder_text_multiple: window.polyglot.t('chosenJS.placeHolderTextMultiple')
        });
      }, 0);

      self.setFormValues();
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
    if (typeValue === "physical good") {
      this.enableShipping();
      this.noShipping = false;
    } else {
      this.disableShipping();
      this.noShipping = true;
    }
    //hide or unhide shipping based on free shipping
    if (this.model.get('vendor_offer').listing.shipping.free == true){
      this.disableShippingPrice();
    } else {
      this.enableShippingPrice();
    }
    //if item has a condition, set it
    if (this.model.get('vendor_offer').listing.item.condition){
      this.$el.find('#inputCondition').val(String(this.model.get('vendor_offer').listing.item.condition));
    }
    //add all countries to the Ships To select list
    var countries = new countriesModel();
    //make a copy of the countries array
    var countryList = countries.get('countries').slice(0);
    let shipsFrom = this.$el.find('#shipsFrom');
    __.each(countryList, function(countryFromList, i){
      let content = !i ? countryFromList.name : window.polyglot.t(`countries.${countryFromList.dataName}`);

      shipsFrom.append(
          `<option value="${countryFromList.dataName}">${content}</option>`
      );
    });
    //set to existing value, default to user's home country if no value is set
    shipsFrom.val(this.model.get('vendor_offer').listing.shipping.shipping_origin || this.model.get('userCountry'));
    //add the ALL option
    countryList.unshift({
      "name": window.polyglot.t('WorldwideShipping'),
      "dataName": "ALL",
      "code": "ALL",
      "number": "1"
    });
    var shipsTo = this.$el.find('#shipsTo');
    __.each(countryList, function(countryFromList, i){
      var content = !i ? countryFromList.name : window.polyglot.t(`countries.${countryFromList.dataName}`);

      shipsTo.append(
        `<option value="${countryFromList.dataName}">${content}</option>`
      );
    });

    var shipsToValue = this.model.get('vendor_offer').listing.shipping.shipping_regions;

    //if shipsToValue is empty, set it to the user's country
    shipsToValue = shipsToValue.length > 0 ? shipsToValue : ["ALL"];
    shipsTo.val(shipsToValue);
    this.prevShipsToVal = shipsToValue;
    this.$('.chosen').trigger('chosen:updated');


    var keywordTags = this.model.get('vendor_offer').listing.item.keywords;
    keywordTags = keywordTags ? keywordTags.filter(Boolean) : [];
    //activate tags plugin
    window.setTimeout(function(){
      self.inputKeyword = new Taggle('inputKeyword', {
        tags: keywordTags,
        preserveCase: true,
        saveOnBlur: true,
        placeholder: window.polyglot.t('KeywordsPlaceholder'),
        onBeforeTagAdd: (event, tag) => {
          if (tag.length > self.maxTagChars) {
            app.simpleMessageModal.open({
              title: window.polyglot.t('errorMessages.tagIsTooLongHeadline'),
              message: window.polyglot.t('errorMessages.tagIsTooLongBody', {smart_count: self.maxTagChars})
            });
            return false;
          }
        },
        onTagAdd: () => {
          this.$('#inputKeyword').removeClass('invalid');
        },
        onTagRemove: () => {
          if (!self.inputKeyword.getTags().elements.length) {
            self.$('#inputKeyword').addClass('invalid');
          }
        }
      });
    }, 0);

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
    if (newTyleValue === "physical good") {
      this.enableShipping();
      //only show shipping prices if free shipping is not true
      if (this.$el.find('input[name=free_shipping]').val() == "false") {
        this.enableShippingPrice();
      }
      this.noShipping = false;
    } else {
      this.disableShipping();
      this.disableShippingPrice();
      this.noShipping = true;
    }
  },

  selectRegions: function(){
    var targ = this.$('#shipsToRegions'),
        setCountries = this.regions[targ.val()],
        shipsTo = this.$('#shipsTo'),
        oldVal = shipsTo.val() || [],
        wwIndex = oldVal.indexOf('ALL'),
        newVal;

    if (setCountries) {
      if (wwIndex > -1) {
        oldVal.splice(wwIndex, 1);
      }
      newVal = __.union(oldVal, setCountries);
      this.$('#shipsTo').val(newVal);
      this.$('.chosen').trigger('chosen:updated');
      this.prevShipsToVal = newVal;
    }
    //reset to blank
    targ.val("");
    this.$('.chosenRegions').trigger('chosen:updated');
  },

  clearShipsTo: function(){
    this.$('#shipsTo').val("").trigger('chosen:updated');
  },

  addDefaultTime: function(){
    var timeInput = this.$el.find('#inputExpirationDate'),
        currentValue = timeInput.val();
    if (!currentValue){
      timeInput.val(this.defaultDate);
    }
    this.$el.find('.js-itemEditClearDateWrapper').removeClass('hide');
  },

  shipsToChange: function(e){
    var newVal = $(e.target).val() || [],
        newSelection = __.difference(newVal, this.prevShipsToVal),
        wwNewIndex = newVal.indexOf('ALL'),
        $shipsToWrapper = this.$('.js-shipToWrapper');

    //is the new value different from ALL?
    if (newSelection[0] != "ALL"){
      //if ALL was selected, remove it
      if (wwNewIndex > -1){
        newVal.splice(wwNewIndex, 1);
      }
    } else {
      //if the new value ALL, remove everything else
      newVal = ["ALL"];
    }
    $(e.target).val(newVal);
    this.$('.chosen').trigger('chosen:updated');
    this.prevShipsToVal = newVal;

    if (newVal.length) {
      $shipsToWrapper.removeClass('invalid');
    } else {
      $shipsToWrapper.addClass('invalid');
    }
  },

  clearDate: function(){
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

  onImageFileChange: function() {
    this.resizeImage();
  },

  getOrientation: function(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataView = new DataView(e.target.result);  // eslint-disable-line no-undef
      let offset = 2;

      if (dataView.getUint16(0, false) != 0xFFD8) return callback(-2);

      while (offset < dataView.byteLength) {
        const marker = dataView.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (dataView.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          const little = dataView.getUint16(offset += 6, false) == 0x4949;
          offset += dataView.getUint32(offset + 4, little);
          const tags = dataView.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++) {
            if (dataView.getUint16(offset + (i * 12), little) == 0x0112) {
              return callback(dataView.getUint16(offset + (i * 12) + 8, little));
            }
          }
        } else if ((marker & 0xFF00) != 0xFF00) {
          break;
        } else {
          offset += dataView.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  },

  resizeImage: function(imageFiles){
    var self = this,
        $imageInput = this.$el.find('.js-itemImageUpload'),
        maxH = 944,
        maxW = 1028,
        imageList = [],
        loaded = 0,
        errored = 0,
        imageCount;

    imageFiles = Array.prototype.slice.call(imageFiles || $imageInput[0].files, 0);

    // prune out any non-image files
    imageFiles = imageFiles.filter((file) => {
      return file.type.startsWith('image');
    });

    $imageInput.val('');

    if (this.imgHashes.length + imageFiles.length > this.MAX_PHOTOS) {
      imageFiles = imageFiles.slice(0, this.MAX_PHOTOS - this.imgHashes.length);

      app.simpleMessageModal.open({
        title: window.polyglot.t('errorMessages.tooManyPhotosTitle'),
        message: window.polyglot.t('errorMessages.tooManyPhotosBody')
      });
    }

    if (!imageFiles.length) return;

    this.$('#imageForm .invalid').removeClass('invalid');
    imageCount = imageFiles.length;
    this.$el.find('.js-itemEditImageLoading').removeClass("fadeOut");

    __.each(imageFiles, function(imageFile){
      var newImage = document.createElement("img"),
          ctx,
          orientation;

      self.getOrientation(imageFile, function(val) {
        if (val === -1) throw new Error('The image is undefined.');
        orientation = val;
      });

      newImage.src = imageFile.path;

      newImage.onload = function() {
        var imgH = newImage.height,
            imgW = newImage.width,
            dataURI,
            canvas = document.createElement("canvas");

        loaded += 1;

        if (imgW < imgH){
          //if image width is smaller than height, set width to max
          imgH *= maxW/imgW;
          imgW = maxW;
        } else {
          imgW *= maxH/imgH;
          imgH = maxH;
        }

        canvas.width = imgW;
        canvas.height = imgH;
        ctx = canvas.getContext('2d');
        if (orientation > 4) {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        switch (orientation) {
        case 2:
          ctx.translate(imgW, 0);
          ctx.scale(-1, 1);
          break;
        case 3:
          ctx.translate(imgW, imgH);
          ctx.rotate(Math.PI);
          break;
        case 4:
          ctx.translate(0, imgH);
          ctx.scale(1, -1);
          break;
        case 5:
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(1, -1);
          break;
        case 6:
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(0, -imgH);
          break;
        case 7:
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(imgW, -imgH);
          ctx.scale(-1, 1);
          break;
        case 8:
          ctx.rotate(-0.5 * Math.PI);
          ctx.translate(-imgW, 0);
          break;
        default: // do nothing
        }
        ctx.drawImage(newImage, 0, 0, imgW, imgH);
        dataURI = canvas.toDataURL('image/jpeg', 0.7);
        dataURI = dataURI.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
        imageList.push(dataURI);

        if (loaded === imageCount) {
          self.uploadImage(imageList);
        }
      };

      newImage.onerror = function() {
        loaded += 1;
        errored += 1;

        if (errored === imageCount) {
          self.$el.find('.js-itemEditImageLoading').addClass('fadeOut');

          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.unableToLoadImages', {smart_count: imageCount})
          });
        } else if (loaded === imageCount) {
          self.uploadImage(imageList);
        }
      };
    });
  },

  uploadImage: function(imageList){
    var self = this,
        formData = new FormData();

    __.each(imageList, function(dataURL){
      formData.append('image', dataURL);
    });

    if (!imageList.length) {
      this.$el.find('.js-itemEditImageLoading').addClass("fadeOut");
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
        if (data.success === true){
          __.each(data.image_hashes, function (hash) {
            if (hash != "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && hash.length === 40){
              self.imgHashes.push(hash);
            }
          });

          self.$el.find('.js-itemEditImageLoading').addClass("fadeOut");
          self.updateImages();
        } else if (data.success === false){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.saveError'),
            message: '<i>' + data.reason + '</i>'
          });
        }
      },
      error: function(jqXHR, status, errorThrown){
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  getImageUrl: function(hash) {
    return `${this.model.get('serverUrl')}get_image?hash=${hash}`;
  },

  updateImages: function(){
    var self = this,
        subImageDivs = this.$el.find('.js-editItemSubImage'),
        uploadMsg = this.$el.find('.js-itemEditLoadPhotoMessage');

    //remove extra subImage divs
    subImageDivs.slice(this.imgHashes.length).remove();

    if (this.imgHashes.length > 0){
      __.each(this.imgHashes, (hash, i) => {
        if (i < subImageDivs.length){
          $(subImageDivs[i]).css('background-image', 'url(' + this.getImageUrl(hash) + ')');
        } else {
          $('<div class="itemImg itemImg-small js-editItemSubImage floatLeft" style="background-image: url(' + this.getImageUrl(hash) + ');"><div class="btn btn-corner btn-cornerTR btn-cornerTRSmall btn-flushTop btn-c1 fade btn-shadow1 js-editItemDeleteImage"><i class="ion-close-round icon-centered icon-small"></i></div></div>')
              .appendTo(self.$('.js-subImageWrap'));
        }
      });
      uploadMsg.addClass('hide');
    } else {
      uploadMsg.removeClass('hide');
    }

    if (this.imgHashes.length >= this.MAX_PHOTOS) {
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
    var imgIndex = $(e.target).closest('.itemImg').index('.js-editItemSubImage');

    this.imgHashes.splice(imgIndex, 1);
    this.updateImages();
    !this.imgHashes.length && this.$('.js-editItemSubImagesWrapper').addClass('invalid');
  },

  validateInput: function(e) {
    var targ = $(e.target),
        trimVal = targ.val().trim();
    targ.val(trimVal);
    e.target.checkValidity();
    targ.closest('.flexRow').addClass('formChecked');
  },

  validateDescription: function() {
    validateMediumEditor.checkVal(this.$('#inputDescription'));
  },

  saveChanges: function(){
    var self = this,
        formData,
        cCode = this.model.get('userCurrencyCode'),
        submitForm = this.$el.find('#contractForm')[0],
        keywordsArray = this.inputKeyword.getTagValues(),
        shipsToInput = this.$('#shipsTo'),
        invalidInputList = [],
        maxQuantInput = this.$el.find('#inputMaxQuantity'),
        tempDisabledFields = [],
        hasError;

    validateMediumEditor.checkVal(this.$('#inputDescription'));

    if (keywordsArray.length < 1){
      this.$('#inputKeyword').addClass('invalid');
      hasError = true;
    }

    keywordsArray = keywordsArray.map(function(tag){
      var re = /#/g;
      return tag.replace(re, '');
    });

    this.$el.find('#inputCurrencyCode').val(cCode);
    this.$el.find('#inputShippingCurrencyCode').val(cCode);
    //convert number field to string field
    this.$el.find('#inputPrice').val(this.$el.find('#priceLocal').val());
    this.$el.find('#inputShippingDomestic').val(this.$el.find('#shippingPriceLocalLocal').val());
    this.$el.find('#inputShippingInternational').val(this.$el.find('#shippingPriceInternationalLocal').val());

    // disable blank fields that cause errors if sent to the server
    if (!maxQuantInput.val()) {
      maxQuantInput.attr('disabled', true);
      tempDisabledFields.push(maxQuantInput);
    }

    formData = new FormData(submitForm);

    if (this.noShipping){
      formData.append('ships_to', 'NA');
    }

    //make sure a ships to value is entered
    if (!shipsToInput.val() && !this.noShipping){
      this.$('.js-shipToWrapper').addClass('invalid');
      hasError = true;
    }

    //add old and new image hashes
    __.each(this.imgHashes, function(imHash){
      //make sure all hashes are valid
      if (imHash != "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" && imHash.length === 40){
        formData.append('images', imHash);
      }
    });

    if (!this.imgHashes.length) {
      this.$('.js-editItemSubImagesWrapper').addClass('invalid');
      hasError = true;
    }

    if (keywordsArray.length) {
      __.each(keywordsArray, function(keyword){
        formData.append('keywords', keyword);
      });
    } else {
      formData.append('keywords', '');
    }

    //if this is an existing product, do not delete the images
    if (self.model.get('id')) {
      formData.append('delete_images', false);
      formData.append('contract_id', self.model.get('id'));
    }

    //if condition is disabled, insert default value
    if ($('#inputCondition:disabled').length > 0){
      formData.append('condition', 'New');
    }

    //add moderator list from profile
    __.each(this.model.get('moderators'), function(moderator){
      formData.append('moderators', moderator.guid);
    });

    //add formChecked class to form so invalid fields are styled as invalid
    this.$el.find('#contractForm').addClass('formChecked');

    if (this.checkFormValidity() && !hasError) {
      return $.ajax({
        type: "POST",
        url: self.model.get('serverUrl') + "contracts",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          data = JSON.parse(data);
          if (data.success === true) {
            self.trigger('saveNewDone', data.id);
          } else {
            app.simpleMessageModal.open({
              title: window.polyglot.t('errorMessages.saveError'),
              message: '<i>' + data.reason + '</i>'
            });
          }
        },
        error: function (jqXHR, status, errorThrown) {
          console.log(jqXHR);
          console.log(status);
          console.log(errorThrown);
        },
        complete: function(){
          //re-enable any disabled fields
          __.each(tempDisabledFields, function(jQObject){
            jQObject.attr('disabled', false);
          });
        }
      });
    }

    $(submitForm).add(this.$('#imageForm')).find(':invalid, .invalid').each(function() {
      var inputName,
          $label;

      inputName = (($label = self.$("label[for='"+$(this).attr('id')+"']")).length && $label.text()) ||
        $(this).attr('data-label') || $(this).attr('id');

      invalidInputList.push(inputName.trim());
    });

    invalidInputList = __.uniq(invalidInputList);

    app.simpleMessageModal.open({
      title: window.polyglot.t('errorMessages.saveError'),
      message: window.polyglot.t('errorMessages.missingError') + '<br><i><br />' +
        invalidInputList.join('<br />') + '</i>'
    });

    return $.Deferred().reject('failed form validation').promise();
  },

  checkFormValidity: function() {
    this.validateDescription();

    return this.$('#contractForm')[0].checkValidity();
  }
});
