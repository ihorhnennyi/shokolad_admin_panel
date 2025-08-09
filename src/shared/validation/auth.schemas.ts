import { z } from 'zod'
export const loginSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(6, 'Мінімум 6 символів'),
	remember: z.boolean().optional().default(true),
})
export type LoginFormValues = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
	email: z.string().email('Некоректний email'),
})
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export const RESET_MIN_LENGTH = 6

export const resetPasswordSchema = z
	.object({
		token: z.string().min(10, 'Некоректне посилання (token)'),
		newPassword: z
			.string()
			.min(RESET_MIN_LENGTH, `Мінімум ${RESET_MIN_LENGTH} символів`),
		confirm: z.string(),
	})
	.refine(v => v.newPassword === v.confirm, {
		path: ['confirm'],
		message: 'Паролі не співпадають',
	})

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
