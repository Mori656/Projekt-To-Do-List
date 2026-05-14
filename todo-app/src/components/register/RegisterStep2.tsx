import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { registerStep2Schema } from '../../hooks/validation_zod'
import type { RegisterStep2Data } from '../../hooks/validation_zod'

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

type RegisterStep2Props = {
  onNext: (data: RegisterStep2Data) => void
  onBack: () => void
  initialData?: RegisterStep2Data
}

export default function RegisterStep2({ onNext, onBack, initialData }: RegisterStep2Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterStep2Data>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: initialData || { password: '', confirmPassword: '' },
    mode: 'onChange',
  })

  const password = watch('password') || ''

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" id="step2-heading" sx={{ fontWeight: 700, mb: 1 }}>
          Krok 2 z 3: Hasło
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ustaw bezpieczne hasło dla swojego konta
        </Typography>
      </div>

      <TextField
        label="Hasło"
        type="password"
        fullWidth
        autoFocus
        inputProps={{ 'aria-labelledby': 'step2-heading' }}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Powtórz hasło"
        type="password"
        fullWidth
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      {password && (
        <Typography variant="body2" color="text.secondary" role="status" aria-live="polite">
          Siła hasła: <strong>{getPasswordStrength(password)}</strong>
        </Typography>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button onClick={onBack} variant="text" fullWidth aria-label="Wróć do kroku 1">
          Wstecz
        </Button>
        <Button onClick={handleSubmit(onNext)} variant="contained" fullWidth aria-label="Przejdź do kroku 3">
          Dalej
        </Button>
      </Stack>
    </Stack>
  )
}
