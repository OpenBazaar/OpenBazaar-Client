'use strict';

// todo: doc this guy.
module.exports = function(url, options) {
  var deferred = $.Deferred(),
      promise = deferred.promise(),
      defaults,
      pingInterval,
      timesUp,
      request;

  if (!url) {
    throw new Error('Please provide a url.');
  }

  defaults = {
    interval: 250, // 4 times a second
    timeout: 5000 // give up after 5 seconds
  }

  options = $.extend({}, defaults, options);

  pingInterval = setInterval(function() {
    request = $.get(url).done(function(data) {
      clearInterval(pingInterval);
      clearTimeout(timesUp);
      deferred.resolve(data);
    })
  }, options.interval);

  timesUp = setTimeout(function() {
    clearInterval(pingInterval);
    deferred.reject('timedout');
  }, options.timeout);

  promise.cancel = function() {
    clearInterval(pingInterval);
    clearTimeout(timesUp);
    request.abort();
    deferred.reject('canceled');
  };

  return promise;
};