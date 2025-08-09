import { resetPassword } from '@/shared/services/authService'
import {
	resetPasswordSchema,
	type ResetPasswordValues,
} from '@/shared/validation/auth.schemas'
import { useState } from 'react'

export function useResetPassword() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState(false)

	const submit = async (values: ResetPasswordValues) => {
		setLoading(true)
		setError('')
		try {
			const parsed = resetPasswordSchema.parse(values)
			await resetPassword(parsed.token, parsed.newPassword)
			setSuccess(true)
		} catch (e: any) {
			const msg =
				e?.response?.data?.message ||
				e?.message ||
				'Не вдалося змінити пароль. Спробуйте ще раз.'
			setError(Array.isArray(msg) ? msg.join(', ') : msg)
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, success, submit, setError }
}
