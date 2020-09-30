<template>
  <div class="users-wrap">
    <div id="nav">
      <router-link to="/">На страницу входа</router-link>
    </div>
    <div class="users" v-if="!loadingStatus">
      <h1>Контакты</h1>
      <ul>
        <user v-for="user in usersFromStore"
              :key="user.id"
              :user="user"
        ></user>
      </ul>
      <button v-if="!showInputs"
              @click="showInputs = true"
              class="btn btn-primary"
      >
        Добавить контакт
      </button>
      <div class="adduser" v-if="showInputs">
        <div class="adduser-inputs">
          <input class="form-control" type="text" v-model="newUser.name" placeholder="Введите имя"/>
          <input class="form-control" type="text" v-model="newUser.username" placeholder="Введите икнейм"/>
          <input class="form-control" type="text" v-model="newUser.email" placeholder="Введите почту"/>
        </div>
        <button @click="createUser" class="btn btn-success">Сохранить</button>
        <button @click="cancelCreateUser" class="btn btn-secondary">Отменить</button>
      </div>
    </div>
    <modal-loading/>
  </div>
</template>

<script>
  import User from '@/components/User.vue'
  import ModalLoading from "../components/Modal-loading"
  export default {
      name: 'Users',
      components: {
          ModalLoading,
          User
      },
      created() {
          this.$store.dispatch('loadData')
      },
      data() {
          return {
              newUser: {
                  email: '',
                  name: '',
                  username: ''
              },
              showInputs: false
          }
      },
      methods: {
          createUser: function () {
              this.$store.dispatch('addUser', this.newUser)
              this.cleanInputs()
              this.showInputs = false
          },
          cancelCreateUser: function () {
              this.cleanInputs()
              this.showInputs = false
          },
          cleanInputs: function () {
              for (let itemKey in this.newUser) {
                  this.newUser[itemKey] = ''
              }
          }
      },
      computed: {
          usersFromStore() {
              return this.$store.getters.getData
          },
          loadingStatus() {
              return this.$store.getters.getLoadingStatus
          },
      }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .app-wrap {
      max-width: 500px;
      margin: auto;
    }
    #nav {
      padding: 30px;

      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }
  .users-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .users {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
      }
      .adduser-inputs {
        display: flex;
        flex-direction: column;
        input {
          margin-bottom: 5px;
        }

      }
      button {
        margin: 10px;
      }
    }
  }
</style>
