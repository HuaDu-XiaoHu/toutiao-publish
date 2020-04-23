import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
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
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/', // path为空会默认子路由渲染
        name: 'home',
        component: Home
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
