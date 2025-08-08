import { createTheme } from '@mui/material'
export const getTheme = (mode: 'light' | 'dark' = 'light') =>
	createTheme({ palette: { mode }, shape: { borderRadius: 12 } })
