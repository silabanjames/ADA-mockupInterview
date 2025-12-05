"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const movie_repository_1 = require("../repositories/movie.repository");
const default_pagination_1 = require("../helpers/const/default-pagination");
class MovieService {
    constructor() {
        this.movieRepository = new movie_repository_1.MovieRepository();
    }
    async findAllMoviesBasedCountryAndGenre(req) {
        // validate query params
        const rawCountry = req.query.country || '';
        const rawGenre = req.query.genre;
        const rawPage = req.query.page;
        const rawPageSize = req.query.page_size;
        const rawSort = req.query.sort || '-year';
        const country = rawCountry.toUpperCase();
        // validate sort
        const sort = rawSort === 'year' ? 'year' : '-year';
        let page = rawPage ? parseInt(rawPage, 10) : default_pagination_1.DEFAULT_PAGE;
        let pageSize = rawPageSize ? parseInt(rawPageSize) : default_pagination_1.DEFAULT_PAGE_SIZE;
        if (Number.isNaN(page) || page < 1)
            page = default_pagination_1.DEFAULT_PAGE;
        if (Number.isNaN(pageSize) || pageSize < 1)
            pageSize = default_pagination_1.DEFAULT_PAGE_SIZE;
        if (pageSize > 100)
            pageSize = default_pagination_1.MAX_PAGE_SIZE;
        const result = await this.movieRepository.findAllPagedBasedCountryAndGenre(req, page, pageSize, country, sort, rawGenre);
        return {
            data: result.data,
            page: page,
            page_size: pageSize,
            total: result.total,
        };
    }
}
exports.MovieService = MovieService;
