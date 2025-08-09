import { Outlet } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'

export default function AuthProviderRoute() {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	)
}
