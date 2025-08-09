import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
	Backdrop,
	Box,
	CircularProgress,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import {
	Link as RouterLink,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom'

import ErrorAlert from '@/components/molecules/Auth/ErrorAlert'
import PasswordField from '@/components/molecules/Auth/PasswordField'
import SubmitButton from '@/components/molecules/Auth/SubmitButton'
import { useResetPassword } from '@/shared/hooks/useResetPassword'
import { RESET_MIN_LENGTH } from '@/shared/validation/auth.schemas'

const BG = '#2A3F54'
const ACCENT = '#1ABB9C'

export default function ResetPassword() {
	// поддержим /reset-password/:token и /reset-password?token=...
	const { token: tokenFromPath } = useParams<{ token: string }>()
	const [sp] = useSearchParams()
	const tokenFromQuery = sp.get('token') ?? undefined
	const token = tokenFromPath ?? tokenFromQuery

	const nav = useNavigate()
	const { loading, error, success, submit } = useResetPassword()

	const [pwd, setPwd] = useState('')
	const [confirm, setConfirm] = useState('')
	const [seconds, setSeconds] = useState(5)

	const tooShort = pwd.length > 0 && pwd.length < RESET_MIN_LENGTH
	const mismatch = confirm.length > 0 && pwd !== confirm
	const disabled = useMemo(
		() => !token || !pwd || !confirm || tooShort || mismatch || loading,
		[token, pwd, confirm, tooShort, mismatch, loading]
	)

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!token) return
		submit({ token, newPassword: pwd, confirm })
	}

	useEffect(() => {
		if (!success) return
		setSeconds(5)
		const iv = setInterval(() => {
			setSeconds(s => {
				if (s <= 1) {
					clearInterval(iv)
					nav('/login', { replace: true })
					return 0
				}
				return s - 1
			})
		}, 1000)
		return () => clearInterval(iv)
	}, [success, nav])

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
			{/* фон-лого */}
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

				<Stack spacing={3} component='form' onSubmit={onSubmit}>
					<Stack alignItems='center' spacing={1}>
						<Typography variant='h6' fontWeight={800}>
							Скидання пароля
						</Typography>
						<Typography color='text.secondary' fontSize={14} textAlign='center'>
							{success
								? 'Пароль успішно змінено.'
								: 'Введіть новий пароль та підтвердіть його.'}
						</Typography>
					</Stack>

					<ErrorAlert message={error} />

					{!success ? (
						<>
							<PasswordField
								label={`Новий пароль (мін. ${RESET_MIN_LENGTH})`}
								value={pwd}
								onChange={setPwd}
								error={tooShort}
								helperText={
									tooShort ? `Мінімум ${RESET_MIN_LENGTH} символів` : ' '
								}
							/>
							<PasswordField
								label='Підтвердження пароля'
								value={confirm}
								onChange={setConfirm}
								error={mismatch}
								helperText={mismatch ? 'Паролі не співпадають' : ' '}
							/>

							{!token && (
								<Typography variant='caption' color='error' textAlign='center'>
									Посилання некоректне: відсутній <code>token</code> у URL.
								</Typography>
							)}

							<SubmitButton
								loading={loading}
								disabled={disabled}
								accent={ACCENT}
							>
								Змінити пароль
							</SubmitButton>

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

							<SubmitButton
								onClick={() => nav('/login', { replace: true })}
								accent={ACCENT}
							>
								Перейти до входу зараз
							</SubmitButton>
						</>
					)}
				</Stack>
			</Paper>
		</Box>
	)
}
