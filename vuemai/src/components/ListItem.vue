<template>
	<li class="movie-item-wrap">
		<a class="movie-item clearfix" v-link="{path:'/film/' + film.id}">
	  		<div class="movie-cover">
		      	<img :src="film.poster.thumbnail" :alt="film.name" class="img-responsive">
		    </div>
		    <div class="movie-desc">
		    	<div class="movie-next-arrow"><i class="iconfont icon-arrow-right movie-next-icon"></i></div>
		    	<div class="movie-score" v-if="type === 'now_playing'" v-text="film.grade"></div>
		      	<p class="movie-name" v-text="film.name"></p>
		        <p class="movie-intro" v-text="film.intro"></p>
		        <div class="movie-count" v-if="type === 'now_playing'">
		        	<span v-text="film.cinemaCount"></span>家影院上映&nbsp;&nbsp;&nbsp;&nbsp;<span v-text="film.watchCount"></span>人购票
		        </div>
		      	<div class="movie-premiereAt" v-if="type === 'coming_soon'">
		      		<span v-text="film.premiereAt | timestampFormat 'M月DD日上映'"></span>&nbsp;&nbsp;&nbsp;&nbsp;
		      		<span v-text="film.premiereAt | timestampFormat '星期dddd'"></span>
		      	</div>
		    </div>
	  	</a>
	</li>
</template>

<script>

import { timestampFormat } from '../filters'

export default {

  name: 'component_list-item',

  props: {
  	type: {
  		type: String,
  		default: 'now_playing'
  	},
  	film: {
  		type: Object,
  		require: true
  	}
  },
  filters: {
  	timestampFormat
  }
};
</script>

<style lang="css" scoped>
.movie-item-wrap + .movie-item-wrap { border-top: dashed 1px #c9c9c9; }
.movie-item {
	display: block;
	padding: 0.4rem 0;
	color: #8e8e8e;
	font-size: 0.24rem;
}
.movie-desc {
	padding-left: 1.4rem;
}
.movie-cover {
	width: 1.2rem;
	float: left;
}
.movie-name { color: #000; font-size: 0.32rem; line-height: 2; margin-bottom: 0.16rem; }
.movie-next-arrow { float: right; line-height: 0.6rem; color: #c6c6c6; }
.movie-score { float: right; line-height: 0.64rem; color: #fc7103; font-size: 0.32rem; }
.movie-intro { margin-bottom: 0.2rem; }
.movie-count span { color: #8aa2bf; }
.movie-premiereAt { color: #ffb375; }
</style>