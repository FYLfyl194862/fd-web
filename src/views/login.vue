<template>
  <div class="login">
    <el-form class="login-form">
      <h3 class="title">后台管理系统</h3>
      <el-form-item>
        <el-input type="text" placeholder="账号" size="large">
          <template #prefix>
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
        <el-input type="text" placeholder="验证码" style="width: 63%" />
        <div class="login-code"><img src="" alt="" />图片</div>
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
<script setup></script>
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
.title {
  text-align: center;
  color: #707070;
  margin: 0px auto 30px;
}
.login-code {
  width: 33%;
}
</style>
