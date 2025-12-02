import { Request, Response } from 'express';
import { MovieService } from '../services/movie.service';
import { BaseController } from './common/base.controller';
import { MessagesKey } from '../helpers/messages/messagesKey';

export class MovieController extends BaseController {
  private movieService: MovieService;

  constructor() {
    super();
    this.movieService = new MovieService();
  }

  public async findAllMoviesBasedCountryAndGenre(req: Request, res: Response): Promise<Response> {
      try {
        const { data, page, page_size, total } = await this.movieService.findAllMoviesBasedCountryAndGenre(req);
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
}
