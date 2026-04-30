import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { registerStep1Schema } from '../../hooks/validation_zod'
import type { RegisterStep1Data } from '../../hooks/validation_zod'

type RegisterStep1Props = {
  onNext: (data: RegisterStep1Data) => void
  onCancel: () => void
  initialData?: RegisterStep1Data
}

export default function RegisterStep1({ onNext, onCancel, initialData }: RegisterStep1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep1Data>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: initialData || { login: '' },
    mode: 'onBlur',
  })

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" id="step1-heading" sx={{ fontWeight: 700, mb: 1 }}>
          Krok 1 z 3: Login
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wybierz swoją unikalną nazwę użytkownika
        </Typography>
      </div>

      <TextField
        label="Login"
        fullWidth
        autoFocus
        inputProps={{ 'aria-labelledby': 'step1-heading' }}
        {...register('login')}
        error={!!errors.login}
        helperText={errors.login?.message}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button onClick={onCancel} variant="text" fullWidth>
          Anuluj
        </Button>
        <Button onClick={handleSubmit(onNext)} variant="contained" fullWidth aria-label="Przejdź do kroku 2">
          Dalej
        </Button>
      </Stack>
    </Stack>
  )
}
