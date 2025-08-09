import type { TextFieldProps } from '@mui/material'
import { InputAdornment, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & {
	value: string
	onChange: (value: string) => void
	icon?: ReactNode
}

const IconTextField = forwardRef<HTMLInputElement, Props>(
	({ value, onChange, icon, ...rest }, ref) => {
		return (
			<TextField
				{...rest}
				value={value}
				onChange={e => onChange(e.target.value)}
				fullWidth={rest.fullWidth ?? true}
				inputRef={ref}
				InputProps={{
					...(rest.InputProps || {}),
					startAdornment: icon ? (
						<InputAdornment position='start'>{icon}</InputAdornment>
					) : (
						rest.InputProps?.startAdornment
					),
				}}
			/>
		)
	}
)

IconTextField.displayName = 'IconTextField'
export default IconTextField
