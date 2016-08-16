<template>
	<a class="more-button"><slot></slot></a>
</template>

<style lang="css" scoped>
	.more-button {
		display: block;
		width: 3.2rem;
	  	padding: 0.16rem 0;
	  	border: 1px solid #aaa;
	  	border-radius: 0.3rem;
	  	margin: 0.2rem auto 0.6rem;
	  	text-align: center;
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