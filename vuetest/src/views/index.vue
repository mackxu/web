<style lang="css" scoped>
.container {
  position: relative;
  padding: 0 20px;
  height: 620px;
  overflow: hidden;
}
.main-wrapper {
  position: absolute; top: 0;
  transition: transform .5s;
  width: 100%;
  height: 9999px;
}
</style>
<template>
  <div class="container"
    v-scope.vert
    :data-focus-index="focusIndex"
    :data-offset="offset"
    data-focus-name="group">
    <div class="main-wrapper" :style="{transform: 'translateY(' + offset + 'px)'}">
      <hori
        data-group-name="list1"
        data-next='{"bottom": "list2"}'
        :current-scope="focusIndex === 0"
        :items="items">
      </hori>
      <hori
        data-group-name="list2"
        data-next='{"top": "list1", "bottom": "list3"}'
        :current-scope="focusIndex === 1"
        :items="items">
      </hori>
      <hori
        data-group-name="list3"
        data-next='{"top": "list2"}'
        :current-scope="focusIndex === 2"
        :items="items">
      </hori>
      <hori
        data-group-name="list3"
        data-next='{"top": "list2"}'
        :current-scope="focusIndex === 3"
        :items="items">
      </hori>
      <hori
        data-group-name="list3"
        data-next='{"top": "list2"}'
        :current-scope="focusIndex === 4"
        :items="items">
      </hori>
      <hori
        data-group-name="list3"
        data-next='{"top": "list2"}'
        :current-scope="focusIndex === 5"
        :items="items">
      </hori>
    </div>
  </div>
</template>

<script>
import Hori from './hori.vue'
export default {
  name: 'component_name-index',
  data () {
    return {
      msg: 'Hello Vue!',
      focusIndex: 0,
      offset: 0,
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  events: {
    updateFocus (name) {
      this.focusIndex += name
    },
    updateOffset (offset) {
      this.offset = offset
    }
  },
  components: { Hori }
}
</script>
