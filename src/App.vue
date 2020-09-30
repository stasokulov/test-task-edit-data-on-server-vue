<template>
  <div id="app">
    <div class="app-wrap">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    display: flex;
    justify-content: center;
    .app-wrap {
      max-width: 500px;
      width: 100%;
    }
  }
</style>
