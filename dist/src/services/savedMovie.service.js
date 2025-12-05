"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedMovieService = void 0;
const savedMovie_repository_1 = require("../repositories/savedMovie.repository");
const default_pagination_1 = require("../helpers/const/default-pagination");
const errors_1 = require("../helpers/errors/errors");
class SavedMovieService {
    constructor() {
        this.savedMovieRepository = new savedMovie_repository_1.SavedMovieRepository();
    }
    async findAllSavedMoviesBasedCountryAndUser(req) {
        // validate query params
        const rawCountry = req.query.country || '';
        const rawUser = req.query.user_id;
        const rawPage = req.query.page;
        const rawPageSize = req.query.page_size;
        const rawSort = req.query.sort || '-date_added';
        // validate sort 
        const sort = rawSort === 'date_added' ? 'date_added' : '-date_added';
        let page = rawPage ? parseInt(rawPage, 10) : default_pagination_1.DEFAULT_PAGE;
        let pageSize = rawPageSize ? parseInt(rawPageSize) : default_pagination_1.DEFAULT_PAGE_SIZE;
        if (Number.isNaN(page) || page < 1)
            page = default_pagination_1.DEFAULT_PAGE;
        if (Number.isNaN(pageSize) || pageSize < 1)
            pageSize = default_pagination_1.DEFAULT_PAGE_SIZE;
        if (pageSize > 100)
            pageSize = default_pagination_1.MAX_PAGE_SIZE;
        const result = await this.savedMovieRepository.findAllPagedBasedCountryAndUser(req, page, pageSize, rawCountry, rawUser, sort);
        return {
            data: result.data,
            page: page,
            page_size: pageSize,
            total: result.total,
        };
    }
    async createSavedMovie(req) {
        // await this.savedMovieRepository.createSavedMovie(req);
        const { country, user_id: userId, movie_id: movieId } = req.body ?? {};
        if (!country || !userId || !movieId) {
            throw new errors_1.BadRequest('country, user_id and movie_id are required');
        }
        const movie = await this.savedMovieRepository.createSavedMovie(req, country, userId, movieId);
        return movie;
    }
    async removeSavedMovie(req) {
        const { movie_id: movieId, user_id: userId } = req.body ?? {};
        if (!movieId || !userId) {
            throw new errors_1.BadRequest('movie_id and user_id are required');
        }
        await this.savedMovieRepository.removeSavedMovie(req, movieId, userId);
    }
}
exports.SavedMovieService = SavedMovieService;
