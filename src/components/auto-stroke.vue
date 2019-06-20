<template>
  <div class="m-container">
    <svg width="1400px" height="400px" class="m-svg">
      <path d="M 160 120 L 40 120 L 40 280 L 160 280" stroke="#FF0000" fill="transparent"
            class="path-e1 m-path"
            :style="{'stroke-dashoffset':dash_offsets.E1,'stroke-dasharray':dash_arrays.E1}"></path>
      <path d="M 40 200 L 160 200" stroke="#FF0000" fill="transparent"
            class="path-e2 m-path" :style="{'stroke-dashoffset':dash_offsets.E2,'stroke-dasharray':dash_arrays.E2}"></path>
      <path d="M 240 120 L 280 280 L 320 200 L 360 280 L 400 120" stroke="#FF7F00"
            fill="transparent" class="path-w m-path" :style="{'stroke-dashoffset':dash_offsets.W,'stroke-dasharray':dash_arrays.W}"></path>
      <path d="M 480 120 L 480 280" stroke="#FFFF00" fill="transparent"
            class="path-i1 m-path" :style="{'stroke-dashoffset':dash_offsets.I1,'stroke-dasharray':dash_arrays.I1}"></path>
      <path d="M 676 120 C 600 116 560 144 560 200 C 560 252 600 280 676 272 L 676 208 L 620 208" stroke="#00FF00"
            fill="transparent" class="path-g m-path" :style="{'stroke-dashoffset':dash_offsets.G,'stroke-dasharray':dash_arrays.G}"></path>
      <path d="M 760 120 L 760 280 " stroke="#00FFFF" fill="transparent"
            class="path-k1 m-path" :style="{'stroke-dashoffset':dash_offsets.K1,'stroke-dasharray':dash_arrays.K1}"></path>
      <path d="M 880 120 L 760 200" stroke="#00FFFF" stroke-linecap="round" fill="transparent"
            class="path-k2 m-path" :style="{'stroke-dashoffset':dash_offsets.K2,'stroke-dasharray':dash_arrays.K2}"></path>
      <path d="M 760 200 L 880 280 " stroke="#00FFFF" stroke-linecap="round" fill="transparent"
            class="path-k3 m-path" :style="{'stroke-dashoffset':dash_offsets.K3,'stroke-dasharray':dash_arrays.K3}"></path>
      <path d="M 1080 120 L 960 120 L 960 280 L 1080 280" stroke="#0000FF" stroke-linecap="round" fill="transparent"
            class="path-e3 m-path" :style="{'stroke-dashoffset':dash_offsets.E3,'stroke-dasharray':dash_arrays.E3}"></path>
      <path d="M 960 200 L 1080 200" stroke="#0000FF" stroke-linecap="round" fill="transparent"
            class="path-e4 m-path" :style="{'stroke-dashoffset':dash_offsets.E4,'stroke-dasharray':dash_arrays.E4}"></path>
      <path d="M 1160 120 L 1160 280" stroke="#FFFF00" stroke-linecap="round" fill="transparent"
            class="path-i2 m-path" :style="{'stroke-dashoffset':dash_offsets.I2,'stroke-dasharray':dash_arrays.I2}"></path>
      <path d="M 1240 120 L 1360 120" stroke="#8B00FF" stroke-linecap="round" fill="transparent"
            class="path-t1 m-path" :style="{'stroke-dashoffset':dash_offsets.T1,'stroke-dasharray':dash_arrays.T1}"></path>
      <path d="M 1300 120 L 1300 280" stroke="#8B00FF" stroke-linecap="round" fill="transparent"
            class="path-t2 m-path" :style="{'stroke-dashoffset':dash_offsets.T2,'stroke-dasharray':dash_arrays.T2}"></path>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "auto-stroke",
    data() {
      return {
        dash_offsets: null,
        dash_arrays: null,
        mTween: null
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.dash_offsets = {
          E1: 0,
          E2: 0,
          W: 0,
          I1: 0,
          G: 0,
          K1: 0,
          K2: 0,
          K3: 0,
          E3: 0,
          E4: 0,
          I2: 0,
          T1: 0,
          T2: 0,
          requestID: ""
        }
        this.dash_arrays = {
          E1: 0,
          E2: 0,
          W: 0,
          I1: 0,
          G: 0,
          K1: 0,
          K2: 0,
          K3: 0,
          E3: 0,
          E4: 0,
          I2: 0,
          T1: 0,
          T2: 0
        }
        this.mTween = {
          E1: null,
          E2: null,
          W: null,
          I1: null,
          G: null,
          K1: null,
          K2: null,
          K3: null,
          E3: null,
          E4: null,
          I2: null,
          T1: null,
          T2: null
        }
        this.animateStoke();
      },
      tweenAnimate() {
        this.dash_offsets.requestID = window.requestAnimationFrame(this.tweenAnimate);
        TWEEN.update();
      },
      animateStoke() {
        this.$nextTick(() => {
          let path_e1 = document.querySelector('.path-e1');
          this.dash_arrays.E1 = path_e1.getTotalLength();
          this.dash_offsets.E1 = path_e1.getTotalLength();
          this.mTween.E1 = new TWEEN.Tween(this.dash_offsets).to({E1: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_e2 = document.querySelector('.path-e2');
          this.dash_arrays.E2 = path_e2.getTotalLength();
          this.dash_offsets.E2 = path_e2.getTotalLength();
          this.mTween.E2 = new TWEEN.Tween(this.dash_offsets).to({E2: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_w = document.querySelector('.path-w');
          this.dash_arrays.W = path_w.getTotalLength();
          this.dash_offsets.W = path_w.getTotalLength();
          this.mTween.W = new TWEEN.Tween(this.dash_offsets).to({W: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_i1 = document.querySelector('.path-i1');
          this.dash_arrays.I1 = path_i1.getTotalLength();
          this.dash_offsets.I1 = path_i1.getTotalLength();
          this.mTween.I1 = new TWEEN.Tween(this.dash_offsets).to({I1: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_g = document.querySelector('.path-g');
          this.dash_arrays.G = path_g.getTotalLength();
          this.dash_offsets.G = path_g.getTotalLength();
          this.mTween.G = new TWEEN.Tween(this.dash_offsets).to({G: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_k1 = document.querySelector('.path-k1');
          this.dash_arrays.K1 = path_k1.getTotalLength();
          this.dash_offsets.K1 = path_k1.getTotalLength();
          this.mTween.K1 = new TWEEN.Tween(this.dash_offsets).to({K1: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_k2 = document.querySelector('.path-k2');
          this.dash_arrays.K2 = path_k2.getTotalLength();
          this.dash_offsets.K2 = path_k2.getTotalLength();
          this.mTween.K2 = new TWEEN.Tween(this.dash_offsets).to({K2: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_k3 = document.querySelector('.path-k3');
          this.dash_arrays.K3 = path_k3.getTotalLength();
          this.dash_offsets.K3 = path_k3.getTotalLength();
          this.mTween.K3 = new TWEEN.Tween(this.dash_offsets).to({K3: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_e3 = document.querySelector('.path-e3');
          this.dash_arrays.E3 = path_e1.getTotalLength();
          this.dash_offsets.E3 = path_e1.getTotalLength();
          this.mTween.E3 = new TWEEN.Tween(this.dash_offsets).to({E3: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_e4 = document.querySelector('.path-e4');
          this.dash_arrays.E4 = path_e4.getTotalLength();
          this.dash_offsets.E4 = path_e4.getTotalLength();
          this.mTween.E4 = new TWEEN.Tween(this.dash_offsets).to({E4: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_i2 = document.querySelector('.path-i2');
          this.dash_arrays.I2 = path_i2.getTotalLength();
          this.dash_offsets.I2 = path_i2.getTotalLength();
          this.mTween.I2 = new TWEEN.Tween(this.dash_offsets).to({I2: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_t1 = document.querySelector('.path-t1');
          this.dash_arrays.T1 = path_t1.getTotalLength();
          this.dash_offsets.T1 = path_t1.getTotalLength();
          this.mTween.T1 = new TWEEN.Tween(this.dash_offsets).to({T1: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          let path_t2 = document.querySelector('.path-t2');
          this.dash_arrays.T2 = path_t2.getTotalLength();
          this.dash_offsets.T2 = path_t2.getTotalLength();
          this.mTween.T2 = new TWEEN.Tween(this.dash_offsets).to({T2: 0}, 2000).easing(TWEEN.Easing.Quadratic.In).start();

          this.tweenAnimate();
        });
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
    background-color: black;
  }

  .m-svg {
    border: 1px solid black;
  }

  .m-path {
    stroke-width: 5px;
    stroke-linecap: round;
  }

  .path-e {

  }

  .path-w {

  }
</style>
