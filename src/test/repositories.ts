// src/test/repositories.ts
import {
  getMovies,
  getAvailabilities,
  getSaved,
  addSaved,
  removeSaved,
} from './mockDb';

export class MovieRepo {
  listMovies({ country }: { country: string }) {
    const countryCode = (country || '').toUpperCase();
    const availableIds = new Set(
      getAvailabilities()
        .filter((a) => a.countryCode === countryCode)
        .map((a) => a.movieId),
    );
    const data = getMovies().filter((m) => availableIds.has(m.id));
    return {
      data,
      meta: {
        page: 1,
        page_size: data.length,
        total: data.length,
        total_pages: 1,
      },
    };
  }
}

export class SavedRepo {
  async findAllPagedBasedCountryAndUser(
    page: number,
    pageSize: number,
    country: string,
    userId: string,
    // sort: any,
  ) {
    const countryCode = (country || '').toUpperCase();
    const available = new Set(
      getAvailabilities()
        .filter((a) => a.countryCode === countryCode)
        .map((a) => a.movieId),
    );
    const all = getSaved().filter(
      (s) => s.userId === userId && available.has(s.movieId),
    );
    all.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
    const skip = (Math.max(1, page) - 1) * pageSize;
    const pageData = all
      .slice(skip, skip + pageSize)
      .map((s) => getMovies().find((m) => m.id === s.movieId))
      .filter(Boolean);
    return { data: pageData, total: all.length };
  }

  async saveMovieForUser(country: string, userId: string, movieId: string) {
    const countryCode = (country || '').toUpperCase();
    const movies = getMovies();
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) throw { name: 'NotFoundError', message: 'Movie not found' };
    const available = getAvailabilities().some(
      (a) => a.movieId === movieId && a.countryCode === countryCode,
    );
    if (!available)
      throw { name: 'UnavailableInCountryError', message: 'not available' };
    const exists = getSaved().some(
      (s) => s.userId === userId && s.movieId === movieId,
    );
    if (exists) throw { name: 'DuplicateSaveError', message: 'already saved' };
    addSaved(userId, movieId);
    return movie;
  }

  async removeSavedMovie(userId: string, movieId: string) {
    const exists = getSaved().some(
      (s) => s.userId === userId && s.movieId === movieId,
    );
    if (!exists) throw { name: 'NotFoundError', message: 'NOT_SAVED' };
    removeSaved(userId, movieId);
    return;
  }
}

export const movieRepo = new MovieRepo();
export const savedRepo = new SavedRepo();
