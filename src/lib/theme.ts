import { createTheme } from '@mui/material'

const COLORS = {
	// Акценты
	primary: '#1ABB9C', // mint/teal (статистика, кнопки)
	info: '#3498DB', // голубой (графики/ссылки)
	// Навигация
	sidebarBg: '#2A3F54', // тёмный синий
	sidebarText: '#ECF0F1',
	// Базовые
	paper: '#FFFFFF',
	bg: '#F5F7FA', // светлый фон страницы
	border: '#E0E6ED',
	text: '#34495E',
}

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: COLORS.primary },
		secondary: { main: COLORS.info },
		background: { default: COLORS.bg, paper: COLORS.paper },
		text: { primary: COLORS.text, secondary: '#6B7C93' },
		divider: COLORS.border,
		success: { main: COLORS.primary },
		info: { main: COLORS.info },
		warning: { main: '#F39C12' },
		error: { main: '#E74C3C' },
	},
	shape: { borderRadius: 10 },
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: COLORS.paper,
					color: COLORS.text,
					boxShadow: 'none',
					borderBottom: `1px solid ${COLORS.border}`,
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: COLORS.sidebarBg,
					color: COLORS.sidebarText,
					borderRight: 'none',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					border: `1px solid ${COLORS.border}`,
					boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: { textTransform: 'none', fontWeight: 600 },
			},
		},
	},
})
