'use client'
import Image from 'next/image'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-muted mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
			<Image src="/logos/logo.svg" alt="Logo" width={48} height={48} />
			{children}
		</div>
	)
}
