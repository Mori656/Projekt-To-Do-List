import React from 'react';
import RickAndMorty from './RickAndMorty';

const MovieBrowser: React.FC = () => {
  return (
    <div className="movie-browser">
      <h1>Movie Browser</h1>
      <RickAndMorty />
    </div>
  );
};

export default MovieBrowser;