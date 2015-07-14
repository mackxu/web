define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["tpl/friend/list.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += 'hello ,people';}return __p};

  this["JST"]["tpl/list.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li><a href="#">' +((__t = ( username )) == null ? '' : __t) +'---' +((__t = ( age )) == null ? '' : __t) +'--' +((__t = ( sex )) == null ? '' : __t) +'</a></li>';}return __p};

  this["JST"]["tpl/new.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p +=((__t = ( uname )) == null ? '' : __t);}return __p};

  this["JST"]["tpl/test.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<p>hello world ' +__e( aa ) +'---' +((__t = ( bb )) == null ? '' : __t) +' ' +((__t = ( cc )) == null ? '' : __t) +'</p>\n<ul>\n    '; _.each(friends, function(friend) { ;__p += '\n        <li>' +((__t = ( friend.nickname )) == null ? '' : __t) +'</li>\n    '; }) ;__p += '\n</ul>';}return __p};

  return this["JST"];

});