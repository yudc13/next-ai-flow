import { requiredAuth } from '@/lib/auth-utils'
import SignOut from './sign-out'
import { trpc } from '@/trpc/server'

export default async function Page() {
	const session = await requiredAuth()
	const user = await trpc.user()
	return (
		<div>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<div>
				<SignOut />
			</div>
		</div>
	)
}
