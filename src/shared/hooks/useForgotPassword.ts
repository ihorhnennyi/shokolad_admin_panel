import { forgotPassword } from '@/shared/services/authService'
import {
	forgotPasswordSchema,
	type ForgotPasswordValues,
} from '@/shared/validation/auth.schemas'
import { useState } from 'react'

export function useForgotPassword() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const [sent, setSent] = useState(false)

	const submit = async (values: ForgotPasswordValues) => {
		setLoading(true)
		setError('')
		try {
			const parsed = forgotPasswordSchema.parse(values)
			await forgotPassword(parsed.email)
			setSent(true)
		} catch (e: any) {
			const msg =
				e?.response?.data?.message ||
				e?.message ||
				'Не вдалося надіслати лист. Спробуйте ще раз.'
			setError(Array.isArray(msg) ? msg.join(', ') : msg)
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, sent, submit, setSent, setError }
}
