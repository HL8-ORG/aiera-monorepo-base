import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import 'dotenv/config'
 
const main = async () => {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Say hello to the world',
  })
  console.log(result.text)
}
 
main()