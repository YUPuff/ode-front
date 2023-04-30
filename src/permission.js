import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // 派发user/getInfo action 获取当前用户角色信息
          const { role } = await store.dispatch('user/getInfo')
          var roles = []
          if (role === 0) {
            roles.push('admin')
          } else if (role === 1) {
            roles.push('waiter')
          } else {
            roles.push('cook')
          }
          // 派发角色信息到permission/generateRoutes action 生成动态路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 挂载动态路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// router.beforeEach((to, from, next) => {
//   if (store.getters.token) { // 判断是否有token
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       if (store.getters.role.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('user/getInfo').then(res => { // 拉取info
//           var role = []
//           if (res.role === 0) {
//             role.push('admin')
//           } else if (res.role === 1) {
//             role.push('waiter')
//           } else {
//             role.push('cook')
//           }
//           console.log(role)
//           store.dispatch('permission/GenerateRoutes', { role }).then(() => { // 生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         }).catch(err => {
//           console.log(err)
//         })
//       } else {
//         next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/login') // 否则全部重定向到登录页
//     }
//   }
// })

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
