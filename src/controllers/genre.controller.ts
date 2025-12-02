import { Request, Response } from "express";
import { GenreService } from "../services/genre.service";
import { BaseController } from "./common/base.controller";
import { MessagesKey } from "../helpers/messages/messagesKey";

export class GenreController extends BaseController {
  private genreService: GenreService;

  constructor() {
    super();
    this.genreService = new GenreService();
  }

  public async findAllGenres(req: Request, res: Response): Promise<Response> {
    try {
      const { data, page, page_size, total } = await this.genreService.findAllGenres(req);
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