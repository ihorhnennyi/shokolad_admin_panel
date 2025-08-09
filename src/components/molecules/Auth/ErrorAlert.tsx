import type { AlertProps } from '@mui/material'
import { Alert, Collapse } from '@mui/material'

type Props = Omit<AlertProps, 'severity' | 'children'> & {
	message?: string
}

export default function ErrorAlert({ message, ...rest }: Props) {
	return (
		<Collapse in={!!message}>
			<Alert severity='error' sx={{ borderRadius: 2 }} {...rest}>
				{message}
			</Alert>
		</Collapse>
	)
}
