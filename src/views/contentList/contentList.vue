<template>
  <div>
    <!-- 表单卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 表单start -->
      <el-form>
        <!-- 单选start -->
        <el-form-item label="文章状态">
          <el-radio-group>
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
         </el-form-item>
        <!-- 单选end -->

        <!-- 频道列表  下拉菜单start -->
        <el-form-item label="频道列表" size="small">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
              >
            </el-date-picker>
        </el-form-item>
        <!-- 时间表单end -->
      </el-form>
      <!-- 表单end -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 对form表单中的数据进行数据绑定
      formdata: {

      }
    }
  }
}
</script>

<style>
</style>
