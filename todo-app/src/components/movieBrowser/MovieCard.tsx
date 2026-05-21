import { useState, useCallback } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavourites';
import type { Movie } from '../../hooks/useFetchMovies';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
  onSelect?: () => void;
}

export function MovieCard({ movie, onSelect }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOptimisticFav(!displayedFav);

    try {
      await toggleFavorite(movie);
      setOptimisticFav(null);
    } catch {
      setOptimisticFav(null);
    }
  }, [displayedFav, toggleFavorite, movie]);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardActionArea onClick={onSelect} sx={{ flexGrow: 1, textAlign: 'left' }}>
        <CardMedia
          component="img"
          image={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/no-poster.png'}
          alt={movie.title}
          sx={{ height: 260, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
            {movie.overview ?? ''}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {movie.release_date?.slice(0, 4) || 'brak'} • ⭐ {movie.vote_average.toFixed(1)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <IconButton
        onClick={handleToggle}
        aria-label={displayedFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
      >
        {displayedFav ? '❤️' : <Heart size={16} />}
      </IconButton>
    </Card>
  );
}
