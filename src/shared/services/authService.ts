// src/shared/services/authService.ts
import { api } from '@/shared/api/api'
import { authStorage } from '@/shared/storage/authStorage'
import type { LoginDto, LoginResponse } from '@/shared/types/auth.types'

/** Нормализует имя полей токена из разных бекенд-ответов */
function pickTokens(data: any) {
	const access =
		data?.accessToken ??
		data?.access_token ??
		data?.token ?? // на всякий
		undefined

	const refresh = data?.refreshToken ?? data?.refresh_token ?? undefined

	return { access, refresh }
}

/** Проставить Authorization хедер для последующих запросов */
function setAuthHeader(access?: string) {
	if (access) {
		api.defaults.headers.common.Authorization = `Bearer ${access}`
	} else {
		delete api.defaults.headers.common.Authorization
	}
}

export async function login(dto: LoginDto): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>('/auth/login', dto)

	const { access, refresh } = pickTokens(data)
	authStorage.saveTokens(access, refresh, dto.remember)
	setAuthHeader(access)

	if (dto.email) authStorage.saveLastEmail(dto.email)
	return data
}

export async function refresh(): Promise<string | null> {
	try {
		const { data } = await api.post('/auth/refresh')

		const { access } = pickTokens(data)
		const remember =
			(data as any)?.remember ?? !!localStorage.getItem('access_token')

		authStorage.saveTokens(access, undefined, remember)
		setAuthHeader(access)

		return access ?? null
	} catch {
		authStorage.clearAll()
		setAuthHeader(undefined)
		return null
	}
}

export async function getMe() {
	const { data } = await api.get('/auth/me')
	return data
}

export async function forgotPassword(email: string) {
	const { data } = await api.post('/auth/forgot-password', { email })
	return data
}

export async function resetPassword(token: string, newPassword: string) {
	const body = { token, newPassword, password: newPassword }
	const { data } = await api.post('/auth/reset-password', body)
	return data
}
