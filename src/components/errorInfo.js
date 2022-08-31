export default {
  // 屏幕录制错误信息
  ScreenRecordError: [
    {
      name: "AbortError",
      errMsg: "发生了与以下任何其他异常不匹配的错误或故障",
    },
    {
      name: "InvalidStateError",
      errMsg: "调用 getDisplayMedia() 的 context 中的 document 不是完全激活的",
    },
    {
      name: "NotAllowedError",
      errMsg:
        "用户拒绝授予访问屏幕区域的权限，或者不允许当前浏览实例访问屏幕共享",
    },
    {
      name: "NotFoundError",
      errMsg: "没有可用于捕获的屏幕视频源",
    },
    {
      name: "NotReadableError",
      errMsg:
        "用户选择了屏幕，窗口，标签或其他屏幕数据源，但发生了硬件或操作系统级别错误或锁定，从而预先占用了共享所选源",
    },
    {
      name: "OverconstrainedError",
      errMsg: "创建流后，由于无法生成兼容的流导致应用指定的 constraints 失效",
    },
    {
      name: "TypeError",
      errMsg:
        "指定的 constraints 包括调用 getDisplayMedia() 时不允许的constraints",
    },
  ],

  // 摄像头录制错误信息
  CameraRecordError: [
    {
      name: "AbortError",
      errMsg: "发生了与以下任何其他异常不匹配的错误或故障",
    },
    {
      name: "NotReadableError",
      errMsg:
        "操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问",
    },
    {
      name: "NotAllowedError",
      errMsg: "用户拒绝了当前的浏览器摄像头或麦克风授权请求",
    },
    {
      name: "NotFoundError",
      errMsg: "设备未找到，检查摄像头或麦克风是否完好",
    },
    {
      name: "OverconstrainedError",
      errMsg: "指定的要求无法被设备满足",
    },
    {
      name: "SecurityError",
      errMsg: "使用设备媒体被禁止，是否开启或者关闭取决于单个用户的偏好设置",
    },
    {
      name: "TypeError",
      errMsg: "constraints 对象未设置［空］，或者都被设置为false",
    },
  ],
};
