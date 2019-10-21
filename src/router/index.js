import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  setToken,
  getToken,
  setTitle,
  localSave,
  localRead
} from '@/libs/util'
import config from '@/config'
// 引入加载菜单
import {
  loadMenu,
  formatMenu
} from '@/libs/router-util'
import {
  getRouteindex // 这里是封装的后台返回菜单数据的接口，方法名称根据实际情况改变
} from '@/api/data'
const {
  homeName
} = config
Vue.use(Router)
const router = new Router({
  routes: [...routes, ...loadMenu()],
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  const menu = localRead('route') // 读取路由数据
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (!menu || menu.length === 0) {
      getRouteindex().then(res => {
        var list = []
        var menuData = res.data
        localSave('route', JSON.stringify(menuData)) // 缓存用户菜单
        // 格式化菜单
        list = formatMenu(menuData)
        // 将404路由动态注入，防止第一次没有路由数据跳转到404,

        // 刷新界面菜单
        store.commit('updateMenuList', list)
        next()
      })
    } else {
      next()
    }
    /* store.dispatch('getUserInfo').then(user => {
      // 如果本地不存在路由数据则动态获取
      console.log(2)
      if (!menu || menu.length === 0) {
        console.log(3)
        getRouteindex().then(res => {
          var list = []
          var menuData = res.data
          localSave('route', JSON.stringify(menuData)) // 缓存用户菜单
          // 格式化菜单
          list = formatMenu(menuData)
          // 将404路由动态注入，防止第一次没有路由数据跳转到404,

          // 刷新界面菜单
          store.commit('updateMenuList', list)
          next()
        })
      } else {
        console.log(4)
        next()
      }
    }).catch(() => {
      console.log(5)
      setToken('')
      next({
        name: 'login'
      })
    }) */
  }
})

router.afterEach(to => {
  // setTitle(to, router.app)
  iView.LoadingBar.finish()
  // window.scrollTo(0, 0)
})

export default router
