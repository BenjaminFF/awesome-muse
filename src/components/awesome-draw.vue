<template>
  <div class="m-container">
    <div class="sidebar">
      <div class="tools-container">
        <i class="awe-pen tool" v-for="tool in tools" :class="['awe-'+tool.name,{'tool-active':tool.isActive}]"
           @click="toggleTool(tool)"></i>
      </div>
    </div>
    <div class="m-canvas-container">
      <div class="m-canvas" @mousedown="dealMousedown($event)" @mousemove="dealMousemove($event)"
           @mouseup="dealMouseup($event)"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "awesome-draw",
    data() {
      return {
        tools: [],
        strokeWidth: 5,
        color: 'black',
        stage: null,
        drawing: false,
        coords: {
          downX: -1,
          downY: -1,
          moveX: -1,
          moveY: -1,
          upX: -1,
          upY: -1
        },
        curLayer: null,
        mLayer: null,
        lastShape: null,
        mTransformer: null,
        isTransforming: false,
        isDragging: false,
        canDraw: true,
        shiftDown: false,
        penTool: null
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let tools = [
          {name: 'pen', isActive: false, type: 'Pen'},
          {name: 'circle', isActive: false, type: 'Shape'},
          {name: 'rectangle', isActive: false, type: 'Shape'},
          {name: 'line', isActive: true, type: 'Shape'}
        ];
        this.tools = tools;
        let mCanvas = document.getElementsByClassName('m-canvas')[0];
        this.stage = new Konva.Stage({
          container: '.m-canvas',
          width: mCanvas.clientWidth,
          height: mCanvas.clientHeight
        });
        this.curLayer = new Konva.Layer();
        this.mTransformer = new Konva.Transformer({
          keepRatio: false
        });
        //this.curLayer.hitGraphEnabled(false);
        this.stage.add(this.curLayer);
        this.curLayer.add(this.mTransformer);
        this.penTool = {
          isDrawing: false,
          lastX: -1,
          lastY: -1,
          points: [],
        }
        document.addEventListener('keydown', (event) => {
          event.key == 'Shift' ? this.shiftDown = true : null;
        });
        document.addEventListener('keyup', (event) => {
          event.key == 'Shift' ? this.shiftDown = false : null;
        });
      },
      dealMousedown(event) {
        let curTool = this.tools.find((tool) => tool.isActive);
        switch (curTool.type) {
          case 'Shape':
            this.dealShapeMouseDown(event);
            break;
          case 'Pen':
            this.dealPenMouseDown(event);
            break;
          default:
            break;
        }
      },
      dealMousemove(event) {
        let curTool = this.tools.find((tool) => tool.isActive);
        switch (curTool.type) {
          case 'Shape':
            this.dealShapeMouseMove(event);
            break;
          case 'Pen':
            this.dealPenMouseMove(event);
            break;
          default:
            break;
        }
      },
      dealMouseup(event) {
        let curTool = this.tools.find((tool) => tool.isActive);
        switch (curTool.type) {
          case 'Shape':
            this.dealShapeMouseUp(event);
            break;
          case 'Pen':
            this.dealPenMouseUp(event);
            break;
          default:
            break;
        }
      },
      toggleTool(tool) {
        this.tools.forEach((tool) => tool.isActive = false);
        tool.isActive = true;
      },
      drawLine(x1, y1, x2, y2) {
        let mLine = new Konva.Line({
          points: [x1, y1, x2, y2],
          stroke: this.color,
          strokeWidth: this.strokeWidth,
        });
        return mLine;
      },
      drawRect(x1, y1, x2, y2) {
        let shiftDown = this.shiftDown;
        let mRect = new Konva.Rect({
          x: x1,
          y: y1,
          width: x2 - x1,
          height: !shiftDown ? y2 - y1 : x2 - x1,
          fill: 'transparent',
          stroke: this.color,
          strokeWidth: this.strokeWidth
        });
        return mRect;
      },
      drawCircle(x1, y1, x2, y2) {
        let shiftDown = this.shiftDown;
        let mRadiusX = Math.abs(x1 - x2);
        let mRadiusY = Math.abs(y1 - y2);
        let mOval = new Konva.Ellipse({
          x: x1,
          y: y1,
          radiusX: mRadiusX,
          radiusY: !shiftDown ? mRadiusY : mRadiusX,
          fill: 'transparent',
          stroke: this.color,
          strokeWidth: this.strokeWidth
        });
        return mOval;
      },
      dealPenMouseDown(event) {
        this.penTool.lastX = event.offsetX;
        this.penTool.lastY = event.offsetY;
        this.penTool.points = [];
        this.penTool.points.push(event.offsetX, event.offsetY);
        this.penTool.isDrawing = true;
      },
      dealPenMouseMove(event) {
        if (!this.penTool.isDrawing) {
          return;
        }
        this.penTool.points.push(event.offsetX, event.offsetY);
        let points = this.penTool.points;
        let mLine = new Konva.Line({
          points: points,
          stroke: this.color,
          strokeWidth: this.strokeWidth,
          lineCap: 'round',
          lineJoin: 'round',
          tension: 1
        });
        this.curLayer.add(mLine);
        this.curLayer.draw();
        mLine.destroy();
        console.log(points.length);
      },
      dealPenMouseUp(event) {
        let points = this.penTool.points;
        let mLine = new Konva.Line({
          points: points,
          stroke: this.color,
          strokeWidth: this.strokeWidth,
          lineCap: 'round',
          lineJoin: 'round',
          bezier: true
        });
        this.curLayer.add(mLine);
        this.curLayer.draw();
        this.penTool.isDrawing = false;
        console.log(this.curLayer.getChildren().length);
      },
      dealShapeMouseDown(event) {
        if (!this.canDraw) {
          return;
        }
        if (this.lastShape != null) {
          this.lastShape.draggable(false);
        }
        this.coords.downX = event.offsetX;
        this.coords.downY = event.offsetY;
        this.drawing = true;
      },
      dealShapeMouseMove(event) {
        if (!this.drawing) {
          return;
        }
        this.coords.moveX = event.offsetX;
        this.coords.moveY = event.offsetY;
        let curTool = this.tools.find((tool) => tool.isActive);
        if (Math.abs(this.coords.moveX - this.coords.downX) > 5 || Math.abs(this.coords.moveY - this.coords.downY) > 5) {
          let mShape;
          switch (curTool.name) {
            case 'line':
              mShape = this.drawLine(this.coords.downX, this.coords.downY, this.coords.moveX, this.coords.moveY);
              break;
            case 'rectangle':
              mShape = this.drawRect(this.coords.downX, this.coords.downY, this.coords.moveX, this.coords.moveY);
              break;
            case 'circle':
              mShape = this.drawCircle(this.coords.downX, this.coords.downY, this.coords.moveX, this.coords.moveY);
              break;
            default:
              break;
          }
          this.curLayer.add(mShape);
          this.curLayer.draw();
          mShape.destroy();
        }
      },
      dealShapeMouseUp(event) {
        this.canDraw = true;
        if (!this.drawing) {
          return;
        }
        this.coords.upX = event.offsetX;
        this.coords.upY = event.offsetY;
        if (Math.abs(this.coords.upX - this.coords.downX) > 5 || Math.abs(this.coords.upY - this.coords.downY) > 5) {
          let curTool = this.tools.find((tool) => tool.isActive);
          let mShape;
          switch (curTool.name) {
            case 'line':
              mShape = this.drawLine(this.coords.downX, this.coords.downY, this.coords.upX, this.coords.upY);
              break;
            case 'rectangle':
              mShape = this.drawRect(this.coords.downX, this.coords.downY, this.coords.moveX, this.coords.moveY);
              break;
            case 'circle':
              mShape = this.drawCircle(this.coords.downX, this.coords.downY, this.coords.upX, this.coords.upY);
              break;
            default:
              break;
          }
          this.curLayer.add(mShape);
          this.mTransformer.attachTo(mShape);
          this.curLayer.draw();
          mShape.draggable(true);
          mShape.on('transformstart', () => {
            this.canDraw = false;
          });
          mShape.on('mousedown', () => {
            this.canDraw = false;
          });
          this.lastShape = mShape;
        } else {
          if (this.lastShape != null) {
            let clonedNode = this.lastShape.clone({
              x: -1000000
            });
            this.curLayer.add(clonedNode);
            this.mTransformer.attachTo(clonedNode);
            this.curLayer.draw();
            clonedNode.destroy();
          }
        }
        this.drawing = false;
      }
    }
  }
</script>

<style scoped>
  .m-container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .sidebar {
    width: 12.5rem;
    height: 100%;
    background-color: #0B132B;
    box-shadow: 30px 0px 30px 0px rgba(0, 0, 0, 0.11);
    display: flex;
  }

  .m-canvas-container {
    width: calc(100% - 12.5rem);
    height: 100%;
    background-color: rgba(11, 19, 43, 0.08);
    position: relative;
  }

  .m-canvas {
    position: absolute;
    width: 95%;
    height: 95%;
    left: 2.5%;
    top: 2.5%;
    background-color: white;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.11);
  }

  .tools-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: fit-content;
    margin-top: 2rem;
  }

  .tool {
    width: 4.2rem;
    height: 4.2rem;
    color: white;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    font-size: 1.8rem;
    background-color: rgba(255, 255, 255, 0.13);
    flex-shrink: 0;
    margin: 5px;
    box-sizing: border-box;
  }

  .tool:hover {
    cursor: pointer;
    border: 2px solid #6FFFE9;
    color: #6FFFE9;
  }

  .tool-active {
    color: #6FFFE9;
    border: 2px solid #6FFFE9;
  }
</style>
