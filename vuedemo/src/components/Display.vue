<template>
  <div>
    <h3>Count is {{countValue}}</h3>
  </div>
</template>

<script>
import { getCount } from '../vuex/getters'

export default {

  name: 'Display',

  vuex: {
    getters: {
      countValue: getCount
    }
  }
}
</script>

<style lang="css" scoped>
</style>