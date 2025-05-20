import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

/**
 * 创建并返回一个React Router实例
 * @returns {Router} 配置好的路由实例
 */
export function createRouter() {
  // 使用TanStack Router创建路由实例
  const router = createTanStackRouter({
    routeTree, // 使用自动生成的路由树
    defaultPreload: 'intent', // 默认使用intent方式进行预加载
    defaultErrorComponent: DefaultCatchBoundary, // 设置默认错误边界组件
    defaultNotFoundComponent: () => <NotFound/>, // 设置默认404页面组件
    scrollRestoration: true, // 启用滚动位置恢复功能
  })

  return router
}

/**
 * 扩展TanStack Router的类型声明
 * 注册当前路由实例的类型信息
 */
declare module '@tanstack/react-router' {
  interface Register {
    // 将当前路由实例的类型注册到Router类型系统中
    router: ReturnType<typeof createRouter>
  }
}
