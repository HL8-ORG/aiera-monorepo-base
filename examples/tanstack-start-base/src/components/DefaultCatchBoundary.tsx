import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
/**
 * 默认的错误边界组件，用于捕获并处理路由中的错误
 * @param {ErrorComponentProps} props - 组件属性，包含错误信息
 * @returns {JSX.Element} 错误处理界面
 */
export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  // 获取路由实例
  const router = useRouter()

  // 检查当前路由是否是根路由
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  // 在控制台输出错误信息
  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      {/* 显示错误组件 */}
      <ErrorComponent error={error} />

      {/* 操作按钮区域 */}
      <div className="flex gap-2 items-center flex-wrap">
        {/* 重试按钮 */}
        <button type="button"
          onClick={() => {
            // 重新验证路由
            router.invalidate()
          }}
          className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
        >
          Try Again
        </button>

        {/* 根据是否是根路由显示不同的导航按钮 */}
        {isRoot ? (
          // 根路由时显示返回首页按钮
          <Link
            to="/"
            className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
          >
            Home
          </Link>
        ) : (
          // 非根路由时显示返回上一页按钮
          <Link
            to="/"
            className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
            onClick={(e) => {
              e.preventDefault()
              // 使用浏览器历史记录返回
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}
