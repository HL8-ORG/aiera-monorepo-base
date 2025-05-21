curl -N http://127.0.0.1:11434/api/chat \
  -d '{"model": "llama3.2",
       "streaming": true,
       "messages": [{"role": "user", "content": "Say hello"}]}'