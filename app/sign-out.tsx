'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { useState } from 'react'

const SignOut = () => {
	const [isPending, setIsPending] = useState(false)
	return (
		<Button
			disabled={isPending}
			onClick={() =>
				authClient.signOut({
					fetchOptions: {
						onRequest: () => {
							setIsPending(true)
						},
						onSuccess: () => {
							redirect('/sign-in')
						},
					},
				})
			}
		>
			登出
		</Button>
	)
}

export default SignOut
