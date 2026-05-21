import { useState, type ChangeEvent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Search, Film, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';
import { EmptyState } from './EmptyState';
import { ErrorBanner } from './ErrorBanner';

const MovieBrowser: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isPlaceholderData,
    refetch,
  } = useFetchMovies(page, debouncedQuery);
  const { data: movieDetails, isLoading: isDetailLoading, isError: isDetailError } = useMovieDetails(selectedMovieId);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  const handleOpenDetails = (id: number) => {
    setSelectedMovieId(id);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
    setSelectedMovieId(null);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Typography variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Film size={24} /> Przeglądaj filmy
        </Typography>
        <TextField
          value={query}
          onChange={handleSearchChange}
          placeholder="Szukaj filmu..."
          fullWidth
          sx={{ minWidth: 240, maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            setQuery('');
            setPage(1);
          }}
        >
          Wyczyść
        </Button>
      </Box>

      {isLoading ? (
        <Grid container spacing={2} sx={{ opacity: 1 }}>
          {Array.from({ length: 12 }, (_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <ErrorBanner message={error?.message ?? 'Wystąpił błąd'} onRetry={refetch} />
      ) : isSuccess ? (
        movies.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Grid container spacing={2} sx={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} onSelect={() => handleOpenDetails(movie.id)} />
                </Grid>
              ))}
            </Grid>
            {isFetching && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Aktualizuję dane...
                </Typography>
              </Box>
            )}
          </>
        )
      ) : null}

      {!isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}>
          <Button variant="outlined" disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Poprzednia
          </Button>
          <Typography sx={{ alignSelf: 'center' }}>
            Strona {page} z {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Następna
          </Button>
        </Box>
      )}

      <Dialog open={isDetailOpen} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Szczegóły filmu
          <IconButton onClick={handleCloseDetails} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {isDetailLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : isDetailError ? (
            <Typography color="error">Błąd podczas pobierania szczegółów filmu.</Typography>
          ) : movieDetails ? (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                  {movieDetails.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {movieDetails.release_date} | Ocena: {movieDetails.vote_average}
                </Typography>
              </Box>
              <Typography paragraph>{movieDetails.overview || 'Brak opisu filmu.'}</Typography>
              <Typography variant="body2" color="text.secondary">
                Czas trwania: {movieDetails.runtime || 'nieznany'} min
              </Typography>
            </Box>
          ) : (
            <Typography>Wybierz film, aby zobaczyć szczegóły.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieBrowser;
