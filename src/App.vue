<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'App',
    components: {
    },
    data() {
      return {

      }
    },
    methods: {

    },
  }
</script>

<style>


  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body, html, div {
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
