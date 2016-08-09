<template>
	<li>
		<a class="movie-item" v-link="{path:'/film/' + film.id}">
	  		<div class="movie-cover">
		      	<img :src="film.cover.origin" :alt="film.name" class="img-responsive">
		    </div>
		    <div class="movie-desc clearfix">
		      <div class="movie-desc-aside">
		        <p class="movie-name" v-text="film.name"></p>
		        <p class="movie-intro" v-text="film.intro"></p>
		        <div class="movie-count" v-if="type === 'NOW_PLAYING'">{{film.cinemaCount}}家影院上映 {{film.watchCount}}人购票</div>
		      </div>
		      <div class="movie-desc-bside movie-score" v-if="type === 'NOW_PLAYING'">{{ film.grade }}</div>
		      <div class="movie-desc-bside movie-premiereAt" v-if="type === 'COMING_SOON'" v-text="film.premiereAt | format 'M月DD日上映'"></div>
		    </div>
	  	</a>
	</li>
</template>

<script>
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
  }
};
</script>

<style lang="css" scoped>
</style>