<template>
    <section class="container">
        <swipe class="my-swipe" v-if="billboards">
            <swipe-item v-for="billboard in billboards">
                <a href="{{billboard.url}}">
                    <img :src="billboard.imageUrl" alt="">
                </a>
            </swipe-item>
        </swipe>
        <div class="movie">
            <now-playing :films="nowPlayingFilms" v-if="nowPlayingFilms"></now-playing>
            <coming-soon :films="comingSoonFilms" v-if="comingSoonFilms"></coming-soon>
        </div>
    </section>
</template>

<script>
require('vue-swipe/dist/vue-swipe.css')
import { Swipe, SwipeItem } from 'vue-swipe'
import NowPlaying from './NowPlaying'
import ComingSoon from './ComingSoon'

import {
    getComingSoonFilms,
    getBillboards,
    getNowPlayingFilms
} from 'getters'

import {
    fetchComingSoonFilms,
    fetchNowPlayingFilms,
    fetchBillboards
} from 'actions'

export default {

  name: 'component_home',

  vuex: {
    getters: {
        comingSoonFilms: getComingSoonFilms,
        nowPlayingFilms: getNowPlayingFilms,
        billboards: getBillboards
    },
    actions: {
        fetchBillboards,
        fetchNowPlayingFilms,
        fetchComingSoonFilms
    }
  },
  route: {
    data () {
      console.log('!!route data');
      return Promise.all([
        this.fetchBillboards(),
        this.fetchNowPlayingFilms(1, 5),
        this.fetchComingSoonFilms(1, 5)
      ]);
    }
  },
  components: {
    NowPlaying,
    ComingSoon,
    Swipe,
    SwipeItem
  }
};
</script>

<style lang="css" scoped>
  .my-swipe{
    height: 3.6rem;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    overflow: hidden;

    margin-bottom: 0.32rem;
  }
  .swipe-item { will-change: transform; }
  .my-swipe img{
    width: 100%;
    display: block;
    transform: translateZ(0);
  }
</style>