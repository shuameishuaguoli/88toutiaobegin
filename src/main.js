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
// 在Vue中注册一下
Vue.use(Element)
// 默认是开发模式，true为生产模式
Vue.config.productionTip = false

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
