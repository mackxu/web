<template>
    <aside class="app-sidebar container" v-show="leftNavState" transition="fade" @click="showLeftNav()">
        <nav class="list-bg" v-show="leftNavState" transition="expand">
    		<ul class="menu-list">
    			<li class="menu-item"><a href="#" v-link="{path:'/'}"><span>首页</span><i class="iconfont icon-arrow-right"></i></a></li>
    			<li class="menu-item"><a href="#" v-link="{path:'/films/now_playing'}"><span>影片</span><i class="iconfont icon-arrow-right"></i></a></li>
    			<li class="menu-item"><a href="#" v-link="{path:'/'}"><span>影院</span><i class="iconfont icon-arrow-right"></i></a></li>
    			<li class="menu-item"><a href="#" v-link="{path:'/member'}">我的<i class="iconfont icon-arrow-right"></i></a></li>
    			<li class="menu-item"><a href="#" v-link="{path:'/card'}"><span>卖座卡查询</span><i class="iconfont icon-arrow-right"></i></a></li>
    		</ul>
    	</nav>
    </aside>
</template>

<script>

import { getLeftNavState } from 'getters'
import { showLeftNav } from 'actions'

export default {

  name: 'component_sideBar',

  vuex: {
  	getters: {
  		leftNavState: getLeftNavState
  	},
  	actions: { showLeftNav }
  }
};
</script>

<style lang="css" scoped>
.container {
	position: fixed; left: 0; right: 0; bottom: 0; top: 1rem;
	background-color: rgba(0, 0, 0, .5);
	z-index: 1;
}
.list-bg {
	width: 4.2rem; height: 100%;
	background-color: #282828;
	box-shadow: 0 1px 1px #363636 inset;
	border-top: 1px solid #222;
  transform: none;
}

.menu-item { line-height: 1rem; }
.menu-item a { display: block; padding: 0 0.32rem; border-bottom: 1px solid #333; color: #9a9a9a; font-size: 0.28rem; }
.icon-arrow-right { color: #666; font-size: 0.24rem; float: right; }

.fade-transition { transition: opacity .5s ease; will-change: transform; }
.fade-enter, .fade-leave { opacity: 0 }

.expand-transition { transition: all .4s ease; will-change: transform; }
.expand-enter, .expand-leave { transform: translateX(-100%); }

</style>