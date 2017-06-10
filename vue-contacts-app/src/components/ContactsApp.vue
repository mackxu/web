<style lang="css" scoped>

</style>

<template>
  <div>
    <search-bar />
    <contacts-list :contacts="contacts" />
  </div>
</template>
<script>
  import SearchBar from './SearchBar.vue';
  import ContactsList from './ContactsList.vue';
  export default {
    name: 'ContactsApp',
    props: {
      contacts: Array
    },
    components: {
    		SearchBar,
        ContactsList
    }
  }

</script>
