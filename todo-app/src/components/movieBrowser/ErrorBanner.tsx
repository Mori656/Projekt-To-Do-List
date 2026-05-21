import { Box, Button, Typography } from '@mui/material';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        gap: 2,
        border: '1px solid',
        borderColor: 'error.light',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Wystąpił błąd
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {message}
      </Typography>
      <Button variant="contained" color="error" onClick={onRetry}>
        Spróbuj ponownie
      </Button>
    </Box>
  );
}
