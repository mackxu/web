<template>
  <div id="app">
    <contacts-app :contacts="contacts"/>
  </div>
</template>

<script>
  import ContactsApp from './components/ContactsApp.vue';
  import API from './api'

  export default {
    name: 'app',
    components: {
      ContactsApp
    },
    data () {
      return {
        contacts: []
      }
    },
    created () {
      this.fetchAllContacts();
    },
    methods: {
      fetchAllContacts () {
        console.log('app fetchAllContacts');
        API.Contacts.getAllContacts().then(res => {
          console.log(res);
          this.contacts = res.data;
        }).catch(e => console.log(e))
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
