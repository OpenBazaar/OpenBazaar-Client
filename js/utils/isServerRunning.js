'use strict';

var $ = require('jquery');

// todo: doc this guy.
module.exports = function(url, guidCheckUrl, options) {
  var deferred = $.Deferred(),
      promise = deferred.promise(),
      attempts = 0,
      defaults,
      pingServer,
      guidCheck,
      pingAttempt,
      pingAttemptTimeout;

  if (!url) {
    throw new Error('Please provide an url to ping.');
  }

  if (!guidCheckUrl) {
    throw new Error('Please provide a guidCheckUrl.');
  }

  defaults = {
    timeout: 250, // 4 times a second
    maxAttempts: 12 // for 3 seconds
  }

  options = $.extend({}, defaults, options);
  guidCheck = $.get(guidCheckUrl);

  setTimeout(function() {
    if (guidCheck.state() === 'pending') {
      // guid creation in progress
      deferred.resolve(guidCheck);
    } else {
      // guid check either finished, server is down of
      // guid check had previosuly been completed
      guidCheck.done(function() {
        // guid check finished
        deferred.resolve(guidCheck);
      }).fail(function() {
        // either server is down or guid had already been generated
        var pingUrl;

        (pingUrl = function() {
          if (attempts < options.maxAttempts) {
            attempts += 1;
            pingAttempt = $.get(url).done(function(data) {
              // guid had previously been generated
              deferred.resolve(null, data);
            }).fail(function() {
              // server is indeed down, let's
              // keep pinging
              pingAttemptTimeout = setTimeout(pingUrl, options.timeout);
            });

            if (typeof options.onAttempt == 'function') {
              options.onAttempt.call(pingAttempt, attempts);
            }
          } else {
            // after max attempts, we confirm the
            // server is down
            deferred.reject();
          }
        })();
      });
    }
  }, 0);

  promise.cancel = function() {
    pingAttemptTimeout && clearTimeout(pingAttemptTimeout);
    pingAttempt && pingAttempt.abort();
    guidCheck && guidCheck.abort();
  };

  return promise;
};