import { LoginForm } from '@/features/auth/login-form'
import { requiredUnAuth } from '@/lib/auth-utils'

const SignInPage = async () => {
	await requiredUnAuth()
	return <LoginForm />
}

export default SignInPage
