import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import type { RegisterStep1Data, RegisterStep2Data } from '../../hooks/validation_zod'

type RegisterStep3Props = {
  loginData: RegisterStep1Data
  passwordData: RegisterStep2Data
  onBack: () => void
  onSubmit: () => void
  isLoading?: boolean
}

export default function RegisterStep3({
  loginData,
  passwordData,
  onBack,
  onSubmit,
  isLoading = false,
}: RegisterStep3Props) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" id="step3-heading" sx={{ fontWeight: 700, mb: 1 }}>
          Krok 3 z 3: Podsumowanie
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sprawdź dane przed rejestracją
        </Typography>
      </div>

      <Paper
        elevation={0}
        role="region"
        aria-labelledby="step3-heading"
        sx={{
          p: 3,
          bgcolor: 'background.default',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Login
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {loginData.login}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Hasło
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {'•'.repeat(passwordData.password.length)}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography variant="body2" color="text.secondary">
        Klikając "Zarejestruj", akceptujesz nasze warunki użytkowania.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button onClick={onBack} variant="text" fullWidth disabled={isLoading} aria-label="Wróć do kroku 2">
          Wstecz
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          fullWidth
          disabled={isLoading}
          aria-label={isLoading ? 'Rejestrowanie w toku' : 'Potwierdź rejestrację'}
        >
          {isLoading ? 'Rejestrowanie...' : 'Zarejestruj'}
        </Button>
      </Stack>
    </Stack>
  )
}
