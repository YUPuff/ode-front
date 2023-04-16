import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'), // @指的是src目录
    hidden: true // 设置为true意味着此项不会出现在侧边栏，默认为false
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true // 设置为true意味着此项不会出现在侧边栏，默认为false
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = [

  // 待处理订单
  {
    path: '/todo',
    component: Layout,
    redirect: '/todo/list',
    name: 'todo',
    meta: { role: ['admin', 'waiter', 'cook'] },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/todo/index'),
        meta: { title: '待处理订单', icon: 'education', role: ['admin', 'waiter', 'cook'] }
      }
    ]
  },
  // 人员管理
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'admin',
    meta: { role: ['admin'] },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/admin/index'),
        meta: { title: '人员管理', icon: 'peoples', role: ['admin'] }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        hidden: true,
        component: () => import('@/views/admin/edit'),
        meta: { title: '编辑人员', role: ['admin'] }
      }
    ]
  },

  // 菜品管理
  {
    path: '/dish',
    component: Layout,
    redirect: '/dish/list',
    name: 'Dishes',
    meta: { role: ['admin', 'waiter'] },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/dishes/index'),
        meta: { title: '菜品管理', icon: 'dish', role: ['admin', 'waiter'] }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        hidden: true,
        component: () => import('@/views/dishes/edit'),
        meta: { title: '编辑菜品', icon: 'dish', role: ['admin'] }
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component: () => import('@/views/dishes/add'),
        meta: { title: '添加菜品', icon: 'dish', role: ['admin'] }
      }
    ]
  },

  // 分类管理
  {
    path: '/type',
    component: Layout,
    redirect: '/type/list',
    name: 'type',
    meta: { role: ['admin'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/type/index'),
        meta: { title: '分类管理', icon: 'list', role: ['admin'] }
      }
    ]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Dishes',
    meta: { title: '订单管理', role: ['admin', 'waiter'] },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'skill', role: ['admin', 'waiter'] }
      },
      {
        path: 'detail/:id',
        name: 'detail',
        hidden: true,
        component: () => import('@/views/order/detail'),
        meta: { title: '订单详情', role: ['admin', 'waiter'] }
      }
    ]
  },

  // 评论管理
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/list',
    name: 'Comment',
    meta: { role: ['admin'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'edit', role: ['admin'] }
      }
    ]
  },

  // 营业统计
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics',
    name: 'Statistics',
    meta: { role: ['admin'] },
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/statistics/index'),
        meta: { title: '营业统计', icon: 'chart', role: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
