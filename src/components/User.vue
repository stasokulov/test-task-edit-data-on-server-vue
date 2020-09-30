<template>
  <li class="row">
    <div class="col-sm-6 user">
      <div v-if="!editInProcess">
        <div class="user-data-item">{{user.name}}</div>
        <div class="user-data-item">{{user.username}}</div>
        <div class="user-data-item">{{user.email}}</div>
      </div>
      <div class="inputs" v-if="editInProcess">
        <input type="text" v-model="tempUser.name">
        <input type="text" v-model="tempUser.username">
        <input type="text" v-model="tempUser.email">
      </div>
    </div>
    <div class="col-sm-6 buttons">
      <button @click="startEditUser" v-if="!editInProcess" class="btn btn-primary">Редактировать</button>
      <button @click="deleteUser(user.id)" v-if="!editInProcess" class="btn btn-primary">Удалить</button>
      <button @click="editUser" v-if="editInProcess" class="btn btn-success">Сохранить</button>
      <button @click="cancelEditUser" v-if="editInProcess" class="btn btn-secondary">Отмена</button>
    </div>
  </li>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
            editInProcess: false,
            tempUser: ''
        }
    },
    props: {
        user: [Object, String]
    },
    methods: {
        deleteUser: function (id) {
            this.$store.dispatch('deleteUser', id)
        },
        startEditUser: function () {
            this.tempUser = Object.assign({}, this.user)
            this.editInProcess = true
        },
        editUser: function () {
            this.$store.dispatch('editUser', this.tempUser)
            this.editInProcess = false
        },
        cancelEditUser: function () {
            this.tempUser = ''
            this.editInProcess = false
        }
    }
}
</script>

<style lang="scss" scoped>
li {
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  .user {
    margin-bottom: 20px;
    .user-data-item {
      text-align: left;
    }
    .inputs {
      display: flex;
      flex-direction: column;
    }
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  button {
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>
