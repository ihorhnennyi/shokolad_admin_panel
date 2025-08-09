import { authStorage } from '@/shared/storage/authStorage'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
	const token = authStorage.loadAccess()
	const loc = useLocation()
	if (!token) return <Navigate to='/login' replace state={{ from: loc }} />
	return <Outlet />
}

export function PublicOnlyRoute() {
	const token = authStorage.loadAccess()
	return token ? <Navigate to='/' replace /> : <Outlet />
}
