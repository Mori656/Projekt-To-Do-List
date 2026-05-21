// src/mocks/handlers.ts

import { http, HttpResponse, delay, passthrough } from 'msw';


const TMDB_BASE = 'https://api.themoviedb.org/3';

// Mock fallback danych dla popularnych filmów
const mockPopularMovies = (page: number) => ({
  page,
  total_pages: 10,
  results: Array.from({ length: 20 }, (_, i) => ({
    id: page * 100 + i,
    title: `Film testowy ${page}-${i + 1}`,
    overview: 'Opis testowego filmu.',
    poster_path: null,
    release_date: '2024-01-01',
    vote_average: 7.5,
    genre_ids: [28, 12],
  })),
});

// Mock fallback danych dla wyszukiwania
const mockSearchMovies = (page: number, query: string) => ({
  page,
  total_pages: 1,
  results: [
    {
      id: 1,
      title: `Wyniki wyszukiwania dla: "${query}"`,
      overview: 'Mock search result',
      poster_path: null,
      release_date: '2024-01-01',
      vote_average: 7.5,
      genre_ids: [28, 12],
    }
  ],
});

export const handlers = [

// Popular movies — sprawdza API key, pobiera real data lub fallback na mock
http.get(`${TMDB_BASE}/movie/popular`, async ({ request }) => {
  const url = new URL(request.url);
  const apiKey = url.searchParams.get('api_key');

  // Jeśli mamy API key, pozwól requestowi przejść do prawdziwego TMDB
  if (apiKey && apiKey.trim()) {
    console.log('🔑 Klucz API znaleziony, pobieranie danych z TMDB...');
    return passthrough();
  }

  // Fallback na mock data
  console.log('ℹ️ Brak klucza API, używam mock danych');
  await delay(800);
  const page = Number(url.searchParams.get('page') ?? 1);
  return HttpResponse.json(mockPopularMovies(page));
}),

// Search movies — sprawdza API key, pobiera real dane lub fallback na mock
http.get(`${TMDB_BASE}/search/movie`, async ({ request }) => {
  const url = new URL(request.url);
  const apiKey = url.searchParams.get('api_key');
  const query = url.searchParams.get('query') ?? 'test';

  // Jeśli mamy API key, pozwól requestowi przejść do prawdziwego TMDB
  if (apiKey && apiKey.trim()) {
    console.log('🔑 Klucz API znaleziony, wyszukiwanie w TMDB...');
    return passthrough();
  }

  // Fallback na mock data
  console.log('ℹ️ Brak klucza API, używam mock danych');
  await delay(800);
  const page = Number(url.searchParams.get('page') ?? 1);
  return HttpResponse.json(mockSearchMovies(page, query));
}),

// Rick & Morty — mock dla testów jednostkowych
http.get('https://rickandmortyapi.com/api/character', () => {
  return HttpResponse.json({
    info: { count: 2, pages: 1, next: null },
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: '' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: '' },
    ],
  });
}),

];