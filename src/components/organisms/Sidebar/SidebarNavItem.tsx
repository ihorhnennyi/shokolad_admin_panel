import type { NavItem } from '@/shared/config/nav.config'
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type Props = {
	item: NavItem
	collapsed: boolean
	active: boolean
}

export default function SidebarNavItem({ item, collapsed, active }: Props) {
	const Icon = item.icon
	return (
		<Tooltip title={collapsed ? item.label : ''} placement='right'>
			<ListItemButton
				component={RouterLink}
				to={item.path}
				sx={{
					borderRadius: 1.5,
					mb: 0.5,
					color: 'inherit',
					'& .MuiListItemIcon-root': { color: 'inherit' },
					...(active && {
						bgcolor: 'primary.main',
						color: '#fff',
						'&:hover': { bgcolor: 'primary.main' },
					}),
				}}
			>
				<ListItemIcon sx={{ minWidth: 40 }}>
					<Icon />
				</ListItemIcon>
				{!collapsed && <ListItemText primary={item.label} />}
			</ListItemButton>
		</Tooltip>
	)
}
