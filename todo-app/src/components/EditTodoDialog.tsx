import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type EditTodoDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (payload: { task: string; timeLimit: string; importance: number }) => void
  initialData: {
    task: string
    timeLimit: string
    importance: number
  }
}

export default function EditTodoDialog({ open, onClose, onSave, initialData }: EditTodoDialogProps) {
  const [task, setTask] = useState(initialData.task)
  const [timeLimit, setTimeLimit] = useState(initialData.timeLimit)
  const [importance, setImportance] = useState(initialData.importance)

  useEffect(() => {
    if (open) {
      setTask(initialData.task)
      setTimeLimit(initialData.timeLimit)
      setImportance(initialData.importance)
    }
  }, [open, initialData])

  const isTaskValid = task.trim().length > 0
  const isImportanceValid = importance >= 1 && importance <= 9

  const handleSubmit = () => {
    const trimmedTask = task.trim()
    if (!trimmedTask || !isImportanceValid) return

    onSave({
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
      aria-labelledby="edit-todo-dialog-title"
      aria-describedby="edit-todo-dialog-description"
      disableEscapeKeyDown={false}
      PaperProps={{ sx: { borderRadius: 0, overflow: 'hidden' } }}
      BackdropProps={{ sx: { bgcolor: 'rgba(15, 23, 42, 0.18)', backdropFilter: 'blur(4px)' } }}
    >
      <DialogTitle id="edit-todo-dialog-title" sx={{ fontWeight: 700 }}>
        Edytuj zadanie
      </DialogTitle>
      <DialogContent id="edit-todo-dialog-description" sx={{ pt: 1, pb: 2 }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Zadanie"
            fullWidth
            autoFocus
            value={task}
            onChange={(event) => setTask(event.target.value)}
            error={!isTaskValid}
            helperText={!isTaskValid ? 'Tytuł zadania nie może być pusty.' : ''}
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
            error={!isImportanceValid}
            helperText={!isImportanceValid ? 'Priorytet musi być od 1 do 9.' : ''}
          />
          <Typography variant="body2" color="text.secondary">
            Edytuj właściwości zadania, żeby zachować spójność z formularzem dodawania.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="text">
          Anuluj
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isTaskValid || !isImportanceValid}>
          Zapisz zmiany
        </Button>
      </DialogActions>
    </Dialog>
  )
}
