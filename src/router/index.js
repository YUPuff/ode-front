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
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台管理系统', icon: 'dashboard' }
    }]
  },

  // 人员管理
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'admin',
    meta: { title: '人员管理', icon: 'el-icon-s-help' },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/admin/index'),
        meta: { title: '人员列表', icon: 'peoples' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        hidden: true,
        component: () => import('@/views/admin/edit'),
        meta: { title: '编辑' }
      }
    ]
  },

  // 菜品管理
  {
    path: '/dish',
    component: Layout,
    redirect: '/dish/list',
    name: 'Dishes',
    meta: { title: '菜品管理', icon: 'el-icon-s-help' },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/dishes/index'),
        meta: { title: '菜品列表', icon: 'dish' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        hidden: true,
        component: () => import('@/views/dishes/edit'),
        meta: { title: '编辑', icon: 'dish' }
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component: () => import('@/views/dishes/add'),
        meta: { title: '添加', icon: 'dish' }
      }
    ]
  },

  // 分类管理
  {
    path: '/type',
    component: Layout,
    redirect: '/type/list',
    name: 'type',
    meta: { title: '分类管理', icon: 'list' },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/type/index'),
        meta: { title: '分类列表', icon: 'list' }
      }
    ]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Dishes',
    meta: { title: '订单管理' },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表', icon: 'skill' }
      },
      {
        path: 'detail/:id',
        name: 'detail',
        hidden: true,
        component: () => import('@/views/order/detail'),
        meta: { title: '详情' }
      }
    ]
  },

  // 评论管理
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/list',
    name: 'Comment',
    meta: { title: '评论管理' },
    // 当children数大于1时，自动变为嵌套模式
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'edit' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = [
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
