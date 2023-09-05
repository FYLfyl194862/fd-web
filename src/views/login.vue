<template>
  <div class="login">
    <el-form class="login-form">
      <h3 class="title">后台管理系统</h3>
      <el-form-item>
        <el-input type="text" placeholder="账号" size="large">
          <template #prefix :size="15">
            <el-icon class="el-input__icon"><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="密码" size="large">
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="验证码" style="width: 63%">
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
          label="记住密码"
          style="margin: 0px 0px 25px 0px"
        ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" size="large"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
};
</script>
<script setup>
import { ref } from "vue";
import { getCodeImg } from "@/api/login.js";
//数据
const codeUrl = ref("");
//方法
function getCode() {
  getCodeImg().then((res) => {
    // console.log(res);
    codeUrl.value = "data:image/gif;base64," + res.data.img;
  });
}
getCode();
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
</style>
