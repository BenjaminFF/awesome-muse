<template>
  <div class="m-container">
    <svg class="m-svg">
      <circle r="25" cx="300" cy="40" v-for="dot in dots" :transform="'rotate('+dot.rotation+',300,300)'" class="outer-circle"
               @mouseenter="dot.outerVisible=true" @mouseleave="dot.outerVisible=false" @click="mTest(dot)" :class="{'show-outer-circle-border':dot.outerVisible}"></circle>
      <circle r="3" cx="300" cy="40" v-for="dot in dots" :transform="'rotate('+dot.rotation+',300,300)'"
              class="inner-circle" @mouseenter="dot.outerVisible=true" @mouseleave="dot.outerVisible=false" @click="mTest(dot)"></circle>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "CircleDot",
    data() {
      return {
        dots: [],
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let dotCount = 20;
        let degreeGap = 360 / dotCount;
        let dots = [];
        for (let i = 0; i < dotCount; i++) {
          dots.push({
            rotation: degreeGap * i,
            dIndex: i,
            outerVisible: false
          })
        }
        this.dots = dots;
        setInterval(() => {
          this.dots.forEach((dot) => {
            dot.rotation += 0.05;
          });
        }, 16.6);
      },
      fetchData() {

      },
      mTest(dot) {
        console.log(dot.dIndex);
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

  .m-svg {
    width: 600px;
    height: 600px;
    background-color: black;
  }

  .inner-circle {
    cursor: pointer;
    fill: white;
  }

  .outer-circle {
    fill: black;
    cursor: pointer;
  }

  .show-outer-circle-border{
    stroke-width: 2px;
    stroke: white;
  }

</style>

<style>
  .outer-enter-active {
    animation: fade-in .5s;
  }

  .outer-leave-active {
    animation: fade-out .5s;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
