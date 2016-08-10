<template>
    <div class="coming-soon">
        <header class="title">即将上线</header>
        <ul class="movie">
          <movie-item type="COMING_SOON" v-for="film in films" :film="film"></movie-item>
        </ul>
        <!-- 此处需要参数 与正在热映列表区分 -->
        <more-button v-link="{path: '/films/coming_soon'}">更多即将上映的电影</more-button>
    </div>
</template>

<script>
import MovieItem from '../../components/MovieItem'
import MoreButton from '../../components/MoreButton'

export default {

  name: 'component_ComingSoon',
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
  .coming-soon {
    padding-top: 0.6rem;
    border-top: 1px solid #a7a7a7;

    position: relative;
  }
  .title {
    font-size: 0.24rem;
    color: #eee;
    background-color: #a7a7a7;
    border-radius: 10%;
    padding: 0.08rem 0.12rem;

    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
  }
</style>