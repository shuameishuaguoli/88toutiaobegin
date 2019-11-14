<template>
  <div class="login-bgi">
    <el-card class="login-card body-style">
      <!-- 登录图片start -->
      <div class="card-img">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录图片end -->

      <!-- 用户表单输入框start
        :model是绑定form表单中的数据
        :rules是用户输入内容的规则  规则是一个对象类型，对象中是键值对的形式，值是数组的形式，数组中的元素是对象类型，因为一个数据是可以有多个规则的
        prop=""  是在要进行判断的表单中添加的一个属性
      -->

        <el-form
          :model = "ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" autofocus="autofocus" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <!-- 将验证码输入框和获取验证码的按钮放到一个div中 -->
          <div class="verification">
            <el-form-item prop="code">
              <el-input v-model="ruleForm.code" placeholder="请输入您的验证码"></el-input>
            </el-form-item>
            <el-button @click="onVerification">获取验证码</el-button>
          </div>

          <!-- 复选框 -->
          <el-checkbox ref="multipleTable">
            我已阅读并同意 <a href="#" style="color:#409eff"> 用户协议</a> 和 <a href="#" style="color:#409eff">隐私条款</a>
          </el-checkbox><br>

          <!-- 登录按钮 -->
          <el-button @click="onLogin" type="primary" style="width:100%;margin-top:30px">登录</el-button>
        </el-form>

      <!-- 用户表单输入框end -->

    </el-card>
  </div>
</template>
<script>
export default {
  // 模型区  data是一个带返回值的一个函数
  data () {
    return {
      ruleForm: {
        // 只要提交数据，提交的数据就要和接口文档中的数据键名要完全一致
        mobile: '',
        code: ''
      },

      rules: {
        // 数组中的第一条规则是判断提交的内容不得为空，第二条规则是输入内容的规则 trigger:'blur'  trigger的意思是什么时候进行验证，blur是当失去光标焦点的时候进行验证 如果不写trigger这个属性的时候，就是边写边验证
        mobile: [{ required: true, message: '手机号不得为空', trigger: 'blur' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确格式的手机号', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不得为空', trigger: 'blur' }, {
          pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur'
        }]
      }

    }
  },
  // 方法区
  methods: {
    // 点击验证码按钮 触发
    onVerification () {
      // confirm('验证码已发送，请注意查收')
      // 做一个看起来相对来说好一点儿的弹框
      this.$notify({
        title: '成功',
        message: '验证码已发送，请注意查收',
        type: 'success'
      })
    },
    // 点击登录按钮触发
    onLogin () {
      // 测试一下
      // console.log('登录中')
      this.$refs.ruleForm.validate(ifOk => {
        if (ifOk) {
          // 发送请求
          this.$axios({
            url: '/authorizations',
            method: 'POST',
            data: this.ruleForm
          }).then(res => {
            // 打印一下，将获取到的token打印出来
            console.log(res.data.data.token)
            // 将获取到的token值保存到本地
            window.localStorage.setItem('token', res.data.data.token)
            // 将token值保存到本地之后，最后需要跳转到首页
            this.$router.push('/home')
            // 登录失败的时候使用catch来接收一下
          }).catch(() => {
            // 如果手机号或密码出错了，也要给用户一个友好的提示
            this.$message({
              message: '请输入正确的手机号及密码',
              type: 'warning'
            })
          })
        }
      })
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
