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
import { da } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

const formSchema = z
	.object({
		email: z.email('请输入有效的邮箱地址'),
		password: z.string().min(6, '密码至少需要6个字符'),
		confirmPassword: z.string().min(6, '密码至少需要6个字符'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: '两次输入的密码不匹配',
		path: ['confirmPassword'],
	})

type FormValues = z.infer<typeof formSchema>

export function RegisterForm() {
	const router = useRouter()
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const isPending = form.formState.isSubmitting
	const onSubmit = async (data: FormValues) => {
		await authClient.signUp.email(
			{
				name: data.email,
				email: data.email,
				password: data.password,
				callbackURL: '/',
			},
			{
				onSuccess: (session) => {
					console.log('Registration successful:', session)
					router.replace('/')
				},
				onError: (error: any) => {
					console.error('Registration error:', error)
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
						<Button variant="link">登陆</Button>
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
								<FormField
									name="confirmPassword"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>确认密码</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="请输入确认密码"
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
											已有账号？登陆
										</a>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<Button type="submit" disabled={isPending} className="w-full">
										注册
									</Button>
									<Button variant="outline" className="w-full">
										使用Github注册
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
