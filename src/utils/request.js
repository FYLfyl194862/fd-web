import axios from "axios";
import errorCode from "@/utils/errorCode";
import {
  ElNotification,
  ElMessageBox,
  ElMessage,
  ElLoading,
} from "element-plus";
//// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
});

// 响应拦截器
service.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode["default"];
  // 二进制数据则直接返回
  if (
    res.request.responseType === "blob" ||
    res.request.responseType === "arraybuffer"
  ) {
    return res.data;
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
      ElMessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          isRelogin.show = false;
          useUserStore()
            .logOut()
            .then(() => {
              location.href = "/index";
            });
        })
        .catch(() => {
          isRelogin.show = false;
        });
    }
    return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
  } else if (code === 500) {
    ElMessage({ message: msg, type: "error" });
    return Promise.reject(new Error(msg));
  } else if (code === 601) {
    ElMessage({ message: msg, type: "warning" });
    return Promise.reject(new Error(msg));
  } else if (code !== 200) {
    ElNotification.error({ title: msg });
    return Promise.reject("error");
  } else {
    return Promise.resolve(res.data);
  }
});
export default service;
