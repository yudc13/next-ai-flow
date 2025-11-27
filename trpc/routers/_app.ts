import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/prisma'
import { workflowRouter } from './workflow'
import { inngest } from '@/inngest/client'
export const appRouter = createTRPCRouter({
	user: protectedProcedure.query(async ({ ctx }) => {
		const user = await prisma.user.findUnique({
			where: { id: ctx.auth.user.id },
		})
		return user
	}),
	testAi: protectedProcedure.mutation(async ({ ctx }) => {
		await inngest.send({
			name: 'execute/ai',
			data: { prompt: '2+2=?' },
		})
		return { success: true }
	}),
	workflow: workflowRouter,
})

export type AppRouter = typeof appRouter
