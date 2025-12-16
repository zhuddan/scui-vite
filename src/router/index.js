import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import config from '@/config'
import userRoutes from '@/config/route'
import tool from '@/utils/tool'
import { afterEach, beforeEach } from './scrollBehavior'
import systemRouter from './systemRouter'
import 'nprogress/nprogress.css'

// 系统路由
const routes = systemRouter

// 系统特殊路由
const routes_404 = {
  path: '/:pathMatch(.*)*',
  hidden: true,
  component: () => import(/* webpackChunkName: "404" */ '@/layout/other/404.vue'),
}
let routes_404_r = () => { }

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 设置标题
document.title = config.APP_NAME

// 判断是否已加载过动态/静态路由
let isGetRouter = false

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 动态标题
  document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME}` : `${config.APP_NAME}`

  const token = tool.cookie.get('TOKEN')

  if (to.path === '/login') {
    // 删除路由(替换当前layout路由)
    router.addRoute(routes[0])
    // 删除路由(404)
    routes_404_r()
    isGetRouter = false
    next()
    return false
  }

  if (routes.findIndex(r => r.path === to.path) >= 0) {
    next()
    return false
  }

  if (!token) {
    next({
      path: '/login',
    })
    return false
  }

  // 整页路由处理
  if (to.meta.fullpage) {
    to.matched = [to.matched[to.matched.length - 1]]
  }
  // 加载动态/静态路由
  if (!isGetRouter) {
    const apiMenu = tool.data.get('MENU') || []
    const userInfo = tool.data.get('USER_INFO')
    const userMenu = treeFilter(userRoutes, (node) => {
      return node.meta.role ? node.meta.role.filter(item => userInfo.role.includes(item)).length > 0 : true
    })
    const menu = [...userMenu, ...apiMenu]
    let menuRouter = filterAsyncRouter(menu)
    menuRouter = flatAsyncRoutes(menuRouter)
    menuRouter.forEach((item) => {
      router.addRoute('layout', item)
    })
    routes_404_r = router.addRoute(routes_404)
    if (to.matched.length === 0) {
      router.push(to.fullPath)
    }
    isGetRouter = true
  }
  beforeEach(to, from)
  next()
})

router.afterEach((to, from) => {
  afterEach(to, from)
  NProgress.done()
})

router.onError((error) => {
  NProgress.done()
  ElNotification.error({
    title: '路由错误',
    message: error.message,
  })
})

// 入侵追加自定义方法、对象
router.sc_getMenu = () => {
  const apiMenu = tool.data.get('MENU') || []
  const userInfo = tool.data.get('USER_INFO')
  const userMenu = treeFilter(userRoutes, (node) => {
    return node.meta.role ? node.meta.role.filter(item => userInfo.role.includes(item)).length > 0 : true
  })
  const menu = [...userMenu, ...apiMenu]
  return menu
}

// 转换
function filterAsyncRouter(routerMap) {
  const accessedRouters = []
  routerMap.forEach((item) => {
    item.meta = item.meta ? item.meta : {}
    // 处理外部链接特殊路由
    if (item.meta.type === 'iframe') {
      item.meta.url = item.path
      item.path = `/i/${item.name}`
    }
    // MAP转路由对象
    const route = {
      path: item.path,
      name: item.name,
      meta: item.meta,
      redirect: item.redirect,
      children: item.children ? filterAsyncRouter(item.children) : null,
      component: loadComponent(item.component),
    }
    accessedRouters.push(route)
  })
  return accessedRouters
}
/**
 * 把 { /src/views/home/index: () => import("/src/views/home/index.vue")
 * 转换成 { home/index: () => import("/src/views/home/index.vue")
 */
const modules = Object.fromEntries(
  Object.entries(import.meta.glob('@/views/**/*.vue'))
    .map(([name, module]) => {
      name = name.replace('/src/views/', '').replace('.vue', '')
      return [name, module]
    }),
)

function loadComponent(component) {
  if (component && modules[component]) {
    return modules[component]
  }
  else if (modules[`${component}/index`]) {
    // 尝试加载目录下的index.vue
    // ps 新配置的路由请尽量避免使用这种方式，直接指定到具体文件，避免增加不必要的打包体积
    return modules[component][`/index`]
  }
  else {
    return () => import(`@/layout/other/empty.vue`)
  }
}

// 路由扁平化
function flatAsyncRoutes(routes, breadcrumb = []) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (tmp.children) {
      const childrenBreadcrumb = [...breadcrumb]
      childrenBreadcrumb.push(route)
      const tmpRoute = { ...route }
      tmpRoute.meta.breadcrumb = childrenBreadcrumb
      delete tmpRoute.children
      res.push(tmpRoute)
      const childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb)
      childrenRoutes.forEach((item) => {
        res.push(item)
      })
    }
    else {
      const tmpBreadcrumb = [...breadcrumb]
      tmpBreadcrumb.push(tmp)
      tmp.meta.breadcrumb = tmpBreadcrumb
      res.push(tmp)
    }
  })
  return res
}

// 过滤树
function treeFilter(tree, func) {
  return tree.map(node => ({ ...node })).filter((node) => {
    node.children = node.children && treeFilter(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}

export default router
