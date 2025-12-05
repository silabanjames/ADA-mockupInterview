"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedRepo = exports.movieRepo = exports.SavedRepo = exports.MovieRepo = void 0;
// src/test/repositories.ts
const mockDb_1 = require("./mockDb");
class MovieRepo {
    listMovies({ country }) {
        const countryCode = (country || '').toUpperCase();
        const availableIds = new Set((0, mockDb_1.getAvailabilities)()
            .filter((a) => a.countryCode === countryCode)
            .map((a) => a.movieId));
        const data = (0, mockDb_1.getMovies)().filter((m) => availableIds.has(m.id));
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
exports.MovieRepo = MovieRepo;
class SavedRepo {
    async findAllPagedBasedCountryAndUser(page, pageSize, country, userId) {
        const countryCode = (country || '').toUpperCase();
        const available = new Set((0, mockDb_1.getAvailabilities)()
            .filter((a) => a.countryCode === countryCode)
            .map((a) => a.movieId));
        const all = (0, mockDb_1.getSaved)().filter((s) => s.userId === userId && available.has(s.movieId));
        all.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        const skip = (Math.max(1, page) - 1) * pageSize;
        const pageData = all
            .slice(skip, skip + pageSize)
            .map((s) => (0, mockDb_1.getMovies)().find((m) => m.id === s.movieId))
            .filter(Boolean);
        return { data: pageData, total: all.length };
    }
    async saveMovieForUser(country, userId, movieId) {
        const countryCode = (country || '').toUpperCase();
        const movies = (0, mockDb_1.getMovies)();
        const movie = movies.find((m) => m.id === movieId);
        if (!movie)
            throw { name: 'NotFoundError', message: 'Movie not found' };
        const available = (0, mockDb_1.getAvailabilities)().some((a) => a.movieId === movieId && a.countryCode === countryCode);
        if (!available)
            throw { name: 'UnavailableInCountryError', message: 'not available' };
        const exists = (0, mockDb_1.getSaved)().some((s) => s.userId === userId && s.movieId === movieId);
        if (exists)
            throw { name: 'DuplicateSaveError', message: 'already saved' };
        (0, mockDb_1.addSaved)(userId, movieId);
        return movie;
    }
    async removeSavedMovie(userId, movieId) {
        const exists = (0, mockDb_1.getSaved)().some((s) => s.userId === userId && s.movieId === movieId);
        if (!exists)
            throw { name: 'NotFoundError', message: 'NOT_SAVED' };
        (0, mockDb_1.removeSaved)(userId, movieId);
        return;
    }
}
exports.SavedRepo = SavedRepo;
exports.movieRepo = new MovieRepo();
exports.savedRepo = new SavedRepo();
