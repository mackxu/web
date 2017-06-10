<style lang="css" scoped>

</style>

<template>
  <div>
    <search-bar :filterText="filterText" @userInput="handleUserInput" />
    <contacts-list :contacts="contacts" :filterText="filterText" />
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
    data () {
      return {
        filterText: '',
      }
    },
    components: {
      SearchBar,
      ContactsList
    },
    methods: {
      handleUserInput(text) {
        this.filterText = text;
      }
    }
  }

</script>
