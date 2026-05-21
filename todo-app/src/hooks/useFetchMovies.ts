// src/hooks/useFetchMovies.ts

import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from "../components/movieBrowser/TmdbClient";
import { QUERY_KEYS } from '../constants/queryKeys';


export interface Movie {

id: number;

title: string;

overview: string;

poster_path: string | null;

release_date: string;

vote_average: number;

genre_ids: number[];

}


interface MoviesResponse {

page: number;

results: Movie[];

total_pages: number;

total_results: number;

}


export function useFetchMovies(page = 1, query = '') {

const isSearch = query.trim().length > 0;


return useQuery({

queryKey: [QUERY_KEYS.movies, isSearch ? 'search' : 'popular', query, page],

queryFn: async () => {

const endpoint = isSearch ? '/search/movie' : '/movie/popular';

const params: Record<string, string | number> = { page };

if (isSearch) params.query = query;

const { data } = await tmdbClient.get<MoviesResponse>(endpoint, { params });

return data;

},

enabled: !isSearch || query.trim().length >= 2, // min 2 znaki dla wyszukiwania

placeholderData: (prev) => prev, // płynna paginacja bez migotania

staleTime: 1000 * 60 * 3, // 3 minuty

});

}