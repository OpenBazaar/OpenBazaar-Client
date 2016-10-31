'use strict';

var app = require('../App').getApp(),
    moment = require('moment'),
    remote = require('electron').remote;

function cssImageUrl(hash, guid, fallback) {
  var base = app.serverConfigs.getActive().getServerBaseUrl() + '/',
      url = '',
      localURL = localStorage.getItem('userAvatar-'+guid);

  if (hash) {
    url = `url(${base}get_image?hash=${hash}`;
    if (guid) url += `&guid=${guid})`;
    if (fallback) url += ', ';
  }

  if (!hash && localURL) {
    url = `url(${localURL})`;
    if (url && fallback) url += ', ';
  }

  if (fallback) {
    url += `url(${fallback})`;
  }

  return url;
}

module.exports = {
  cssImageUrl: cssImageUrl,
  intlNumFormat: app.intlNumFormat,
  formatBitcoin: function() {
    return app.formatBitcoin.apply(app, arguments);
  },
  moment: moment,
  launchedFromInstaller: remote.getGlobal('launched_from_installer')
};
