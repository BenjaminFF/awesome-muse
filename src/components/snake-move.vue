<template>
  <div class="m-container">
    <canvas width="600" height="400" class="m-canvas" style="border: 1px solid green">
    </canvas>
  </div>
</template>

<script>
  export default {
    name: "snake-move",
    data() {
      return {
        mCanvas: null,
        snake: null,
        instructQueue: [],
        curDirection: 'ArrowRight'
      }
    },
    mounted() {
      this.initKeyBoardEvent();
      this.initSnake();
      this.initCanvas();
      this.animate();
    },
    methods: {
      initKeyBoardEvent() {
        document.addEventListener('keyup', (e) => {
          this.instructQueue.push(e.key);
          console.log(e.key);
        }, false);
      },
      initSnake() {
        let cells = [];
        let cellSize = 1;
        for (let i = 1; i <= 100; i++) {
          cells.push({
            x: cellSize * i,
            y: 180
          })
        }
        this.snake = {
          cellSize: cellSize,
          cells: cells
        }
      },
      initCanvas() {
        this.mCanvas = document.getElementsByClassName('m-canvas')[0];
        let ctx = this.mCanvas.getContext("2d");

        this.snake.cells.forEach((cell) => {
          this.paintCell(cell, 'green');
        })
      },
      repaintCanvas() {
        let ctx = this.mCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
        this.move();
        this.snake.cells.forEach((cell) => {
          console.log(cell.x);
          this.paintCell(cell, "green");
        })
        console.log('-----------------');
      },

      move() {
        let newInstruct = this.instructQueue.shift();
        if (newInstruct != undefined) {
          let isOppositeDirection = (newInstruct == "ArrowLeft" && this.curDirection == "ArrowRight") || (newInstruct == "ArrowTop" && this.curDirection == "ArrowBottom");
          if (!isOppositeDirection) {
            this.curDirection = newInstruct;
          }
        }
        let cells = this.snake.cells;
        switch (this.curDirection) {
          case "ArrowRight":
            cells[0].x += 1;
            break;
          case "ArrowLeft":
            cells[0].x -= 1;
            break;
          case "ArrowTop":
            cells[0].y -= 1;
            break;
          case "ArrowBottom":
            cells[0].y += 1;
            break;
        }
        for (let i = cells.length - 1; i >= 1; i--) {
          cells[i] = cells[i - 1];
        }
      },
      paintCell(c, color) {
        let ctx = this.mCanvas.getContext('2d');
        ctx.fillStyle = color;
        let cellSize = this.snake.cellSize;
        ctx.fillRect(c.x, c.y, cellSize, cellSize);
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.repaintCanvas();
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
</style>
