import prisma from '@/lib/prisma'
import { createTRPCRouter, protectedProcedure } from '../init'
import z from 'zod'

export const workflowRouter = createTRPCRouter({
	list: protectedProcedure.query(async ({ ctx }) => {
		const workflows = await prisma.workflow.findMany({
			where: {
				userId: ctx.auth.user.id,
			},
		})
		return workflows
	}),
	create: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const workflow = await prisma.workflow.create({
				data: {
					name: input.name,
					userId: ctx.auth.user.id,
				},
			})
			return workflow
		}),
})
