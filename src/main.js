// 引入vue
import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入elementui
import Element from 'element-ui'
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局默认样式
import './style/index.less'
// 引入axios
import axios from 'axios'
// 引入nprogress插件的样式，包是在router下的index.js引入的
import 'nprogress/nprogress.css'
// axios挂载到Vue的prototype中  给全局的Vue变量都挂载了axios，这样在其他组件中使用axios的时候就可以直接用就行了
// 引入json-bigint包
import JSONbig from 'json-bigint'
Vue.prototype.$axios = axios
// 设置一下url的常态地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 在Vue中注册一下
Vue.use(Element)
// 默认是开发模式，true为生产模式
Vue.config.productionTip = false

axios.defaults.transformResponse = [function (data) {
  // 这里使用 JSONbig.parse 转换原始数据
  // 类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是 json 格式字符串就会报错
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
