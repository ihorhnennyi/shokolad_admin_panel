import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import type { ElementType } from 'react'

export type NavItem = { label: string; path: string; icon: ElementType }

export const NAV_ITEMS: NavItem[] = [
	{ label: 'Дашборд', path: '/', icon: DashboardIcon },
	{ label: 'Товари', path: '/products', icon: InventoryIcon },
	{ label: 'Категорії', path: '/categories', icon: CategoryIcon },
	{ label: 'Замовлення', path: '/orders', icon: ShoppingCartIcon },
	{ label: 'Користувачі', path: '/users', icon: PeopleIcon },
]
