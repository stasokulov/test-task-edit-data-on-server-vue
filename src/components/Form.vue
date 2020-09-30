<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email"
             class="form-control"
             id="exampleInputEmail1"
             v-model="email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password"
             class="form-control"
             id="exampleInputPassword1"
             v-model="password">
    </div>
    <button type="submit"
            class="btn btn-primary"
            @click.prevent="goToContactList"
    >Submit</button>
  </form>
</template>

<script>
export default {
  name: 'Form',
    data() {
      return {
          email: '',
          password: ''
      }
    },
  props: {
    msg: String
  },
  methods: {
      goToContactList: function () {
          document.location.href = '#/about';
      }
  }
}
</script>

<style scoped lang="scss">
form {
  padding: 10px;
}
</style>
