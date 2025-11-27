'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { trpc } from '@/trpc/client'
import { redirect } from 'next/navigation'
import { useState } from 'react'

const SignOut = () => {
	const [isPending, setIsPending] = useState(false)
	const { data, refetch } = trpc.workflow.list.useQuery()
	const createWorkflow = trpc.workflow.create.useMutation({
		onSuccess: () => {
			refetch()
		},
	})
	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<Button
				disabled={createWorkflow.isPending}
				onClick={() => createWorkflow.mutate({ name: 'New Workflow' })}
			>
				创建工作流
			</Button>
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
		</>
	)
}

export default SignOut
