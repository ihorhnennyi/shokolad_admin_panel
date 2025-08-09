import { refresh } from '@/shared/services/authService'
import { authStorage } from '@/shared/storage/authStorage'
import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? '/api',
	withCredentials: true,
})

api.interceptors.request.use(config => {
	const token = authStorage.loadAccess()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

let refreshing: Promise<string | null> | null = null

api.interceptors.response.use(
	r => r,
	async err => {
		const { config, response } = err
		if (!response || response.status !== 401 || (config as any).__isRetry)
			throw err

		if (!refreshing) {
			refreshing = refresh().finally(() => (refreshing = null))
		}
		const newToken = await refreshing
		if (!newToken) throw err
		;(config as any).__isRetry = true
		config.headers.Authorization = `Bearer ${newToken}`
		return api(config)
	}
)
