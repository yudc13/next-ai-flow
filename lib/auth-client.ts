import { createAuthClient } from 'better-auth/react'
import { polarClient } from '@polar-sh/better-auth'

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL, // The base URL of your auth server
	plugins: [polarClient()],
})
