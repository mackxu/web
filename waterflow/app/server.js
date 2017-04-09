let server = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, 1000);
  })
};
export default server;