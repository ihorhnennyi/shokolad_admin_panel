// src/pages/Login.tsx
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'

export default function Login() {
	const [show, setShow] = useState(false)
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [remember, setRemember] = useState(true)
	const [loading, setLoading] = useState(false)
	const nav = useNavigate()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			// TODO: call /auth/login
			await new Promise(r => setTimeout(r, 600))
			nav('/')
		} finally {
			setLoading(false)
		}
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
			{/* водяний знак */}
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
					alt=''
					sx={{
						width: 420,
						filter: 'brightness(0)', // чорний логотип
					}}
				/>
			</Box>

			<Paper
				elevation={0}
				sx={{
					zIndex: 1,
					width: 420,
					p: 4,
					borderRadius: 2,
					backdropFilter: 'blur(8px)',
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.88))',
					boxShadow: '0 20px 40px rgba(0,0,0,.25), 0 2px 10px rgba(0,0,0,.08)',
					border: '1px solid rgba(255,255,255,.6)',
				}}
			>
				<Stack spacing={3} component='form' onSubmit={onSubmit}>
					<Stack alignItems='center' spacing={1}>
						<Box
							component='img'
							src='/logo.webp'
							alt='logo'
							sx={{
								width: 350,
								filter: 'brightness(0)', // чорний логотип
								opacity: 0.3,
							}}
						/>

						<Typography color='text.secondary' fontSize={14}>
							Вхід до панелі керування
						</Typography>
					</Stack>

					<TextField
						label='Email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<EmailIcon fontSize='small' />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						label='Пароль'
						type={show ? 'text' : 'password'}
						value={pass}
						onChange={e => setPass(e.target.value)}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<LockIcon fontSize='small' />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={() => setShow(v => !v)} edge='end'>
										{show ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={remember}
								onChange={e => setRemember(e.target.checked)}
							/>
						}
						label='Запам’ятати мене'
					/>

					<Button
						type='submit'
						disabled={!email || !pass || loading}
						sx={{
							py: 1.2,
							fontWeight: 800,
							borderRadius: 999,
							background: ACCENT,
							color: '#fff',
							'&:hover': { background: ACCENT, opacity: 0.95 },
							boxShadow:
								'0 6px 16px rgba(26,187,156,.35), 0 2px 6px rgba(0,0,0,.06)',
						}}
					>
						{loading ? 'Вхід...' : 'Увійти'}
					</Button>

					{/* Посилання на сторінку відновлення паролю */}
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
			</Paper>
		</Box>
	)
}
