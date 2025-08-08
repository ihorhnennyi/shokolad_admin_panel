import { SidebarLayout } from '@/components/organisms'
import { Categories, Dashboard, Orders, Products, Users } from '@/pages'
import { ForgotPassword, Login, ResetPassword } from '@/pages/Auth'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{ path: '/login', element: <Login /> },
	{ path: '/forgot-password', element: <ForgotPassword /> },
	{ path: '/reset-password/:token', element: <ResetPassword /> },
	{
		path: '/',
		element: (
			<SidebarLayout>
				<Dashboard />
			</SidebarLayout>
		),
	},
	{
		path: '/products',
		element: (
			<SidebarLayout>
				<Products />
			</SidebarLayout>
		),
	},
	{
		path: '/categories',
		element: (
			<SidebarLayout>
				<Categories />
			</SidebarLayout>
		),
	},
	{
		path: '/orders',
		element: (
			<SidebarLayout>
				<Orders />
			</SidebarLayout>
		),
	},
	{
		path: '/users',
		element: (
			<SidebarLayout>
				<Users />
			</SidebarLayout>
		),
	},
])

export default function AppRouter() {
	return <RouterProvider router={router} />
}
