import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { FilterType } from '../types/todo.types'

type FilterDialogProps = {
  open: boolean
  filter: FilterType
  onChange: (value: FilterType) => void
  onClose: () => void
}

const options: Array<{ value: FilterType; label: string }> = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'active', label: 'Aktywne' },
  { value: 'completed', label: 'Zrobione' },
]

export default function FilterDialog({ open, filter, onChange, onClose }: FilterDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Filtry</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Wybierz widok zadań, aby szybko zobaczyć tylko aktywne lub wykonane elementy.
          </Typography>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, value) => {
              if (value) onChange(value)
            }}
            fullWidth
            color="primary"
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            {options.map((option) => (
              <ToggleButton key={option.value} value={option.value} sx={{ flex: 1, minWidth: 100 }}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  )
}
