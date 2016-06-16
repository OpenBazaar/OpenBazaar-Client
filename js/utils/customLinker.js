var autolinker = require( 'autolinker');

module.exports = function(msg) {

  msg = msg.replace(/ob:\/\/@/gm, "ob://obHandleLinkToBeReplaced");

  msg = autolinker.link(msg, {
    'hashtag': false,
    replaceFn : function( autolinker, match ) {

      switch( match.getType() ) {
        case 'url' :
          return;

        case 'email' :
          return;

        case 'phone' :
          return;

        case 'twitter' : //pretend handles are twitter links
          console.log( "Twitter Handle: ", match.getTwitterHandle() );
          return '<a>@' + match.getTwitterHandle() + '</a>';
      }
    }
  });

  msg = msg.replace(/ob:\/\/obHandleLinkToBeReplaced/gm, "ob://@");

  return msg;

};
