define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["static/tpl/list.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li><a href="#">' +
((__t = ( username )) == null ? '' : __t) +
'---' +
((__t = ( age )) == null ? '' : __t) +
'--' +
((__t = ( sex )) == null ? '' : __t) +
'</a></li>';

}
return __p
};

  return this["JST"];

});