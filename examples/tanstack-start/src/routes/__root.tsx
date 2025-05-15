// 根路由组件：这是所有其他路由的入口点

import {
  HeadContent,
  Link,
  Outlet,
  ScriptOnce,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import ThemeToggle from '~/components/ThemeToggle';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function Navbar() {
  return (
    <div className="p-2 flex gap-2 text-lg">
      <ThemeToggle />
      <Link
        to="/"
        activeProps={{
          className: 'font-bold',
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>{' '}
      <Link
        to="/posts"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Posts
      </Link>{' '}
      <Link
        to="/users"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Users
      </Link>{' '}
      <Link
        to="/route-a"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Pathless Layout
      </Link>{' '}
      <Link
        to="/deferred"
        activeProps={{
          className: 'font-bold',
        }}
      >
        Deferred
      </Link>{' '}
      <Link className=" text-blue-500"
        to="/demo/index1"
        activeProps={{
          className: 'font-bold',
        }}
      >
        计数器
      </Link>{' '}
      <Link className=" text-red-500"
        // @ts-expect-error
        to="/this-route-does-not-exist"
        activeProps={{
          className: 'font-bold',
        }}
      >
        This Route Does Not Exist
      </Link>
    </div>
  )
}


function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    // 压制由于我们正在下面的自定义脚本中更新“黑暗”类
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {/* 使用ScriptOnce组件确保脚本只执行一次 */}
        {/* 根据localStorage中的theme设置或系统偏好，切换dark模式 */}
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>
        <Navbar />
        {children}        
        {/* React Query 开发工具，用于调试和监控 React Query 的状态，按钮位置在左下角 */}
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        {/* TanStack Router 开发工具，用于调试和监控路由状态，位置在右下角 */}
        <TanStackRouterDevtools position="bottom-right" />

        <Scripts />
      </body>
    </html>
  );
}

