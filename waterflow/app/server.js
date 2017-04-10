import $ from jquery;

let server = function() {
  var dfd = $.Deferred();
  // 模拟数据异步加载
  setTimeout(function() {
    def.resolve();
  }, 1000);
  
  return dfd.promise();
  // return new Promise(function(resolve, reject) {
  //   setTimeout(function() {
  //     resolve();
  //   }, 1000);
  // })

};
export default server;