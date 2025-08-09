import { getMe } from '@/shared/services/authService'
import { authStorage } from '@/shared/storage/authStorage'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type User = {
	id: string
	email: string
	name?: string
	role?: string
}

type AuthContextValue = {
	user: User | null
	loading: boolean
	isAuthenticated: boolean
	setUser: (u: User | null) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const nav = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		const token = authStorage.loadAccess()
		if (!token) {
			setLoading(false)
			return
		}
		;(async () => {
			try {
				const me = await getMe()
				setUser(me)
			} catch {
				authStorage.clearAll()
				setUser(null)
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	useEffect(() => {
		if (
			!loading &&
			user &&
			(pathname === '/login' || pathname === '/forgot-password')
		) {
			nav('/', { replace: true })
		}
	}, [loading, user, pathname, nav])

	const logout = () => {
		authStorage.clearAll()
		setUser(null)
		nav('/login', { replace: true })
	}

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			isAuthenticated: !!user,
			setUser,
			logout,
		}),
		[user, loading]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}
