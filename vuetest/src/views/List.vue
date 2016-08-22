<template>
	<div class="list">
		<ul class="list-img">
			<li v-for="img in list" class="item-img">
				<div class="img-wrap">
					<img v-lazy="img" alt="">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'component_name-list',

  data () {
    return {
    	list: [
    		'http://hilongjw.github.io/vue-lazyload/dist/test1.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test2.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test3.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test4.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test5.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test6.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test7.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test8.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test9.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test10.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test2.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test3.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test4.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test5.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test6.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test7.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test8.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test9.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test10.jpg',
    		'http://hilongjw.github.io/vue-lazyload/dist/test11.jpg'
    	]
    };
  }
};
</script>

<style lang="css" scoped>
* {
	box-sizing: border-box;
}
ul,li, body { padding: 0; margin: 0;  }
.list-img {

}
.item-img {
	display: inline-block;
	width: 50%;
	padding: 0 5px;
	margin-bottom: 10px;
}
.img-wrap {
	overflow: hidden;
	width: 100%;
	height: 0;
	padding-bottom: 119.83%;
}
.item-img img {
	display: block;
	width: 100%;
	height: auto;
}
</style>