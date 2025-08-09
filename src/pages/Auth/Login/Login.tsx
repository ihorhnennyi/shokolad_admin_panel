import EmailIcon from '@mui/icons-material/Email'
import {
	Box,
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import ErrorAlert from '@/components/molecules/Auth/ErrorAlert'
import IconTextField from '@/components/molecules/Auth/IconTextField'
import PasswordField from '@/components/molecules/Auth/PasswordField'
import SubmitButton from '@/components/molecules/Auth/SubmitButton'
import AuthCard from '@/components/molecules/AuthCard'

import { useLogin } from '@/shared/hooks/useLogin'
import { authStorage } from '@/shared/storage/authStorage'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'

export default function Login() {
	const nav = useNavigate()
	const { loading, error, submit } = useLogin()

	const [email, setEmail] = useState(authStorage.loadLastEmail())
	const [password, setPassword] = useState('')
	const [remember, setRemember] = useState(true)

	const disabled = useMemo(
		() => !email || !password || loading,
		[email, password, loading]
	)

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		submit({ email, password, remember }, () => nav('/'))
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: BG,
				display: 'grid',
				placeItems: 'center',
				position: 'relative',
				p: 2,
			}}
		>
			{/* Водяной знак */}
			<Box
				aria-hidden
				sx={{
					position: 'absolute',
					inset: 0,
					display: 'grid',
					placeItems: 'center',
					pointerEvents: 'none',
					opacity: 0.09,
				}}
			>
				<Box
					component='img'
					src='/logo.webp'
					alt='background logo'
					sx={{ width: 420, filter: 'brightness(0)' }}
				/>
			</Box>

			<AuthCard>
				<Stack spacing={3} component='form' onSubmit={onSubmit}>
					<Stack alignItems='center' spacing={1}>
						<Box
							component='img'
							src='/logo.webp'
							alt='logo'
							sx={{ width: 300, filter: 'brightness(0)', opacity: 0.4 }}
						/>
						<Typography color='text.secondary' fontSize={14}>
							Вхід до панелі керування
						</Typography>
					</Stack>

					<ErrorAlert message={error} />

					<IconTextField
						label='Email'
						type='email'
						value={email}
						onChange={setEmail}
						icon={<EmailIcon fontSize='small' />}
						autoFocus
					/>

					<PasswordField value={password} onChange={setPassword} />

					<FormControlLabel
						control={
							<Checkbox
								checked={remember}
								onChange={e => setRemember(e.target.checked)}
							/>
						}
						label='Запам’ятати мене'
					/>

					<SubmitButton loading={loading} disabled={disabled} accent={ACCENT}>
						Увійти
					</SubmitButton>

					<Typography
						variant='caption'
						color='text.secondary'
						textAlign='center'
					>
						<RouterLink
							to='/forgot-password'
							style={{ color: 'inherit', textDecoration: 'underline' }}
						>
							Забули пароль?
						</RouterLink>
					</Typography>
				</Stack>
			</AuthCard>
		</Box>
	)
}
