<template>
  <el-container>
    <!-- 侧边栏start -->
      <el-asied class="index-left">
        <!-- logo div  start-->
        <div class="index-logo">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- logo div  end-->
        <!-- 下拉菜单布局start   下拉菜单中的背景色是使用elui特有的属性-->
        <el-menu
          background-color="#353b4e"
          text-color="#adafb5"
          style="width:201px"
        >
          <el-menu-item item index="1" style="">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">
                内容管理
            </template>
            <el-menu-item index="2-1">发布文章</el-menu-item>
            <el-menu-item index="2-2">内容类表</el-menu-item>
            <el-menu-item index="2-3">评论列表</el-menu-item>
            <el-menu-item index="2-4">素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
                粉丝管理
            </template>
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">账户信息</el-menu-item>
        </el-menu>
        <!-- 下拉菜单布局end -->
      </el-asied>
    <!-- 侧边栏end -->
    <!-- 头部和内容区域start -->
      <el-container style="background-color:#f2f3f5">
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
                  <img src="../../assets/img/gongfu.jpg" alt="">
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
                    <el-dropdown-item >退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-main>内容区域</el-main>
      </el-container>
    <!-- 头部和内容区域end -->
  </el-container>
</template>
<script>
export default {
  methods: {
    // 点击突出按钮的时候需要跳转页面，并将本地的token值进行删除
    // onGitout () {
    //   // 跳转到登录页
    //   this.$router.replace('/login')
    //   // 将本地的token值进行删除
    //   window.localStorage.removeItem('token')
    //   alert('你个王日天')
    // },
    // 警告框
    warning () {
      this.$notify({
        title: '警告',
        message: `登了仨月的基，
        就妄想当秦始皇，
        装了仨月的逼，
        造就一个平嘻王，
        我可悲的自负上演荆轲刺秦，
        隔壁大老王，
        我怎么听说是您`,
        // 设置类型的
        type: 'warning',
        // duration的值为零的时候，提示框是不能自动关闭的，duration接收的是一个number值
        duration: 0
      })
    }
  },
  // 在页面渲染之前的执行的逻辑代码
  created () {
    this.warning()
  }
}
</script>

<style lang="less">
  // 侧边栏样式
  .index-left{
    width: 200px;
    height: 100vh;
    background-color: #323745;
    .index-logo{
      width: 100%;
      height: 60px;
      background-color: #2e2f32;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        height: 30px;
      }
    }
    // 鼠标悬停的时候需要改变背景色的样式
    .el-submenu .el-menu-item:hover{
      background-color: #3296fa !important;
      color: #fff !important;
    }
    // 点击的时候需要样式停留到当前的导航上
    .el-submenu .el-menu-item.is-active{
      background-color: #3296fa !important;
      color: #fff !important;
    }
  }
  // 头部样式
  .index-header{
    background-color: #fff;
    height: 55px !important;
    display: flex;
    .header-left{
      flex: 6;
      display: flex;
      align-items: center;
      i{
        font-size: 22px;
      }
      span{
        margin-left: 10px;
        font-size: 16px;
      }
    }
    // 头部右边div样式设置
    .header-right{
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      padding-right: 10px;
      .header-search{
        width: 230px;
      }
      .header-right-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
  }
</style>
