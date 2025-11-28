import { requiredAuth } from '@/lib/auth-utils'

const Page = async () => {
	await requiredAuth()
	return <div>Ecexutions Page</div>
}

export default Page
