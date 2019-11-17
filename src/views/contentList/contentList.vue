<template>
  <div>
    <!-- 表单卡片start -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 表单start -->
      <el-form>
        <!-- 单选start -->
        <el-form-item label="文章状态">
          <el-radio-group v-model="formdata.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
         </el-form-item>
        <!-- 单选end -->

        <!-- 频道列表  下拉菜单start -->
        <el-form-item label="频道列表" size="small">
          <el-select v-model="formdata.channel_id" placeholder="请选择频道">
            <el-option :value="null" label="所有频道"></el-option>
            <!-- 使用v-for的时候要注意：想要循环生成谁，就在谁的标签上添加v-for -->
            <el-option
            v-for="(item, index) in channellist"
            :key="index"
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 频道列表  下拉菜单end -->

        <!-- 时间表单start  v-model="value1"-->
        <el-form-item label="时间选择" size="small">
              <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="timeFrame"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
        </el-form-item>
        <!-- 时间表单end -->
        <el-form-item style="margin-left:70px">
          <el-button size="small" type="primary" @click="getAllarticle(page)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单end -->
    </el-card>
    <!-- 表单卡end -->

    <!-- 展示文章列表卡片start -->
    <el-card class="box-card box-card-two">
      <div slot="header" class="clearfix">
        <span>共找到{{totalPage}}条符合条件的内容</span>
      </div>
      <!-- :data表示的是从哪个对象中读取数据  下面的每一项只写遍历出来的变量就可以啦；
      表格中的数据默认的是只能是渲染文本内容，如果需要渲染图片或者其他按钮的话，需要自定义标签，我们使用template标签，自定义标签-->
       <el-table
        :data="articlelist"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <el-table-column
        prop="images[0]"
        label="封面"
        width="180">
        <!-- 这里需要注意 使用template标签的时候，需要加入slot-scope="scope" 这个属性  下边的scope.row相当于v-for中的item，也就是遍历出来的每一项-->
        <template slot-scope="scope">
          <img style="width:50px" :src="scope.row.cover.images[0]" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="articlestatus[scope.row.status].type">
            {{articlestatus[scope.row.status].label}}
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <!-- 编辑按钮 -->
        <template slot-scope="scope">
          <el-button type="success">
            编辑
          </el-button>
          <el-button type="danger" @click="onDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    </el-card>
    <!-- 展示文章列表卡片end -->
    <!-- 分页卡片start -->
    <el-card style="margin-top:10px; display: flex; justify-content: center;
     align-items: center;">
     <!-- prev是上一页 pager是页码  next是下一页 :disabled是将页码禁用的属性，我们这里使用的loading，因为disabled的值是一个布尔值，loading的值刚好是一个布尔值，所以我们就用了这个loading
      实现的页面效果是：当页面加载的时候，出现loading的显示现象，同时disabled的值设置为了true，为true后，页面就禁用了，等到页面加载完毕后，disabled的值就又是false了
     -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPage"
        @current-change="onpageChange"
        :disabled="loading"
        >
      </el-pagination>
    </el-card>
    <!-- 分页卡片end -->
  </div>
</template>

<script>
export default {
  // 建议给每个组件都起一个名字，这样在浏览器使用vue调试工具的时候，方便调试，只要在调试工具中输入这个组件的名就可以快速找到这个组件
  name: 'contentlist',
  // 模型区
  data () {
    return {
      formdata: {
        // 这是文章状态 这里的status和channel_id为什么会自定义成要给null呢，因为在axios中初始化成一个null的时候就默认不会发送参数了
        status: null,
        // 这是频道id
        channel_id: null
        // 时间是一个数组类型，所我们要单独设置一下
        // 开始时间
        // begin_pubdate: '',
        // 截止时间
        // end_pubdate: ''
      },
      articlestatus: [{
        type: '',
        label: '草稿'
      }, {
        type: 'warning',
        label: '待审核'
      }, {
        type: 'success',
        label: '审核通过'
      }, {
        type: 'info',
        label: '审核失败'
      }, {
        type: 'danger',
        label: '已删除'
      }],
      // 定义一个空数组，因为服务器响应回来的数据是一个数组类型，所以我们这个数据初始化的时候也要是一个数组类型
      articlelist: [],
      // 定义一个空数组，因为用来接收从服务器响应回来的数据，因为响应回来的是一个数组类型，所以我们也要定义一个数组类型，并且是一个空数组
      channellist: [],
      // 定义一个数组，用来绑定时间范围
      timeFrame: [],
      // 当前页
      page: 1,
      // 设置一个总页数的变量
      totalPage: 0,
      // 给等待值一个初始化的值 初始化一个true
      loading: true

    }
  },
  // 方法区
  methods: {
    // 声明一个获取所有文章类表的方法
    getAllarticle (page) {
      // 将loading的值设置为true
      this.loading = true
      // 获取一下本地的token值
      const token = window.localStorage.getItem('token')
      // console.log(token)
      // 发送请求
      this.$axios({
        url: '/articles',
        method: 'GET',
        // 将token值放到请求头中
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          // 当前的页码
          page,
          // 发送所要查询的文章状态
          status: this.formdata.status,
          // 发送所要查询的频道的id
          channel_id: this.formdata.channel_id,
          // 如果有时间就传时间，如果没有时间就传一个null，在axios中，如果所传的参数的值为null，axios就自动不会将这个参数进行发送
          begin_pubdate: this.timeFrame ? this.timeFrame[0] : null,
          end_pubdate: this.timeFrame ? this.timeFrame[1] : null
        }
      }).then(res => {
        console.log(res)
        // 将响应回来的数据赋值给到我们定义好的内个空数组中
        this.articlelist = res.data.data.results
        // 将总页数赋值给到totalPage
        this.totalPage = res.data.data.total_count
        console.log(this.articlelist)
      }).catch(erro => {
        console.log(erro, '获取失败')
      }).finally(() => {
        this.loading = false
      })
    },
    // 声明一个获取所有频道的方法
    getChannel () {
      // 发送请求
      this.$axios({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        console.log(res)
        // 将响应回来的数据赋值给到定义好的新数组
        this.channellist = res.data.data.channels
        console.log(this.channellist)
      })
    },
    // 点击页码的时候触发这个方法，page是current-change事件中的一个默认值
    onpageChange (page) {
      console.log(page)
      // 我点击了页码的时候需要调用一下获取文章列表的方法
      this.getAllarticle(page)
    },
    // 点击删除按钮触发的方法
    onDelete (articleID) {
      // console.log('ID是' + articleID)
      const token = window.localStorage.getItem('token')
      this.$confirm('确定要删除该文章吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // ID获取到了，发送请求就OK啦
        this.$axios({
        // 请求地址
          url: `/articles/${articleID}`,
          // 请求方式
          method: 'DELETE',
          // 在请求请求头中携带token
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(erro => {
          console.log(erro, '删除貌似失败了')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  // 组件加载区
  created () {
    // 调用获取所有文章内容的方法
    this.getAllarticle()
    // 调用获取所有频道的方法
    this.getChannel()
  }
}
</script>

<style lang="less">
   .box-card-two{
     margin-top: 20px;
   }
</style>
