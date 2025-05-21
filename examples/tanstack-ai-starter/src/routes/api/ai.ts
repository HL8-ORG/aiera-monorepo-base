import { createAPIFileRoute } from '@tanstack/react-start/api';
// import { Readable } from 'stream';

export const APIRoute = createAPIFileRoute('/api/ai')({
  POST: async ({ request }) => {
    const { messages } = await request.json(); // 解析请求体

    // 调用本地模型服务（如 Ollama）
    const response = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        streaming: true,
        options: {
          temperature: 0.1,
          repeat_penalty: 1.2,
          numa: true, // testing for ARM
        },
        messages: [...messages],
      }),
    });

    // 返回流式响应
    if (!response.ok) throw new Error("Model service error");
    return new Response(response.body, {
      headers: { "Content-Type": "text/plain" },
    });
  },
});
