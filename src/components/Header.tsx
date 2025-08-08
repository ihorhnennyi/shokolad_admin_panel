import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	InputBase,
	Toolbar,
	Typography,
	alpha,
	useTheme,
} from '@mui/material'

export default function Header({
	onToggleSidebar,
}: {
	onToggleSidebar: () => void
}) {
	const theme = useTheme()

	return (
		<AppBar
			position='fixed'
			elevation={0}
			sx={{
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary,
				borderBottom: `1px solid ${theme.palette.divider}`,
				zIndex: t => t.zIndex.drawer + 1,
			}}
		>
			<Toolbar>
				<IconButton edge='start' onClick={onToggleSidebar} sx={{ mr: 1 }}>
					<MenuIcon />
				</IconButton>

				<Typography variant='h6' sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
					Shokolad Admin
				</Typography>

				<Box sx={{ flex: 1 }} />

				<Box
					sx={{
						position: 'relative',
						borderRadius: 2,
						backgroundColor: alpha(theme.palette.grey[200], 0.8),
						'&:hover': { backgroundColor: alpha(theme.palette.grey[200], 1) },
						mr: 2,
						width: 220,
					}}
				>
					<Box
						sx={{
							p: '6px',
							height: '100%',
							position: 'absolute',
							pointerEvents: 'none',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<SearchIcon fontSize='small' />
					</Box>
					<InputBase
						placeholder='Search...'
						sx={{ color: 'inherit', pl: 4, width: '100%', fontSize: 14 }}
					/>
				</Box>

				<IconButton>
					<NotificationsIcon />
				</IconButton>

				<Avatar
					alt='User'
					src='https://i.pravatar.cc/40'
					sx={{ width: 36, height: 36, ml: 2, cursor: 'pointer' }}
				/>
			</Toolbar>
		</AppBar>
	)
}
