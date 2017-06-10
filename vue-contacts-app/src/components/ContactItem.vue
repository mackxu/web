<style lang="css" scoped="">

</style>

<template>
    <li>{{name}}--{{email}}</li>
</template>
<script>

  export default {
    name: 'ContactItem',
    props: {
      name: { type: String, required: true },
      email: String
    }
  }

</script>
