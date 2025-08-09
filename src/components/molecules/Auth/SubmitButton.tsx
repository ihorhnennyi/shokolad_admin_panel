import type { ButtonProps } from '@mui/material'
import { Button, CircularProgress } from '@mui/material'

type Props = ButtonProps & {
	loading?: boolean
	accent?: string
}

export default function SubmitButton({
	loading,
	disabled,
	children,
	accent = '#1ABB9C',
	sx,
	...rest
}: Props) {
	return (
		<Button
			type='submit'
			disabled={disabled || loading}
			sx={{
				py: 1.2,
				fontWeight: 800,
				borderRadius: 999,
				background: accent,
				color: '#fff',
				'&:hover': { background: accent, opacity: 0.95 },
				boxShadow: '0 6px 16px rgba(26,187,156,.35), 0 2px 6px rgba(0,0,0,.06)',
				...sx,
			}}
			{...rest}
		>
			{loading ? <CircularProgress size={20} /> : children}
		</Button>
	)
}
