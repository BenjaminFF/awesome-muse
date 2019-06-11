<template>
  <div class="m-container">
    <div class="inner">
      <img src="../assets/imgs/sunflower.jpg" class="m-img">
    </div>
  </div>
</template>

<script>
  export default {
    name: "finger-snap",
    data() {
      return {
        pixelArr: [],
        imageDataArray: [],
        canvasCount: 30
      }
    },
    created() {
    },
    mounted() {
      let mImg = document.getElementsByClassName('m-img')[0];
      html2canvas(mImg, {
        backgroundColor: 'transparent' //背景设置为透明
      }).then(canvas => {
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.pixelArr = imageData.data;
        this.buildImageDataArray();
        let target = document.getElementsByClassName('inner')[0];
        this.snap(canvas, target);
      });
    },
    methods: {
      buildImageDataArray() {
        let pixelArr = this.pixelArr;
        let data = pixelArr.slice(0).fill(0);
        const canvasCount = this.canvasCount;
        const imageDataArray = Array.from({length: canvasCount}, () =>
          data.slice(0)
        );
        //将原图像上的像素信息随机分配进不同的透明图象上，位置保持不变
        for (let i = 0; i < pixelArr.length; i += 4) {
          const p = Math.floor((i / pixelArr.length) * canvasCount);
          const a = imageDataArray[this.weightedRandomDistrib(p, canvasCount)];
          a[i] = pixelArr[i];
          a[i + 1] = pixelArr[i + 1];
          a[i + 2] = pixelArr[i + 2];
          a[i + 3] = pixelArr[i + 3];
        }
        this.imageDataArray = imageDataArray;
      },
      animateTransform(elem, sx, sy, angle, duration) {
        elem.animate(
          [
            {transform: "rotate(0) translate(0, 0)"},
            {
              transform: "rotate(" + angle + "deg) translate(" + sx + "px," + sy + "px)"
            }
          ],
          {
            duration: duration,
            easing: "ease-in"
          }
        );
      },
      weightedRandomDistrib(peak, count) {
        const prob = [],
          seq = [];
        for (let i = 0; i < count; i++) {
          prob.push(Math.pow(count - Math.abs(peak - i), 6));
          seq.push(i);
        }
        return chance.weighted(seq, prob);
      },
      newCanvasFromImageData(imageDataArray, w, h) {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const tempCtx = canvas.getContext("2d");
        tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
        return canvas;
      },
      snap(canvas, target) {
        for (let i = 0; i < this.canvasCount; i++) {
          const c = this.newCanvasFromImageData(
            this.imageDataArray[i],
            canvas.width,
            canvas.height
          );
          c.classList.add("dust");
          setTimeout(() => {
            this.animateTransform(
              c,
              200,
              -100,
              chance.integer({min: -5, max: 5}),
              2000
            );
            c.classList.add("blur");
            setTimeout(() => {
              c.remove();
            }, 4000);
          }, 100 * i);
          target.appendChild(c);

          Array.from(target.querySelectorAll(":not(.dust)")).map(el => {
            el.classList.add("quickFade");
          });
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
  }

  .m-img {
    width: 400px;
    height: 200px;
  }

  .inner {
    width: 400px;
    height: 200px;
    position: relative;
  }
</style>

<style>
  .dust {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    filter: blur(0.05em);
  }

  .quickFade {
    animation: fadeout 1.0s linear forwards;
  }

  .fade {
    animation: fadeout 2s linear forwards;
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .blur {
    animation: fadeblur 2s ease-in forwards;
  }

  @keyframes fadeblur {
    0% {
      opacity: 1;
      filter: blur(0.05em);
    }
    80% {
      filter: blur(0.188em);
    }
    100% {
      opacity: 0;
    }
  }
</style>
