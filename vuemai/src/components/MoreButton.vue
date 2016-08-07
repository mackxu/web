<template>
	<a class="more-button">
		<slot></slot>
	</a>
</template>

<style lang="css" scoped>
	.more-button {
		display: block;
		width: 3.2rem;
	  height: 0.6rem;
	  border: 1px solid #aaa;
	  border-radius: 0.3rem;
	  margin: 0.2rem auto 0.6rem;
	  text-align: center;
	  line-height: 0.6rem;
	  font-size: 0.24rem;
	  color: #616161;
	}
</style>

<script>
export default {

  name: 'component_more-button',

  data () {
    return {

    };
  }
};
</script>