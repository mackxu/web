<template>
film detail {{filmId}}
</template>

<script>
export default {

  name: 'component_filmDetail',

  data () {
    return {
      filmId: this.$route.params.id
    };
  }
};
</script>

<style lang="css" scoped>
</style>