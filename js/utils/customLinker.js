var autolinker = require( 'autolinker');

module.exports = function(msg) {

  msg = msg.replace(/ob:\/\/@/gm, "ob://obHandleLinkToBeReplaced");

  msg = autolinker.link(msg, {
    replaceFn : function( autolinker, match ) {

      switch( match.getType() ) {
        case 'url' :
          return;

        case 'email' :
          return;

        case 'phone' :
          return;

        case 'twitter' : //pretend handles are twitter links
          return '<a>@' + match.getTwitterHandle() + '</a>';

        case 'hashtag' :

      }
    }
  });

  msg = msg.replace(/ob:\/\/obHandleLinkToBeReplaced/gm, "ob://@");

  return msg;

};
