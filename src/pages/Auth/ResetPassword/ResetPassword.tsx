// src/pages/Auth/ResetPassword/ResetPassword.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import {
	Link as RouterLink,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'
const MIN_LENGTH = 8

export default function ResetPassword() {
	// поддержим оба способа: /reset-password/:token И /reset-password?token=...
	const { token: tokenFromPath } = useParams<{ token: string }>()
	const [sp] = useSearchParams()
	const tokenFromQuery = sp.get('token') ?? undefined
	const token = tokenFromPath ?? tokenFromQuery

	const navigate = useNavigate()

	const [showPwd1, setShowPwd1] = useState(false)
	const [showPwd2, setShowPwd2] = useState(false)
	const [pwd, setPwd] = useState('')
	const [pwd2, setPwd2] = useState('')
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<'ok' | 'err' | null>(null)
	const [seconds, setSeconds] = useState(5)

	const tooShort = pwd.length > 0 && pwd.length < MIN_LENGTH
	const mismatch = pwd2.length > 0 && pwd !== pwd2
	const invalid = !pwd || !pwd2 || tooShort || mismatch
	const showForm = useMemo(() => status !== 'ok', [status])

	async function submit(e: React.FormEvent) {
		e.preventDefault()
		if (!token) return // нет токена — смысла слать запрос нет
		setLoading(true)
		try {
			// TODO: POST /auth/reset-password { token, password: pwd }
			await new Promise(r => setTimeout(r, 1000))
			setStatus('ok')
		} catch {
			setStatus('err')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (status !== 'ok') return
		setSeconds(5)
		const iv = setInterval(() => {
			setSeconds(s => {
				if (s <= 1) {
					clearInterval(iv)
					navigate('/login', { replace: true })
					return 0
				}
				return s - 1
			})
		}, 1000)
		return () => clearInterval(iv)
	}, [status, navigate])

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
			{/* Лого-фон */}
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
					alt='background logo'
					sx={{ width: 360, filter: 'brightness(0)' }}
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
					position: 'relative',
				}}
			>
				<Backdrop
					open={loading}
					sx={{
						color: '#fff',
						zIndex: t => t.zIndex.drawer + 1,
						borderRadius: 4,
						position: 'absolute',
						inset: 0,
					}}
				>
					<CircularProgress color='inherit' />
				</Backdrop>

				<Stack spacing={3} component='form' onSubmit={submit}>
					<Stack alignItems='center' spacing={1}>
						<Typography variant='h6' fontWeight={800}>
							Скидання пароля
						</Typography>
						<Typography color='text.secondary' fontSize={14} textAlign='center'>
							{showForm
								? 'Введіть новий пароль та підтвердіть його.'
								: 'Пароль успішно змінено.'}
						</Typography>
					</Stack>

					{showForm ? (
						<>
							<TextField
								label='Новий пароль'
								type={showPwd1 ? 'text' : 'password'}
								value={pwd}
								onChange={e => setPwd(e.target.value)}
								fullWidth
								error={tooShort}
								helperText={tooShort ? `Мінімум ${MIN_LENGTH} символів` : ' '}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockIcon fontSize='small' />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => setShowPwd1(v => !v)}
												edge='end'
											>
												{showPwd1 ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<TextField
								label='Підтвердження пароля'
								type={showPwd2 ? 'text' : 'password'}
								value={pwd2}
								onChange={e => setPwd2(e.target.value)}
								fullWidth
								error={mismatch}
								helperText={mismatch ? 'Паролі не співпадають' : ' '}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockIcon fontSize='small' />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => setShowPwd2(v => !v)}
												edge='end'
											>
												{showPwd2 ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<Button
								type='submit'
								disabled={invalid || loading || !token}
								sx={{
									py: 1.2,
									fontWeight: 800,
									borderRadius: 999,
									background: ACCENT,
									color: '#fff',
									'&:hover': { background: ACCENT, opacity: 0.95 },
								}}
							>
								Змінити пароль
							</Button>

							{!token && (
								<Typography variant='caption' color='error' textAlign='center'>
									Посилання некоректне: відсутній <code>token</code> у URL.
								</Typography>
							)}
						</>
					) : (
						<>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='center'
								spacing={1}
								color='success.main'
							>
								<CheckCircleIcon fontSize='small' />
								<Typography>Пароль успішно змінено.</Typography>
							</Stack>

							<Typography textAlign='center' color='text.secondary'>
								Перенаправлення на сторінку входу через <b>{seconds}</b> с.
							</Typography>

							<Button
								onClick={() => navigate('/login', { replace: true })}
								sx={{
									py: 1.1,
									fontWeight: 700,
									borderRadius: 999,
									background: ACCENT,
									color: '#fff',
									'&:hover': { background: ACCENT, opacity: 0.95 },
								}}
							>
								Перейти до входу зараз
							</Button>
						</>
					)}

					{status === 'err' && (
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='center'
							spacing={1}
							color='error.main'
						>
							<ErrorOutlineIcon fontSize='small' />
							<Typography>Сталася помилка. Спробуйте ще раз.</Typography>
						</Stack>
					)}

					{showForm && (
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
					)}
				</Stack>
			</Paper>
		</Box>
	)
}
