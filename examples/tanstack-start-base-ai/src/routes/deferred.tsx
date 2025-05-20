import { Await, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Suspense, useState } from 'react'

// 创建一个立即返回的服务器函数，用于获取用户信息
const personServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d) // 验证输入数据
  .handler(({ data: name }) => {
    // 返回包含用户名和随机数的对象
    return { name, randomNumber: Math.floor(Math.random() * 100) }
  })

// 创建一个延迟返回的服务器函数，用于模拟慢速请求
const slowServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d) // 验证输入数据
  .handler(async ({ data: name }) => {
    // 模拟1秒延迟
    await new Promise((r) => setTimeout(r, 1000))
    // 返回包含用户名和随机数的对象
    return { name, randomNumber: Math.floor(Math.random() * 100) }
  })

// 定义/deferred路由
export const Route = createFileRoute('/deferred')({
  // 路由加载器，用于获取数据
  loader: async () => {
    return {
      // 模拟一个2秒延迟的异步数据
      deferredStuff: new Promise<string>((r) =>
        setTimeout(() => r('Hello deferred!'), 2000),
      ),
      // 使用慢速服务器函数获取用户信息
      deferredPerson: slowServerFn({ data: 'Tanner Linsley' }),
      // 使用立即返回的服务器函数获取用户信息
      person: await personServerFn({ data: 'John Doe' }),
    }
  },
  // 路由组件
  component: Deferred,
})

function Deferred() {
  const [count, setCount] = useState(0)
  const { deferredStuff, deferredPerson, person } = Route.useLoaderData()

  return (
    <div className="p-2">
      <div data-testid="regular-person">
        {person.name} - {person.randomNumber}
      </div>
      <Suspense fallback={<div>Loading person...</div>}>
        <Await
          promise={deferredPerson}
          children={(data) => (
            <div data-testid="deferred-person">
              {data.name} - {data.randomNumber}
            </div>
          )}
        />
      </Suspense>
      <Suspense fallback={<div>Loading stuff...</div>}>
        <Await
          promise={deferredStuff}
          children={(data) => <h3 data-testid="deferred-stuff">{data}</h3>}
        />
      </Suspense>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}
