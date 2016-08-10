<template>
	<section class="film-list-wrap">
    <div class="list-nav clearfix">
      <a href="#" v-link="{path:'/films/now_playing'}" class="v-link">正在热播</a>
      <a href="#" v-link="{path:'/films/coming_soon'}" class="v-link">即将上映</a>
    </div>
    <ul class="film-list">
      <list-item :type="whichType" v-for="film in whichFilms" :film="film"></list-item>
    </ul>
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

// tab types
const COMING_SOON = 'coming_soon'
const NOW_PLAYING = 'now_playing'

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
    	type: NOW_PLAYING
    };
  },
  computed: {
  	whichType () {
  		return this.$route.params.type || this.type       // 如果params中存在type，取值之
  	},
    whichFilms () {
      return this.whichType === COMING_SOON ? this.comingSoonFilms : this.nowPlayingFilms
    }
  },
  components: {
    ListItem
  }
};
</script>

<style lang="css" scoped>
.film-list-wrap {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  background-color: #f9f9f9;
}
.list-nav {
  font-size: 0.32rem;
  color: #fe6e00;
  border-bottom: 1px solid currentColor;
}
.v-link {
  float: left;
  width: 50%;
  text-align: center;
  height: 0.92rem;
  line-height: 0.92rem;
  color: #6a6a6a;
}
.v-link-active {
  border-bottom: 2px solid currentColor;
  color: #fe6e00;
}
</style>