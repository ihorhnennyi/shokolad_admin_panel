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
