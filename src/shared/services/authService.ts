import { api } from '@/shared/api/api'
import { authStorage } from '@/shared/storage/authStorage'
import type { LoginDto, LoginResponse } from '@/shared/types/auth.types'

export async function login(dto: LoginDto): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>('/auth/login', dto)
	authStorage.saveTokens(data.accessToken, data.refreshToken, dto.remember)
	if (dto.email) authStorage.saveLastEmail(dto.email)
	return data
}

export async function refresh(): Promise<string | null> {
	try {
		const { data } = await api.post<{
			accessToken: string
			remember?: boolean
		}>('/auth/refresh')
		const remember = data.remember ?? !!localStorage.getItem('access_token')
		authStorage.saveTokens(data.accessToken, undefined, remember)
		return data.accessToken
	} catch {
		authStorage.clearAll()
		return null
	}
}

export async function getMe() {
	const { data } = await api.get('/auth/me')
	return data
}
