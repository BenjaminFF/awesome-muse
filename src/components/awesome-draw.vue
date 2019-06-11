<template>
  <div class="m-container">
    <div class="sidebar">
      <div class="tools-container">
        <i class="awe-pen tool" v-for="tool in tools" :class="['awe-'+tool.name,{'tool-active':tool.isActive}]"
           @click="toggleTool(tool)"></i>
      </div>
    </div>
    <div class="m-canvas">
    </div>
  </div>
</template>

<script>
  export default {
    name: "awesome-draw",
    data() {
      return {
        tools: []
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let tools = [
          {name: 'pen', isActive: true},
          {name: 'line', isActive: false},
          {name: 'elliptical', isActive: false},
          {name: 'rectangle', isActive: false}
        ];
        this.tools = tools;
      },
      toggleTool(tool) {
        this.tools.forEach((tool) => tool.isActive = false);
        tool.isActive = true;
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
    width: 12rem;
    height: 100%;
    background-color: #0B132B;
    box-shadow: 30px 0px 30px 0px rgba(0, 0, 0, 0.11);
    display: flex;
  }

  .m-canvas {
    width: calc(100% - 12rem);
    height: 100%;
    background-color: rgba(11, 19, 43, 0.08);
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
