import { SidebarLayout } from '@/components/organisms'
import { ForgotPassword, Login, ResetPassword } from '@/pages/Auth'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import AuthProviderRoute from './AuthProviderRoute'
import { ProtectedRoute, PublicOnlyRoute } from './routerGuards'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Products = lazy(() => import('@/pages/Products'))
const Categories = lazy(() => import('@/pages/Categories'))
const Orders = lazy(() => import('@/pages/Orders'))
const Users = lazy(() => import('@/pages/Users'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const publicRoutes: RouteObject = {
	element: <PublicOnlyRoute />,
	children: [
		{ path: '/login', element: <Login /> },
		{ path: '/forgot-password', element: <ForgotPassword /> },
		{ path: '/reset-password', element: <ResetPassword /> },
	],
}

const appRoutes: RouteObject = {
	element: <ProtectedRoute />,
	children: [
		{
			path: '/',
			element: <SidebarLayout />,
			children: [
				{ index: true, element: <Dashboard /> },
				{ path: 'products', element: <Products /> },
				{ path: 'categories', element: <Categories /> },
				{ path: 'orders', element: <Orders /> },
				{ path: 'users', element: <Users /> },
			],
		},
	],
}

const fallbackRoutes: RouteObject = { path: '*', element: <NotFound /> }

const routes: RouteObject[] = [
	{
		element: <AuthProviderRoute />,
		children: [publicRoutes, appRoutes, fallbackRoutes],
	},
]

export default routes
