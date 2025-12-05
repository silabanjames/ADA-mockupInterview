"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedMovieController = void 0;
const base_controller_1 = require("./common/base.controller");
const savedMovie_service_1 = require("../services/savedMovie.service");
const messagesKey_1 = require("../helpers/messages/messagesKey");
const errors_1 = require("../helpers/errors/errors");
class SavedMovieController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.savedMovieService = new savedMovie_service_1.SavedMovieService();
    }
    async findAllSavedMoviesBasedCountryAndUser(req, res) {
        try {
            const { data, page, page_size, total } = await this.savedMovieService.findAllSavedMoviesBasedCountryAndUser(req);
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
    async createSavedMovie(req, res) {
        try {
            const data = await this.savedMovieService.createSavedMovie(req);
            return this.sendSuccessCreate(req, res, data);
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return this.handleError(req, res, error, 404, messagesKey_1.MessagesKey.NOT_FOUND);
            }
            if (error instanceof errors_1.DuplicateSaveError) {
                return this.handleError(req, res, error, 409, messagesKey_1.MessagesKey.DUPLICATE_SAVE);
            }
            if (error instanceof errors_1.UnavailableInCountryError) {
                return this.handleError(req, res, error.message, 422, messagesKey_1.MessagesKey.UNAVAILABLE_IN_COUNTRY);
            }
            if (error instanceof errors_1.BadRequest) {
                return this.handleError(req, res, error.message, 400, messagesKey_1.MessagesKey.BAD_REQUEST);
            }
            return this.handleError(req, res, error, 500);
        }
    }
    async removeSavedMovie(req, res) {
        try {
            await this.savedMovieService.removeSavedMovie(req);
            return this.sendSuccessDelete(req, res);
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return this.handleError(req, res, error.message, 404);
            }
            if (error instanceof errors_1.BadRequest) {
                return this.handleError(req, res, error.message, 400, messagesKey_1.MessagesKey.BAD_REQUEST);
            }
            return this.handleError(req, res, error, 500);
        }
    }
}
exports.SavedMovieController = SavedMovieController;
