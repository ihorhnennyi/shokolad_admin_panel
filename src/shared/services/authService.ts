import { api } from './api'

export type LoginPayload = {
	email: string
	password: string
	remember?: boolean
}
export type LoginResponse = {
	accessToken?: string
	refreshToken?: string
	user?: { id: string; email: string; name?: string }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>('/auth/login', {
		email: payload.email,
		password: payload.password,
		remember: payload.remember,
	})
	return data
}
