import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MarkdownRenderer } from '~/components/MarkdownRenderer'


type Message = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};





export const Route = createFileRoute('/chat')({
  component: ChatPage,
})


function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 发送消息并处理流式响应
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        
        try {
          const data = JSON.parse(chunk)
          if (data.message?.content) {
            assistantMessage += data.message.content
            
            setMessages(prev => {
              const last = prev[prev.length - 1]
              if (last?.role === "assistant") {
                return [...prev.slice(0, -1), { ...last, content: assistantMessage }]
              }
              return [...prev, { role: "assistant", content: assistantMessage }]
            })
          }
        } catch (e) {
          console.error("Failed to parse chunk:", chunk)
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Failed to get response" }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-3xl mx-auto">
      {/* 消息历史 */}
      <div className="flex-1 space-y-4 mb-4 overflow-auto">
        {messages.map((msg) => (
          <div
            key={`${msg.role}-${msg.content}`}
            className={`p-3 rounded-lg ${
              msg.role === "user" 
                ? "bg-blue-100 ml-auto max-w-[80%]" 
                : "bg-gray-100 mr-auto max-w-[80%]"
            }`}
          >
            <MarkdownRenderer content={msg.content} />
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="flex gap-2 sticky bottom-0 bg-white py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  )
}