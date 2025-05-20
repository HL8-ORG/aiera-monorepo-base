/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'

// 服务端入口文件
// 由于 TanStack Start 是一个 SSR 框架，因此我们需要通过管道传输此路由器 信息发送到我们的服务器入口点

// 导出默认的SSR处理函数
// 使用createStartHandler创建服务端渲染处理器，传入：
// - createRouter: 路由创建函数
// - getRouterManifest: 路由清单获取函数
// 然后将默认的流式处理函数defaultStreamHandler作为参数传入
export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler)
