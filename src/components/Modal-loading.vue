<template>
  <div class="modal" :class="{ showModal: loadingStatus }">
    <div class="modal-message">
      Обновление...
    </div>
  </div>
</template>

<script>
  export default {
      name: 'Modal-loading',
      computed: {
          loadingStatus() {
              return this.$store.getters.getLoadingStatus
          },
      }
  }
</script>

<style lang="scss" scoped>
  .modal {
    background-color: rgba(0,0,0,.5);
    &.showModal {
      display: block;
    }
      .modal-message {
        margin-top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font-size: 40px;
        color: #fff;
    }
  }
</style>
