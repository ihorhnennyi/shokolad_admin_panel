import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const drawerWidth = 240

export default function Layout({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(true)
	const { pathname } = useLocation()

	const nav = [
		{ label: 'Дашборд', path: '/', icon: <DashboardIcon /> },
		{ label: 'Товары', path: '/products', icon: <InventoryIcon /> },
		{ label: 'Категории', path: '/categories', icon: <CategoryIcon /> },
		{ label: 'Заказы', path: '/orders', icon: <ShoppingCartIcon /> },
		{ label: 'Пользователи', path: '/users', icon: <PeopleIcon /> },
	]

	return (
		<Box
			sx={{
				display: 'flex',
				minHeight: '100vh',
				bgcolor: 'background.default',
			}}
		>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						edge='start'
						onClick={() => setOpen(!open)}
						sx={{ mr: 1 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' sx={{ fontWeight: 700 }}>
						Shokolad Admin
					</Typography>
					<Box sx={{ flex: 1 }} />
					{/* тут будут Search/Theme/UserMenu */}
				</Toolbar>
			</AppBar>

			<Drawer
				variant='permanent'
				open={open}
				sx={{
					width: open ? drawerWidth : 72,
					'& .MuiDrawer-paper': {
						width: open ? drawerWidth : 72,
						transition: 'width .25s',
						overflowX: 'hidden',
					},
				}}
			>
				<Toolbar />
				<List sx={{ px: 1 }}>
					{nav.map(item => {
						const active = pathname === item.path
						return (
							<Tooltip
								key={item.path}
								title={!open ? item.label : ''}
								placement='right'
							>
								<ListItemButton
									component={RouterLink}
									to={item.path}
									sx={{
										borderRadius: 1.5,
										mb: 0.5,
										...(active && {
											bgcolor: 'primary.main',
											color: '#fff',
											'& .MuiListItemIcon-root': { color: '#fff' },
											'&:hover': { bgcolor: 'primary.main' },
										}),
									}}
								>
									<ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
										{item.icon}
									</ListItemIcon>
									{open && <ListItemText primary={item.label} />}
								</ListItemButton>
							</Tooltip>
						)
					})}
				</List>
			</Drawer>

			<Box component='main' sx={{ flex: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	)
}
