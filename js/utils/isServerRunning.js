'use strict';

var $ = require('jquery');

// todo: doc this guy.
module.exports = function(url, guidCheckUrl, options) {
  var deferred = $.Deferred(),
      attempts = 0,
      timeout,
      defaults,
      pingServer,
      guidCheck;

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

  console.log('1');
  timeout = setTimeout(function() {
    console.log('12345');
    if (guidCheck.state() === 'pending') {
      console.log('2');
      // guid creation in progress
      deferred.resolve(guidCheck);
    } else {
      // guid check either finished, server is down of
      // guid check had previosuly been completed
      console.log('3');
      guidCheck.done(function() {
        console.log('4');
        // guid check finished
        deferred.resolve(guidCheck);
      }).fail(function() {
        console.log('5');
        // either server is down or guid had already been generated
        var pingUrl,
            pingAttempt;

        (pingUrl = function() {
          if (attempts < options.maxAttempts) {
            attempts += 1;
            pingAttempt = $.get(url).done(function(data) {
              // guid had previously been generated
              deferred.resolve(null, data);
            }).fail(function() {
              // server is indeed down, let's
              // keep pinging
              setTimeout(pingUrl, options.timeout);
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

  return deferred.promise();
};