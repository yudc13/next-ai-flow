import { betterAuth } from 'better-auth'
// import { nextCookies } from 'better-auth/next-js'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'

export const auth = betterAuth({
	// plugins: [nextCookies()], // make sure this is the last plugin in the array
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
})
