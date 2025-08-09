// src/components/organisms/Sidebar/SidebarNav.tsx
import { NAV_ITEMS } from '@/shared/config/nav.config'
import { List } from '@mui/material'
import { useLocation } from 'react-router-dom'
import SidebarNavItem from './SidebarNavItem'

export default function SidebarNav({ collapsed }: { collapsed: boolean }) {
	const { pathname } = useLocation()
	const isActive = (to: string) =>
		pathname === to || (to !== '/' && pathname.startsWith(to + '/'))

	return (
		<List sx={{ px: 1, mt: 1, flex: 1 }}>
			{NAV_ITEMS.map(item => (
				<SidebarNavItem
					key={item.path}
					item={item}
					collapsed={collapsed}
					active={isActive(item.path)}
				/>
			))}
		</List>
	)
}
