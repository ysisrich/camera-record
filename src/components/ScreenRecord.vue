<template>
  <div>
    <el-button type="primary" @click="handleSwitch">{{
      status ? "结束录屏" : "开始录屏"
    }}</el-button>
  </div>
</template>

<script>
import Error from "./errorInfo";
const { ScreenRecordError } = Error;

export default {
  props: {
    fileName: {
      Type: String,
      default: "屏幕录制",
    },
  },

  data() {
    return {
      errMsg: "",
      stream: "",
      recordedBlobs: [],
      status: false,
      screenObj: null,
    };
  },
  mounted() {},
  methods: {
    handleSwitch() {
      return new Promise((resolve) => {
        if (this.status) {
          this.stopReset();
          this.status = false;
        } else {
          this.startScreen()
            .then(() => resolve(this.screenObj))
            .catch(() => resolve(this.screenObj));
        }
      });
    },

    // 屏幕录制
    startScreen() {
      //注意,加上 audio: true 之后底部可以拖动的停止就失效了,正在fixing
      return new Promise((resolve) => {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((stream) => {
            this.screenObj = stream
              .getVideoTracks()[0]
              .getSettings().displaySurface;
            // console.log(this.screenObj); // monitor window browser
            console.log("开始录制");
            this.status = true;
            this.stream = stream;
            this.defineMediaRecorder(stream);
            resolve();
          })
          .catch((err) => {
            // 错误提示

            console.log(err);
            const { name, message } = err;
            const IsHave = ScreenRecordError.some((item) => item.name === name);
            const errMsg = IsHave
              ? ScreenRecordError.find((item) => item.name === name)["errMsg"]
              : "";

            this.$message.error(errMsg || message);
            this.errMsg = errMsg + message;
          });
      });
    },

    defineMediaRecorder(stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 4500000,
        mimeType: "video/webm",
      });
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedBlobs.push(event.data);
          this.download();
        }
      };
      mediaRecorder.start();
    },

    stopReset() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.recordedBlobs = [];
      } else {
        alert("还没有开始屏幕录制!");
      }
    },

    download(recordedBlobs) {
      const blob = new Blob(recordedBlobs || this.recordedBlobs, {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = `${this.fileName}.mp4`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin-top: 10px;
  }
}
</style>
