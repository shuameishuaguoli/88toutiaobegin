<template>
  <div>
      <!-- 品论卡片start -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评论管理-共找到{{}}条数据</span>
        </div>
        <template>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="总评论数"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="粉丝评论数据">
            </el-table-column>
            <el-table-column
                prop="address"
                label="评论状态">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
            </el-table-column>
        </el-table>
  </template>
    </el-card>
      <!-- 品论卡片end -->
  </div>
</template>

<script>
export default {
  // 建议给每个组件都添加一个姓名，方便在vue调试工具中调试组件
  name: 'comment',
  // 模型区
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    //   封装一个函数，用来获取所有的评论数据
    gitcomment () {
      // 获取一下token值
      const token = window.localStorage.getItem('token')
      this.$axios({
        // 请求路径
        url: '/articles',
        //   请求方式
        method: 'GET',
        params: {
          response_type: 'statistic'
        },
        // 在请求头中发送token值
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
      }).catch(erro => {
        console.log(erro, '评论获取失败')
      })
    }
  },
  //  组件还未生成 钩子函数
  created () {
    // 调用一下获取所有评论数据的方法
    this.gitcomment()
  }
}
</script>
<style>

</style>
