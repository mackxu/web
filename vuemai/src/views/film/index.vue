<template>
{{ $route.query | json }}
{{ whichType }}
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
  		return this.$route.query.type || this.type
  	}
  }
};
</script>

<style lang="css" scoped>
</style>