const AK = 'access_token'
const RK = 'refresh_token'
const EMAIL = 'last_login_email'

const pick = (remember?: boolean) => (remember ? localStorage : sessionStorage)

export const authStorage = {
	saveTokens(access: string, refresh?: string, remember?: boolean) {
		const s = pick(remember)
		s.setItem(AK, access)
		if (refresh) s.setItem(RK, refresh)
	},
	loadAccess() {
		return localStorage.getItem(AK) ?? sessionStorage.getItem(AK)
	},
	loadRefresh() {
		return localStorage.getItem(RK) ?? sessionStorage.getItem(RK)
	},
	clearAll() {
		;[localStorage, sessionStorage].forEach(s => {
			s.removeItem(AK)
			s.removeItem(RK)
		})
	},
	saveLastEmail(email: string) {
		localStorage.setItem(EMAIL, email)
	},
	loadLastEmail() {
		return localStorage.getItem(EMAIL) ?? ''
	},
}
