import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'

export const getSession = async () =>
	auth.api.getSession({
		headers: await headers(),
	})

export const requiredAuth = async () => {
	const session = await getSession()
	if (!session) {
		redirect('/sign-in')
	}
	return session
}

export const requiredUnAuth = async () => {
	const session = await getSession()
	if (session) {
		redirect('/')
	}
}
