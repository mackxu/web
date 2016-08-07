<template>
  <ul class="now-playing list">
		<movie-item type="NOW_PLAYING" v-for="film in films" :film="film"></movie-item>
  </ul>
	<more-button v-link="{path:'/films/now-playing'}">更多热映电影</more-button>
</template>

<script>
import MovieItem from '../../components/MovieItem'
import MoreButton from '../../components/MoreButton'

export default {

  name: 'component_NowPlaying',
  props: {
  	films: {
  		type: Array,
  		required: true
  	}
  },

  components: {
  	MovieItem, MoreButton
  }
};
</script>

<style lang="css" scoped>
</style>