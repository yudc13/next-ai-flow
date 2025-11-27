import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { inngest } from './client'

export const execute = inngest.createFunction(
	{ id: 'execute-ai' },
	{ event: 'execute/ai' },
	async ({ event, step }) => {
		const { steps } = await step.ai.wrap('gemini-generate-text', generateText, {
			model: google('gemini-2.5-flash'),
			prompt: event.data.prompt,
		})
		return steps
	},
)
