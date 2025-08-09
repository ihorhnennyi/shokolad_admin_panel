import { login } from '@/shared/services/authService'
import {
	loginSchema,
	type LoginFormValues,
} from '@/shared/validation/auth.schemas'
import { useState } from 'react'

export function useLogin() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')

	const submit = async (values: LoginFormValues, onSuccess?: () => void) => {
		setLoading(true)
		setError('')
		try {
			const parsed = loginSchema.parse(values)
			await login(parsed)
			onSuccess?.()
		} catch (e: any) {
			const msg =
				e?.response?.data?.message ||
				e?.message ||
				'Помилка входу. Спробуйте ще раз.'
			setError(Array.isArray(msg) ? msg.join(', ') : msg)
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, submit, setError }
}
