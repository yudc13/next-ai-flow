import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { polar, checkout, portal, usage } from '@polar-sh/better-auth'
import prisma from './prisma'
import { polarClient } from './polar-client'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					products: [
						{
							productId: 'aa7150c9-a3f7-4118-bc89-26f78a79a261', // ID of Product from Polar Dashboard
							slug: 'pro', // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL!,
					authenticatedUsersOnly: true,
				}),
				portal(),
				usage(),
			],
		}),
	],
})
