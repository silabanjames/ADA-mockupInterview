import { Request } from "express";
import { Genre } from "../../generated/prisma/client";
import { GenreRepository } from "../repositories/genre.repository";
import { ListReturnVM } from "../helpers/view-model/listReturn.vm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../helpers/const/default-pagination";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  // private async convertToResultDTO() {
  //   this.genreRepository = new GenreRepository();
  // }

  async findAllGenres(req: Request): Promise<ListReturnVM<Genre[]>> {

    // parse query params
    const rawPage = req.query.page as string | undefined;
    const rawPageSize = req.query.page_size as string | undefined;

    let page = rawPage ? parseInt(rawPage, 10) : DEFAULT_PAGE
    let pageSize = rawPageSize ? parseInt(rawPageSize) : DEFAULT_PAGE_SIZE

    if (Number.isNaN(page) || page < 1) page = DEFAULT_PAGE
    if (Number.isNaN(pageSize) || pageSize < 1 ) pageSize = DEFAULT_PAGE_SIZE
    if (pageSize > MAX_PAGE_SIZE) pageSize = MAX_PAGE_SIZE

    const {data, total} = await this.genreRepository.findAllPaged(req, page, pageSize);

    return {
      data: data,
      page: page,
      page_size: pageSize,
      total: total
    }
  }
}