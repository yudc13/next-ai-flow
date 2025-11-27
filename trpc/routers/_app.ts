import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/prisma'
import { workflowRouter } from './workflow'
export const appRouter = createTRPCRouter({
	user: protectedProcedure.query(async ({ ctx }) => {
		const user = await prisma.user.findUnique({
			where: { id: ctx.auth.user.id },
		})
		return user
	}),
	workflow: workflowRouter,
})

export type AppRouter = typeof appRouter
