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
	const textAi = trpc.testAi.useMutation()
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<Button
				disabled={createWorkflow.isPending}
				onClick={() => createWorkflow.mutate({ name: 'New Workflow' })}
			>
				创建工作流
			</Button>
			<Button disabled={textAi.isPending} onClick={() => textAi.mutate()}>
				测试AI
			</Button>
			<pre>{JSON.stringify(textAi.data, null, 2)}</pre>
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
		</div>
	)
}

export default SignOut
