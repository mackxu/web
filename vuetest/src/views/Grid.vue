<style>

</style>
<template>
  <Grid :items="items" class="current-scope" data-current-scope></Grid>
</template>

<script>
import Grid from './grid-content.vue'
export default {
  data () {
    return {
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  methods: {
    selectComponet (name) {
      this.currentView = name
    }
  },
  components: { Grid }
}
</script>
