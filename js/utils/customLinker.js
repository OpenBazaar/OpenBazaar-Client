var autolinker = require( 'autolinker');

module.exports = function(msg) {

  msg = msg.replace(/ob:\/\/@/gm, "ob://------");
  msg = msg.replace(/ob:\/\/#/gm, "#");

  msg = autolinker.link(msg, {
    'hashtag': "twitter",
    replaceFn : function( autolinker, match ) {

      switch( match.getType() ) {
        case 'url' :
          return;

        case 'email' :
          return;

        case 'phone' :
          return;

        case 'twitter' : //pretend handles are twitter links
          return '<a>ob://@' + match.getTwitterHandle() + '</a>';

        case 'hashtag' :
          return '<a>ob://#' + match.getHashtag() + '</a>';

      }
    }
  });

  msg = msg.replace(/ob:\/\/------/gm, "ob://@");
  
  return msg;

};
