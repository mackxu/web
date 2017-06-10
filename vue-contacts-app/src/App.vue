<template>
  <div id="app">
    <contacts-app :contacts="contacts" />
  </div>
</template>

<script>
import ContactsApp from './components/ContactsApp.vue';

export default {
  name: 'app',
  data () {
    return {
      contacts: [
        { name: 'zhangsan', email: 'ddswdfff@nfkd.com' },
        { name: 'lisi', email: 'y482y49@ggg.com' },
        { name: 'wanger', email: 'fkngkdl@kkk.com' },
        { name: 'laoli', email: '492nkjrj@sdsd.com' },
      ]
    }
  },
  components: {
    ContactsApp
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
