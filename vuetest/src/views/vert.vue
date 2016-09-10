<style>

</style>
<template>
  <Vert :items="items" :current-scope="true"></Vert>
</template>

<script>
import Vert from './vert-content.vue'
export default {
  data () {
    return {
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  components: { Vert }
}
</script>
