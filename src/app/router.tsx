import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'

const router = createBrowserRouter(routes)

export default function AppRouter() {
	return (
		<Suspense fallback={null}>
			<RouterProvider router={router} />
		</Suspense>
	)
}
