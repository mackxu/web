<template>
film detail {{ $route.params.id }}
<pre>
    {{$route | json}}
</pre>
<a href="#" v-link="{name: 'detail', params: { id: 'test' }, activeClass: 'custom-class'}">xxxx</a>
</template>

<script>
export default {

  name: 'component_filmDetail',

  data () {
    return {
      
    };
  }
};
</script>

<style lang="css" scoped>
</style>