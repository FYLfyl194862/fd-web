<template>
  <div class="login">
    <el-form
      class="login-form"
      :rules="loginRules"
      ref="loginRef"
      :model="loginForm"
    >
      <h3 class="title">通用后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="账号"
          size="large"
          v-model="loginForm.username"
        >
          <template #prefix :size="15">
            <el-icon class="el-input__icon"><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          size="large"
          v-model="loginForm.password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          placeholder="验证码"
          style="width: 63%"
          v-if="captchaEnabled"
          v-model="loginForm.code"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Discount /></el-icon>
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="loginForm.rememberMe"
          label="记住密码"
          style="margin: 0px 0px 25px 0px"
        ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          size="large"
          @click="handleLogin"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span>Copyright © 2023- All Rights Reserved.</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
};
</script>
<script setup>
import { ref, onBeforeMount, getCurrentInstance } from "vue";
import { getCodeImg, login } from "@/api/login.js";
import useUserStore from "@/store/modules/user";
//数据
const codeUrl = ref("");
// 验证码开关
const captchaEnabled = ref(true);
const loginForm = ref({
  username: "",
  password: "",
  code: "",
  rememberMe: false,
  uuid: "",
});
const loginRules = {
  username: [{ required: true, message: "请输入您的账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入您的密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入您的验证码", trigger: "change" }],
};
const { proxy } = getCurrentInstance();
const userStore = useUserStore();
//获取验证码
function getCode() {
  getCodeImg().then((res) => {
    // console.log(res);
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
    }
    codeUrl.value = "data:image/gif;base64," + res.img;
    loginForm.value.uuid = res.uuid;
  });
}
getCode();
//登录
function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      // 调用action的登录方法
      userStore.login(loginForm.value).then((res) => {
        console.log("gsdres2", res);
      });
    }
  });
}
</script>
<style lang="scss">
.login {
  display: flex;
  align-items: center; //垂直方向居中
  justify-content: center; //水平方向居中
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  width: 400px;
  background: #ffffff;
  padding: 25px 25px 5px 25px;
}
.el-input {
  height: 40px;
  input {
    height: 40px;
  }
}
.title {
  text-align: center;
  color: #707070;
  margin: 0px auto 30px;
}
.login-code {
  width: 33%;
  height: 40px;
  .login-code-img {
    height: 40px;
    padding-left: 10px;
    cursor: pointer;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
