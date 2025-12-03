// src/test/controllers/savedMovieController.test.ts
import { Request, Response } from 'express';
import { savedRepo } from '../repositories';

export async function findAllSavedMoviesBasedCountryAndUser(
  req: Request,
  res: Response,
) {
  const { country, user_id } = req.query;
  const page = Number(req.query.page || 1);
  const page_size = Number(req.query.page_size || 20);
  try {
    const { data, total } = await savedRepo.findAllPagedBasedCountryAndUser(
      page,
      page_size,
      String(country),
      String(user_id),
      // req.query.sort,
    );
    return res.json({ data, page, page_size, total });
  } catch (err: any) {
    return res
      .status(500)
      .json({ code: 'INTERNAL_ERROR', message: String(err?.message || err) });
  }
}

export async function createSavedMovie(req: Request, res: Response) {
  const { country, user_id, movie_id } = req.body;
  try {
    const movie = await savedRepo.saveMovieForUser(country, user_id, movie_id);
    return res.status(201).json({ data: movie });
  } catch (err: any) {
    if (err.name === 'DuplicateSaveError')
      return res
        .status(409)
        .json({ error: { code: '409 DUPLICATE_SAVE', message: err.message } });
    if (err.name === 'UnavailableInCountryError')
      return res
        .status(422)
        .json({
          error: { code: 'UNAVAILABLE_IN_COUNTRY', message: err.message },
        });
    if (err.name === 'NotFoundError')
      return res
        .status(404)
        .json({ error: { code: 'NOT_FOUND', message: err.message } });
    return res
      .status(500)
      .json({
        error: { code: 'INTERNAL_ERROR', message: String(err?.message || err) },
      });
  }
}

export async function removeSavedMovie(req: Request, res: Response) {
  const { user_id, movie_id } = req.body;
  try {
    await savedRepo.removeSavedMovie(user_id, movie_id);
    return res.status(204).send();
  } catch (err: any) {
    if (err.name === 'NotFoundError')
      return res.status(404).json({ code: 'NOT_SAVED', message: err.message });
    return res
      .status(500)
      .json({ code: 'INTERNAL_ERROR', message: String(err?.message || err) });
  }
}
