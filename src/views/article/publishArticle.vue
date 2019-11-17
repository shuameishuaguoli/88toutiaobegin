<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布文章</span>
    </div>
    <!-- 表单卡片start -->
    <el-form>
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="formdata.title"></el-input>
      </el-form-item>

      <!-- 富文本编辑器start -->
      <el-form-item label="内容" label-width="80px">
        <quillEditor
        class="fuwenben"
        v-model="formdata.content"
        ref="myQuillEditor"
        :options="editorOption"
        ></quillEditor>
      </el-form-item>
      <!-- 富文本编辑器end -->

      <div class="towbtn">
        <!-- 下拉框start -->
        <el-form-item label="频道" label-width="80px">
          <!-- select标签中绑定的是id -->
          <el-select placeholder="选择频道" v-model="formdata.channel_id">
            <el-option
            v-for="(item, index) in channelList"
            :key="index"
            :label="item.name"
            :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框end -->

        <!-- 两个按钮 -->
        <el-form-item label-width="80px">
          <el-button
          type="primary"
          :plain="true"
          @click="onPublish(false)"
          >
          发表
          </el-button>
          <el-button
          :plain="true"
          @click="onPublish(true)"
          >
          存为草稿
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表单卡片end -->
  </el-card>
</template>

<script>
// 引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 我们将富文本编辑器注册到局部
// 引入富文本编辑器包
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'publish',
  // 进行注册
  components: {
    quillEditor
  },
  // 模型区
  data () {
    return {
      // 一定要注意：声明form表单中的数据的时候一定要和接口文档中的数据一一对应，不然发送请求的时候就会报错
      // 定义一个空数组，用来接收一下从服务器响应回来的频道数据
      channelList: [],
      // 富文本编辑器的配置选项对象
      editorOption: {},
      // 在form表单中定义数据是为了发送数据的时候方便
      formdata: {
        // title是用来接收文章标题
        title: '',
        // channel_id用来接收下拉框的ID值
        channel_id: '',
        // content是用来接收文章内容
        content: '',
        // 接受图片的变量
        cover: {
          type: 0,
          images: []
        }
      }
    }
  },
  // 方法区
  methods: {
    // 封装一个获取全部频道的方法
    getChannel () {
      this.$axios({
        // 请求地址
        url: '/channels',
        method: 'GET'
      }).then(res => {
        console.log(res)
        // 将从服务器响应回来的数据赋值给到定义好的空数组
        this.channelList = res.data.data.channels
        console.log(this.channelList)
      }).catch(erro => {
        console.log('频道数据获取失败！', erro)
      })
    },
    // 点击发布或草稿按钮触发的事件
    onPublish (draft) {
      if (draft) {
        this.$message('草稿保存成功')
        // 草稿保存成功之后调用一下send()方法，发送请求
        this.send(draft)
      } else {
        this.$message({
          message: '文章发表成功',
          type: 'success'
        })
        // 草稿保存成功之后调用一下send()方法，发送请求
        this.send(draft)
      }
    },
    // 封装一下发表文章和保存草稿的方法
    send (draft) {
      // 获取一下本地的token值
      const token = window.localStorage.getItem('token')
      console.log(token)
      this.$axios({
        // 请求地址
        url: '/articles',
        // 请求方式
        method: 'POST',
        // 发送请求头
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 以为draft是query参数，所以我们要使用params传参
        params: {
          draft
        },
        // 获取到的内容标题图片都放到data中传参，因为这些数据在后台使用时body接收的
        data: this.formdata
      }).then(res => {
        console.log(res)
        // 发表成功之后需要跳转到内容列表页面
        this.$router.push('/content')
      }).catch(erro => {
        console.log('发布失败哦！', erro)
      })
    }
  },
  // 组件加载区
  created () {
    // 调用一下获取所有频道数据的方法
    this.getChannel()
  }
}
</script>

// scope的意思是只在当前作用域起作用
<style lang="less" scope>
  .fuwenben{
      height: 130px;
  }
  .towbtn{
    margin-top: 120px;
  }
</style>
