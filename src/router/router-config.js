import router from './index'
import Layout from '../layout/index'
import NProgress from 'nprogress' // progress bar
import store from '@/store'
import menu from '@/mock/menu.js'

// 路由拼接
function loadView(view) {
  return () => import(`@/views/${view}`)
}
// 路由过滤   遍历路由 转换为组件对象和路径
function filterASyncRoutes(data) {
  // console.log(data)
  const routes = data.filter(item => {
    if (item['component'] === 'Layout') {
      item.component = Layout
    } else {
      item['component'] = loadView(item['component'])
    }
    // 路由递归，转换组件对象和路径
    if (item['children'] && item['children'].length > 0) {
      item['children'] = filterASyncRoutes(item.children)
    }
    return true
  })
  // 排序
  routes.sort((a, b) => a['id'] - b['id'])
  return routes
}

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单页面直接进入
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 白名单页面，不管是否有token，是否登录都直接进入
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return false
  }
  // 有token（代表了有用户信息，但是不确定有没有路由信息）
  if (store.state.User.token) {
    // 判断当前用户是否是登录状态， 是登录状态则一定有路由，直接放行，不是登录状态则去获取路由菜单登录
    // 刷新时store.state.routerList.hasRoutes会重置为false，重新去获取 异步路由
    if (!store.state.routerList.hasRoutes) {
      setTimeout(() => {
        const res = menu.filter(item => item.token === store.state.User.token)[0].routes
        const asyncRouter = filterASyncRoutes(res) // 递归处理后台返回的路由
        store.commit('routerList/setRouterList', asyncRouter) // 存储到异步的路由到vuex
        store.commit('routerList/setHasRoutes', true) // 设置登录状态为true
        router.addRoutes(asyncRouter) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确
      }, 500)
    } else {
      next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
    }
  }else {
    next({path:'/login'})
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
