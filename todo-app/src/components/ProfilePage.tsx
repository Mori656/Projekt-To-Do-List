import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'

type ProfilePageProps = {
  userName: string
  isDarkMode: boolean
  onBack: () => void
  onLogout: () => void
  onToggleTheme: () => void
  onUpdateName: (name: string) => void
  totalTasks: number
  completedTasks: number
  overdueTasks: number
}

export default function ProfilePage({
  userName,
  isDarkMode,
  onBack,
  onLogout,
  onToggleTheme,
  onUpdateName,
  totalTasks,
  completedTasks,
  overdueTasks,
}: ProfilePageProps) {
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [nameInput, setNameInput] = useState(userName)

  useEffect(() => {
    setNameInput(userName)
  }, [userName])

  const handleConfirmName = () => {
    const trimmed = nameInput.trim()
    if (trimmed) {
      onUpdateName(trimmed)
    }
    setShowNameDialog(false)
  }

  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: 'background.default', color: 'text.primary', py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: '0.03em',
              color: 'text.primary',
            }}
          >
            Profil
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" role="group" aria-label="Akcje profilu">
            <Button variant="outlined" onClick={onBack} aria-label="Powrót na główną stronę">
              Główna
            </Button>
            <Button variant="contained" onClick={onLogout} aria-label="Wyloguj z konta">
              Wyloguj
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} role="region" aria-label="Sekcje profilu użytkownika">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              role="region"
              aria-labelledby="profile-card-heading"
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'background.paper',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 76, height: 76, fontWeight: 700, fontSize: '1.5rem' }} aria-label={`Avatar użytkownika ${userName}`}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography id="profile-card-heading" variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                {userName}
              </Typography>
              <Button variant="contained" fullWidth onClick={() => setShowNameDialog(true)} aria-label="Zmień nazwę użytkownika">
                Zmień nazwę
              </Button>
              <Button variant="outlined" color="error" fullWidth onClick={onLogout} aria-label="Wyloguj się z konta">
                Wyloguj
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              role="region"
              aria-labelledby="stats-card-heading"
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography id="stats-card-heading" variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Statystyki
              </Typography>
              <Stack spacing={2}>
                <Typography aria-label="Liczba zaplanowanych zadań">Zaplanowane zadania: {totalTasks}</Typography>
                <Typography aria-label="Liczba wykonanych zadań">Wykonane zadania: {completedTasks}</Typography>
                <Typography aria-label="Liczba przeterminowanych zadań">Zadania przeterminowane: {overdueTasks}</Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              role="region"
              aria-labelledby="theme-card-heading"
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography id="theme-card-heading" variant="h6" sx={{ fontWeight: 700 }}>
                Motyw
              </Typography>
              <Typography color="text.secondary" aria-label={`Aktualnie ustawiony tryb: ${isDarkMode ? 'ciemny' : 'jasny'}`}>
                {isDarkMode ? 'Ciemny tryb' : 'Jasny tryb'}
              </Typography>
              <Button
                variant="contained"
                onClick={onToggleTheme}
                aria-label={isDarkMode ? 'Przełącz na jasny tryb' : 'Przełącz na ciemny tryb'}
              >
                {isDarkMode ? 'Przełącz na jasny' : 'Przełącz na ciemny'}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={showNameDialog}
          onClose={() => setShowNameDialog(false)}
          fullWidth
          maxWidth="xs"
          disableEscapeKeyDown={false}
          PaperProps={{ sx: { borderRadius: 0 } }}
          BackdropProps={{ sx: { bgcolor: 'rgba(15, 23, 42, 0.2)', backdropFilter: 'blur(4px)' } }}
        >
          <DialogTitle>Zmień nazwę użytkownika</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nowa nazwa"
              type="text"
              fullWidth
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
            <Button onClick={() => setShowNameDialog(false)}>Anuluj</Button>
            <Button onClick={handleConfirmName} variant="contained">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
