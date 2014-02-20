define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<p>hello world ' +__e( aa ) +'---' +((__t = ( bb )) == null ? '' : __t) +' ' +((__t = ( cc )) == null ? '' : __t) +'</p>\n<ul>\n    '; _.each(friends, function(friend) { ;__p += '\n        <li>' +((__t = ( friend.nickname )) == null ? '' : __t) +'</li>\n    '; }) ;__p += '\n</ul>';}return __p}

});