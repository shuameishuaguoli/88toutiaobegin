import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页
import Login from '../views/login/'
// 引入布局页
import Layout from '../views/layout/'
// 引入发布文章页
import Article from '../views/article/publishArticle.vue'
// 引入内容列表页
import Content from '../views/contentList/contentList.vue'
// 引入首页
import Homepage from '../views/home/'
Vue.use(VueRouter)

const routes = [
  {
    // 重定向是redirect
    path: '/',
    component: Login
  },
  {
    path: '/Layout',
    component: Layout,
    // 配置二级路由表
    children: [
      {
        path: '/homepage',
        component: Homepage
      }, {
        path: '/content',
        component: Content
      }, {
        path: '/article',
        component: Article
      }
    ]
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
// 路由拦截器也就是vue中导航守卫，所有的请求都要经过这里
// 注册一个全局导航守卫，全局导航守卫分两种，一个是全局前置导航守卫，另一个是全局后置导航守卫
router.beforeEach((to, from, next) => {
  // 因为登录页是不需要token值的，如果要去的是登录页，则直接放行 to是一个对象，这个对象中有个属性叫path，path中存放的是我们需要跳转到的页面路径
  if (to.path === '/') {
    next() // 直接放行
    // 并终止后面的代码执行
    return
  }
  // 在全局前置导航中获取一下token值，如果有token值则放行，如果没有token则直接跳转到登录页
  const token = window.localStorage.getItem('token')
  // 在这里判断一下，如果有token值则放行，如果没有则跳转到登录页
  if (token) {
    // 如果可以获取到本地的token值，则直接放行
    next()
  } else {
    // 如果没有获取到本地的token的值，则跳转到登录页
    next('/')
  }
})

export default router
