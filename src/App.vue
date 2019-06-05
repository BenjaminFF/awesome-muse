<template>
  <div id="app">
    <clipping-mask></clipping-mask>
  </div>
</template>

<script>
  import RoughMobile from './components/roughmuse/rough-mobile'
  import CircleDot from "./components/circle-dot";
  import ClippingMask from "./components/clipping-mask";
  export default {
    name: 'App',
    components: {ClippingMask, CircleDot, RoughMobile},
    data() {
      return {

      }
    },
    created() {
    },
    methods: {
      init() {

      },
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
