<template>
  <div id="app">
    <ScreenRecord fileName="屏幕录制" />

    <CameraRecord :showTips="true" fileName="摄像头录制" />
  </div>
</template>

<script>
import CameraRecord from "./components/CameraRecord.vue";
import ScreenRecord from "./components/ScreenRecord.vue";

export default {
  name: "App",
  components: {
    CameraRecord,
    ScreenRecord,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
