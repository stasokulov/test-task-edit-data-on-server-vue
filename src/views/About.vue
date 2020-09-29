<template>
  <div class="about">
    <h1>Контакты</h1>
    <ul>
      <user v-for="user in usersFromStore"
            :key="user.id"
            :user="user"
      ></user>
    </ul>
  </div>
</template>

<script>
  import User from '@/components/User.vue'
  export default {
      name: 'About',
      components: {
          User
      },
      created() {
          this.$store.dispatch('getData', 'Это payload')
      },
      data() {
          return {
              dataInAbout: 'data in About'
          }
      },
      computed: {
          usersFromStore() {
              return this.$store.getters.getData
          }
      }
  }
</script>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
</style>
