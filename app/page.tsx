import { requiredAuth } from '@/lib/auth-utils'
import SignOut from './sign-out'

export default async function Page() {
	await requiredAuth()
	return (
		<div>
			<div>
				<SignOut />
			</div>
		</div>
	)
}
