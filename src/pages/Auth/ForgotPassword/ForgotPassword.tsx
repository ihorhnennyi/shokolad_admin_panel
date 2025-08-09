import EmailIcon from '@mui/icons-material/Email'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import ErrorAlert from '@/components/molecules/Auth/ErrorAlert'
import IconTextField from '@/components/molecules/Auth/IconTextField'
import SubmitButton from '@/components/molecules/Auth/SubmitButton'
import { useForgotPassword } from '@/shared/hooks/useForgotPassword'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'

export default function ForgotPassword() {
	const { loading, error, sent, submit } = useForgotPassword()
	const [email, setEmail] = useState('')

	const disabled = useMemo(() => !email || loading, [email, loading])

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		submit({ email })
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: BG,
				display: 'grid',
				placeItems: 'center',
				p: 2,
				position: 'relative',
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
					opacity: 0.07,
					pointerEvents: 'none',
				}}
			>
				<Box
					component='img'
					src='/logo.webp'
					alt='background logo'
					sx={{ width: 380, filter: 'brightness(0)' }}
				/>
			</Box>

			<Paper
				elevation={0}
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
				}}
			>
				<Stack spacing={3} component='form' onSubmit={onSubmit}>
					<Stack alignItems='center' spacing={1}>
						<Typography variant='h6' fontWeight={800}>
							Відновлення пароля
						</Typography>
						<Typography color='text.secondary' fontSize={14} textAlign='center'>
							Введіть email — ми надішлемо посилання для скидання пароля.
						</Typography>
					</Stack>

					<ErrorAlert message={error} />

					{sent ? (
						<Typography textAlign='center'>
							Якщо такий email існує, ми надіслали лист із посиланням для
							скидання.
						</Typography>
					) : (
						<>
							<IconTextField
								label='Email'
								type='email'
								value={email}
								onChange={setEmail}
								icon={<EmailIcon fontSize='small' />}
								autoFocus
							/>
							<SubmitButton
								loading={loading}
								disabled={disabled}
								accent={ACCENT}
							>
								Надіслати посилання
							</SubmitButton>
						</>
					)}

					<Typography
						variant='caption'
						color='text.secondary'
						textAlign='center'
					>
						<RouterLink
							to='/login'
							style={{ color: 'inherit', textDecoration: 'underline' }}
						>
							Повернутися до входу
						</RouterLink>
					</Typography>
				</Stack>
			</Paper>
		</Box>
	)
}
