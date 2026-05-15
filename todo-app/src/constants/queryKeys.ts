export const QUERY_KEYS = {
  characters: {
    all: () => ['characters'] as const,
    page: (page: number, name: string) =>
      ['characters', page, name] as const,
  },

  movies: {
    all: () => ['movies'] as const,
  },
} as const;