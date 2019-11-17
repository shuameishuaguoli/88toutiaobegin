<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布文章</span>
    </div>
    <!-- 表单卡片start -->
    <el-form>
      <el-form-item label="标题" label-width="80px">
        <el-input></el-input>
      </el-form-item>

      <!-- 富文本编辑器start -->
      <el-form-item label="内容" label-width="80px">
        <quillEditor class="fuwenben"></quillEditor>
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
          <el-button type="primary">发表</el-button>
          <el-button>存为草稿</el-button>
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
      // 定义一个空数组，用来接收一下从服务器响应回来的频道数据
      channelList: [],
      // 在form表单中定义数据是为了发送数据的时候方便
      formdata: {
        // title是用来接收文章标题
        title: '',
        // channel_id用来接收下拉框的ID值
        channel_id: '',
        // content是用来接收文章内容
        content: ''
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
