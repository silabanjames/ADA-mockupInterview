import { Request, Response } from 'express';
import { BaseController } from './common/base.controller';
import { SavedMovieService } from '../services/savedMovie.service';
import { MessagesKey } from '../helpers/messages/messagesKey';
import {
  BadRequest,
  DuplicateSaveError,
  NotFoundError,
  UnavailableInCountryError,
} from '../helpers/errors/errors';

export class SavedMovieController extends BaseController {
  private savedMovieService: SavedMovieService;

  constructor() {
    super();
    this.savedMovieService = new SavedMovieService();
  }

  public async findAllSavedMoviesBasedCountryAndUser(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { data, page, page_size, total } =
        await this.savedMovieService.findAllSavedMoviesBasedCountryAndUser(req);
      if (data && data.length > 0) {
        return this.sendSuccessGetList(
          req,
          res,
          data,
          page,
          page_size,
          total,
          MessagesKey.SUCCESSGET,
          200,
        );
      } else {
        return this.sendErrorNoDataFoundSuccess(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async createSavedMovie(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const data = await this.savedMovieService.createSavedMovie(req);
      return this.sendSuccessCreate(req, res, data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return this.handleError(req, res, error, 404, MessagesKey.NOT_FOUND);
      }

      if (error instanceof DuplicateSaveError) {
        return this.handleError(
          req,
          res,
          error,
          409,
          MessagesKey.DUPLICATE_SAVE,
        );
      }

      if (error instanceof UnavailableInCountryError) {
        return this.handleError(
          req,
          res,
          error.message,
          422,
          MessagesKey.UNAVAILABLE_IN_COUNTRY,
        );
      }

      if (error instanceof BadRequest) {
        return this.handleError(
          req,
          res,
          error.message,
          400,
          MessagesKey.BAD_REQUEST,
        );
      }

      return this.handleError(req, res, error, 500);
    }
  }

  public async removeSavedMovie(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      await this.savedMovieService.removeSavedMovie(req);
      return this.sendSuccessDelete(req, res);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return this.handleError(req, res, error.message, 404);
      }

      if (error instanceof BadRequest) {
        return this.handleError(
          req,
          res,
          error.message,
          400,
          MessagesKey.BAD_REQUEST,
        );
      }

      return this.handleError(req, res, error, 500);
    }
  }
}
