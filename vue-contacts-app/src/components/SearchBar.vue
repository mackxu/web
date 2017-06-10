<style lang="css" scoped="">

</style>

<template>
  <div>
    <input
      type="text" placeholder="search contact"
      :value="filterText"
      @input="handleInput"/>
  </div>
</template>
<script>

  export default {
    name: 'SearchBar',
    props: {
      filterText: {
        type: String,
        required: true
      }
    },
    updated () {
      console.log('SearchBar updated');
    },
    methods: {
      handleInput (e) {
        this.$emit('userInput', e.target.value);
      }
    },
//    watch: {
//      filterText () {
//        console.log('SearchBar filterText updated');
//      }
//    }
  }

</script>
