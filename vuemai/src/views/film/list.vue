<template>
	<div>{{ whichType }}</div>
</template>

<script>
export default {

  name: 'component_filmList',

  data () {
    return {
    	type: 'NOW_PLAYING'
    };
  },
  computed: {
  	whichType () {
  		// 如果query中存在type，取值之
  		return this.$route.params.type || this.type
  	}
  },
  ready() {
    console.log('list ready!');
  },
  created () {
    console.log('list created!');
  }
};
</script>

<style lang="css" scoped>
</style>