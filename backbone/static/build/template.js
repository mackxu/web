/*TMODJS:{}*/
!function(r){"use strict";var e=function(r,n){return e[/string|function/.test(typeof n)?"compile":"render"].apply(e,arguments)},n=e.cache={},t=function(r,e){return"string"!=typeof r&&(e=typeof r,"number"===e?r+="":r="function"===e?t(r.call(r)):""),r},o={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},c=function(r){return t(r).replace(/&(?![\w#]+;)|[<>"']/g,function(r){return o[r]})},u=Array.isArray||function(r){return"[object Array]"==={}.toString.call(r)},i=function(r,e){if(u(r))for(var n=0,t=r.length;t>n;n++)e.call(r,r[n],n,r);else for(n in r)e.call(r,r[n],n)},f=function(r,e){var n=/(\/)[^/]+\1\.\.\1/,t=r.replace(/^([^.])/,"./$1").replace(/[^/]+$/,""),o=t+e;for(o=o.replace(/\/\.\//g,"/");o.match(n);)o=o.replace(n,"/");return o},a=e.helpers={$include:function(r,n,t){var o=f(t,r);return e.render(o,n)},$string:t,$escape:c,$each:i},l=function(e){var n="";for(var t in e)n+="<"+t+">\n"+e[t]+"\n\n";return n&&r.console&&console.error("Template Error\n\n"+n),function(){return"{Template Error}"}};e.render=function(r,n){var t=e.get(r)||l({id:r,name:"Render Error",message:"No Template"});return n?t(n):t},e.compile=function(r,e){var t="function"==typeof e,o=n[r]=function(n){try{return t?new e(n,r)+"":e}catch(o){return l(o)()}};return o.prototype=e.prototype=a,o.toString=function(){return e+""},o},e.get=function(r){return n[r.replace(/^\.\//,"")]},e.helper=function(r,e){a[r]=e},"function"==typeof define?define(function(){return e}):"undefined"!=typeof exports?module.exports=e:r.template=e}(this);