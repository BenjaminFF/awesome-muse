<template>
  <div class="mdemo-list-container">
    <el-scrollbar class="m-scrollbar">
      <el-row v-for="subDemos in mDemos" style="width: 100%">
        <el-col v-for="mDemo in subDemos" :span="6" style="display:flex;justify-content: center">
          <div class="m-item" :style="{backgroundColor:mDemo.backgroundColor}" @click="enterDemo(mDemo.name)">
            {{mDemo.name}}
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "mdemo-list",
    data() {
      return {
        mDemos: []
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let opacity = 0.8;
        let demos = [
          {name: 'AutoStroke', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'AwesomeDraw', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'FingerSnap', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'BorderAnim', selected: false, backgroundColor: this.randomColor(opacity)},
          //{name: 'SnakeMove', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'SchulteTable', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'ClippingMask', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'CircleDot', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'RoughMobile', selected: false, backgroundColor: this.randomColor(opacity)},
          {name: 'MyClock', selected: false, backgroundColor: this.randomColor(opacity)}
        ]
        this.mDemos = this.splitArr(demos, 4);
      },
      splitArr(arr, subArrLen) {
        if (arr.length <= subArrLen || subArrLen <= 0) {
          return [arr];
        }
        let newArr = [];
        for (let i = 0; i < arr.length; i += subArrLen) {
          let j = i;
          let mSubArr = [];
          for (; j < (i + subArrLen > arr.length ? arr.length : i + subArrLen); j++) {
            mSubArr.push(arr[j]);
          }
          newArr.push(mSubArr);
        }
        return newArr;
      },
      randomColor(opacity) {
        var r = Math.round(Math.random() * 256);
        var g = Math.round(Math.random() * 256);
        var b = Math.round(Math.random() * 256);
        var a = opacity;
        if (r >= 200 && g >= 200 && b >= 200) {              //远离白色
          r -= 50;
        }
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      },
      enterDemo(link) {
        window.open(window.location.origin + '/#/' + link);
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  .mdemo-list-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mdemo-list-container .el-scrollbar {
    width: 100%;
    height: 100%;
  }

  .m-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .m-item {
    width: 100%;
    height: 15rem;
    background-color: black;
    border-radius: 10px;
    color: white;
    margin: 1rem;
    font-size: 2rem;
    text-align: center;
    line-height: 15rem;
    user-select: none;
    transition: all ease-in .2s;
  }

  .m-item:hover {
    transform: scale3d(1.05, 1.05, 1.05);
    cursor: pointer;
  }
</style>
