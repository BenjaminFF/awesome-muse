<template>
    <div class="m-container">
      <svg class="m-svg" @mousemove="mousemove">
        <image xlink:href="../assets/imgs/sunflower.jpg" width="100%" height="100%" x="0" y="0" preserveAspectRatio="none slice" clip-path="url(#hexagonal-mask)"></image>
        <clipPath id="hexagonal-mask">
          <circle r="150" :cx="mCenterX" :cy="mCenterY">
          </circle>
        </clipPath>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "clipping-mask",
        data() {
            return {
              mCenterX:-100,
              mCenterY:100
            }
        },
      methods:{
        mousemove(event){
          this.mCenterX=event.clientX;
          this.mCenterY=event.clientY;
        }
      }
    }
</script>

<style scoped>
  .m-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .m-svg{
    width: 100%;
    height: 100%;
  }
</style>
