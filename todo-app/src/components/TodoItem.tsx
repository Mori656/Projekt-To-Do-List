import { Trash2, Check, Edit2 } from 'lucide-react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

type TodoItemProps = {
  task: string
  timeLimit: string
  importance: number
  completed: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function TodoItem({
  task,
  timeLimit,
  importance,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <Card
      component="article"
      variant="outlined"
      aria-label={`Zadanie: ${task}, Termin: ${timeLimit}, Priorytet: ${importance}, Status: ${completed ? 'Zrobione' : 'Aktywne'}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.75,
        minHeight: 88,
        minWidth: 230,
        borderRadius: 3,
        boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.12)',
        },
      }}
    >
      <IconButton
        onClick={onToggle}
        size="small"
        sx={{
          border: 1,
          borderColor: 'divider',
          bgcolor: completed ? 'success.main' : 'transparent',
          color: completed ? 'success.contrastText' : 'text.primary',
          minWidth: 36,
          minHeight: 36,
        }}
        aria-label={completed ? 'Oznacz jako niezrobione' : 'Oznacz jako zrobione'}
      >
        {completed ? <Check size={18} /> : <Box component="span" sx={{ width: 14, height: 14, borderRadius: '50%', border: 1, borderColor: 'divider' }} />} 
      </IconButton>

      <Box sx={{ flex: 1, minWidth: 0, }}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'text.secondary' : 'text.primary',
            fontWeight: 700,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {timeLimit}
        </Typography>
      </Box>

      <Box
        sx={{
          px: 1.25,
          py: 0.6,
          borderRadius: '999px',
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'divider',
          color: 'text.primary',
          fontWeight: 700,
          minWidth: 42,
          textAlign: 'center',
        }}
      >
        {importance}
      </Box>
      <Box sx={{ display: 'flex', flexShrink: 0, gap: 1 }}>
        <IconButton onClick={onEdit} size="small" aria-label="Edytuj" sx={{ color: 'text.secondary', flexShrink: 0}}>
          <Edit2 size={18} />
        </IconButton>
        <IconButton onClick={onDelete} size="small" aria-label="Usuń" sx={{ color: 'error.main', flexShrink: 0 }}>
          <Trash2 size={18} />
        </IconButton>
      </Box>
    </Card>
  )
}
