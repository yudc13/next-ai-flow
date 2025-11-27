'use client'
import { authClient } from '@/lib/auth-client'

export default function Page() {
	const { data } = authClient.useSession()
	return <div>{JSON.stringify(data)}</div>
}
