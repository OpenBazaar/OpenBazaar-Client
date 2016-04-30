var app = require('../App').getApp(),
    moment = require('moment');

function cssImageUrl(hash, guid, fallback) {
  var base = app.serverConfigs.getActive().getServerBaseUrl() + '/',
      url = '',
      localURL = localStorage.getItem('userAvatar-'+guid);

  if (hash) {
    url = `url(${base}get_image?hash=${hash}`;
    if (guid) url += `&guid=${guid})`;
    if (fallback) url +=  ', '
  }

  if (!hash && localURL) {
    url = `url(${localURL})`;
    if (url && fallback) url +=  ', '
  }

  if (fallback) {
    url += `url(${fallback})`;
  }

  return url;
}

function intlNumFormat(numberToFormat, maxDigits){
  return app.intlNumFormat(numberToFormat, maxDigits);
}

module.exports = {
  cssImageUrl: cssImageUrl,
  intlNumFormat: intlNumFormat,
  moment: moment
};