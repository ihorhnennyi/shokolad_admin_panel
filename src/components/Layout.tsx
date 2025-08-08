import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
	Box,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Header from './Header'

const DRAWER_WIDTH = 240
const COLLAPSED_WIDTH = 72

export default function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme()
	const [open, setOpen] = useState(true)
	const { pathname } = useLocation()

	const APPBAR_HEIGHT = useMemo(() => {
		const h = (theme.mixins.toolbar as any)?.minHeight
		return typeof h === 'number' ? h : 64
	}, [theme])

	const drawerW = open ? DRAWER_WIDTH : COLLAPSED_WIDTH

	const nav = [
		{ label: 'Дашборд', path: '/', icon: <DashboardIcon /> },
		{ label: 'Товары', path: '/products', icon: <InventoryIcon /> },
		{ label: 'Категории', path: '/categories', icon: <CategoryIcon /> },
		{ label: 'Заказы', path: '/orders', icon: <ShoppingCartIcon /> },
		{ label: 'Пользователи', path: '/users', icon: <PeopleIcon /> },
	]
	const isActive = (to: string) =>
		pathname === to || (to !== '/' && pathname.startsWith(to + '/'))

	return (
		<Box
			sx={
				{
					display: 'flex',
					minHeight: '100vh',
					bgcolor: 'background.default',
					'--drawer-w': `${drawerW}px`,
				} as any
			}
		>
			<Header onToggleSidebar={() => setOpen(v => !v)} />

			<Drawer
				variant='permanent'
				open={open}
				sx={{
					width: 'var(--drawer-w)',
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						position: 'fixed',
						top: 0,
						left: 0,
						height: '100vh',
						width: 'var(--drawer-w)',
						transition: 'width .25s ease',
						overflowX: 'hidden',
						backgroundColor: '#2A3F54',
						color: '#fff',
						borderRight: 'none',
					},
				}}
			>
				<Box
					sx={{
						height: `${APPBAR_HEIGHT}px`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderBottom: '1px solid rgba(255,255,255,0.1)',
					}}
				>
					<Box
						component='img'
						src='/logo.webp'
						alt='Shokolad Logo'
						sx={{ height: open ? 40 : 32, transition: 'height .25s ease' }}
					/>
				</Box>

				<List sx={{ px: 1, mt: 1 }}>
					{nav.map(item => {
						const active = isActive(item.path)
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
										'& .MuiListItemIcon-root': { color: 'inherit' },
										...(active && {
											bgcolor: 'primary.main',
											color: '#fff',
											'&:hover': { bgcolor: 'primary.main' },
										}),
									}}
								>
									<ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
									{open && <ListItemText primary={item.label} />}
								</ListItemButton>
							</Tooltip>
						)
					})}
				</List>
			</Drawer>

			<Box
				component='main'
				sx={{
					flex: 1,
					pt: `${APPBAR_HEIGHT}px`,
					pl: 'var(--drawer-w)',
					transition: 'padding-left .25s ease',
					p: 3,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Box
					aria-hidden
					sx={{
						position: 'fixed',
						top: `${APPBAR_HEIGHT}px`,
						left: `${drawerW}px`,
						right: 0,
						bottom: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						pointerEvents: 'none',
						zIndex: 0,
						opacity: 0.08,
						filter: 'invert(1) grayscale(100%)',
					}}
				>
					<Box
						component='img'
						src='/logo.webp'
						alt=''
						sx={{
							width: 'min(40vw, 520px)',
							height: 'auto',
						}}
					/>
				</Box>

				<Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
			</Box>
		</Box>
	)
}
