'use client'

import {
	FolderOpenIcon,
	HistoryIcon,
	KeyIcon,
	StarIcon,
	CreditCardIcon,
	LogOutIcon,
} from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { redirect, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useHasActiveSubscription } from '@/features/subscriptions/hooks/use-subscription'

const menuItems = [
	{
		label: '首页',
		items: [
			{ label: '所有工作流', icon: FolderOpenIcon, href: '/workflows' },
			{ label: '凭证', icon: KeyIcon, href: '/credentials' },
			{ label: '执行历史', icon: HistoryIcon, href: '/executions' },
		],
	},
]

const AppSidebar = () => {
	const currentPath = usePathname()
	const { hasActiveSubscription, isLoading } = useHasActiveSubscription()

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton>
						<Link href="/" prefetch className="flex items-center">
							<Image src="/logos/logo.svg" alt="Logo" width={32} height={32} />
							<span className="ml-2 text-lg font-bold">AI Flow</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				{menuItems.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											tooltip={item.label}
											isActive={
												item.href === '/'
													? currentPath === '/'
													: currentPath.startsWith(item.href)
											}
											asChild
											className="h-10 gap-x-4 px-4"
										>
											<Link href={item.href} prefetch>
												<item.icon className="h-4 w-4" />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				{!hasActiveSubscription && !isLoading && (
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={() => authClient.checkout({ slug: 'pro' })}
						>
							<StarIcon className="h-4 w-4" />
							<span>升级到PRO</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				)}
				<SidebarMenuItem>
					<SidebarMenuButton onClick={() => authClient.customer.portal()}>
						<CreditCardIcon className="h-4 w-4" />
						<span>充值</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton
						onClick={() =>
							authClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										redirect('/sign-in')
									},
								},
							})
						}
					>
						<LogOutIcon className="h-4 w-4" />
						<span>退出登录</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
