// src/components/organisms/Sidebar/SidebarLayout.tsx
import { Header } from '@/components/organisms'
import SidebarFooter from '@/components/organisms/Sidebar/SidebarFooter'
import SidebarNav from '@/components/organisms/Sidebar/SidebarNav'
import { Box, Drawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'

const DRAWER_WIDTH = 240
const COLLAPSED_WIDTH = 72

export default function SidebarLayout() {
	const theme = useTheme()
	const [open, setOpen] = useState(true)

	const APPBAR_HEIGHT = useMemo(() => {
		const h = (theme.mixins.toolbar as any)?.minHeight
		return typeof h === 'number' ? h : 64
	}, [theme])

	const drawerW = open ? DRAWER_WIDTH : COLLAPSED_WIDTH

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
						display: 'flex',
						flexDirection: 'column',
					},
				}}
			>
				{/* Лого/спейсер под AppBar */}
				<Box
					sx={{
						height: `${APPBAR_HEIGHT}px`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderBottom: '1px solid rgba(255,255,255,0.1)',
						flexShrink: 0,
					}}
				>
					<Box
						component='img'
						src='/logo.webp'
						alt='Shokolad Logo'
						sx={{ height: open ? 40 : 32, transition: 'height .25s ease' }}
					/>
				</Box>

				{/* Список навигации */}
				<SidebarNav collapsed={!open} />

				{/* Кнопка выхода внизу */}
				<SidebarFooter collapsed={!open} />
			</Drawer>

			{/* Контент */}
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
						sx={{ width: 'min(40vw, 520px)', height: 'auto' }}
					/>
				</Box>

				<Box sx={{ position: 'relative', zIndex: 1 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	)
}
