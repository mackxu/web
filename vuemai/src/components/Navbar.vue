<template>
    <nav class="app-nav">
    	<a href="javascript:;" class="fl aside" @click="showLeftNav()">
    		<div class="fl navbar-title-icon"><i class="iconfont icon-list"></i></div>
    		<h1 class="fl text-overflow title">爱奇艺电影</h1>
    	</a>
    	<div class="fr bside">
    		<a href="#" v-link="{path:'/city'}" class="fl nav-city">
    			<span class="city-content">北京</span>
    			<i class="iconfont icon-dropdown"></i>
    		</a>
    		<a href="#" v-link="{path:'/center'}" class="fl nav-user">
    			<i class="iconfont icon-user"></i>
    		</a>
    	</div>
    </nav>
</template>

<script>

import { showLeftNav } from 'actions'

export default {

  name: 'component_navbar',
  vuex: {
  	actions: {
  		showLeftNav
  	}
  }
};
</script>

<style lang="css" scoped>
.app-nav {
	position: fixed; left: 0; right: 0; top: 0; z-index: 500;
	overflow: hidden;
	height: 1rem; line-height: 1rem;

	background-color: #282828;
}
.navbar-title-icon {
	width: 0.96rem;
	border-right: 1px solid #222;
	box-shadow: 1px 0 1px #363636;
	color: #999;
	text-align: center;
}

.title { 
	color: #efefef; font-size: 0.28rem; padding: 0 0.2rem;
	width: 3.2rem; 
}
.bside a { color: #999 }
.nav-user { width: 0.96rem; text-align: center; }
</style>