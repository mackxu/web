import _ from 'lodash';
import $ from 'jquery'
import server from './server.js';

let $cols = [];
function main() {
  createContainers();
  
  server().then(function() {
    console.log('data ready')
  })
}

// 动态创建容器
function createContainers() {
  for (let i = 0, l = 4; i < l; i++) {
    $cols[i] = $('<div class="container">1</div>')
  }
  $('#main').append($cols);
}
main();