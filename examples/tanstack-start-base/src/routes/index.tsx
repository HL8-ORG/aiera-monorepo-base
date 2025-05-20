import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h3 className='text-green-500 text-2xl font-bold'>Welcome Home! This is TanStack-Start-demo</h3>
      <div >
        <br />
        <a
          className="text-muted-foreground hover:text-foreground underline"
          href="https://github.com/HL8-ORG/aiera-monorepo-base"
          target="_blank"
          rel="noreferrer noopener"
        >
          github.com/HL8-ORG
        </a>
      </div>
    </div>
  )
}
