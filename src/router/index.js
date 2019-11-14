import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页
import Login from '../views/login/'
// 引入首页
import Home from '../views/home/'
Vue.use(VueRouter)

const routes = [
  {
    // 重定向是redirect
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  }, {
    path: '/login',
    component: Login
  }
  // 这是按需加载的代码，先留着
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
// 实例化一个路由
const router = new VueRouter({
  routes
})

export default router
