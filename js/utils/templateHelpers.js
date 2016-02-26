var app = require('../App.js').getApp(),
    moment = require('moment');

function cssImageUrl(hash, guid, fallback) {
  var base = app.serverConfig.getServerBaseUrl() + '/',
      url = '';

  if (hash) {
    url = `url(${base}get_image?hash=${hash}`;
    if (guid) url += `&guid=${guid})`;
    if (fallback) url +=  ', '
  }

  if (fallback) {
    url += `url(${fallback})`;
  }

  return url;
}

module.exports = {
  cssImageUrl: cssImageUrl,
  moment: moment
}