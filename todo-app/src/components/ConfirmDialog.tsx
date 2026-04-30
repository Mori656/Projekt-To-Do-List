import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="xs"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      disableFocusTrap={false}
      disableEscapeKeyDown={false}
      PaperProps={{ sx: { borderRadius: 0 } }}
      BackdropProps={{ sx: { bgcolor: 'rgba(15, 23, 42, 0.16)', backdropFilter: 'blur(4px)' } }}
    >
      <DialogTitle id="confirm-dialog-title" sx={{ fontWeight: 700 }}>
        {title}
      </DialogTitle>
      <DialogContent id="confirm-dialog-description">
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onCancel} variant="text">
          Anuluj
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Potwierdź
        </Button>
      </DialogActions>
    </Dialog>
  )
}
