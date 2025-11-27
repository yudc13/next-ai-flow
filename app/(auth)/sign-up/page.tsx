'use client'

import { RegisterForm } from '@/features/auth/register-form'
import { requiredUnAuth } from '@/lib/auth-utils'

const RegisterPage = async () => {
	await requiredUnAuth()
	return <RegisterForm />
}

export default RegisterPage
