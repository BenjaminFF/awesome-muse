<template>
  <div class="m-container">
    <canvas class="m-canvas">
    </canvas>
  </div>
</template>

<script>
  export default {
    name: "RoughMobile",
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods: {
      init() {
        let mCanvas = document.getElementsByClassName('m-canvas')[0];
        mCanvas.width = mCanvas.clientWidth;
        mCanvas.height = mCanvas.clientHeight;
        const rc = rough.canvas(mCanvas);
        this.drawMobile(rc);
      },
      drawMobile(rc) {
        rc.rectangle(150, 20, 100, 10);
        //rc.rectangle(10, 10, 380, 780, {roughness:0.3,strokeWidth: 1});
        rc.line(30, 10, 370, 10,{roughness: 0.3, strokeWidth: 1});
        rc.arc(30, 30, 40, 40, Math.PI, 1.5*Math.PI,false,{roughness: 0.3, strokeWidth: 1});
        rc.line(10, 30, 10, 770,{roughness: 0.3, strokeWidth: 1});
        rc.arc(30, 770, 40, 40, 0.5*Math.PI, Math.PI,false,{roughness: 0.3, strokeWidth: 1});
        rc.line(30, 790, 370, 790,{roughness: 0.3, strokeWidth: 1});
        rc.arc(370, 770, 40, 40, 0, 0.5*Math.PI,false,{roughness: 0.3, strokeWidth: 1});
        rc.line(390, 770, 390, 30,{roughness: 0.3, strokeWidth: 1});
        rc.arc(370, 30, 40, 40, 1.5*Math.PI, 2*Math.PI,false,{roughness: 0.3, strokeWidth: 1});

        rc.rectangle(20, 40, 360, 700, {roughness: 0.3, strokeWidth: 1});
        rc.arc(160, 765, 20, 20, 0.5 * Math.PI, 1.5 * Math.PI);
        rc.line(160, 755, 240, 755);
        rc.arc(240, 765, 20, 20, -0.5 * Math.PI, 0.5 * Math.PI);
        rc.line(160, 775, 240, 775);
      },
      fetchData() {

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

  .m-canvas {
    width: 400px;
    height: 800px
  }
</style>
