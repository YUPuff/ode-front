import { asyncRouterMap, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

// const permission = {

// }
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routers: [],
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  }
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 定义变量来存放可访问路由表
      let accessedRouters
      if (roles.includes('admin')) {
        // 所有路由都能被访问
        accessedRouters = asyncRouterMap || []
      } else {
        // 根据角色过滤掉不能访问的路由表
        accessedRouters = filterAsyncRoutes(asyncRouterMap, roles)
      }
      commit('SET_ROUTERS', accessedRouters)
      resolve(accessedRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
