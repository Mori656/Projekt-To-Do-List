import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type AddTodoDialogProps = {
  open: boolean
  onClose: () => void
  onAdd: (payload: { task: string; timeLimit: string; importance: number }) => void
}

export default function AddTodoDialog({ open, onClose, onAdd }: AddTodoDialogProps) {
  const [task, setTask] = useState('')
  const [timeLimit, setTimeLimit] = useState('')
  const [importance, setImportance] = useState(5)

  useEffect(() => {
    if (!open) {
      setTask('')
      setTimeLimit('')
      setImportance(5)
    }
  }, [open])

  const handleSubmit = () => {
    const trimmedTask = task.trim()
    if (!trimmedTask) return

    onAdd({
      task: trimmedTask,
      timeLimit: timeLimit.trim() || 'Brak',
      importance,
    })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="add-todo-dialog-title"
      aria-describedby="add-todo-dialog-description"
      disableEscapeKeyDown={false}
      PaperProps={{ sx: { borderRadius: 0, overflow: 'hidden' } }}
      BackdropProps={{ sx: { bgcolor: 'rgba(15, 23, 42, 0.18)', backdropFilter: 'blur(4px)' } }}
    >
      <DialogTitle id="add-todo-dialog-title" sx={{ fontWeight: 700 }}>
        Dodaj nowe zadanie
      </DialogTitle>
      <DialogContent id="add-todo-dialog-description" sx={{ pt: 1, pb: 2 }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Zadanie"
            fullWidth
            autoFocus
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          <TextField
            label="Termin"
            fullWidth
            placeholder="np. 2026-03-28 14:00"
            value={timeLimit}
            onChange={(event) => setTimeLimit(event.target.value)}
          />
          <TextField
            label="Priorytet (1-9)"
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 9 }}
            value={importance}
            onChange={(event) => setImportance(Number(event.target.value))}
          />
          <Typography variant="body2" color="text.secondary">
            Dodaj krótki tytuł i termin zadania, aby móc łatwiej planować pracę.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="text">
          Anuluj
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Dodaj zadanie
        </Button>
      </DialogActions>
    </Dialog>
  )
}
