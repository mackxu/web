<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <!-- <demo></demo> -->
    <div class="container"
      v-scope.group
      :data-focus-index="focusIndex"
      data-focus-name="group">
      <hori
        data-group-name="list1"
        data-next='{"bottom": "list2"}'
        :current-scope="focusIndex === 'list1'"
        :items="items">
      </hori>
      <hori
        data-group-name="list2"
        data-next='{"top": "list1", "bottom": "list3"}'
        :current-scope="focusIndex === 'list2'"
        :items="items">
      </hori>
      <hori
        data-group-name="list3"
        data-next='{"top": "list2"}'
        :current-scope="focusIndex === 'list3'"
        :items="items">
      </hori>
    </div>
  </div>
</template>

<script>
import Demo from './views/demo.vue'
import Hori from './views/hori.vue'
export default {
  data () {
    return {
      msg: 'Hello Vue!',
      focusIndex: 'list1',
      offset: 0,
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    changeFocus (step) {
      this.focusIndex += step
    }
  },
  events: {
    updateFocus (name) {
      this.focusIndex = name
    },
    updateXOffset (offset) {
      this.listTop = offset
    }
  },
  components: { Demo, Hori }
}
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  padding: 0;
  margin: 0;
}
ul { list-style: none; }
body {
  font-family: Helvetica, sans-serif;
}
html, body { height: 100%; }
.container { padding: 0 20px; }
</style>
