import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout'
import Categories from '../pages/Categories'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Orders from '../pages/Orders'
import Products from '../pages/Products'
import Users from '../pages/Users'

const router = createBrowserRouter([
	{ path: '/login', element: <Login /> },
	{
		path: '/',
		element: (
			<Layout>
				<Dashboard />
			</Layout>
		),
	},
	{
		path: '/products',
		element: (
			<Layout>
				<Products />
			</Layout>
		),
	},
	{
		path: '/categories',
		element: (
			<Layout>
				<Categories />
			</Layout>
		),
	},
	{
		path: '/orders',
		element: (
			<Layout>
				<Orders />
			</Layout>
		),
	},
	{
		path: '/users',
		element: (
			<Layout>
				<Users />
			</Layout>
		),
	},
])

export default function AppRouter() {
	return <RouterProvider router={router} />
}
