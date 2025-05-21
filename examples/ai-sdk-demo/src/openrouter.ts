import { openrouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import 'dotenv/config';

const main = async () => {
  const { text } = await generateText({
    // model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
    model: openrouter('deepseek/deepseek-r1:free'),
    prompt: '介绍下openrouter',
  });
  console.log(text);
};

main().catch(console.error);