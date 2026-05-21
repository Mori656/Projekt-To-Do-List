import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import { useCharacters } from '../../hooks/useCharacters';

const RickAndMorty = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCharacters(page);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Rick and Morty
      </Typography>

      <Grid container spacing={2}>
        {data?.results.map((character) => (
          <Grid item xs={12} sm={6} md={3} key={character.id}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={character.image}
                alt={character.name}
              />

              <CardContent>
                <Typography variant="h6">
                  {character.name}
                </Typography>

                <Typography variant="body2">
                  {character.species}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default RickAndMorty;