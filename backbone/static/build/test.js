/*TMODJS:{"version":5,"md5":"864fbe707034939ed368297abd629c49"}*/
define(function(require){return require("./template")("test",function(e){var r=this,n=r.$escape,t=e.aa,o=e.bb,c=e.cc,u="";return u+="<p>hello world hello world ",u+=n(t),u+="---",u+=n(o),u+=" ",u+=n(c),u+="</p>",new String(u)})});