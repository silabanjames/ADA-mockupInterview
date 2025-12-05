"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const genre_service_1 = require("../services/genre.service");
const base_controller_1 = require("./common/base.controller");
const messagesKey_1 = require("../helpers/messages/messagesKey");
class GenreController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.genreService = new genre_service_1.GenreService();
    }
    async findAllGenres(req, res) {
        try {
            const { data, page, page_size, total } = await this.genreService.findAllGenres(req);
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
exports.GenreController = GenreController;
