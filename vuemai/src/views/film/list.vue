<template>
	<section class="film-list-wrap">
    <div class="list-nav">
      <a href="#" v-link="{path:'/films/now_playing'}">正在热播</a>
      <a href="#" v-link="{path:'/films/coming-soon'}">即将上映</a>
    </div>
    <ul class="film-list">

      <list-item :type="whichType" v-for="film in whichFilms"></list-item>
    </ul>
    <div>{{ whichFilms | json }}</div>
  </section>
</template>

<script>

import {
    getComingSoonFilms,
    getNowPlayingFilms
} from 'getters'

import {
    fetchComingSoonFilms,
    fetchNowPlayingFilms,
} from 'actions'

import ListItem from '../../components/ListItem'

export default {

  name: 'component_film-list',

  vuex: {
    getters: {
      comingSoonFilms: getComingSoonFilms,
      nowPlayingFilms: getNowPlayingFilms
    },
    actions: {
      fetchNowPlayingFilms,
      fetchComingSoonFilms
    }
  },

  data () {
    return {
    	type: 'now_playing'
    };
  },
  computed: {
  	whichType () {
  		return this.$route.params.type || this.type       // 如果params中存在type，取值之
  	},
    whichFilms () {
      return this.whichType === 'coming_soon' ? this.comingSoonFilms : this.nowPlayingFilms
    }
  },
  components: {
    ListItem
  }
};
</script>

<style lang="css" scoped>
.film-list-wrap {
  font-size: 0.3rem;
}
</style>