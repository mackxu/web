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
    created () {
      console.log('ContactsList created', this.contacts.length);
    },
    updated () {
      console.log('ContactsList updated');
    },
    computed: {
      validContacts () {
        // 筛选出符合的联系人
        return this.contacts.filter(({name}) => {
          return name.indexOf(this.filterText) !== -1;
        })
      }
    },
  }

</script>
