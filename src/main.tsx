import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './app/router'
import { getTheme } from './lib/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={getTheme('light')}>
			<CssBaseline />
			<AppRouter />
		</ThemeProvider>
	</React.StrictMode>
)
