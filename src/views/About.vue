<template>
  <div class="users-wrap">
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
        <button @click="cancelCreateUser" class="btn btn-primary">Отменить</button>
      </div>
    </div>
    <div class="modal" :class="{ showModal: loadingStatus }">
      <div class="modal-message">
        Обновление...
      </div>
    </div>
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
          this.$store.dispatch('getData')
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
  .users-wrap {
    display: flex;
    justify-content: center;
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
  .modal {
    &.showModal {
      display: block;
    }
    .modal-message {
      margin-top: 50%;
      transform: translateY(-50%);
      font-size: 40px;
    }
  }

</style>
