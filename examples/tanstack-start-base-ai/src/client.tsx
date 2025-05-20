/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import { StrictMode } from 'react';

// 客户端入口文件
// 创建路由实例
const router = createRouter()

// 使用React 19的hydrateRoot进行客户端渲染
// 将StartClient组件挂载到document根节点，并传入路由实例
// <StrictMode>允许您在开发早期发现组件中的常见错误。
hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
