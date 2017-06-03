import _ from 'lodash';
import $ from 'jquery'
import server from './server.js';

let ITEM_AMOUNT = 25;
let LIMIT_HEIGHT = 100;
let ITEM_WIDTH = 250;			// item的宽度
let COL_SPACE = 20;				// 每列的间隙大小
let $cols = [];
let $win = $(window);
let $doc = $(document);
let dataReady = true;

function main() {
  createContainers();
  fetchAndRenderItem();

  $win.on('scroll', _.throttle(onScroll, 100))
}

// 加载服务器数据，并绘制
function fetchAndRenderItem() {
	console.log('fetch data...')
	dataReady = false;
	server().then(function() {
		dataReady = true;
    _.times(ITEM_AMOUNT, appendItem)
  })
}

function onScroll() {
	// 判断页面是否滑到底部
	if($doc.height() - $win.height() - $doc.scrollTop() > LIMIT_HEIGHT || !dataReady) {
		return false;
	}
	fetchAndRenderItem();
}

// 动态创建容器
function createContainers() {
  // 计算可以生成的列数
  // 最大有8列
  var colLen = Math.min(Math.floor($win.width() / ITEM_WIDTH), 8);
  for (let i = 0, l = 4; i < colLen; i++) {
    $cols[i] = $('<div class="container" id="col'+ i +'"></div>')
  }
  $('#main').append($cols);
}

function createItem () {
	return $('<div>', {
		'class': 'item',
		'style': 'background-color: ' + getItemColor() + '; height: ' + getItemHeight() + 'px'
	})
}

function getItemHeight () {
	return 50 + Math.floor(Math.random() * 300);
}

function getItemColor () {
	var color = '#';
	while(color.length < 7) {
		var r = Math.floor(Math.random() * 256);
		if ( r < 16 ) {
			color += '0'
		}
		color += r.toString(16)
	}
	return color;
}
// 获取最小高度列
function getMinHeightOfCol () {
	
	var $minCol = $cols[0];
	var len = $cols.length
	for (var i = 1; i < len; i++) {
		if ($minCol.height() > $cols[i].height()) {
			$minCol = $cols[i];
		}
	}
	return $minCol;
}
// 创建Item，并把它加入最低的col内
function appendItem () {
	var $item = createItem();
	var $minHeightCol = getMinHeightOfCol();
	$minHeightCol.append($item);
}

main();