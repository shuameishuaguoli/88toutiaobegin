<template>
   <!-- 头部和内容区域start -->
<el-header class="index-header">
    <!-- 头部左边div -->
    <div class="header-left">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </div>
    <!-- 头部右边div margin-right:10px-->
    <div class="header-right">
        <el-tooltip content="搜索信息" style="">

          <!-- 搜索框 -->
          <el-input
          class="header-search"
          placeholder="请输入搜索的文章内容"
          prefix-icon="el-icon-search"
          size="small"
          >
          </el-input>
        </el-tooltip>

        <!-- 提示消息 margin-right:10px-->
        <el-tooltip content="提示消息">
          <span style="color:#adafb5;">消息</span>
        </el-tooltip>
        <!-- 用户头像 -->
        <div class="header-right-img">
          <img src="../assets/img/gongfu.jpg" alt="">
        </div>
        <!-- 用户名 -->
        <!--  -->
        <el-dropdown trigger="click" style=" cursor: pointer;">
          <span class="el-dropdown-link">
            未成年<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>
              <a href="https://github.com/shuameishuaguoli">git地址</a>
            </el-dropdown-item>
            <!-- @click="onGitout" -->
            <el-dropdown-item>
              <el-button type="text" @click="onGitout">
                    退出
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
</el-header>
    <!-- 头部和内容区域end -->
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    // 点击突出按钮的时候需要跳转页面，并将本地的token值进行删除
    onGitout () {
      this.$confirm('确定要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 跳转到登录页
        this.$router.push('/')
        // 将本地的token值进行删除
        window.localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style long="less">

</style>
