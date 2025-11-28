import { SidebarTrigger } from './ui/sidebar'

const AppHeader = () => {
	return (
		<header className="flex h-16 items-center border-b border-gray-200 bg-white px-4">
			<SidebarTrigger />
		</header>
	)
}

export default AppHeader
