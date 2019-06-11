<template>
  <div id="app">
    <awesome-draw></awesome-draw>
  </div>
</template>

<script>
  import RoughMobile from './components/roughmuse/rough-mobile'
  import CircleDot from "./components/circle-dot";
  import ClippingMask from "./components/clipping-mask";
  import SchulteTable from "./components/schulte-table";
  import SnakeMove from "./components/snake-move";
  import BorderAnim from "./components/border-anim";
  import MyClock from "./components/my-clock";
  import FingerSnap from "./components/finger-snap";
  import AwesomeDraw from "./components/awesome-draw";
  export default {
    name: 'App',
    components: {
      AwesomeDraw,
      FingerSnap, MyClock, BorderAnim, SnakeMove, SchulteTable, ClippingMask, CircleDot, RoughMobile},
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
