// src/test/mockDb.ts
export type MovieItem = { id: string; title: string; year: number };
export type SavedEntry = { userId: string; movieId: string; dateAdded: Date };
export type Availability = { movieId: string; countryCode: string };

let movies: MovieItem[] = [];
let availabilities: Availability[] = [];
let saved: SavedEntry[] = [];

export function resetMockDb() {
  movies = [
    { id: 'm-us-1', title: 'US Movie 1', year: 2020 },
    { id: 'm-us-2', title: 'US Movie 2', year: 2019 },
    { id: 'm-id-1', title: 'ID Movie 1', year: 2021 },
    { id: 'm-global', title: 'Global Movie', year: 2022 },
  ];
  availabilities = [
    { movieId: 'm-us-1', countryCode: 'US' },
    { movieId: 'm-us-2', countryCode: 'US' },
    { movieId: 'm-id-1', countryCode: 'ID' },
    { movieId: 'm-global', countryCode: 'US' },
    { movieId: 'm-global', countryCode: 'ID' },
  ];
  saved = [
    {
      userId: 'u1',
      movieId: 'm-us-1',
      dateAdded: new Date('2023-01-01T00:00:00Z'),
    },
  ];
}

export function getMovies() {
  return movies;
}
export function getAvailabilities() {
  return availabilities;
}
export function getSaved() {
  return saved;
}

export function addSaved(userId: string, movieId: string, date?: Date) {
  saved.push({ userId, movieId, dateAdded: date ?? new Date() });
}
export function removeSaved(userId: string, movieId: string) {
  const idx = saved.findIndex(
    (s) => s.userId === userId && s.movieId === movieId,
  );
  if (idx !== -1) saved.splice(idx, 1);
}

// init
resetMockDb();
