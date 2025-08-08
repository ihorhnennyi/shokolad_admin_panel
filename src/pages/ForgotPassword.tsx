import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'

export default function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [sent, setSent] = useState(false)
	const [loading, setLoading] = useState(false)

	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		// TODO: підключити POST /auth/forgot-password { email }
		await new Promise(r => setTimeout(r, 600))
		setSent(true)
		setLoading(false)
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
			{/* легкий водяний знак */}
			<Box
				aria-hidden
				sx={{
					position: 'absolute',
					inset: 0,
					display: 'grid',
					placeItems: 'center',
					opacity: 0.07,
				}}
			>
				<Box
					component='img'
					src='/logo.webp'
					alt=''
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
				<Stack spacing={3} component='form' onSubmit={submit}>
					<Stack alignItems='center' spacing={1}>
						<Typography variant='h6' fontWeight={800}>
							Відновлення пароля
						</Typography>
						<Typography color='text.secondary' fontSize={14} textAlign='center'>
							Введіть email — ми надішлемо посилання для скидання пароля.
						</Typography>
					</Stack>

					{sent ? (
						<Typography textAlign='center'>
							Якщо такий email існує, ми надіслали лист із посиланням для
							скидання.
						</Typography>
					) : (
						<>
							<TextField
								label='Email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								fullWidth
							/>
							<Button
								type='submit'
								disabled={!email || loading}
								sx={{
									py: 1.2,
									fontWeight: 800,
									borderRadius: 999,
									background: ACCENT,
									color: '#fff',
									'&:hover': { background: ACCENT, opacity: 0.95 },
								}}
							>
								Надіслати посилання
							</Button>
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
