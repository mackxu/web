<template>
    <section class="movie-view">
        <div class="movie-cover-wrap">
            <img :src="film.cover.origin" class="img-responsive" alt="">
        </div>
        <div class="movie-intro">
        	<div class="movie-title">影片介绍</div>
        	<dl>
        		<dt>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:</dt><dd v-text="film.director"></dd><br>
        		<dt>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:</dt><dd v-text="film.actors | actorsList"></dd><br>
        		<dt>地区语言:</dt><dd v-text="film.language"></dd><br>
        		<dt>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</dt><dd v-text="film.category"></dd><br>
        		<dt>上映时间:</dt><dd v-text="film.premiereAt | timestampFormat 'M月DD日上映'"></dd>
        	</dl>
        	<div class="movie-synopsis" v-text="film.synopsis"></div>
        </div>
    </section> 
</template>

<script>
import { getDetail } from 'getters'
import { fetchFilmDetail } from 'actions'
import { timestampFormat } from '../../filters'
export default {

  name: 'component_film-detail',
  vuex: {
    getters: {
        film: getDetail
    },
    actions: {
        fetchFilmDetail
    }
  },
  filters: {
    timestampFormat,
    actorsList (actions) {
        return actions.slice(0, 4).map((action) => action.name ).join('|')
    }
  }
};
</script>

<style lang="css" scoped>
.movie-view {
    
}
dt, dd { display: inline-block; }
</style>