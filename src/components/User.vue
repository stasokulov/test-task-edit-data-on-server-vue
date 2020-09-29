<template>
  <li>
    <div class="user">
      <div class="user-data-item">{{user.name}}</div>
      <div class="user-data-item">{{user.email}}</div>
      <div class="user-data-item">{{user.phone}}</div>
    </div>
    <div>
      <button @click="createUser">Редактировать</button>
      <button @click="getUsers">Удалить</button>
    </div>
  </li>
</template>

<script>
  export default {
      name: 'User',
      props: {
          user: [Object, String]
      },
      methods: {
          createUser: function () {
              fetch('https://jsonplaceholder.typicode.com/users', {
                  method: 'POST',
                  body: JSON.stringify({
                      address: {},
                      company: {},
                      email: "test@test.biz",
                      name: "Test Test",
                      phone: "+79505656560",
                      username: "Test",
                      website: "test.org"

                  }),
                  headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                  },
              })
                  .then((response) => response.json())
                  .then((json) => console.log(json))
          },
          getUsers: function () {
              fetch('https://jsonplaceholder.typicode.com/users')
              .then(response => response.json())
              .then(json => {console.log(json)})
          }
      }
  }
</script>

<style lang="scss">
li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  padding: 15px;
  max-width: 500px;
  width: 100%;
  .user {
    display: flex;
    flex-direction: column;
    .user-data-item {
      text-align: left;
    }
  }
}
</style>
