<style lang="css" scoped="">

</style>

<template>
  <ul class="contacts-list">
    <contact-item
      v-for="contact in validContacts"
      :name="contact.name"
      :email="contact.email"
      :key="contact.email">
    </contact-item>
  </ul>
</template>
<script>
  import ContactItem from './ContactItem';
  export default {
    name: 'ContactsList',
    components: {
      ContactItem
    },
    props: {
      contacts: Array,
      filterText: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        validContacts: []
      }
    },
    created () {
      console.log('ContactsList created');
      this.filterContacts();
    },
    updated () {
      console.log('ContactsList updated');
    },
    methods: {
      filterContacts () {
        this.validContacts = this.contacts.filter(({name}) => {
//          console.log(name);
          return name.indexOf(this.filterText) !== -1;
        })
      }
    },
    watch: {
      filterText () {             // 监听filterText的更改
        this.filterContacts();
      }
    }
  }

</script>
