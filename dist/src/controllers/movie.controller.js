"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movie_service_1 = require("../services/movie.service");
const base_controller_1 = require("./common/base.controller");
const messagesKey_1 = require("../helpers/messages/messagesKey");
class MovieController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.movieService = new movie_service_1.MovieService();
    }
    async findAllMoviesBasedCountryAndGenre(req, res) {
        try {
            const { data, page, page_size, total } = await this.movieService.findAllMoviesBasedCountryAndGenre(req);
            if (data && data.length > 0) {
                return this.sendSuccessGetList(req, res, data, page, page_size, total, messagesKey_1.MessagesKey.SUCCESSGET, 200);
            }
            else {
                return this.sendErrorNoDataFoundSuccess(req, res);
            }
        }
        catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }
}
exports.MovieController = MovieController;
