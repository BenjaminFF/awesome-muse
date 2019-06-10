<template>
  <div class="m-container">
    <svg class="svg-container">
      <circle r="180" cx="200" cy="200" class="out-circle">
      </circle>
      <rect class="big-calibration" x="197" y="35" v-for="bigCalibration in bigCalibrations"
            :transform="'rotate('+bigCalibration.rotation+',200,200)'"></rect>
      <rect class="small-calibration" x="199" y="35" v-for="smallCalibration in smallCalibrations"
            :transform="'rotate('+smallCalibration.rotation+',200,200)'"></rect>
      <rect class="hour-hand" x="197" y="180" :transform="'rotate('+curClockDegs.hour+',200,200)'"></rect>
      <rect class="min-hand" x="198" y="180" :transform="'rotate('+curClockDegs.min+',200,200)'"></rect>
      <rect class="sec-hand" x="199" y="180" :transform="'rotate('+curClockDegs.sec+',200,200)'"></rect>
      <circle r="8" cx="200" cy="200"></circle>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "my-clock",
    data() {
      return {
        bigCalibrations: [],
        smallCalibrations: [],
        curClockDegs: {}
      }
    },
    created() {
      this.init();
      setInterval(this.animateTime,1000);
    },
    methods: {
      init() {
        let bigCalibrations = [];
        let smallCalibrations = [];
        for (let i = 0; i < 60; i++) {
          if (i % 5 == 0) {
            bigCalibrations.push({
              rotation: i * 360 / 60,
              text: i == 0 ? 12 : i / 5
            })
          } else {
            smallCalibrations.push({
              rotation: i * 360 / 60
            })
          }
        }
        this.bigCalibrations = bigCalibrations;
        this.smallCalibrations = smallCalibrations;
        let nowTime = new Date();
        let nowHour = nowTime.getHours();
        let nowMinute = nowTime.getMinutes();
        let nowSecond = nowTime.getSeconds();
        this.curClockDegs = {
          hour: nowHour * 30 + (nowMinute / 60) * 30 - 180,
          min: nowMinute * 6 + (nowSecond / 60) * 6 - 180,
          sec: nowSecond * 6 - 180
        }
      },
      animateTime() {
        let nowTime = new Date();
        let nowHour = nowTime.getHours();
        let nowMinute = nowTime.getMinutes();
        let nowSecond = nowTime.getSeconds();

        this.curClockDegs.hour = nowHour * 30 + (nowMinute / 60) * 30 - 180;
        this.curClockDegs.min = nowMinute * 6 + (nowSecond / 60) * 6 - 180;
        this.curClockDegs.sec = nowSecond * 6 - 180;
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

  .svg-container {
    width: 400px;
    height: 400px;
  }

  .out-circle {
    fill: none;
    stroke: black;
    stroke-width: 15px;
  }

  .big-calibration {
    width: 6px;
    height: 25px;
  }

  .small-calibration {
    width: 2px;
    height: 15px;
  }

  .hour-hand {
    width: 6px;
    height: 100px;
  }

  .min-hand {
    width: 4px;
    height: 120px;
  }

  .sec-hand {
    width: 2px;
    height: 140px;
    fill: red;
  }
</style>
