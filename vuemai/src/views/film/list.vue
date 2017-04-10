<style lang="css" scoped>
.film-list-wrap {
  background-color: #f9f9f9;
}
.list-nav, .filmList-container {
  padding: 0 0.3rem;
} 
.list-nav {
  font-size: 0.32rem;
  color: #fe6e00;
  
}
.list-nav::after {
  content: "";
  display: block;
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

.filmList-container {
  position: absolute;
  top: calc(1.92rem + 1px); bottom: 0; left: 0; right: 0;
  overflow: scroll;
  background-color: #f9f9f9;
}

</style>
<template>
	<section class="film-list-wrap">
    <div class="list-nav clearfix">
      <a href="#" v-link="{path:'/films/now_playing', replace: true}" class="v-link">正在热播</a>
      <a href="#" v-link="{path:'/films/coming_soon', replace: true}" class="v-link">即将上映</a>
    </div>
    <div class="filmList-container">
      <ul class="film-list" v-if="whichFilms">
        <list-item :type="whichType" v-for="film in whichFilms" :film="film"></list-item>
      </ul>
    </div>
    
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
      console.log('!!whichFilms');
      return this.whichType === COMING_SOON ? this.comingSoonFilms : this.nowPlayingFilms
    }
  },
  route: {
    data() {
      console.log('!!route data');
      this.whichType === COMING_SOON ?
        this.fetchComingSoonFilms(1, 10) : this.fetchNowPlayingFilms(1, 10)
    }
  },
  components: {
    ListItem
  }
};
</script>

