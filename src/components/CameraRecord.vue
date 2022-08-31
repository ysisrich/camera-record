<template>
  <div class="box" :style="{ 'max-width': boxWidth }">
    <div class="btn">
      <el-button type="primary" @click="startLive"> 开始摄像头录制 </el-button>
      <el-button type="primary" plain @click="stopLive">
        结束摄像头录制
      </el-button>
    </div>
    <video
      :width="videoWidth"
      :height="videoHeight"
      id="video"
      :poster="poster"
    ></video>
    <slot></slot>
    <slot name="error">
      <el-alert
        v-if="showTips"
        style="margin-top: 10px"
        :title="errMsg || '摄像头调用成功'"
        :type="errMsg.length ? 'error' : 'success'"
        :closable="false"
      >
      </el-alert
    ></slot>
  </div>
</template>

<script>
import Error from "./errorInfo";
const { CameraRecordError } = Error;

export default {
  props: {
    boxWidth: {
      Type: String,
      default: "300px",
    },
    videoWidth: {
      Type: Number,
      default: 300,
    },
    videoHeight: {
      Type: Number,
      default: 200,
    },

    showTips: {
      Type: Boolean,
      default: false,
    },
    poster: {
      Type: String,
      default: () => require("@/assets/img/index/video_bg.png"),
    },
    fileName: {
      Type: String,
      default: "屏幕录制",
    },
  },

  data() {
    return {
      errMsg: "",
      recordedBlobs: [],
      stream: null,
    };
  },
  mounted() {
    this.getNavigator();
  },
  methods: {
    getNavigator() {
      return new Promise((resolve) => {
        if (navigator.mediaDevices == undefined) {
          this.$message.error("请将该网站升级为https协议");
          return;
        }

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((stream) => {
            // console.log(stream, "stream");
            let video = document.getElementById("video");
            // video.src = URL.createObjectURL(stream); // 你会看到一些警告
            video.srcObject = stream;
            this.stream = stream;
            video.play();
            resolve();
          })
          .catch((err) => {
            // 错误提示
            const { name, message } = err;
            // console.dir(err);

            const IsHave = CameraRecordError.some((item) => item.name === name);
            const errMsg = IsHave
              ? CameraRecordError.find((item) => item.name === name)["errMsg"]
              : "";

            this.$message.error(errMsg || message);
            this.errMsg = errMsg + message;
          });
      });
    },

    // 开始摄像头录制
    startLive() {
      if (this.stream == null || this.stream == undefined || this.errMsg) {
        this.$message.error("出错了，请检查下设备是否正常");
        return;
      }

      this.recordedBlobs = [];
      this.mediaRecorderData = new MediaRecorder(this.stream);
      this.mediaRecorderData.start();

      this.mediaRecorderData.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          this.recordedBlobs.push(e.data);
        }
      });

      this.mediaRecorderData.addEventListener("stop", () => {
        console.log("暂停 自动下载");
        this.download();
      });

      this.mediaRecorderData.addEventListener("start", () => {
        console.log("开始 录制");
      });
    },

    // 结束录制
    stopLive() {
      if (this.mediaRecorderData) {
        this.mediaRecorderData.stop();
        this.$message.success("摄像头录制结束");
      } else {
        this.$message.error("还没有开始进行摄像头录制！");
      }
    },
    // 下载视频 本地
    download() {
      const blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
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
  .btn {
    margin-top: 15px;
  }
  p {
    margin-top: 10px;
  }
}
</style>
