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
// axios挂载到Vue的prototype中  给全局的Vue变量都挂载了axios，这样在其他组件中使用axios的时候就可以直接用就行了
Vue.prototype.$axios = axios
// 设置一下url的常态地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 在Vue中注册一下
Vue.use(Element)
// 默认是开发模式，true为生产模式
Vue.config.productionTip = false

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
