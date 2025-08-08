import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	Toolbar,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(true)
	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton edge='start' onClick={() => setOpen(!open)}>
						<MenuIcon />
					</IconButton>
					<Typography sx={{ ml: 2 }}>Shokolad Admin</Typography>
					<Box sx={{ flex: 1 }} />
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<Toolbar />
				<List sx={{ width: 240 }}>
					<ListItemButton component={RouterLink} to='/'>
						Дашборд
					</ListItemButton>
					<ListItemButton component={RouterLink} to='/products'>
						Товары
					</ListItemButton>
					<ListItemButton component={RouterLink} to='/categories'>
						Категории
					</ListItemButton>
					<ListItemButton component={RouterLink} to='/orders'>
						Заказы
					</ListItemButton>
					<ListItemButton component={RouterLink} to='/users'>
						Пользователи
					</ListItemButton>
				</List>
			</Drawer>
			<Box component='main' sx={{ flex: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	)
}
