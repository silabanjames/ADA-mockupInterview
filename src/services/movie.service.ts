import { Request } from 'express';
import { MovieRepository } from '../repositories/movie.repository';
import { ListReturnVM } from '../helpers/view-model/listReturn.vm';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../helpers/const/default-pagination';
import { MovieItem } from '../helpers/dtos/movie.dto';

export class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  async findAllMoviesBasedCountryAndGenre(req: Request): Promise<ListReturnVM<MovieItem[]>> {
    // validate query params
    const rawCountry = (req.query.country as string | undefined) || '';
    const rawGenre = req.query.genre as string | undefined;
    const rawPage = req.query.page as string | undefined;
    const rawPageSize = req.query.page_size as string | undefined;
    const rawSort = (req.query.sort as string | undefined) || '-year';

    const country = rawCountry.toUpperCase();

    // validate sort
    const sort = rawSort === 'year' ? 'year' : '-year';

    let page = rawPage ? parseInt(rawPage, 10) : DEFAULT_PAGE;
    let pageSize = rawPageSize ? parseInt(rawPageSize) : DEFAULT_PAGE_SIZE;

    if (Number.isNaN(page) || page < 1) page = DEFAULT_PAGE;
    if (Number.isNaN(pageSize) || pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;
    if (pageSize > 100) pageSize = MAX_PAGE_SIZE;

    const result = await this.movieRepository.findAllPagedBasedCountryAndGenre(
      req,
      page,
      pageSize,
      country,
      sort,
      rawGenre,
    );

    return {
      data: result.data,
      page: page,
      page_size: pageSize,
      total: result.total,
    };
  }
}
