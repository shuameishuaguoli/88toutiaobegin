<template>
  <div class="login-bgi">
    <el-card class="login-card body-style">
      <!-- 登录图片start -->
      <div class="card-img">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录图片end -->

      <!-- 用户表单输入框start -->

        <el-form

        >
          <el-form-item>
            <el-input placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <!-- 将验证码输入框和获取验证码的按钮放到一个div中 -->
          <div class="verification">
            <el-form-item>
              <el-input placeholder="请输入您的验证码"></el-input>
            </el-form-item>
            <el-button @click="onVerification">获取验证码</el-button>
          </div>

          <!-- 复选框 -->
          <el-checkbox>
            我已阅读并同意 <a href="#" style="color:#409eff">用户协议</a> 和 <a href="#" style="color:#409eff">隐私条款</a>
          </el-checkbox><br>

          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%;margin-top:30px">登录</el-button>
        </el-form>

      <!-- 用户表单输入框end -->

    </el-card>
  </div>
</template>
<script>
export default {
  // 模型区
  data () {
    return {

    }
  },
  // 方法区
  methods: {
    onVerification () {
      confirm('验证码已发送，请注意查收')
    }
  }
}
</script>
// lang是可以使用less语法
<style lang="less">
  // 给背景图设置样式
  .login-bgi{
    background-image: url('../../assets/img/login_bg.jpg');
    // 高度是当前屏幕的百分百
    height: 100vh;
    // 铺满屏幕是cover
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-card{
      height: 345px;
      width: 410px;
      .card-img{
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        img{
          height: 36px;
        }
      }
      .verification{
        display: flex;
        justify-content: space-between;
        .el-form-item{
          width: 240px;
        }
        .el-button{
          height: 40px;
        }
      }
    }
      .body-style{
        // 将圆角进行删掉
        border-radius: 0;
      }
  }
</style>
