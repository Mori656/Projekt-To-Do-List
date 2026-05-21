import { Box, Typography } from '@mui/material';
import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
        gap: 2,
        textAlign: 'center',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Search size={48} />
      <Typography variant="h6">Nie znaleziono filmów</Typography>
      <Typography variant="body2" color="text.secondary">
        Spróbuj innego zapytania lub sprawdź połączenie sieciowe.
      </Typography>
    </Box>
  );
}
