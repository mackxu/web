<style lang="css" scoped="">

</style>

<template>
  <ul class="contacts-list">
    <!--<li v-for="contact in contacts" >-->
      <!--<contact-item :name="{{contact.name}}" :email="{{contact.email}}"></contact-item>-->
    <!--</li>-->
    <contact-item
      v-for="contact in contacts"
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
    props: {
      contacts: Array
    },
    components: {
      ContactItem
    }
  }

</script>
