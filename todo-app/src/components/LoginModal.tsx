import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { loginSchema } from '../hooks/validation_zod'
import RegisterForm from './register/RegisterForm'
import type { Step1Data, RegisterStep1Data, RegisterStep2Data } from '../hooks/validation_zod'

type LoginModalProps = {
  open: boolean
  isRegisterMode: boolean
  onClose: () => void
  onSubmit: (data: Step1Data) => void
  onSwitchMode: () => void
}

const getPasswordStrength = (pwd: string) => {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 1) return 'słabe'
  if (score === 2 || score === 3) return 'średnie'
  return 'silne'
}

export default function LoginModal({
  open,
  isRegisterMode,
  onClose,
  onSubmit,
  onSwitchMode,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Step1Data>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const password = watch('password') || ''

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const handleRegisterSubmit = (loginData: RegisterStep1Data, passwordData: RegisterStep2Data) => {
    const combinedData: Step1Data = {
      login: loginData.login,
      password: passwordData.password,
    }
    onSubmit(combinedData)
  }

  const handleRegisterCancel = () => {
    onSwitchMode()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={isRegisterMode ? 'sm' : 'xs'}
      aria-labelledby="login-dialog-title"
      aria-describedby="login-dialog-description"
      disableFocusTrap={false}
      disableEscapeKeyDown={false}
      PaperProps={{ sx: { borderRadius: 0, overflow: 'hidden' } }}
      BackdropProps={{ sx: { bgcolor: 'rgba(15, 23, 42, 0.22)', backdropFilter: 'blur(6px)' } }}
    >
      <DialogTitle id="login-dialog-title" sx={{ textAlign: 'center', fontWeight: 700, color: 'text.primary' }}>
        {isRegisterMode ? 'Rejestracja' : 'Logowanie'}
      </DialogTitle>
      <DialogContent id="login-dialog-description" sx={{ pt: 2, pb: 2 }}>
        {isRegisterMode ? (
          <RegisterForm onSubmit={handleRegisterSubmit} onCancel={handleRegisterCancel} />
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Login"
              fullWidth
              autoFocus
              {...register('login')}
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            <TextField
              label="Hasło"
              fullWidth
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {password && (
              <Typography variant="body2" color="text.secondary">
                Siła hasła: <strong>{getPasswordStrength(password)}</strong>
              </Typography>
            )}
            <Button
              type="button"
              onClick={onSwitchMode}
              variant="text"
              sx={{ justifyContent: 'flex-start', textTransform: 'none', p: 0 }}
            >
              Nie masz konta? Zarejestruj się
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
              Zaloguj
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}
