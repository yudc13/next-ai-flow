import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/prisma'
export const appRouter = createTRPCRouter({
	user: protectedProcedure.query(async ({ ctx }) => {
		const user = await prisma.user.findUnique({
			where: { id: ctx.auth.user.id },
		})
		return user
	}),
})
// export type definition of API
export type AppRouter = typeof appRouter
