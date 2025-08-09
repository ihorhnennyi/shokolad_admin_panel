// src/components/organisms/Sidebar/SidebarFooter.tsx
import { authStorage } from '@/shared/storage/authStorage'
import LogoutIcon from '@mui/icons-material/Logout'
import {
	Box,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SidebarFooter({ collapsed }: { collapsed: boolean }) {
	const navigate = useNavigate()
	const handleLogout = () => {
		authStorage.clearAll()
		navigate('/login', { replace: true })
	}

	return (
		<Box sx={{ mt: 'auto', px: 1, pb: 1 }}>
			<Tooltip title={collapsed ? 'Выход' : ''} placement='right'>
				<ListItemButton
					onClick={handleLogout}
					sx={{
						borderRadius: 1.5,
						color: '#fff',
						'& .MuiListItemIcon-root': { color: 'inherit' },
						'&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
					}}
				>
					<ListItemIcon sx={{ minWidth: 40 }}>
						<LogoutIcon />
					</ListItemIcon>
					{!collapsed && <ListItemText primary='Выход' />}
				</ListItemButton>
			</Tooltip>
		</Box>
	)
}
