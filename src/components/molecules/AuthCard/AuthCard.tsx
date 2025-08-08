import type { PaperProps } from '@mui/material'
import { Paper } from '@mui/material'

export default function AuthCard({ sx, ...props }: PaperProps) {
	return (
		<Paper
			elevation={0}
			{...props}
			sx={{
				zIndex: 1,
				width: 420,
				p: 4,
				borderRadius: 4,
				backdropFilter: 'blur(8px)',
				background:
					'linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.88))',
				boxShadow: '0 20px 40px rgba(0,0,0,.25), 0 2px 10px rgba(0,0,0,.08)',
				border: '1px solid rgba(255,255,255,.6)',
				...(sx || {}),
			}}
		/>
	)
}
