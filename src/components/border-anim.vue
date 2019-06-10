<template>
  <div class="m-container">
    <div class="b-container" @mouseenter="bWidth='50%';bHeight='50%'" @mouseleave="bWidth=0;bHeight=0">
      <img src="../assets/imgs/sunflower.jpg" width="100%" height="100%" style="cursor: pointer;">
      <div class="tb" v-bind:style="{width:bWidth}"></div>
      <div class="bb" v-bind:style="{width:bWidth}"></div>
      <div class="rb" v-bind:style="{height:bHeight}"></div>
      <div class="lb" v-bind:style="{height:bHeight}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "border-anim",
    data() {
      return {
        bWidth: 0,
        bHeight: 0
      }
    }
  }
</script>

<style scoped>
  .m-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .b-container {
    width: 400px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 1rem;
  }

  .tb {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    border-top: 1px solid green;
    transition: width ease-in-out 1s;
    box-sizing: border-box;
  }

  .lb {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50%;
    border-left: 1px solid green;
    transition: height ease-in-out 1s;
    box-sizing: border-box;
  }

  .rb {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    border-right: 1px solid green;
    transition: height ease-in-out 1s;
    box-sizing: border-box;
  }

  .bb {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    border-bottom: 1px solid green;
    transition: width ease-in-out 1s;
    box-sizing: border-box;
  }
</style>
