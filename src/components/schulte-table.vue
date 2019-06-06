<template>
  <div class="m-container">
    <div class="schulte-cells" :style="{'--row':Math.sqrt(size),'--column':Math.sqrt(size)}">
      <div class="schulte-cell" v-for="cell in cells" :class="{'is-passed':cell.passed}" @click="cellClick(cell)">
        <div>{{cell.cIndex}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: "schulte-table",
    data() {
      return {
        size: 64,
        cells: [],
        lastClickIndex: 0
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let cells = [];
        for (let i = 1; i <= this.size; i++) {
          cells.push({
            cIndex: i,
            passed: false
          })
        }
        this.cells = _.shuffle(cells);
      },
      cellClick(cell) {
        if (cell.cIndex - this.lastClickIndex != 1) {
          return;
        }
        cell.passed = true;
        this.lastClickIndex = cell.cIndex;
        if (cell.cIndex == this.size) {
          setTimeout(() => {
            alert('passed');
          }, 100);
        }
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
    background-color: #d1d1d1;
  }

  .schulte-cells {
    --row: 5;
    --column: 5;
    --size: 5rem;
    width: fit-content;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(var(--row), var(--size));
    grid-template-rows: repeat(var(--column), var(--size));
    position: relative;
  }

  .schulte-cell {
    width: auto;
    height: auto;
    background-color: white;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    cursor: pointer;
  }

  .is-passed {
    background-color: #acc85d;
    color: white;
  }
</style>
