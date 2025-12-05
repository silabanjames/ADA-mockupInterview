"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const genre_repository_1 = require("../repositories/genre.repository");
const default_pagination_1 = require("../helpers/const/default-pagination");
class GenreService {
    constructor() {
        this.genreRepository = new genre_repository_1.GenreRepository();
    }
    // private async convertToResultDTO() {
    //   this.genreRepository = new GenreRepository();
    // }
    async findAllGenres(req) {
        // parse query params
        const rawPage = req.query.page;
        const rawPageSize = req.query.page_size;
        let page = rawPage ? parseInt(rawPage, 10) : default_pagination_1.DEFAULT_PAGE;
        let pageSize = rawPageSize ? parseInt(rawPageSize) : default_pagination_1.DEFAULT_PAGE_SIZE;
        if (Number.isNaN(page) || page < 1)
            page = default_pagination_1.DEFAULT_PAGE;
        if (Number.isNaN(pageSize) || pageSize < 1)
            pageSize = default_pagination_1.DEFAULT_PAGE_SIZE;
        if (pageSize > default_pagination_1.MAX_PAGE_SIZE)
            pageSize = default_pagination_1.MAX_PAGE_SIZE;
        const { data, total } = await this.genreRepository.findAllPaged(req, page, pageSize);
        return {
            data: data,
            page: page,
            page_size: pageSize,
            total: total
        };
    }
}
exports.GenreService = GenreService;
