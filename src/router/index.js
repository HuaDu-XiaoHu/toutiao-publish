import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Article from '@/views/article'
import Publish from '@/views/publish'
// 配置layout路由
import Layout from '@/views/layout'

Vue.use(VueRouter)
// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空会默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }

]
const router = new VueRouter({
  routes
})
// 路由导航守卫，
router.beforeEach((to, from, next) => {
  // console.log(1)
  // console.log(to)
  // console.log(from)
  const user = window.localStorage.getItem('user')
  // console.log(user)
  // 校验非登录页面的登录状态
  // console.log(to.path)
  if (to.path !== '/login') {
    // console.log(2)
    if (user) {
      // console.log(user)
      // console.log(3)
      next()
    } else {
      // console.log(4)
      next('/login')
    }
  } else {
    next()
  }
})
export default router
