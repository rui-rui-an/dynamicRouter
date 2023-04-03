import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
// 下面这段代码主要解决这个问题 ：Uncaught (in promise) Error: Redirected when going from "/login" to "/index" via a navigation guard.
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 定义好静态路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    hidden: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
