<template>
    <div class="coming-soon">
        <!-- {{ films | json }} -->
    </div>
</template>

<script>
export default {

  name: 'component_ComingSoon',
  props: {
    films: {
        type: Array,
        required: true
    }
  }
};
</script>

<style lang="css" scoped>
</style>