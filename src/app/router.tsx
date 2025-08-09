import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import routes from './routes'

const router = createBrowserRouter(routes)

export default function AppRouter() {
	return (
		<AuthProvider>
			<Suspense fallback={null}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthProvider>
	)
}
