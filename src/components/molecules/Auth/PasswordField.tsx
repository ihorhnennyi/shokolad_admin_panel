import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import type { TextFieldProps } from '@mui/material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { forwardRef, useState } from 'react'

type Props = Omit<TextFieldProps, 'type' | 'onChange' | 'value'> & {
	value: string
	onChange: (value: string) => void
	label?: string
	withIcon?: boolean
}

const PasswordField = forwardRef<HTMLInputElement, Props>(
	({ value, onChange, label = 'Пароль', withIcon = true, ...rest }, ref) => {
		const [show, setShow] = useState(false)

		return (
			<TextField
				{...rest}
				label={label}
				type={show ? 'text' : 'password'}
				value={value}
				onChange={e => onChange(e.target.value)}
				fullWidth={rest.fullWidth ?? true}
				inputRef={ref}
				InputProps={{
					...(rest.InputProps || {}),
					startAdornment: withIcon ? (
						<InputAdornment position='start'>
							<LockIcon fontSize='small' />
						</InputAdornment>
					) : (
						rest.InputProps?.startAdornment
					),
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label={show ? 'Приховати пароль' : 'Показати пароль'}
								onClick={() => setShow(s => !s)}
								edge='end'
								tabIndex={-1}
							>
								{show ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		)
	}
)

PasswordField.displayName = 'PasswordField'
export default PasswordField
