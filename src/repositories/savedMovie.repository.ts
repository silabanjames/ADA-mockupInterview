import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../../generated/prisma/client';
import { getMessage } from '../helpers/messages/messagesUtil';
import { Request } from 'express';
import { MessagesKey } from '../helpers/messages/messagesKey';
import { MovieItem } from '../helpers/dtos/movie.dto';
import {
  BadRequest,
  DuplicateSaveError,
  NotFoundError,
  UnavailableInCountryError,
} from '../helpers/errors/errors';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export class SavedMovieRepository {
  async findAllPagedBasedCountryAndUser(
    req: Request,
    page: number,
    pageSize: number,
    country: string,
    userId: string,
    sort: 'date_added' | '-date_added',
  ): Promise<{
    data: MovieItem[];
    total: number;
  }> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const countryCode = (country || '').toUpperCase();

      // where clause
      const where: Prisma.SavedMovieWhereInput = {
        userId,
        movie: {
          movieAvailabilities: {
            some: { countryCode },
          },
        },
      };

      //order by
      const orderBy: Prisma.SavedMovieOrderByWithRelationInput =
        sort === 'date_added'
          ? {
              dateAdded: 'asc',
            }
          : {
              dateAdded: 'desc',
            };

      const [total, data] = await Promise.all([
        prisma.savedMovie.count({ where }),
        prisma.savedMovie.findMany({
          where,
          orderBy,
          skip,
          take,
          include: {
            movie: {
              select: {
                id: true,
                title: true,
                year: true,
              },
            },
          },
        }),
      ]);

      const movieData: MovieItem[] = data.map((savedMovie) => ({
        id: savedMovie.movie.id,
        title: savedMovie.movie.title,
        year: savedMovie.movie.year,
      }));

      return {
        data: movieData,
        total,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  async createSavedMovie(
    req: Request,
    country: string,
    userId: string,
    movieId: string,
  ): Promise<MovieItem> {
    try {
      const countryCode = (country || '').toUpperCase();

      // 1. Ensure the movie is existed
      const movie = await prisma.movie.findFirst({
        where: {
          id: movieId,
        },
        select: {
          id: true,
          title: true,
          year: true,
        },
      });

      if (!movie) {
        throw new NotFoundError(`Movie with id ${movieId} not found`);
      }

      // 2. Cannot save the same
      const savedMovie = await prisma.savedMovie.findFirst({
        where: {
          movieId,
          userId,
        },
        select: {
          movieId: true,
        },
      });

      if (savedMovie) {
        throw new DuplicateSaveError(
          `Movie with id ${movieId} already saved by this user`,
        );
      }

      // 3. Cannot save if movie is not available in country
      const movieAvailability = await prisma.movieAvailability.findFirst({
        where: {
          movieId,
          countryCode,
        },
        select: {
          movieId: true,
        },
      });

      if (!movieAvailability) {
        throw new UnavailableInCountryError(
          `Movie with id ${movieId} is not available in country ${country}`,
        );
      }

      // 4. Save movie
      const savedMovieItem = await prisma.savedMovie.create({
        data: {
          movieId,
          userId,
          dateAdded: new Date(),
        },
      });

      return {
        id: savedMovieItem.movieId,
        title: movie.title,
        year: movie.year,
      };
    } catch (error) {
      if (
        error instanceof DuplicateSaveError ||
        error instanceof UnavailableInCountryError ||
        error instanceof NotFoundError ||
        error instanceof BadRequest
      ) {
        throw error;
      }

      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  async removeSavedMovie(
    req: Request,
    movieId: string,
    userId: string,
  ): Promise<void> {
    try {
      // 1. Ensure the movie is existed
      const movie = await prisma.movie.findFirst({
        where: {
          id: movieId,
        },
        select: {
          id: true,
        },
      });

      if (!movie) {
        throw new NotFoundError(`Movie with id ${movieId} is not found`);
      }

      await prisma.savedMovie.deleteMany({
        where: {
          movieId,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }
}
