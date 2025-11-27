'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
	email: z.email('请输入有效的邮箱地址'),
	password: z.string().min(6, '密码至少需要6个字符'),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
	const router = useRouter()
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const onSubmit = async (data: FormValues) => {
		console.log('Form submitted:', data)
		await authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: (session) => {
					console.log('Login successful:', session)
					router.push('/')
				},
				onError: (error: any) => {
					console.error('Login error:', error)
					toast.error(`登录失败: ${error.message}`)
				},
			},
		)
	}
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>欢迎回来！</CardTitle>
					<CardDescription>请输入您的账户信息以继续。</CardDescription>
					<CardAction>
						<Button variant="link">注册</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>邮箱</FormLabel>
											<FormControl>
												<Input placeholder="请输入邮箱" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>密码</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="请输入密码"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid gap-2">
									<div className="flex items-center">
										<a
											href="#"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											忘记密码？
										</a>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<Button type="submit" className="w-full">
										登陆
									</Button>
									<Button variant="outline" className="w-full">
										使用Github登陆
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
