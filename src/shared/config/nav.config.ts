import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import type { ElementType } from 'react'

export type NavItem = { label: string; path: string; icon: ElementType }

export const NAV_ITEMS: NavItem[] = [
	{ label: 'Дашборд', path: '/', icon: DashboardIcon },
	{ label: 'Товары', path: '/products', icon: InventoryIcon },
	{ label: 'Категории', path: '/categories', icon: CategoryIcon },
	{ label: 'Заказы', path: '/orders', icon: ShoppingCartIcon },
	{ label: 'Пользователи', path: '/users', icon: PeopleIcon },
]
