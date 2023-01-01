import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/'
import store from '@/store'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { menuList } from '@/config/menu'
import { getUserInfoByToken, getUserMenuTree } from '@/api/user'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    children: []
  },
  {
    path: '/user',
    component: () => import('@/views/user/'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/login')
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: () => import('@/views/user/signUp')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // 获取token
  let token = storage.get(ACCESS_TOKEN)
  // 白名单(不需要登录就可以访问的名单)
  const whiteList = ['/user/login', '/user/signUp']
  if (token) {
    let userInfo = store.getters.getUserInfo
    if (!userInfo) {
      // 获取用户信息
      userInfo = await getUserInfoByToken().then(res => res.data)
      store.commit('SET_USERINFO', userInfo)
      // 添加路由
      let newRoutes = router.options.routes
      let menuLists = await getUserMenuTree(userInfo.id).then(res => res.data)
      store.commit('SET_MENUTREE', menuLists)
      menuList?.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            // 转成路由
            let route = menuToRoute(e)
            // 把路由添加到路由管理中
            if (route) {
              newRoutes[0].children.push(route)
            }
          })
        } else {
          let route = menuToRoute(menu)
          // 把路由添加到路由管理中
          if (route) {
            newRoutes[0].children.push(route)
          }
        }
      })
      for (let x of newRoutes) {
        router.addRoute(x)
      }
      if ([...whiteList].includes(to.path)) {
        next('/')
      } else {
        next({ ...to, replace: true })
      }
    } else {
      if ([...whiteList].includes(to.path)) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/user/login`)
    }
  }
})

const menuToRoute = menu => {
  if (!menu.component) {
    return null
  }
  let route = {
    name: menu.name,
    path: menu.path,
    meta: menu.meta
  }

  route.component = () => import('@/views' + menu.component)
  return route
}
export default router
