<template>
  <el-container>
    <!-- 侧边栏start -->
      <el-asied class="index-left">
        <!-- logo div  start-->
        <div class="index-logo">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- logo div  end-->
        <!-- 下拉菜单布局start   下拉菜单中的背景色是使用elui特有的属性
          router是激活导航时index作为path进行跳转
        -->
        <el-menu
          background-color="#353b4e"
          text-color="#adafb5"
          style="width:201px"
          router
        >
          <el-menu-item item index="/homepage" style="">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">
                内容管理
            </template>
            <el-menu-item index="/article">发布文章</el-menu-item>
            <el-menu-item index="/content">内容类表</el-menu-item>
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

    <el-container style="background-color:#f2f3f5">
    <!-- 头部组件位置start -->
      <el-header>
        <objHeader></objHeader>
      </el-header>
    <!-- 头部组件位置end -->
      <el-main>
        <!-- 内容管理的二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入头部组件
import objHeader from '../../components/objheader.vue'
export default {
  // 挂载头部组件
  components: {
    objHeader
  },
  methods: {
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
