<template>
  <div class="form-wrap">
    <form>
      <div class="form-group">
        <label for="email">Введите email (admin@admin.com)</label>
        <input type="email"
               class="form-control"
               id="email"
               placeholder="email@email.com"
               v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Введите пароль (123)</label>
        <input type="password"
               class="form-control"
               id="password"
               placeholder="password"
               v-model="password">
      </div>
      <button type="submit"
              class="btn btn-primary"
              @click.prevent="startAuthorization"
      >Submit</button>
    </form>
    <div class="modal" :class="{ showModal: showErrorModal }">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Пара почта-пароль не найдена</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span @click="showErrorModal = false">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Попробуйте еще раз</p>
          </div>
          <div class="modal-footer">
            <button @click="showErrorModal = false" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <modal-loading/>
  </div>
</template>

<script>
    import ModalLoading from "../components/Modal-loading"
    export default {
        name: 'Form',
        components: {
            ModalLoading
        },
        data() {
          return {
              email: '',
              password: '',
              showErrorModal: false
          }
        },
        methods: {
            startAuthorization: function () {
                this.$store.dispatch('loadData')
            }
        },
        computed: {
            usersFromStore() {
                return this.$store.getters.getData
            },
            loadingStatus() {
                return this.$store.getters.getLoadingStatus
            },
        },
        watch: {
            usersFromStore: function () {
                if (this.usersFromStore) {
                    this.usersFromStore.forEach(user => {
                        if (user.email === this.email && user.password === this.password) {
                            document.location.href = '#/users'
                        } else {
                            this.showErrorModal = true
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  form {
    padding: 10px;
  }
  .modal {
    background-color: rgba(0, 0, 0, .5);
    &.showModal {
      display: block;
    }
  }
</style>
