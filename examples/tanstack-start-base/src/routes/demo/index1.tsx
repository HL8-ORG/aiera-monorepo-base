// app/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Button } from '@hl8/ui/components/button'
const filePath = 'count.txt'

async function readCount() {
  return Number.parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    console.log('计数器：', count)
    await fs.promises.writeFile(filePath, `${count + data}`)
  })



export const Route = createFileRoute('/demo/index1')({
  component: DemoIndex1,
  loader: async () => await getCount(),
})


function DemoIndex1() {
  const router = useRouter()
  const state = Route.useLoaderData()

  const [count, setCount] = useState(state)


  return (
    <div className="container mx-auto">
      <h1>服务端计数器</h1>
      <button className="bg-yellow-300 text-black p-2 rounded-md"
        type="button"
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
      >
        Add 1 to {state}?
      </button>
      <h1>客户端计数器: {count}</h1>

      <Button onClick={() => {
        setCount(count + 1)
        console.log('运行在客户端 {count}', count)
      }}>
        计数
      </Button>
    </div>
  )
}