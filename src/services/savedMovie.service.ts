import { Request } from "express";
import { MovieItem } from "../helpers/dtos/movie.dto";
import { ListReturnVM } from "../helpers/view-model/listReturn.vm";
import { SavedMovieRepository } from "../repositories/savedMovie.repository";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../helpers/const/default-pagination";
import { BadRequest } from "../helpers/errors/errors";

export class SavedMovieService {
  private savedMovieRepository: SavedMovieRepository;

  constructor() {
    this.savedMovieRepository = new SavedMovieRepository();
  }

  async findAllSavedMoviesBasedCountryAndUser(req: Request): Promise<ListReturnVM<MovieItem[]>> {
    // validate query params
    const rawCountry = (req.query.country as string | undefined) || '';
    const rawUser = req.query.user_id as string | '';
    const rawPage = req.query.page as string | undefined;
    const rawPageSize = req.query.page_size as string | undefined;
    const rawSort = (req.query.sort as string | undefined) || '-date_added';

    // validate sort 
    const sort = rawSort === 'date_added' ? 'date_added' : '-date_added';

    let page = rawPage ? parseInt(rawPage, 10) : DEFAULT_PAGE;
    let pageSize = rawPageSize ? parseInt(rawPageSize) : DEFAULT_PAGE_SIZE;

    if (Number.isNaN(page) || page < 1) page = DEFAULT_PAGE;
    if (Number.isNaN(pageSize) || pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;
    if (pageSize > 100) pageSize = MAX_PAGE_SIZE;

    const result = await this.savedMovieRepository.findAllPagedBasedCountryAndUser(
      req,
      page,
      pageSize,
      rawCountry,
      rawUser,
      sort,
    );

    return {
      data: result.data,
      page: page,
      page_size: pageSize,
      total: result.total,
    }
  }

  async createSavedMovie(req: Request): Promise<MovieItem> {
    // await this.savedMovieRepository.createSavedMovie(req);
    const {country, user_id: userId, movie_id:movieId} = req.body ?? {};

    if (!country || !userId || !movieId) {
      throw new BadRequest('country, user_id and movie_id are required');
    }

    const movie = await this.savedMovieRepository.createSavedMovie(req, country, userId, movieId);
    return movie;
  }

  async removeSavedMovie(req: Request): Promise<void> {
    const {movie_id: movieId, user_id: userId} = req.body ?? {};
    if (!movieId || !userId) {
      throw new BadRequest('movie_id and user_id are required');
    }
    
    await this.savedMovieRepository.removeSavedMovie(req, movieId, userId);
  }
}